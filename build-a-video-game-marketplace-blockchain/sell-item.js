import { getTransactions, writeTransactions, getItemPrice, getAddressItems } from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new.EC.ec('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];

const keyPair = ec.keyFromPrivate(sellerPrivateKey, 'hex');
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

const price = getItemPrice(itemSold) - 5;

const transactions = getTransactions();

const signature = keyPair.sign(publicKey + price + itemSold).toDER('hex');

const newTransaction = {
  buyerAddress: null,
  sellerAddress: publicKey,
  price: price,
  itemSold: itemSold,
  signature: signature
}

const items = getAddressItems(publicKey);
if(items[itemSold] >= 1){
  transactions.push(newTransaction);
  writeTransactions(transactions);
}
