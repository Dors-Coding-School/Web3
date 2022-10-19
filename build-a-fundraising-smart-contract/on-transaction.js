const { addTransaction, updateContractState } = (await import('./blockchain-helpers.js'));

const contractState = JSON.parse(process.env.CONTRACT_STATE);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const creatorAddress = process.env.CREATOR_ADDRESS;
const transaction = JSON.parse(process.env.TRANSACTION);
// Add your code below
contractState.transactions.push(transaction);

contractState.raised = contractState.raised + transaction.amount;

if(contractState.raised >= 150){
    addTransaction(privateKey, creatorAddress, contractState.raised);
    contractState.status = "closed";
    contractState.description = "Smart contract to raise funds for my start up."
}

updateContractState(contractAddress, contractState);
