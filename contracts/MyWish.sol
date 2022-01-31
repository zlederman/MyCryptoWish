// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utilities/cryptography/ECDSA.sol";


contract MyWish is AccessControl, ERC721Enumerable, PaymentSplitter {
    
    //counters 
    using Counters for Counters.Counter; 
    using SafeMath for uint256; 
    using ECDSA for bytes32;
    //signatures

    address whiteListManagerAddr;
    address beneficiaryAddress = address(0); //temporary
    //contract state enum
    enum ContractState {
        PRESALE,
        RAFFLE,
        PREMINT,
        MINTING,
        OPEN
    }
    ContractState contractState;
    //paymentsplitting
    uint16 immutable zachIndex = 0;
    uint16 immutable evanIndex = 2;
    uint16 immutable sebIndex = 1;
    uint16 immutable wishIndex = 3;

    uint16 immutable sebShares = 2;
    uint16 immutable zachShares = 2;
    uint16 immutable evanShares = 6;
    uint16 immutable beneficiaryShares = 90;

    uint256[] shares_ = [sebShares, zachShares, evanShares, beneficiaryShares];
    //events
    event contractStateChanged(ContractState from, ContractState to);
    event tokensPurchased(uint16 numTokens, address buyer);

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
    


    constructor() 
    ERC721("MyWish","WSH")
    PaymentSplitter(payees,shares_)
    {
        payees[3] = beneficiaryAddress;
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender);
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

    function createCollectable(uint16 numTokens) public payable {
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

    // function supportsInterface(bytes4 interfaceId) 
    //     public 
    //     view 
    //     override( ERC721Enumerable, AccessControl) 
    //     returns (bool) {

    //     return super.supportsInterface(interfaceId);
    // }

    
    // function _burn(uint256 tokenId) internal override(ERC721) {
    //     super._burn(tokenId);
    // }


    function getPrice() public pure returns(uint256){
        return PRICE;
    }

    function getContractState() public view returns(uint) {
        return uint(contractState);
    }

    function setContractState(uint state) public onlyRole(STATE_MANAGER_ROLE) returns(bool) {
        require(state < 6,"Not a proper state");
        require(state > 0, "Not a proper state");
        require(state  == uint(contractState) + 1, "Not a proper state transition");
        contractState = ContractState(state);
        return true;

    }

    function verify(bytes32 data, address account,bytes32 signature) public pure returns (bool) {
        require(hasRole(account,WHITELIST_ROLE),"account isn't in whitelist role");
        return keccak256(data)
            .toEthSignedMessageHash()
            .recover(signature) == account;
    }

    function whiteListMint(bytes32 sig, bytes32 data,uint numTokens) public payable  {
        require(verify(data, whiteListManagerAddr, sig),"Data not signed by whitelistManager");
        address whitelistee = address(data);
        require(msg.send == whitelistee, "Not the sender of this signed address");
        createCollectable(numTokens);

    }


    function releaseEther() internal {
        address payable zach = payable(payee(zachIndex));
        address payable evan = payable(payee(evanIndex));
        address payable seb = payable(payee(sebIndex));
        address payable wish = payable(payee(beneficiaryIndex));

        require(seb !=  address(0), "Address of Seb is not set");
        require(zach != address(0), "Address of Zach is not set");
        require(evan != address(0), "Address of Evan is not set");
        require(wish != address(0), "Address of Beneficiary is not set");
        
        release(zach);
        release(wish); 
        release(evan); 
        release(seb);
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

    function setURIManagerRole(address stateManager) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(uriManager != address(0),"Please Enter Valid Address");
        grantRole(BASEURI_ROLE,stateManager);
       
    }
    function setWhiteListManagerRole(address stateManager) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(whiteListManager != address(0),"Please Enter Valid Address");
        grantRole(WHITELIST_ROLE,stateManager);
       
    }



} 




