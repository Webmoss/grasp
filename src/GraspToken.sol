// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.25;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract GraspToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    constructor(address initialOwner)
        ERC20("Grasp", "GRASP")
        ERC20Permit("Grasp")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 420000000000 * 10 ** decimals());
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
