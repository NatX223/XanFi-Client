export interface TokenInfo {
    name: string;
    sepoliaAddress: string;
    arbitrumAddress: string;
  }
  
  export const ASSET_TOKENS: { [key: string]: TokenInfo } = {
    WETH: { name: "WETH", arbitrumAddress: "0xa4480565af9a87770FDa24c6eDE28D00E7881b3a", sepoliaAddress: "0x595CeE49356f6260D9D3290f7C052183260314ef"},
    DAI: { name: "UNI", arbitrumAddress: "0xFF77Df6c148a94440caF3C6a6865a058E1f1F27B", sepoliaAddress: "0x23BBa4b219409F0D835b77C76D08934dc23D5E08"},
    WBTC: { name: "WBTC", arbitrumAddress: "0xa15248359B1dB89eBa482c862E861f3e01A125B4", sepoliaAddress: "0xFD986EFd85B1F0EaeeCb7cD12f629DF3951e5360",},
    LINK: { name: "MATIC", arbitrumAddress: "0x0058e73DE38A00a870beEA2b0185432C9b01eA61", sepoliaAddress: "0xc96244Fd0C233a81a5995F9A5EAB1D5348877452",},
    SUSHI: { name: "ARB", arbitrumAddress: "0x8b576DAdF5b8ecE2DD38160448ABAF64fC70f062", sepoliaAddress: "0x914A15C5862Ed7a38b19866eDeCa30A3ec926cdc",},
    AAVE: { name: "AAVE", arbitrumAddress: "0x77A0459fF837eE572EA9c36535324cA8E813Bb76", sepoliaAddress: "0xF0f40Da59B17F1ad1Db8edE5cb5A65De811Eb9Ec",},
    CRV: { name: "AXS", arbitrumAddress: "0xd85259F42bF53c35c041ABfd3A2C38a10Bc40ec7",  sepoliaAddress: "0x99E9073d37B979A68Da0452bcDAe7d4C7FB4Bce5",},
    SAND: { name: "SAND", arbitrumAddress: "0xb34817bEE783107Aad0077E27c20977146684ED4", sepoliaAddress: "0x6aD64331F6b87F1F49526a058F9cF91eaf5aC97F",},
    ATOM: { name: "ATOM", arbitrumAddress: "0x5474C94152DFeB642607758dECF156f590D092dD", sepoliaAddress: "0x86927489557F7294a58a1a2395635B49E24ce0e9",},
    DOT: { name: "DOT", arbitrumAddress: "0xe462B2Bd44853a3Ab56b5b0C7Db76Bc27306f19E",  sepoliaAddress: "0x6A2fE51B2793879FC3d6C4bD54ec6337Eb7de2B4",}
  };
