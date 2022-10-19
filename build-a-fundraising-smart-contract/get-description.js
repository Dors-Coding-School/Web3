const contractState = JSON.parse(process.env.CONTRACT_STATE);

const description = contractState.description;

console.log(`Here's the description of the fundraising contract: ${description}`);
