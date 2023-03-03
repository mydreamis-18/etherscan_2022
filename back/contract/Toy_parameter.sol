// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Toy_parameter {
    string private message;

    constructor(string memory _message) {
        message = _message;
    }

    function getMessage() public view returns(string memory) {
        return message;
    }
}