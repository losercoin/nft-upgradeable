const fs = require('fs');
const MyCollectible = artifacts.require('MyCollectible');

module.exports = async function(callback) {
  try {
    let rawdata = fs.readFileSync('events-main-1.json');
    let events = JSON.parse(rawdata);
    
    const blockStart = events["blockNumber"]
    
    const nft = await MyCollectible.at('0xe0b78dc64d4385b208016050ecfed986a5e0de0e') //mainnet
    //const nft = await MyCollectible.at('0xe031188b0895afd3f3c32b2bf27fbd1ab9e8c9ea') //testnet

    let block = await web3.eth.getBlockNumber()
    console.log(blockStart, block)

    const transaction = await nft.getPastEvents('Transfer', { fromBlock: 8492441, toBlock: 8496441 })
    //const transaction = await nft.getPastEvents('Transfer', { filter: {from: '0x0000000000000000000000000000000000000000'}, fromBlock: 0, toBlock: 'latest' })

    events["Transfer"].push.apply(events["Transfer"], transaction)
    events["blockNumber"] = block

    let data = JSON.stringify(events);
    fs.writeFileSync('events-main-2.json', data);
    

  }
  catch(error) {
    console.log(error)
  }

  callback()
}