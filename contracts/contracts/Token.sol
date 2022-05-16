// contracts/SimpleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor() ERC20("NFT Token", "NTOKEN") {

        uint256 totalSupply = 1e6 * 1e18;

        _mint(address(this), totalSupply);
    }

    function airdrop(address to, uint256 amount) public {
        require(amount > 0, "ZERO_AMOUNT");
        require(to != address(this), "SELF_AIRDROP");
        require(to != address(0), "ZERO_ADDRESS");
        require(amount <= balanceOf(address(this)), "BALANCE_NOT_ENOUGH");

        _transfer(address(this), to, amount);
    }
}