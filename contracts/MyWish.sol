// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


//Mint at gas cost\
//How are they paying
//Need them 
//Get a raffle ticket
//sign with the raffle ticket
//can then pay

//NEED TO CHANGE CONTRACT


contract MyWish is AccessControl, ERC721Enumerable{
    
    using Counters for Counters.Counter; 
    using SafeMath for uint256; 
    using ECDSA for bytes32;
    enum ContractState {
        PRESALE,
        RAFFLE,
        PREMINT,
        MINTING,
        OPEN
    }

    ContractState contractState;
    Counters.Counter private _tokenId; 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BASEURI_ROLE = keccak256("BASEURI_ROLE");
    bytes32 public constant STATE_MANAGER_ROLE = keccak256("STATE_MANAGER_ROLE");
    uint256 public constant _totalWishes = 10000; 
    uint256 public constant _maxPurchaseAllowed = 20; 

    address mintManager = address(0);
    address payable beneficiaryAddress = payable(0);


    //pricing
    uint256 constant PRICE = 31424425476017000;
    uint256 public constant maxSupply = 10000; 
    uint256 public constant maxPurchaseAllowed = 5;
    
    //balances
    mapping(address => uint256)public balances;
    string  __name = "MyWish";
    string _baseURIextended = 'WE NEED IPFS';
    
    //Add mapping token URIs
    event contractStateChanged(ContractState from, ContractState to);
    event tokensPurchased(uint numTokens, address buyer);

    constructor() 
    ERC721("MyWish","WSH")
    {
         _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
  
        // need to set this role up
        _setRoleAdmin(BASEURI_ROLE,DEFAULT_ADMIN_ROLE);
    }
    
    function setBaseURI(string memory baseURI_) external onlyRole(BASEURI_ROLE) {
        _baseURIextended = baseURI_;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = Strings.toString(tokenId);
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, _tokenURI));
    }

     function verifyData(bytes32 data, uint numTokens, address recipient, bytes32 nonce) private view returns(bool) {
        require(data == keccak256(
            abi.encodePacked(
                numTokens,
                recipient,
                nonce,
                address(this)
            )
            )   
        );
        return true;
    }
    function handleMint(uint16 numTokens, bytes memory sig, bytes32 data, bytes32 nonce) public payable {
          require(_verify(data, sig, mintManager),"Data not signed by mintManager");
          require(verifyData(data, numTokens,  msg.sender, nonce),"sig data is invalid");
          createCollectable(numTokens);
    }
    function createCollectable(uint numTokens ) public payable {
        require(contractState == ContractState.MINTING, "Contract Not Minting");
        require(msg.value == PRICE * numTokens,"Not Enough Eth Sent");
        require(balances[msg.sender] + numTokens < maxPurchaseAllowed,"too many tokens already minted");
        
        _safeMint(msg.sender, _tokenId.current());
        bool success = ownerOf(_tokenId.current()) == msg.sender;
        require(success,"Token purchase failure");
        _tokenId.increment();
        emit tokensPurchased(numTokens, msg.sender);
        
    }


    
    function getBalanceOfContract()
    external
    view
    returns(uint256){
        return address(this).balance;
    }




    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override( ERC721Enumerable, AccessControl) 
        returns (bool) {

        return super.supportsInterface(interfaceId);
    }

    


    function getPrice() public pure returns(uint256){
        return PRICE;
    }
    function _verify(bytes32 hash, bytes memory signature, address account) internal pure returns (bool) {
        return hash
            .toEthSignedMessageHash()
            .recover(signature) == account;
    }



    function releaseEther() public  onlyRole(DEFAULT_ADMIN_ROLE) {
        beneficiaryAddress.transfer(address(this).balance);
    }


    function setContractState(uint state) public onlyRole(STATE_MANAGER_ROLE) returns(bool) {
        require(state < 6,"Not a proper state");
        require(state > 0, "Not a proper state");
        require(state  == uint(contractState) + 1, "Not a proper state transition");
        contractState = ContractState(state);
        return true;

    }

    function getContractState() public view returns(uint) {
        return uint(contractState);
    }

    function setStateManagerRole(address stateManager) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(stateManager != address(0),"Please Enter Valid Address");
        grantRole(STATE_MANAGER_ROLE,stateManager);
       
    }





} 