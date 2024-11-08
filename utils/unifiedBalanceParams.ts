import { buildMultichainReadonlyClient, buildRpcInfo, buildTokenMapping, deployment, MultichainClient, MultichainTokenMapping } from "klaster-sdk";
import { arbitrumSepolia, sepolia } from "viem/chains";
import { USDCAddresses, LINKAddresses } from "./Artifacts/Addresses";

export const mcClient = buildMultichainReadonlyClient([
    buildRpcInfo(sepolia.id, sepolia.rpcUrls.default.http[0]),
    buildRpcInfo(arbitrumSepolia.id, arbitrumSepolia.rpcUrls.default.http[0]),
]);

export const mcUSDC = buildTokenMapping([
    deployment(sepolia.id, USDCAddresses[sepolia.id] as `0x${string}`),
    deployment(arbitrumSepolia.id, USDCAddresses[arbitrumSepolia.id] as `0x${string}`),
    
]);

export const mcLINK = buildTokenMapping([
    deployment(sepolia.id, LINKAddresses[sepolia.id] as `0x${string}`),
    deployment(arbitrumSepolia.id, LINKAddresses[arbitrumSepolia.id] as `0x${string}`),
]);

export const intersectTokenAndClients = (
    token: MultichainTokenMapping,
    mcClient: MultichainClient
) => {
    return token.filter((deployment) =>
    mcClient.chainsRpcInfo
    .map((info) => info.chainId)
    .includes(deployment.chainId)
  );
};

export const mUSDC = intersectTokenAndClients(mcUSDC, mcClient);
export const mLINK = intersectTokenAndClients(mcLINK, mcClient);
