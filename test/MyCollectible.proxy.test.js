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
    await this.myCollectible.awardItem(accounts[0], "https://game.example/item-id-8u5h2m.json")
  });

  // Test case
  it('name returns the name of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.name()).to.equal('MyCollectible');
  });

  it('symbol returns the symbol of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.symbol()).to.equal('MCO');
  });

  it('ownerOf returns the onwer address of the item', async function () {
    let owner = await this.myCollectible.ownerOf(1)
    // Test if the returned the address we award to
    expect(owner).to.equal(accounts[0]);
  });

  it('tokenURI returns the uri of the item', async function () {
    let tokenURI = await this.myCollectible.tokenURI(1)
    // Test if the returned the item's uri
    expect(tokenURI).to.equal("https://game.example/item-id-8u5h2m.json");
  });

  it('creatorOf returns the creator address of the item', async function () {
    let creator = await this.myCollectible.creatorOf(1)
    // Test if the returned the item's uri
    expect(creator).to.equal(accounts[0]);
  });
});