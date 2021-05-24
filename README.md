# nft-upgradeable
upgradeable ERC721 contract for LOWB

### Environment set up

We follow [this guide](https://forum.openzeppelin.com/t/openzeppelin-upgrades-step-by-step-tutorial-for-truffle/3579) to set up the initial project.

### Compiling and running the code
- Before running this project, install truffle first: `npm install -g truffle`.

- Run `npm install` to install required modules.

- Compile the smart contracts: `truffle compile`.

- Deploy to local network: `truffle migrate`. (You may need to start [Ganache](https://www.trufflesuite.com/ganache) before migrating.)

- Now you can start to play with this contract: `truffle console`. For example, you can create a token by:

  ```javascript
  truffle(development)> let nft = await MyCollectible.deployed()
  truffle(development)> let accounts = await web3.eth.getAccounts()
  truffle(development)> nft.awardItem(accounts[0], "https://game.example/item-id-8u5h2m.json")
  Transaction successful. Transaction hash: 0x...
  truffle(development)> nft.ownerOf(1)
  "0x..."
  truffle(development)> nft.creatorOf(1)
  "0x..."
  truffle(development)> nft.tokenURI(1)
  "https://game.example/item-id-8u5h2m.json"
  ```
### Depolying to the live network

- Create a new .secret file in root directory and enter your 12 word mnemonic seed phrase. Then just run `truffle migrate --network testnet`. You will deploy contracts to the Binance testnet.
- To verify the contract, create a new .apikey file in root directory and enter the [API Key](https://bscscan.com/myapikey). Then just run `truffle run verify MyCollectible@{contract-address} --network testnet`.