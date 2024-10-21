import {
    getDefaultConfig
  } from '@rainbow-me/rainbowkit';
  import {
    sepolia,
    arbitrumSepolia
  } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'XanFi',
    projectId: '6979d82a9d32fcb28f5dd9d2c593d63a',
    chains: [sepolia, arbitrumSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});