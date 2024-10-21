// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Test } from "forge-std/Test.sol";
import { CapyToken } from "src/CapyToken.sol";

contract CapyTokenTest is Test {
  CapyToken public instance;

  function setUp() public {
    address initialOwner = vm.addr(1);
    instance = new CapyToken(initialOwner);
  }

  function testName() public view {
    assertEq(instance.name(), "Capy");
  }

  function testSymbol() public view {
    assertEq(instance.symbol(), "CAPY");
  }

  function testDecimals() public view {
    assertEq(instance.decimals(), 18);
  }

  function testTotalSupply() public view {
    assertEq(instance.totalSupply(), 21000000 * 10**18);
  }

  function testInitialOwner() public view {
    assertEq(instance.owner(), vm.addr(1));
  }

  function testInitialBalance() public view {
    assertEq(instance.balanceOf(vm.addr(1)), 21000000 * 10**18);
  }
}
