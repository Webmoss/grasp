// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GraspNFT} from "src/GraspNFT.sol";

contract GraspNFTTest is Test {
  GraspNFT public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new GraspNFT(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "GraspNFT");
  }
}
