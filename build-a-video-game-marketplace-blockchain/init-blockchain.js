import { writeBlockchain, writeTransactions } from './blockchain-helpers.js';

const genesisBlock = {
  hash: "0",
  previousHash: null
}

writeBlockchain([ genesisBlock ]);

writeTransactions([]);
