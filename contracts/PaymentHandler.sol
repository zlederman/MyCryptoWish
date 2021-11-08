//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./MyWish.sol";

//Need to set up ownable for contract
//Need to create reserve function

contract PaymentHandler is AccessControl, PaymentSplitter, VRFConsumerBase {

    using Counters for Counters.Counter; 

    enum ContractState{PRESALE,RAFFLE,PREMINT,MINTING,OPEN}
    ContractState contractState;
    bytes32 public constant STATE_MANAGER_ROLE = keccak256("STATE_MANAGER_ROLE");
    uint256 public randomnessOutput;
    bytes32 public requestId;

    IERC20 public immutable LINK_TOKEN;
    bytes32 internal immutable KEY_HASH;
    

    uint16 immutable zachIndex = 0;
    uint16 immutable evanIndex = 2;
    uint16 immutable sebIndex = 1;
    uint16 immutable wishIndex = 3;
    uint256 immutable PRICE = 30000000000000000 wei;
    uint64 immutable TOKEN_CAP = 10000;
    uint16 immutable USER_TOKEN_CAP = 90;

    bool raffleIsShuffled = false;
    bool entropySet = false;

    Counters.Counter private raffleCount;       

    MyWish _myWishContract;

    uint16 sebShares = 2;
    uint16 zachShares = 2;
    uint16 evanShares = 6;
    uint16 makeAWishShares = 90;
    uint256 entropy;

    address makeAWish = address(0);
    uint256[] shares_ = [sebShares, zachShares, evanShares, makeAWishShares];

    mapping(address => uint16) tokensPerUser;
    mapping(uint16 => bool) ticketsClaimed;
    address[] raffleEntries;
    
    event fundsAccepted(address from);
    event enteredRaffle(address from ,uint16 numTokens,uint256 lastIndex);
    event raffleShuffled(uint256 totalEntries);
    event ticketsRedeemed(address user, uint16 winningTicketCount);
    event tokensPurchased(address user, uint16 tokensPurchased);

    constructor(
        address tokenAddress,
        address[] memory payees,
        bytes32 _LINK_KEY_HASH,
        address _LINK_ADDRESS,
        address _LINK_VRF_COORDINATOR_ADDRESS
       ) 
       PaymentSplitter(payees, shares_)
       VRFConsumerBase(_LINK_VRF_COORDINATOR_ADDRESS, _LINK_ADDRESS)
    {
        LINK_TOKEN = IERC20(_LINK_ADDRESS);
        KEY_HASH = _LINK_KEY_HASH;
        _myWishContract = MyWish(tokenAddress);
        makeAWish = payees[3];
        contractState = ContractState.RAFFLE;
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _setRoleAdmin(STATE_MANAGER_ROLE, DEFAULT_ADMIN_ROLE);

    }

    function enterRaffle(uint16 numTokens)
    public
    {
        require(contractState == ContractState.RAFFLE, "Raffle is not active");
        require(numTokens + raffleCount.current() < TOKEN_CAP,"Please request fewer tokens");
        require(tokensPerUser[msg.sender] + numTokens < USER_TOKEN_CAP,"Please request fewer tokens");
      
        tokensPerUser[msg.sender] = numTokens;
        for(uint i = 0; i < numTokens; i++){
            raffleEntries.push(msg.sender);
            raffleCount.increment();
           
        }
        
        emit enteredRaffle(msg.sender, tokensPerUser[msg.sender],raffleCount.current());

    }
    
    function shuffleEntries() public {
        require(contractState == ContractState.PREMINT,"Raffle Is Still Active");
        require(raffleCount.current() > TOKEN_CAP,"No need to shuffle");
        require(entropySet, "No randomness to shuffle with");

        for (uint256 i = 0; i < raffleCount.current(); i++) {
            // Generate a random index to select from
            uint256 randomIndex = i + entropy % (raffleCount.current() - i);
            // Collect the value at that random index
            address randomTmp = raffleEntries[randomIndex];
            // Update the value at the random index to the current value
            raffleEntries[randomIndex] = raffleEntries[i];
            // Update the current value to the value at the random index
            raffleEntries[i] = randomTmp;
        }

        raffleIsShuffled = true;
        emit raffleShuffled(raffleEntries.length);

    }

    function setEntropy() public {
        
        require(contractState == ContractState.PREMINT,'raffle is still active');
        require(!entropySet,'Entropy is already set, no need');
        
        requestRandomness(KEY_HASH, 2e18);

    }

    function buyTokens(uint numTokens) payable public {
        require(numTokens * PRICE == msg.value,"Incorrect Amount Submitted");

        bool success = _myWishContract.createCollectable(msg.sender);
        emit tokensPurchased(msg.sender, numTokens);
    }


    function isWinner(uint16[] calldata tickets) public { 
        require(contractState == ContractState.MINTING ,"Minting state needs to be active");
        require(raffleEntries.length > TOKEN_CAP, "Everybody is a winner");
        if(raffleEntries.length > TOKEN_CAP) {
            require(raffleIsShuffled,"please shuffle winners before minting");
        }

        uint16 winningTicketCount = 0;
        for(uint i = 0; i < tickets.length; i++){
            require(tickets[i] < raffleEntries.length,"Not a valid ticket");
            require(!ticketsClaimed[tickets[i]],"Tickets have already been claimed");
            require(raffleEntries[tickets[i]] == msg.sender, "Not the owner of these tickets");
            ticketsClaimed[tickets[i]] = true;
            if(tickets[i] < TOKEN_CAP){
                winningTicketCount += 1;
            }
     
        }
        if(winningTicketCount < tickets.length){
            tokensPerUser[msg.sender] = winningTicketCount;
        }
        emit ticketsRedeemed(msg.sender, winningTicketCount);

    }
    

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        require(raffleEntries.length > TOKEN_CAP, "No need to shuffle addresses");
        require(!entropySet,"entropy already set");
        entropy = randomness;
        entropySet = true;
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


    function getContractState() public view returns(ContractState) {
        return contractState;
    }

    function setContractState(uint state) public onlyRole(STATE_MANAGER_ROLE) returns(bool) {
        require(state < 6,"Not a proper state");
        require(state > 0, "Not a proper state");
        require(state  == uint(contractState) + 1, "Not a proper state transition");
        if(state == 3){
            //premint stage needs to be shuffled
            setEntropy();

        }
        contractState = ContractState(state);
        return true;

    }

        function setStateManagerRole(address stateManager) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(minter != address(0),"Please Enter Valid Address");
        grantRole(STATE_MANAGER_ROLE,minter);
       
    }








}
