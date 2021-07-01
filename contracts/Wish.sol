pragma solidity ^0.8.0;

import 'client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MyWish is ERC721 {

    uint16 private rarity;

    constructor() ERC721("MyWish","MW"){

    }

    
}


