//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyWish.sol";

//Need to set up ownable for contract
//Need to create reserve function

contract PaymentHandler is PaymentSplitter {

    mapping(address => uint256) balances;
    uint256 constant PRICE = 3000000000000000000 wei;
    event fundsAccepted(address from);

    
    /*
        Need to add values to the following variables
    */
    MyWish _myWishContract; 
    address payable _Seb = payable(address(30));
    address payable _Zach = payable(address(10));
    address payable _Evan = payable(address(16)); 
    address payable _MakeAWish = payable(address(20));  

    //Make Shares out of 100
    uint256 _SebShares = 2;
    uint256 _ZachShares = 2;
    uint256 _EvanShares = 6;
    uint256 _MakeAWishShares = 90;

    // address[] payees = [_Seb, _Zach, _Evan, _MakeAWish];
    uint256[] shares_ = [_SebShares, _ZachShares, _EvanShares, _MakeAWishShares];

    event tokenMintedEvent(address beneficiary,string tokenParams);

    constructor(address tokenAddress,address[] memory payees) PaymentSplitter(payees, shares_) {
        _myWishContract = MyWish(tokenAddress);
    }


    function buyToken(
        address beneficiary,
        string calldata tokenParams
    )
    public
    payable
    {
        require(msg.value > 0 , "Zero Funds Sent Error");
        require(msg.value > PRICE,"Not Enough Funds Sent Error");
        require(beneficiary != address(0),"Invalid Address");
    
        // validateTokenParams(tokenParams);
        bool success = processPurchase(beneficiary, tokenParams);
        require(success,"Token Not Minted Error");
        releaseEther();

    }

    function getTokenAddress() external view returns(address) {
        return address(_myWishContract);
    }

    //does this return the total balance in the contract? 
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

    // function setPayees(uint name, address payable _address) onlyOwner  public {
    //     uint Seb = 0; 
    //     uint Zach = 1; 
    //     uint Evan = 2; 
    //     uint MakeAWish = 3; 

    //     require(name >= 0 && name <=3, "Payee Not Found");
    //     require(_address != address(0),"Incorrect Address");

    //     if (Seb == name) 
    //         _Seb = _address; 
    //     else if (Zach == name)
    //         _Zach = _address; 
    //     else if (Evan == name)
    //         _Evan = _address; 
    //     else if (MakeAWish == name)
    //         _MakeAWish = _address; 

    // }

    function processPurchase(address beneficiary, string calldata tokenParams) internal returns(bool) {

        bool success = _myWishContract.createCollectable(beneficiary,tokenParams);
        require(success,"Token Contract Did Not Mint Token");
        emit tokenMintedEvent(beneficiary, tokenParams);
        return success == true;
    }

    // function getPayees(uint name) public view returns (address) {
    //     uint Seb = 0; 
    //     uint Zach = 1; 
    //     uint Evan = 2; 
    //     uint MakeAWish = 3; 

    //     require(name >= 0 && name <=3, "Payee Not Found");
    //     if (Seb == name) 
    //         return _Seb;
    //     else if (Zach == name)
    //         return _Zach;
    //     else if (Evan == name)
    //         return _Evan;
    //     else if (MakeAWish == name)
    //         return _MakeAWish;


    // }
    



}
