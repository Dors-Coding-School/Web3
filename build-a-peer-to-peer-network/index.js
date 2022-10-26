import { getTransactions, writeTransactions } from './blockchain-helpers.js';
import { getKnownPeerAddresses } from './network-helpers.js';

import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const knowPeers = getKnownPeersAddresses();
const MY_PORT = process.env.PORT;
const MY_ADDRESS = `ws://localhost:${MY_PORT}`;
const transactions = getTransactions();
const openedSockets = [];
const connectedAddresses = [];
const attemptingToConnectAddresses = [];

const myServer = new WebSocketServer({ port : MY_PORT });

myServer.on('connection', socket => {
  console.log('connection received');
  
  socket.on('message', dataString => {
    console.log('message received: ' + dataString);
    
    const message = JSON.parse(dataString);
    message.data.forEach(address => connect(address));
  });
});

function connect(address){
  if(address != MY_ADDRESS && !attemptingToConnectAddresses.includes(address) && !connectedAddresses.includes(address)){
    console.log('attempting to connect to ' + address);
    attemptingToConnectAddresses.push(address);
    
    const socket = new WebSocket(address);
    
    socket.on('open', () => {
      console.log('connection to ' + address + ' opened');
      
      const index = attemptingToConnectAddresses.indexOf(address);
      attemptingToConnectAddresses.splice(index,1);
      
      connectedAddress.push(address);
      
      socket.send(
        JSON.stringfy({ type: "HANDSHAKE", data: [MY_ADDRESS, ...conectedAddresses]})
      )
    })
              
    socket.on('close', () => {
      console.log('connection to ' + address + ' closed');
      
      const index = attemptingToConnectAddresses.indexOf(address);
      connectedAddresses.splice(index,1);
    })
    
    socket.on('error', () => {
      console.log('error connecting to ' + address);
      
      const index = attemptingToConnectAddresses.indexOf(address);
      if(index >= 0){
        attemptingToConnectAddresses.splice(index,1);
      }
    })
              
  }  
}

knowPeers.forEach(peer => connect(peer));
