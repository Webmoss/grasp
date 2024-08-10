// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { GraspToken } from "src/GraspToken.sol";

contract GraspTokenScript is Script {
//   function setUp() public {}

//   function run() public {
//     vm.startBroadcast();
//     address initialOwner = 0xA1FCD7B2F6f36e6C14EbF77413bbE65DCEe97792;
//     GraspToken instance = new GraspToken(initialOwner);
//     console.log("Grasp Token Contract deployed to %s", address(instance));
//     vm.stopBroadcast();
//   }

  function run() external {
        // Load the deployer's private key from the environment variables
        uint256 deployerPrivateKey = vm.envUint("ACCOUNT_PRIVATE_KEY");

        // Start broadcasting the transaction using the deployer's private key
        vm.startBroadcast(deployerPrivateKey);

        address initialOwner = 0xA1FCD7B2F6f36e6C14EbF77413bbE65DCEe97792;

        // Deploy the GraspToken contract
        GraspToken graspToken = new GraspToken(initialOwner);

        // End broadcasting the transaction
        vm.stopBroadcast();

        // Log the address of the deployed contract
        console.log("Grasp Token Contract deployed to:", address(graspToken));
    }
}
