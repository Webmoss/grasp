// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-contracts/contracts/utils/math/Math.sol";
import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/utils/Pausable.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "./GraspToken.sol";

contract GraspTokenStaking is ERC20Wrapper, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // Staking token is GraspToken
    GraspToken public immutable stakingToken;

    // Reward rate per second
    uint256 public rewardRate;

    // Last update time
    uint256 public lastUpdateTime;

    // Reward per token stored
    uint256 public rewardPerTokenStored;

    // User reward per token paid
    mapping(address => uint256) public userRewardPerTokenPaid;

    // User rewards
    mapping(address => uint256) public rewards;

    constructor(GraspToken _stakingToken)
        ERC20("Staked Grasp", "sGRASP")
        ERC20Wrapper(IERC20(_stakingToken))
        Ownable(msg.sender)
    {
        stakingToken = _stakingToken;
    }

    // Update reward variables
    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    // Calculate the reward per token
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply() == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalSupply());
    }

    // Calculate the earned rewards for an account
    function earned(address account) public view returns (uint256) {
        return
            ((balanceOf(account) *
                (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) +
            rewards[account];
    }

    // Stake tokens
    function stake(uint256 amount) public nonReentrant whenNotPaused updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        _deposit(msg.sender, amount);
    }

    // Withdraw staked tokens
    function withdraw(uint256 amount) public nonReentrant whenNotPaused updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _withdraw(msg.sender, amount);
    }

    // Claim rewards
    function getReward() public nonReentrant whenNotPaused updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            require(stakingToken.balanceOf(address(this)) >= reward, "Insufficient reward tokens");
            SafeERC20.safeTransfer(IERC20(address(stakingToken)), msg.sender, reward);
        }
    }

    // Set reward rate (only owner)
    function setRewardRate(uint256 _rewardRate) external onlyOwner whenNotPaused updateReward(address(0)) {
        rewardRate = _rewardRate;
        emit RewardRateUpdated(_rewardRate);
    }

    // Pause the contract
    function pause() external onlyOwner {
        _pause();
    }

    // Unpause the contract
    function unpause() external onlyOwner {
        _unpause();
    }

    // Internal function to handle deposits
    function _deposit(address account, uint256 amount) internal updateReward(account) {
        require(amount > 0, "Cannot deposit 0 tokens");
        super.depositFor(account, amount);
        emit Staked(account, amount);
    }

    // Internal function to handle withdrawals
    function _withdraw(address account, uint256 amount) internal updateReward(account) {
        require(amount > 0, "Cannot withdraw 0 tokens");
        super.withdrawTo(account, amount);
        emit Withdrawn(account, amount);
    }

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 newRate);
}
