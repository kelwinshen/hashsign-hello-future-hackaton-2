// export type NetworkName = "testnet";
// export type ChainId = '0x128';
// export type NetworkConfig = {
//   network: NetworkName,
//   jsonRpcUrl: string,
//   mirrorNodeUrl: string,
//   chainId: ChainId,
// }

export type NetworkName = "testnet" | "ethereum" | "bnb";
export type ChainId = '0x128' | '0x5' | '0x61'; // Add chain IDs for Ethereum and BNB

export type NetworkConfig = {
  network: NetworkName,
  jsonRpcUrl: string,
  mirrorNodeUrl: string, // Optional because not all networks have a mirror node URL
  chainId: ChainId,
}



// purpose of this file is to define the type of the config object
export type NetworkConfigs = {
  [key in NetworkName]: {
    network: NetworkName,
    jsonRpcUrl: string,
    mirrorNodeUrl: string,
    chainId: ChainId,
  }
};

export type AppConfig = {
  networks: NetworkConfigs,
}


