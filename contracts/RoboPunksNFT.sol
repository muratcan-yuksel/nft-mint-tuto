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
    //uri of where the images will be located
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
    {
        isPublicMintEnabled = _isPublidMintEnabled;
    }

    function setBaseTokenURI(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    //this tokenURI function already exists in ERC721, we override it because
    //we've defined our own baseTokenURI

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist!");
        //we take the uri that we've identified
        //grab the id and place it behind the uri and add .json to the end
        //so that opensea grabs every single uri of the images
        //get's how your images gets displayed on opensea
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        //the ('') at the end measn we're passing the call without any data
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed");
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, "Public minting is not enabled");
        require(msg.value == mintPrice * _quantity, "Incorrect value sent");
        require(totalSupply + _quantity <= maxSupply, "Sold out");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Max per wallet exceeded"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            //_safeMint exists in ERC721 contract
            _safeMint(msg.sender, newTokenId);
        }
    }
}
