const fs = require('fs');
const N = 1
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
      await nft.publish('0xdd2739e731b584f5b0a2ef07054a1229abc4dd42', 1, 1, "https://ipfs.io/ipfs/" + losers[i].hash, fee)
    }
    

  }
  catch(error) {
    console.log(error)
  }

  callback()
}