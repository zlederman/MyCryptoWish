//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "./MyWish.sol";

//Need to set up ownable for contract
//Need to create reserve function

contract PaymentHandler is PaymentSplitter{

    using Counters for Counters.Counter; 

    uint16 immutable zachIndex = 0;
    uint16 immutable evanIndex = 2;
    uint16 immutable sebIndex = 1;
    uint16 immutable wishIndex = 3;

    uint256 immutable PRICE = 3000000000000000000 wei;
    uint64 immutable TOKEN_CAP = 10000;
    uint16 immutable USER_TOKEN_CAP = 5;

    bool raffleIsActive = true;
    bool saleIsActive = true;
    bool entropySet = false;

    Counters.Counter private raffleCount;       

    MyWish _myWishContract;

    //Make Shares out of 100
    uint16 sebShares = 2;
    uint16 zachShares = 2;
    uint16 evanShares = 6;
    uint16 makeAWishShares = 90;
    uint256 entropy;

    address makeAWish = address(0);
    uint256[] shares_ = [sebShares, zachShares, evanShares, makeAWishShares];

    mapping(address => uint16) tokensPerUser;
    address[] raffleEntries;
    
    event fundsAccepted(address from);
    event enteredRaffle(address from ,uint16 numTokens);
    event raffleShuffled(uint256 totalEntries);

    constructor(address tokenAddress,address[] memory payees) PaymentSplitter(payees, shares_) {
        _myWishContract = MyWish(tokenAddress);
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

        bool success = _myWishContract.createCollectable(msg.sender);
        require(success,"Token Not Minted Error");
        releaseEther();

    }



    function enterRaffle(uint16 numTokens)
    public 
    payable
    {
        require(raffleIsActive, "Raffle is not active");
        require(msg.value == numTokens * PRICE,"Not enough ETH sent");
        require(numTokens + raffleCount.current() < TOKEN_CAP,"Please request fewer tokens");
        require(tokensPerUser[msg.sender] + numTokens < USER_TOKEN_CAP,"Please request fewer tokens");

        tokensPerUser[msg.sender] += numTokens;
        for(uint i = 0; i < numTokens; i++){
            raffleCount.increment();
        }
        raffleEntries.push(msg.sender);
        emit enteredRaffle(msg.sender, numTokens);

    }
    
    function shuffleEntries() public {
        require(!raffleIsActive,"Raffle Is Still Active");
        require(raffleEntries.length > TOKEN_CAP,"No need to shuffle");
        require(entropySet, "No randomness to shuffle with");

        for (uint256 i = 0; i < raffleEntries.length; i++) {
            // Generate a random index to select from
            uint256 randomIndex = i + entropy % (raffleEntries.length - i);
            // Collect the value at that random index
            address randomTmp = raffleEntries[randomIndex];
            // Update the value at the random index to the current value
            raffleEntries[randomIndex] = raffleEntries[i];
            // Update the current value to the value at the random index
            raffleEntries[i] = randomTmp;
        }
        emit raffleShuffled(raffleEntries.length);

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




    function getTokensRequested(address user) public view returns(uint16) {
        require(user != address(0),"invalid address");
        require(tokensPerUser[user] > 0, "No Tokens Requested");
        
        return tokensPerUser[user];
    }

    function getPrice() public pure returns(uint256){
        return PRICE;
    }






}
