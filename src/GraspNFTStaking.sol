// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/utils/Pausable.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "./GraspNFT.sol";
import "./GraspToken.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GraspNFTStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    GraspNFT public immutable nftContract;
    GraspToken public immutable rewardToken;

    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint256) public stakedTokenCount;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 public constant REWARD_MULTIPLIER = 150; // 1.5x multiplier for NFT holders

    uint256 public totalStaked;

    // Add a new variable to track the last claim time for each user
    mapping(address => uint256) public lastClaimTime;

    constructor(GraspNFT _nftContract, GraspToken _rewardToken)
        Ownable(msg.sender)
    {
        nftContract = _nftContract;
        rewardToken = _rewardToken;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalStaked);
    }

    function earned(address account) public view returns (uint256) {
        uint256 baseEarnings = ((stakedTokenCount[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + rewards[account];
        uint256 multiplier = getMultiplier(account);
        return (baseEarnings * multiplier) / 100;
    }

    function getMultiplier(address account) public view returns (uint256) {
        return nftContract.balanceOf(account) > 0 ? REWARD_MULTIPLIER : 100;
    }

    function stake(uint256 tokenId) public nonReentrant whenNotPaused updateReward(msg.sender) {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        tokenOwner[tokenId] = msg.sender;
        stakedTokenCount[msg.sender]++;
        totalStaked++;
        lastClaimTime[msg.sender] = block.timestamp;
        emit Staked(msg.sender, tokenId);
    }

    function withdraw(uint256 tokenId) public nonReentrant whenNotPaused {
        _updateReward(msg.sender);
        require(tokenOwner[tokenId] == msg.sender, "Not the staker of the token");
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwner[tokenId];
        stakedTokenCount[msg.sender]--;
        totalStaked--;
        emit Withdrawn(msg.sender, tokenId);
    }

    function getReward() public nonReentrant whenNotPaused updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.transfer(msg.sender, reward);
            lastClaimTime[msg.sender] = block.timestamp;
            emit RewardPaid(msg.sender, reward);
        }
    }

    function _updateReward(address account) internal {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
    }

    function setRewardRate(uint256 _rewardRate) external onlyOwner whenNotPaused updateReward(address(0)) {
        rewardRate = _rewardRate;
        emit RewardRateUpdated(_rewardRate);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Add a function to view pending rewards
    function pendingRewards(address user) public view returns (uint256) {
        return earned(user);
    }

    // Add a function to stake multiple NFTs at once
    function stakeMultiple(uint256[] calldata tokenIds) external {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            stake(tokenIds[i]);
        }
    }

    // Add a function to withdraw multiple NFTs at once
    function withdrawMultiple(uint256[] calldata tokenIds) public nonReentrant whenNotPaused {
        _updateReward(msg.sender);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(tokenOwner[tokenIds[i]] == msg.sender, "Not the staker of the token");
            nftContract.transferFrom(address(this), msg.sender, tokenIds[i]);
            delete tokenOwner[tokenIds[i]];
            stakedTokenCount[msg.sender]--;
            totalStaked--;
        }
        emit Withdrawn(msg.sender, tokenIds[0]);
    }

    event Staked(address indexed user, uint256 tokenId);
    event Withdrawn(address indexed user, uint256 tokenId);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
}
