// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract MyWish is ERC721 ,ERC721URIStorage, VRFConsumerBase {

    enum Rarity{
        Common,
        Uncommon,
        Rare,
        SuperRare
    }
    /*
        Chainlink vars
    */
    uint256 public tokenCounter;
    bytes32 internal keyhash;
    uint256 internal fee;
    uint256 internal randomResult;
    /*
        Assigning wish rarity
    */
    uint8 internal uncommonRarity;
    uint8 internal commonRarity;
    uint8 internal rareRarity;
    uint8 internal superRareRarity;

    mapping(bytes32 => address) public requestIdToSender;
    mapping(string => int) public rarityToDropRate;
    mapping(bytes32 => string) public requestIdToTokenUri;
    mapping(bytes32 => uint256) public requestIdToTokenId; 
    mapping(uint256 => Rarity) public tokenIdToRarity;

    event requestedCollectible(bytes32 indexed requestId);
    
    constructor(address _VRFCoordinator, address _linkToken, bytes32 _keyhash)
    public
    VRFConsumerBase(_VRFCoordinator, _linkToken)
    ERC721("MyWish","WSH") {

        tokenCounter = 0;
        keyhash = _keyhash;
        fee = 0.1 * 10 ** 18;


        rarityToDropRate[enumToString(Rarity.Common)] = 45;
        rarityToDropRate[enumToString(Rarity.Uncommon)] = 35;
        rarityToDropRate[enumToString(Rarity.Rare)] = 15;
        rarityToDropRate[enumToString(Rarity.SuperRare)] = 5;


    }

    function createCollectable(string memory tokenURI)
    public returns (bytes32) {
        tokenCounter += 1;
        bytes32 requestId = requestRandomness(keyhash, fee);
        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenUri[requestId] = tokenURI;
        emit requestedCollectible(requestId);
    }

    function enumToString(Rarity rarity)
    private pure returns (string memory){
        if(rarity == Rarity.Common){
            return "Common";
        }
        if(rarity == Rarity.Uncommon){
            return "Uncommon";
        }
        if(rarity == Rarity.Rare){
            return "Rare";
        }
        if(rarity == Rarity.SuperRare){
            return "SuperRare";
        }
    }

    

    function fulfillRandomness(bytes32 requestId, uint256 randomResult)
    internal override {
        int randomVal = int(randomResult % 100);
        address wishOwner = requestIdToSender[requestId];
        string memory tokenUri = requestIdToTokenUri[requestId];
        uint256 newWishId = tokenCounter;
        _safeMint(wishOwner, newWishId);
        setTokenURI(newWishId,tokenUri);
        Rarity rarity = Rarity.Common;

        while(randomVal < rarityToDropRate[enumToString(rarity)]) {
            randomVal -= rarityToDropRate[enumToString(rarity)];
            rarity = Rarity(uint(rarity) + 1);
        }
        tokenIdToRarity[newWishId] = rarity;
        tokenCounter += 1;
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


