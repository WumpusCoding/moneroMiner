const config = require('./config.json');
const CoinHive = require('coin-hive');

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('<center><h1>It Works!</h1></center>'))

app.listen(3000, () => console.log('Webserver running on port 3000!'))

(async () => {

  // Create miner
  const miner = await CoinHive(config.sitekey); // CoinHive's Site Key

  // Start miner
  await miner.start();

  // Listen on events
  miner.on('open', () => {
    console.log(`\nConnected to the pool. Starting to mine...\n`)
  })
  miner.on('found', () => {
   // console.log(`\n\nA hash meeting the pool's difficulty (currently 256) was found and will be send to the pool.\n`)
  })
  miner.on('accepted', () => {
    // console.log(`A hash that was sent to the pool was accepted.\n`)
  })
  miner.on('update', data => {
    console.log(`\nHashes p/second: ${data.hashesPerSecond} Total hashes: ${data.totalHashes} Accepted hashes: ${data.acceptedHashes}\n`);  // write text
  });
})();
