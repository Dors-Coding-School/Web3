import { getTransactions, writeTransactions, getItemPrice, getAddressBalance } from './blockchain-helpers.js';

import EC from 'elliptic';
const ec = new.EC.ec('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];

const keyPair = ec.keyFromPrivate(buyerPrivateKey, 'hex');
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

const price = getItemPrice(itemBought);

const transactions = getTransactions();

const signature = keyPair.sign(publicKey + price + itemBought).toDER('hex');

const newTransaction = {
  buyerAddress: publicKey,
  sellerAddress: null,
  price: price,
  itemBought: itemBought,
  signature: signature
}

const balance = getAddressBalance(publicKey);
if(balance >= price){
  transactions.push(newTransaction);
  writeTransactions(transactions);
}
