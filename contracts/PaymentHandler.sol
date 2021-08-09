//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";
contract PaymentHandler{

    mapping(address => uint256) balances;
    uint256 constant PRICE = 3 ether;
    event fundsAccepted(address from);

    function sendEther() public payable{
        require(msg.value > 0 , "Zero Funds Sent Error");
        if(msg.value < PRICE){
            revert();
        }
        balances[msg.sender] += msg.value;
        emit fundsAccepted(msg.sender);
    }

    function getBalanceOfPaymentHandler()
    external
    view
    returns(uint256){
        return address(this).balance;
    }

    function getPrice() 
    external pure
    returns (uint256){
        return PRICE;
    }
}