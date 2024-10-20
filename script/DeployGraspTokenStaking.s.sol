// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { GraspToken } from "src/GraspToken.sol";
import { GraspTokenStaking } from "src/GraspTokenStaking.sol";

contract DeployGraspTokenStakingScript is Script {
    function run() external {
        // Load the deployer's private key from the environment variables
        uint256 deployerPrivateKey = vm.envUint("ACCOUNT_PRIVATE_KEY");

        // Start broadcasting the transaction using the deployer's private key
        vm.startBroadcast(deployerPrivateKey);

        // Use the address of the already deployed GraspToken
        address graspTokenAddress = 0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC;
        GraspToken graspToken = GraspToken(graspTokenAddress);
        console.log("Using existing Grasp Token Contract at:", address(graspToken));

        // Deploy the GraspTokenStaking contract
        GraspTokenStaking stakingContract = new GraspTokenStaking(graspToken);
        console.log("Grasp Token Staking Contract deployed to:", address(stakingContract));

        // Set initial reward rate (e.g., 1 token per second)
        stakingContract.setRewardRate(1 * 10**18);

        // Transfer some tokens to the staking contract for rewards (e.g., 1,000,000 tokens)
        uint256 rewardAmount = 1_000_000 * 10**18;
        graspToken.transfer(address(stakingContract), rewardAmount);

        // End broadcasting the transaction
        vm.stopBroadcast();

        console.log("Deployment completed successfully");
        console.log("Initial reward rate set to 1 GRASP per second");
        console.log("Transferred", rewardAmount / 10**18, "GRASP tokens to the staking contract for rewards");
    }
}
