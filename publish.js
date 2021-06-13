const fs = require('fs');
const N = 10
const fee = 250
const MyCollectible = artifacts.require('MyCollectible');

module.exports = async function(callback) {
  try {
    let rawdata = fs.readFileSync('loserpunk.json');
    let losers = JSON.parse(rawdata);
    
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()
    const nft = await MyCollectible.deployed()

    const current_supply = (await nft.totalSupply()).toNumber()
    for (let i=current_supply; i<current_supply+N; i++) {
      console.log(losers[i].id, "https://ipfs.io/ipfs/" + losers[i].hash)
      await nft.publish(accounts[0], 1, 1, "https://ipfs.io/ipfs/" + losers[i].hash, fee)
    }
    

  }
  catch(error) {
    console.log(error)
  }

  callback()
}