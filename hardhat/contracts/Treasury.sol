// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;

    constructor() Ownable(msg.sender) payable {
        totalFunds = msg.value;
    }
    function addFunds() public payable {
        totalFunds += msg.value;
    }
    function releaseFunds(address _payee, uint256 amount) public onlyOwner {
        payable(_payee).transfer(amount);
    }
}
