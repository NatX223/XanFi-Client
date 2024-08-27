import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';

export function getSupportedChains() {
    return [mainnet, polygon, optimism, arbitrum, base];
}
