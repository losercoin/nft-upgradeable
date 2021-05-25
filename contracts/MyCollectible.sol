// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyCollectible is ERC721URIStorageUpgradeable, ERC721EnumerableUpgradeable, OwnableUpgradeable {

    mapping (uint => address) public creatorOf;

    function initialize() initializer public {
        __ERC721_init("Loser Collectible", "Lowc");
        OwnableUpgradeable.__Ownable_init();
    }

    function awardItem(address to, string memory _tokenURI)
        public onlyOwner
        returns (uint256)
    {

        uint256 itemId = uint(keccak256(abi.encodePacked(_tokenURI)));
        _mint(to, itemId);
        _setTokenURI(itemId, _tokenURI);

        creatorOf[itemId] = to;

        return itemId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721Upgradeable, ERC721URIStorageUpgradeable) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}