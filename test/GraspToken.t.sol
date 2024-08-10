// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { GraspToken } from "src/GraspToken.sol";

contract GraspTokenTest is Test {
  GraspToken public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new GraspToken(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "Grasp");
  }
}
