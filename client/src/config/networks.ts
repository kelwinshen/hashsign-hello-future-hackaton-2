import { NetworkConfigs } from "./type"

export const networkConfig: NetworkConfigs = {
  testnet: {
    network: "testnet",
    jsonRpcUrl: "https://testnet.hashio.io/api", // Hedera Testnet RPC URL
    mirrorNodeUrl: "https://testnet.mirrornode.hedera.com", // Hedera Testnet Mirror Node URL
    chainId: "0x128", // Hedera Testnet Chain ID (usually fixed for Hedera)
  },
  ethereum: {
    network: "testnet",
    jsonRpcUrl: "https://goerli.infura.io/v3/b663810f1b784cb7b1a7c5551e898612", // Ethereum Goerli Testnet RPC URL
    chainId: "0x5", // Goerli Testnet Chain ID
    mirrorNodeUrl: "" // Not applicable for Ethereum
  },
  bnb: {
    network: "testnet",
    jsonRpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/", // BNB Testnet RPC URL
    chainId: "0x61", // BNB Testnet Chain ID
    mirrorNodeUrl: "" // Not applicable for BNB
  },
}
