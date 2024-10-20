// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Test } from "forge-std/Test.sol";
import { GraspTokenStaking } from "src/GraspTokenStaking.sol";
import { GraspToken } from "src/GraspToken.sol";

contract GraspTokenStakingTest is Test {
    GraspTokenStaking public stakingContract;
    GraspToken public graspToken;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        // Deploy GraspToken
        graspToken = new GraspToken(owner);

        // Deploy GraspTokenStaking
        stakingContract = new GraspTokenStaking(graspToken);

        // Transfer tokens to users and staking contract
        vm.prank(owner);
        graspToken.transfer(user1, 1000 * 1e18);
        vm.prank(owner);
        graspToken.transfer(user2, 1000 * 1e18);
        vm.prank(owner);
        graspToken.transfer(address(stakingContract), 100000 * 1e18); // Transfer 100,000 tokens for rewards

        // Approve staking contract to spend tokens
        vm.prank(user1);
        graspToken.approve(address(stakingContract), type(uint256).max);
        vm.prank(user2);
        graspToken.approve(address(stakingContract), type(uint256).max);

        // Set initial reward rate
        stakingContract.setRewardRate(1 * 1e18); // 1 token per second
    }

    function testStaking() public {
        uint256 stakeAmount = 100 * 1e18;
        uint256 initialContractBalance = graspToken.balanceOf(address(stakingContract));

        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        assertEq(stakingContract.balanceOf(user1), stakeAmount, "Staking balance should match");
        assertEq(graspToken.balanceOf(address(stakingContract)), initialContractBalance + stakeAmount, "Contract should hold initial balance plus staked tokens");
    }

    function testWithdrawal() public {
        uint256 stakeAmount = 100 * 1e18;

        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        vm.prank(user1);
        stakingContract.withdraw(stakeAmount);

        assertEq(stakingContract.balanceOf(user1), 0, "Staking balance should be zero after withdrawal");
        assertEq(graspToken.balanceOf(user1), 1000 * 1e18, "User should have original balance after withdrawal");
    }

    function testRewardAccrual() public {
        uint256 stakeAmount = 100 * 1e18;

        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);

        uint256 expectedReward = 1 * 1e18 * 1 days; // 1 token per second for 1 day
        assertApproxEqAbs(stakingContract.earned(user1), expectedReward, 1e18, "Reward should accrue correctly");
    }

    function testRewardClaim() public {
        uint256 stakeAmount = 100 * 1e18;

        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        // Fast forward 1 hour instead of 1 day
        vm.warp(block.timestamp + 1 hours);

        uint256 initialBalance = graspToken.balanceOf(user1);

        vm.prank(user1);
        stakingContract.getReward();

        uint256 expectedReward = 1 * 1e18 * 1 hours; // 1 token per second for 1 hour
        assertApproxEqAbs(graspToken.balanceOf(user1) - initialBalance, expectedReward, 1e18, "Claimed reward should be correct");
    }

    function testMultipleUsers() public {
        vm.prank(user1);
        stakingContract.stake(100 * 1e18);

        vm.prank(user2);
        stakingContract.stake(200 * 1e18);

        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);

        uint256 expectedRewardUser1 = (1 * 1e18 * 1 days * 100) / 300; // 1/3 of total rewards
        uint256 expectedRewardUser2 = (1 * 1e18 * 1 days * 200) / 300; // 2/3 of total rewards

        assertApproxEqAbs(stakingContract.earned(user1), expectedRewardUser1, 1e18, "User1 reward should be correct");
        assertApproxEqAbs(stakingContract.earned(user2), expectedRewardUser2, 1e18, "User2 reward should be correct");
    }

    function testZeroAmountStakeAndWithdraw() public {
        vm.prank(user1);
        vm.expectRevert(); // Expect this to revert
        stakingContract.stake(0);

        vm.prank(user1);
        vm.expectRevert(); // Expect this to revert
        stakingContract.withdraw(0);
    }

    function testOverWithdrawal() public {
        uint256 stakeAmount = 100 * 1e18;
        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        vm.prank(user1);
        vm.expectRevert(); // Expect this to revert
        stakingContract.withdraw(stakeAmount + 1);
    }

    function testReentrancyProtection() public {
        // Implement a mock malicious contract that attempts reentrancy
        // Then try to stake/withdraw/claim rewards using this contract
        // Expect these operations to fail or be protected against reentrancy
    }

    function testLongTermRewardAccrual() public {
        uint256 stakeAmount = 100 * 1e18;
        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        // Fast forward 1 year
        vm.warp(block.timestamp + 365 days);

        uint256 expectedReward = 1 * 1e18 * 365 days; // 1 token per second for 1 year
        assertApproxEqAbs(stakingContract.earned(user1), expectedReward, 1e18, "Reward should accrue correctly over a year");
    }

    function testChangingRewardRates() public {
        uint256 stakeAmount = 100 * 1e18;
        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);

        // Change reward rate
        stakingContract.setRewardRate(2 * 1e18); // 2 tokens per second

        // Fast forward another day
        vm.warp(block.timestamp + 1 days);

        uint256 expectedReward = (1 * 1e18 * 1 days) + (2 * 1e18 * 1 days);
        assertApproxEqAbs(stakingContract.earned(user1), expectedReward, 1e18, "Reward should accrue correctly with rate change");
    }

    function testStakingWithInsufficientRewards() public {
        // Drain the contract of reward tokens
        uint256 contractBalance = graspToken.balanceOf(address(stakingContract));
        vm.prank(address(stakingContract));
        graspToken.transfer(address(this), contractBalance);

        uint256 stakeAmount = 100 * 1e18;
        vm.prank(user1);
        stakingContract.stake(stakeAmount);

        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);

        // Try to claim rewards
        vm.prank(user1);
        vm.expectRevert(); // Expect this to revert due to insufficient rewards
        stakingContract.getReward();
    }

    function testPausingFunctionality() public {
        // Assuming there's a pause function
        stakingContract.pause();

        uint256 stakeAmount = 100 * 1e18;
        vm.prank(user1);
        vm.expectRevert(); // Expect this to revert when paused
        stakingContract.stake(stakeAmount);

        // Test other functions while paused

        stakingContract.unpause();

        // Test that functions work again after unpausing
    }
}
