// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";





/*
* If we are using a .py Script
*/ 

contract MyWish is ERC721Enumerable, ERC721URIStorage, AccessControl {
    
    using Counters for Counters.Counter; 
    using SafeMath for uint256; 
    

    Counters.Counter private _tokenId; 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant _totalWishes = 10000; 
    bool internal saleIsActive = false; 
    uint256 public constant _maxPurchaseAllowed = 20; 


    mapping(address => uint256)public getTokenId;
    mapping(address => uint256)public balances;
    mapping(string => string)public URIS;
    string  __name = "MyWish";
    //Add mapping token URIs
    //Test this need to deploy a test net\usepackage{graphicx}



    constructor() ERC721("MyWish","WSH") {
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);

        
    }

    function createCollectable(address to, string calldata tokenParams) public  returns(bool) {
        require(saleIsActive, "Sale is no longer active");
        require(totalSupply() < _totalWishes, "Sale is over, all collectables sold."); //Might not need this one
        require(SafeMath.add(totalSupply(), 1) <= _totalWishes, "Sale is almost over, wishes are running low. Please purchase less wishes.");
        
        safeMint(to, _tokenId.current());
        
        setTokenURI(_tokenId.current(), URIS[tokenParams],to);

        _tokenId.increment();
        return true;
        
    }

    function safeMint(address to, uint256 tokenId) private {
        _safeMint(to, tokenId);
        getTokenId[to] = tokenId;
        balances[to] += 1;

    }

    // function flipStateOfSale() public view onlyOwner { //not sure if I need view
    //     saleIsActive != saleIsActive; 
    // }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) 
        internal 
        override(ERC721, ERC721Enumerable) {

        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721Enumerable, AccessControl) 
        returns (bool) {

        return super.supportsInterface(interfaceId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenUri, address to) public {
        require(
            _isApprovedOrOwner(to, tokenId),
            "You are not approved or the owner."
        );
        _setTokenURI(tokenId,_tokenUri);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    

    function setMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) returns(bool) {
        require(minter != address(0),"Please Enter Valid Address");
    
        return hasRole(MINTER_ROLE,minter);
       
    }
  
    function getName_TEST(address minter) public view  returns(bytes32) {
        
        return bytes32(0);
    }

    function setURIMapping(string calldata tokenString, string calldata URI) public {
        URIS[tokenString] = URI;
    }

} 




