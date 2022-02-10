// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


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
    

    Counters.Counter private _tokenId; 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BASEURI_ROLE = keccak256("BASEURI_ROLE");
    uint256 public constant _totalWishes = 10000; 
    uint256 public constant _maxPurchaseAllowed = 20; 

<<<<<<< Updated upstream
=======
    //pricing
    uint256 constant PRICE = 31424425476017000;
    uint256 public constant maxSupply = 10000; 
    uint256 public constant maxPurchaseAllowed = 5;
    
    //balances
>>>>>>> Stashed changes
    mapping(address => uint256)public balances;
    string  __name = "MyWish";
    string _baseURIextended = 'WE NEED IPFS';
    
    //Add mapping token URIs


<<<<<<< Updated upstream
    constructor() ERC721("MyWish","WSH") {
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
=======
    constructor() 
    ERC721("MyWish","WSH")
    {
         _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
  
>>>>>>> Stashed changes
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

    function createCollectable(address to) public onlyRole(MINTER_ROLE)  returns(bool) {
        require(totalSupply() < _totalWishes, "Sale is over, all collectables sold."); //Might not need this one
        require(balances[to] < _maxPurchaseAllowed,"too many tokens requested");
        safeMint(to, _tokenId.current());
        bool success = ownerOf(_tokenId.current()) == to;
        _tokenId.increment();
        return success; 
    }

    function safeMint(address to, uint256 tokenId) private {
        _safeMint(to, tokenId);
    }


    function _beforeTokenTransfer(address from, address to, uint256 tokenId) 
        internal 
        override( ERC721Enumerable) {

        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override( ERC721Enumerable, AccessControl) 
        returns (bool) {

        return super.supportsInterface(interfaceId);
    }

    
    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }


<<<<<<< Updated upstream
    function setMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(minter != address(0),"Please Enter Valid Address");
        grantRole(MINTER_ROLE,minter);
=======
    function setContractState(uint state) public onlyRole(DEFAULT_ADMIN_ROLE) returns(bool) {
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
>>>>>>> Stashed changes
       
    }
  
    function getRole() public onlyRole(MINTER_ROLE) view  returns(bool) {
       
        return true;
    }


} 




