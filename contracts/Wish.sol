// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";




/*
* If we are using a .py Script
*/ 

contract MyWish is ERC721Enumerable, ERC721URIStorage, Ownable {
    
    using Counters for Counters.Counter; 
    using SafeMath for uint256; 
    

    Counters.Counter private _tokenId; 

    uint256 public constant _totalWishes = 10000; 
    bool internal saleIsActive = false; 
    uint256 public constant _maxPurchaseAllowed = 20; 
    uint256 public constant _wishPrice = 30000000000000000; //.03 ETH


    //Add mapping token URIs
    //Test this need to deploy a test net



    constructor() ERC721("MyWish","WSH") {}

    function createCollectable(uint numberOfTokensMinted) public payable {
        require(saleIsActive, "Sale is no longer active");
        require(totalSupply() < _totalWishes, "Sale is over, all collectables sold."); //Might not need this one
        require(numberOfTokensMinted > 0, "You cannot mint 0 collectables."); 
        require(numberOfTokensMinted <= _maxPurchaseAllowed, "You are trying to buy to many collectables.");
        require(SafeMath.add(totalSupply(), numberOfTokensMinted) <= _totalWishes, "Sale is almost over, wishes are running low. Please purchase less wishes.");
        
        for (uint i = 0; i < numberOfTokensMinted; i++) {
            
            _safeMint(msg.sender, _tokenId.current());
            _tokenId.increment();
        }
    }

    function flipStateOfSale() public view onlyOwner { //not sure if I need view
        saleIsActive != saleIsActive; 
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) 
        internal 
        override(ERC721, ERC721Enumerable) {

        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721Enumerable) 
        returns (bool) {

        return super.supportsInterface(interfaceId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenUri) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
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
} 




