// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyCollectible is ERC721EnumerableUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter public groupIds;
    uint256 _groupStartPointer;

    mapping (uint => address) public creatorOf;
    mapping (uint => uint) public groupOf;
    mapping (uint => string) private _groupURI;
    mapping (uint => uint) public groupStart;
    mapping (uint => uint) public groupCurrentSupply;
    mapping (uint => uint) public groupMaxSupply;

    function initialize() initializer public {
        __ERC721_init("Loser Collectible", "LOWC");
        OwnableUpgradeable.__Ownable_init();
    }

    function publish(address to, uint256 maxSupply, string memory _tokenURI)
        public onlyOwner
        returns (uint256)
    {
        groupIds.increment();
        uint256 newItemId = groupIds.current();
        uint256 startId = _groupStartPointer + 1;
        groupStart[newItemId] = startId;
        groupMaxSupply[newItemId] = maxSupply;
        _groupURI[newItemId] = _tokenURI;
        creatorOf[newItemId] = to;
        _groupStartPointer += maxSupply;

        _mint(to, startId);
        groupOf[startId] = newItemId;
        groupCurrentSupply[newItemId] = 1;
        return newItemId;
    }

    function claim(address to, uint256 groupId)
        public 
        returns (uint256)
    {
        require(groupCurrentSupply[groupId] < groupMaxSupply[groupId], "All tokens of this group has been minted.");
        uint256 startId = groupStart[groupId];
        require(ownerOf(startId) == msg.sender || getApproved(startId) == msg.sender, "You don't have the access to mint this token.");
        uint256 newtokenId = startId + groupCurrentSupply[groupId];

        _mint(to, newtokenId);
        groupOf[newtokenId] = groupId;
        groupCurrentSupply[groupId] += 1;
        return newtokenId;
    }

    function tokenURI(uint256 tokenId)
        public view override
        returns (string memory)
    {
        uint256 groupId = groupOf[tokenId];
        return _groupURI[groupId];
    }
}