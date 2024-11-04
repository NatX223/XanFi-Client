import { sepolia, arbitrumSepolia } from "viem/chains";
const { ethers } = require("ethers");

export const providers = {
    11_155_111: new ethers.JsonRpcProvider(sepolia.rpcUrls.default.http[0]),
    421_614: new ethers.JsonRpcProvider(arbitrumSepolia.rpcUrls.default.http[0])
};