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
    await this.myCollectible.awardItem(accounts[0], "https://statics.pkumozzie.cn/lowc/test-1.json")
  });

  // Test case
  it('name returns the name of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.name()).to.equal('Loser Collectible');
  });

  it('symbol returns the symbol of this NFT', async function () {
 
    // Test if the returned string is the same one we initialized
    expect(await this.myCollectible.symbol()).to.equal('Lowc');
  });

  // Test case
  it('totalSupply returns the total amount of tokens stored by the contract', async function () {
 
    // Test if the returned string is the same one we initialized
    expect((await this.myCollectible.totalSupply()).toString()).to.equal('1');
  });

  it('ownerOf returns the onwer address of the item', async function () {
    let tokenId = (await this.myCollectible.tokenByIndex(0)).toString()
    let owner = await this.myCollectible.ownerOf(tokenId)
    // Test if the returned the address we award to
    expect(owner).to.equal(accounts[0]);
  });

  it('tokenURI returns the uri of the item', async function () {
    let tokenId = (await this.myCollectible.tokenByIndex(0)).toString()
    let tokenURI = await this.myCollectible.tokenURI(tokenId)
    // Test if the returned the item's uri
    expect(tokenURI).to.equal("https://game.example/item-id-8u5h2m.json");
  });

  it('creatorOf returns the creator address of the item', async function () {
    let tokenId = (await this.myCollectible.tokenByIndex(0)).toString()
    let creator = await this.myCollectible.creatorOf(tokenId)
    // Test if the returned the item's uri
    expect(creator).to.equal(accounts[0]);
  });
});