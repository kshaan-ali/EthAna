// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract TokenFactory is Ownable {
    // Mapping to keep track of created ERC20 tokens
    address[] public userERC20Tokens;

    // Mapping to keep track of created ERC721 tokens
    address[] public userERC721Tokens;

    // ERC20 token contract
    
    constructor()Ownable(msg.sender) {

    }
    // Function to create an ERC20 token
    function createERC20(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public {
        CustomERC20 newToken = new CustomERC20(msg.sender,name, symbol, initialSupply);
        //newToken.transferOwnership(msg.sender);
        userERC20Tokens.push(address(newToken));
    }

    // Function to create an ERC721 token
    function createERC721(string memory name, string memory symbol,string memory _uri) public {
        CustomERC721 newNFT = new CustomERC721(msg.sender,name, symbol,_uri);
        //newNFT.transferOwnership(msg.sender);
        userERC721Tokens.push(address(newNFT));
    }
    // function mintNfts(address _erc721Addr,string memory _uri) public {
    //     CustomERC721(_erc721Addr).safeMint(msg.sender,_uri);
    // }

    // Get created ERC20 tokens by a user
    function getUserERC20Tokens() public view returns (uint ) {
        return userERC20Tokens.length;
    }
    function getUserERC721Tokens() public view returns (uint ) {
        return userERC721Tokens.length;
    }

    // // Get created ERC721 tokens by a user
    // function getUserERC721Tokens(address user) public view returns (address[] memory) {
    //     return userERC721Tokens[user];
    // }
}
contract CustomERC20 is ERC20, Ownable {
        constructor(address _owner,string memory name,string memory symbol,uint _amount)
        ERC20(name, symbol)
        Ownable(_owner)
    {_mint(owner(), _amount);}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    }

    // ERC721 token contract
    contract CustomERC721 is ERC721,ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

    constructor(address _owner,string memory name,string memory symbol,string memory _uri)
        ERC721(name, symbol)
        Ownable(_owner)
    {   uint256 tokenId = _nextTokenId++;
        _safeMint(_owner, tokenId);
        _setTokenURI(tokenId, _uri);
    
    }
    
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    }