// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { GraspNFT } from "src/GraspNFT.sol";
import { GraspToken } from "src/GraspToken.sol";
import { GraspNFTStaking } from "src/GraspNFTStaking.sol";

contract DeployGraspNFTStakingScript is Script {
    function run() external {
        // Load the deployer's private key from the environment variables
        uint256 deployerPrivateKey = vm.envUint("ACCOUNT_PRIVATE_KEY");

        // Start broadcasting the transaction using the deployer's private key
        vm.startBroadcast(deployerPrivateKey);

        // Use the addresses of the already deployed GraspNFT and GraspToken
        address graspNFTAddress = 0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6; // Replace with actual address
        address graspTokenAddress = 0x3eB2Eb8E2a0E26BEf3Dc3E78289Be7343355FeBC; // Replace with actual address
        GraspNFT graspNFT = GraspNFT(graspNFTAddress);
        GraspToken graspToken = GraspToken(graspTokenAddress);

        // Deploy the GraspNFTStaking contract
        GraspNFTStaking stakingContract = new GraspNFTStaking(graspNFT, graspToken);
        console.log("Grasp NFT Staking Contract deployed to:", address(stakingContract));

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
