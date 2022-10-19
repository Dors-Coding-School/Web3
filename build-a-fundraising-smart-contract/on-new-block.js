const { addTransaction, updateContractState } = (await import('./blockchain-helpers.js'));

const contractState = JSON.parse(process.env.CONTRACT_STATE);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const creatorAddress = process.env.CREATOR_ADDRESS;
const blockchainLength = process.env.BLOCKCHAIN_LENGTH;
// Add your code below
if(blockchainLength >= 7 && contractState.status != "closed"){
    contractState.transactions.forEach(transaction => {
        addTransaction(privateKey, transaction.fromAddress, transaction.amount);
    })
    contractState.description = "Smart contract to raise funds for my start up.";
    contractState.status = "closed";
}

updateContractState(contractAddress, contractState);
