const { ethers } = require("ethers");

export const providers = {
    44787: new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org"),
    43113: new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
};