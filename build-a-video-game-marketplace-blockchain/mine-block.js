import { getTransactions, writeTransactions, getBlockchain, writeBlockchain } from './blockchain-helpers.js';

import sha256 from 'crypto-js/sha256.js';

const transactions = getTransactions();

const blockchain = getBlockchain();
const lastBlock = blockchain[blockchain.length - 1];
const previousHash = lastBlock.hash;

let hash = '';
let nonce = 0;

while(!hash.startsWith('00')){
  nonce++;
  hash = sha256(nonce + previousHash + JSON.stringfy(transactions)).toString();
}

const newBlock = {
  hash,
  previousHash,
  nonce,
  transactions
}

blockchain.push(newBlock);
writeBlockchain(blockchain);

writeTransactions([]);
