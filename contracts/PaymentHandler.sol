//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "./MyWish.sol";

//Need to set up ownable for contract
//Need to create reserve function

contract PaymentHandler is PaymentSplitter {

    mapping(address => uint256) balances;
    uint256 constant PRICE = 3000000000000000000 wei;
    event fundsAccepted(address from);
    uint256 totalSales;
    bool saleIsActive = true;
    
    /*
        Need to add values to the following variables
    */
    MyWish _myWishContract;

    uint16 zachIndex = 0;
    uint16 evanIndex = 2;
    uint16 sebIndex = 1;
    uint16 wishIndex = 3;

    //Make Shares out of 100
    uint16 _SebShares = 2;
    uint16 _ZachShares = 2;
    uint16 _EvanShares = 6;
    uint16 _MakeAWishShares = 90;
    address makeAWish = address(0);

    uint256[] shares_ = [_SebShares, _ZachShares, _EvanShares, _MakeAWishShares];


    constructor(address tokenAddress,address[] memory payees) PaymentSplitter(payees, shares_) {
        _myWishContract = MyWish(tokenAddress);
        totalSales = 0;
        makeAWish = payees[3];
    }


    function buyToken()
    public
    payable
    {
        require(saleIsActive,"Sale is not active!");
        require(msg.value > 0 , "Zero Funds Sent Error");
        require(msg.value == PRICE,"Value Sent Error");
        require(msg.sender != address(0),"Invalid Address");

        bool success = processPurchase(msg.sender);
        require(success,"Token Not Minted Error");
        releaseEther();
        totalSales +=1;


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
        address payable zach = payable(payee(zachIndex));
        address payable evan = payable(payee(evanIndex));
        address payable seb = payable(payee(sebIndex));
        address payable wish = payable(payee(wishIndex));

        require(seb !=  address(0), "Address of Seb is not set");
        require(zach != address(0), "Address of Zach is not set");
        require(evan != address(0), "Address of Evan is not set");
        require(wish != address(0), "Address of Make A Wish is not set");
        
        release(zach);
        release(wish); 
        release(evan); 
        release(seb);
    }


    function processPurchase(address beneficiary) internal returns(bool) {

        bool success = _myWishContract.createCollectable(beneficiary);
        require(success,"Token Contract Did Not Mint Token");

        return success == true;
    }

    function getTotalSales() public view returns (uint256) {
            return totalSales;
    }





}
