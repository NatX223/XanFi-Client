export const indexAbi = [
    {"type":"function","name":"investFund","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"targetIndexContracts","type":"address[]","internalType":"address[]"}],"outputs":[],"stateMutability":"nonpayable"},
    {"type":"function","name":"migrateTokens","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"targetChain","type":"uint16","internalType":"uint16"},{"name":"targetIndex","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"payable"},
    {"type":"function","name":"replaceAsset","inputs":[{"name":"oldAssetAddress","type":"address","internalType":"address"},{"name":"newAssetAddress","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"}
]