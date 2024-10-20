// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/GraspNFT.sol";
import "../src/GraspToken.sol";
import "../src/GraspNFTStaking.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract GraspNFTStakingTest is Test {
    GraspNFT public nft;
    GraspToken public token;
    GraspNFTStaking public staking;

    address public owner = address(1);
    address public alice = address(2);
    address public bob = address(3);

    function setUp() public {
        vm.startPrank(owner);
        nft = new GraspNFT(owner);
        token = new GraspToken(owner);
        staking = new GraspNFTStaking(nft, token);

        // Mint NFTs
        nft.safeMint(alice, "uri1");
        nft.safeMint(alice, "uri2");
        nft.safeMint(alice, "uri3");
        nft.safeMint(bob, "uri4");

        // Transfer tokens to the staking contract for rewards
        token.transfer(address(staking), 1000000 * 10**18);

        // Set initial reward rate
        staking.setRewardRate(1 * 10**18);
        vm.stopPrank();
    }

    function testStake() public {
        vm.startPrank(alice);
        uint256 tokenId = 0; // Use the first token minted to Alice
        nft.approve(address(staking), tokenId);
        staking.stake(tokenId);
        assertEq(staking.stakedTokenCount(alice), 1);
        assertEq(nft.ownerOf(tokenId), address(staking));
        vm.stopPrank();
    }

    function testPause() public {
        vm.prank(owner);
        staking.pause();

        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        vm.expectRevert("Pausable: paused");
        staking.stake(0);
        vm.stopPrank();

        vm.prank(owner);
        staking.unpause();

        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        assertEq(staking.stakedTokenCount(alice), 1);
        vm.stopPrank();
    }

    function testStakeMultiple() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        nft.approve(address(staking), 1);
        uint256[] memory tokenIds = new uint256[](2);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        staking.stakeMultiple(tokenIds);
        assertEq(staking.stakedTokenCount(alice), 2);
        assertEq(nft.ownerOf(0), address(staking));
        assertEq(nft.ownerOf(1), address(staking));
        vm.stopPrank();
    }

    function testWithdraw() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days);

        vm.startPrank(alice);
        staking.withdraw(0);
        staking.getReward(); // Separate call to get rewards
        vm.stopPrank();

        assertEq(staking.stakedTokenCount(alice), 0);
        assertEq(nft.ownerOf(0), alice);
    }

    function testWithdrawMultiple() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        nft.approve(address(staking), 1);
        uint256[] memory tokenIds = new uint256[](2);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        staking.stakeMultiple(tokenIds);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days);

        vm.startPrank(alice);
        staking.withdrawMultiple(tokenIds);
        staking.getReward(); // Separate call to get rewards
        vm.stopPrank();

        assertEq(staking.stakedTokenCount(alice), 0);
        assertEq(nft.ownerOf(0), alice);
        assertEq(nft.ownerOf(1), alice);
    }

    function testEarnRewards() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        vm.warp(block.timestamp + 1 days);
        uint256 earned = staking.earned(alice);
        assertGt(earned, 0);
        staking.getReward();
        assertEq(token.balanceOf(alice), earned);
        vm.stopPrank();
    }

    function testRewardMultiplier() public {
        vm.startPrank(owner);
        nft.safeMint(alice, "uri4");
        nft.safeMint(bob, "uri5");
        vm.stopPrank();

        vm.startPrank(alice);
        nft.approve(address(staking), 3);
        staking.stake(3);
        vm.stopPrank();

        vm.startPrank(bob);
        nft.approve(address(staking), 4);
        staking.stake(4);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days);

        uint256 aliceEarned = staking.earned(alice);
        uint256 bobEarned = staking.earned(bob);

        console.log("Alice earned:", aliceEarned);
        console.log("Bob earned:", bobEarned);
        console.log("Alice multiplier:", staking.getMultiplier(alice));
        console.log("Bob multiplier:", staking.getMultiplier(bob));

        assertGe(aliceEarned, bobEarned);
        assertApproxEqRel(aliceEarned, bobEarned * 3 / 2, 1e16); // Allow 1% deviation
    }

    function testPendingRewards() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        vm.warp(block.timestamp + 1 days);
        uint256 pending = staking.pendingRewards(alice);
        assertGt(pending, 0);
        assertEq(pending, staking.earned(alice));
        vm.stopPrank();
    }

    function testLastClaimTime() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        uint256 stakeTime = block.timestamp;
        vm.stopPrank();

        assertEq(staking.lastClaimTime(alice), stakeTime);

        vm.warp(block.timestamp + 1 days);

        vm.prank(alice);
        staking.getReward();

        assertEq(staking.lastClaimTime(alice), block.timestamp);
    }

    function testSetRewardRate() public {
        uint256 newRate = 2 * 10**18;
        vm.prank(owner);
        staking.setRewardRate(newRate);
        assertEq(staking.rewardRate(), newRate);
    }

    function testOnlyOwnerCanSetRewardRate() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        staking.setRewardRate(1 * 10**18);
    }

    function testRewardCalculationWithMultiplier() public {
        vm.startPrank(alice);
        nft.approve(address(staking), 0);
        staking.stake(0);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days);

        uint256 aliceEarned = staking.earned(alice);
        uint256 expectedReward = 1 days * 1 * 10**18 * 150 / 100; // 1 day * 1 token per second * 1.5 multiplier
        assertEq(aliceEarned, expectedReward);
    }

    function testDeploymentAndInitialSetup() public {
        vm.startPrank(owner);

        // Deploy contracts
        GraspNFT newNFT = new GraspNFT(owner);
        GraspToken newToken = new GraspToken(owner);
        GraspNFTStaking newStaking = new GraspNFTStaking(newNFT, newToken);

        // Set reward rate
        newStaking.setRewardRate(1 * 10**18);

        // Transfer tokens for rewards
        uint256 rewardAmount = 1_000_000 * 10**18;
        newToken.transfer(address(newStaking), rewardAmount);

        vm.stopPrank();

        // Verify setup
        assertEq(newStaking.rewardRate(), 1 * 10**18);
        assertEq(newToken.balanceOf(address(newStaking)), rewardAmount);
    }
}
