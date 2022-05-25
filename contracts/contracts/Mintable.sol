// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface Mintable {


    function maximumSupply() external view virtual returns (uint256);
    function mint(uint256 amount) external virtual payable;
}