interface TokenInfo {
    name: string;
    address: string;
    chain: number;
  }
  
  export const ASSET_TOKENS: { [key: string]: TokenInfo } = {
    WETH: { name: "WETH", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", chain: 14 },
    DAI: { name: "DAI", address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", chain: 14 },
    USDC: { name: "USDC", address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", chain: 14 },
    USDT: { name: "USDT", address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", chain: 14 },
    WBTC: { name: "WBTC", address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", chain: 14 },
    LINK: { name: "LINK", address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", chain: 14 },
    SUSHI: { name: "SUSHI", address: "0x0165878A594ca255338adfa4d48449f69242Eb8F", chain: 14 },
    AAVE: { name: "AAVE", address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", chain: 14 },
    CRV: { name: "CRV", address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6", chain: 14 },
  };
  