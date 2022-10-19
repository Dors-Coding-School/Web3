import { getTransactions, writeTransactions, getWallets, writeWallets } from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new.EC.ec('p192');

const newWalletName = process.argv[2];

const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

const wallets = getWallets();

wallets[newWalletName] = {
  publicKey,
  privateKey
}

writeWallets(wallets);

const transactions = getTransactions();

const newTransaction = {
  buyerAddress: null,
  sellerAddress: publicKey,
  price: 40
}

transactions.push(newTransaction);
writeTransactions(transactions);
