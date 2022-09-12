//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    //the owner can toggle this to allow minting
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    //we're not gonna code withdraw functionality
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        //we start with a zero
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        //set withdraw wallet address here
        //he doesn't do it, you have to
    }

    //owner is set as msg.sender by default by openzeppelin's Ownable.sol contract
    function setIsPublicMintEnabled(bool _isPublidMintEnabled)
        external
        onlyOwner
    {}
}
