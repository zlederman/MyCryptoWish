//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


//Need to set up ownable for contract
//Need to create reserve function

contract PaymentHandler is PaymentSplitter, Ownable{

    mapping(address => uint256) balances;
    uint256 constant PRICE = 3 ether;
    event fundsAccepted(address from);
     
    
    /*
        Need to add values to the following variables
    */

    address payable _Seb;
    address payable _Zach;
    address payable _Evan;
    address payable _MakeAWish;

    //Make Shares out of 100
    uint256 _SebShares = 2;
    uint256 _ZachShares = 2;
    uint256 _EvanShares = 6;
    uint256 _MakeAWishShares = 90;

    address [] payees = [_Seb, _Zach, _Evan, _MakeAWish];
    uint256[] shares_ = [_SebShares, _ZachShares, _EvanShares, _MakeAWishShares];

    constructor() PaymentSplitter(payees, shares_) {}


    //does this put the money into the constract? 
    function sendEther() public payable{
        require(msg.value > 0 , "Zero Funds Sent Error");
        if(msg.value < PRICE){ //cant we just require this
            revert();
        }
        balances[msg.sender] += msg.value;
        emit fundsAccepted(msg.sender);
    }

    //does this return the total balance in the contract? 
    function getBalanceOfPaymentHandler()
    external
    view
    returns(uint256){
        return address(this).balance;
    }

    //function 
    //pass in address of our wallets and MWF's wallet 
    //sends ether to those addresses
    //emits an event saying "PAID" or something

    function getPrice() 
    external pure
    returns (uint256){
        return PRICE;
    }
  
    function releaseEther() internal {
        require(_Seb !=  address(0), "Address of Seb is not set");
        require(_Zach != address(0), "Address of Zach is not set");
        require(_Evan != address(0), "Address of Evan is not set");
        require(_MakeAWish != address(0), "Address of Make A Wish is not set");
        
        release(_Seb);
        release(_Zach); 
        release(_Evan); 
        release(_MakeAWish);
    }

    function setAddresses(uint name, address payable _address) public {
        uint Seb = 0; 
        uint Zach = 1; 
        uint Evan = 2; 
        uint MakeAWish = 3; 
        //keccak256(bytes(a)) == keccak256(bytes(b));

        if (Seb == name) 
            _Seb = _address; 
        else if (Zach == name)
            _Zach = _address; 
        else if (Evan == name)
            _Evan = _address; 
        else if (MakeAWish == name)
            _MakeAWish = _address; 

    }
}
