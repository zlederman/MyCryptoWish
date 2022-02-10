// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract MyWish is AccessControl, ERC721Enumerable{
    
    //counters 
    using Counters for Counters.Counter; 
    using SafeMath for uint256; 
    using ECDSA for bytes32;
    //signatures

    address whiteListManagerAddr;
    address mintManagerAddr;
    address payable beneficiaryAddress = payable(0); //temporary
    //contract state enum
    enum ContractState {
        PRESALE,
        RAFFLE,
        PREMINT,
        MINTING,
        OPEN
    }
    ContractState contractState;

  
    //events
    event contractStateChanged(ContractState from, ContractState to);
    event tokensPurchased(uint numTokens, address buyer);

    Counters.Counter private _tokenId; 

    //roles
    bytes32 public constant STATE_MANAGER_ROLE = keccak256("STATE_MANAGER_ROLE");
    bytes32 public constant BASEURI_ROLE = keccak256("BASEURI_ROLE");
    bytes32 public constant WHITELIST_ROLE = keccak256("WHITELIST_ROLE");

    //pricing
    uint256 constant PRICE = 0.03 ether;
    uint256 public constant maxSupply = 10000; 
    uint256 public constant maxPurchaseAllowed = 5;
    
    //balances
    mapping(address => uint256)public balances;


    string  __name = "MyWish";
    string _baseURIextended = 'WE NEED IPFS';
    


    constructor(address whiteLister) 
    ERC721("MyWish","WSH")
    {
     
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _setRoleAdmin(BASEURI_ROLE,DEFAULT_ADMIN_ROLE);
        whiteListManagerAddr = whiteLister;

    }
    
    function setBaseURI(string memory baseURI_) external onlyRole(DEFAULT_ADMIN_ROLE) {
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
          require(_verify(data, sig, mintManagerAddr),"Data not signed by mintManager");
          require(verifyData(data, numTokens,  msg.sender, nonce),"sig data is invalid");
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


    // function _beforeTokenTransfer(address from, address to, uint256 tokenId) 
    //     internal 
    //     override( ERC721Enumerable) {

    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override( ERC721Enumerable, AccessControl) 
        returns (bool) {

        return super.supportsInterface(interfaceId);
    }

    
    // function _burn(uint256 tokenId) internal override(ERC721) {
    //     super._burn(tokenId);
    // }


    function getPrice() public pure returns(uint256){
        return PRICE;
    }
    function _verify(bytes32 data, bytes memory signature, address account) internal pure returns (bool) {
        return data
            .toEthSignedMessageHash()
            .recover(signature) == account;
    }

    
    function whiteListMint(bytes memory sig, bytes32 data,uint numTokens, bytes32 nonce) public payable  {
        require(_verify(data, sig, whiteListManagerAddr),"Data not signed by whitelistManager");
        require(verifyData(data, numTokens, msg.sender, nonce), "Data type not valid for whitelist");

        createCollectable(numTokens);

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

    function setWhiteListManagerRole(address stateManager) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(whiteListManagerAddr != address(0),"Please Enter Valid Address");
        grantRole(WHITELIST_ROLE,stateManager);
       
    }



} 




