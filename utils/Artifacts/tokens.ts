export interface TokenInfo {
    name: string;
    sepoliaAddress: string;
    arbitrumAddress: string;
  }
  
  export const ASSET_TOKENS: { [key: string]: TokenInfo } = {
    WETH: { name: "WETH", arbitrumAddress: "0xa4480565af9a87770FDa24c6eDE28D00E7881b3a", sepoliaAddress: "0x595CeE49356f6260D9D3290f7C052183260314ef"},
    DAI: { name: "DAI", arbitrumAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", sepoliaAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3"},
    WBTC: { name: "WBTC", arbitrumAddress: "0xa15248359B1dB89eBa482c862E861f3e01A125B4", sepoliaAddress: "0xFD986EFd85B1F0EaeeCb7cD12f629DF3951e5360",},
    LINK: { name: "LINK", arbitrumAddress: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", sepoliaAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",},
    SUSHI: { name: "SUSHI", arbitrumAddress: "0x0165878A594ca255338adfa4d48449f69242Eb8F", sepoliaAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",},
    AAVE: { name: "AAVE", arbitrumAddress: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", sepoliaAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",},
    CRV: { name: "CRV", arbitrumAddress: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",  sepoliaAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",},
  };
