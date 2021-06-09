// test/MyCollectible.proxy.test.js
// Load dependencies
const { expect } = require('chai');
const { deployProxy, upgradeProxy} = require('@openzeppelin/truffle-upgrades');
 
// Load compiled artifacts
const MyCollectible = artifacts.require('MyCollectible');
 
// Start test block
contract('MyCollectible (proxy)', async accounts => {
 
  beforeEach(async function () {
    // Deploy a new MyCollectible contract for each test
    this.myCollectible = await deployProxy(MyCollectible, [], {initializer: 'initialize'});
    // award an item to someone
    await this.myCollectible.addSerial(3, 10)
    await this.myCollectible.publish(accounts[0], 1, 2, "https://ipfs.io/ipfs/QmQax9La6KjbFp4qbjwL2ucYCazZcVr9jSYuhrqgsDMpwb", 0)
    await this.myCollectible.publish(accounts[0], 1, 5, "https://ipfs.io/ipfs/QmeZo1a7hQXTCf6Zhw7SbxzcMoP49LbfBxUCT1oHXHnWxo", 500)
  });

  // Test case
  it('name returns the name of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.name()).to.equal('Loser NFT');
  });

  it('symbol returns the symbol of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.symbol()).to.equal('LOWX');
  });

  it('ownerOf returns the onwer address of the item', async function () {
    let owner = await this.myCollectible.ownerOf(1)
    // Test if the returned the address we award to
    expect(owner).to.equal(accounts[0]);
  });

  it('tokenURI returns the uri of the item', async function () {
    let tokenURI = await this.myCollectible.tokenURI(1)
    // Test if the returned the item's uri
    expect(tokenURI).to.equal("https://ipfs.io/ipfs/QmQax9La6KjbFp4qbjwL2ucYCazZcVr9jSYuhrqgsDMpwb");
  });

  it('creatorOf returns the creator address of the item', async function () {
    let creator = await this.myCollectible.creatorOf(1)
    // Test if the returned the item's uri
    expect(creator).to.equal(accounts[0]);
  });

  it('groupCurrentSupply returns 2 after claim a new token', async function () {
    await this.myCollectible.claim(accounts[0], 2)
    let groupCurrentSupply = await this.myCollectible.groupCurrentSupply(2)
    // Test if the returned the group's supply
    expect(groupCurrentSupply.toString()).to.equal('2');
  });

  it('ownerOf returns owner address of item 2 after claiming a new token', async function () {
    await this.myCollectible.claim(accounts[1], 2)
    let owner = await this.myCollectible.ownerOf(4)
    // Test if the returned the address one claim to
    expect(owner).to.equal(accounts[1]);
  });
});