// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Grasp} from "src/Grasp.sol";

contract GraspTest is Test {
  Grasp public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new Grasp(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "Grasp");
  }
}
