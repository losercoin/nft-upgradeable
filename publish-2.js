const fs = require('fs');
const N = 11
const fee = 250
const MyCollectible = artifacts.require('MyCollectible');

module.exports = async function(callback) {
  try {
    let rawdata = fs.readFileSync('loserpunk.json');
    let losers = JSON.parse(rawdata);

    rawdata = fs.readFileSync('people.json');
    let people = JSON.parse(rawdata);
    
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()
    const nft = await MyCollectible.deployed()

    const current_supply = (await nft.totalSupply()).toNumber()
    for (let i=0; i<N; i++) {
      console.log(losers[i+current_supply].id, "https://ipfs.io/ipfs/" + losers[i+current_supply].hash)
      console.log(people[i].name, people[i].address)
      await nft.publish(people[i].address, 1, 1, "https://ipfs.io/ipfs/" + losers[i+current_supply].hash, fee)
    }
    

  }
  catch(error) {
    console.log(error)
  }

  callback()
}