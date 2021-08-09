pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// impogetrt "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleToken is ERC721, ERC721URIStorage {
    mapping(address => uint256)public getTokenId;
    mapping(address => uint256)public balances;
    
    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
        getTokenId[to] = tokenId;
        balances[to] += 1;
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

    function get_token(address reciever) external view returns (uint256){
        return getTokenId[reciever];
    }

    function get_balances(address reciever) external view returns (uint256){
        return balances[reciever];
    }
}