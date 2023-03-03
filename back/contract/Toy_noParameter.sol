// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Toy_noParameter {
    uint private number;
    string private message;

    constructor() {
        message = "Toy_noParameter";
    }

    function getNumber() public view returns(uint) {
        return number;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }

    function setNumber(uint _newNumber) public {
        number = _newNumber;
    }
}