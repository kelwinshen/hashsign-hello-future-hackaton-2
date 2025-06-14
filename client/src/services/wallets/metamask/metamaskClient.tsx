import {  ContractId } from "@hashgraph/sdk";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { appConfig } from "../../../config";
import { MetamaskContext } from "../../../contexts/MetamaskContext";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";
import Swal from "sweetalert2";
import abiData from "../agreement.json";

const currentNetworkConfig = appConfig.networks.testnet;

export const switchToHederaNetwork = async (ethereum: any) => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: currentNetworkConfig.chainId }] // chainId must be in hexadecimal numbers
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: `Hedera (${currentNetworkConfig.network})`,
              chainId: currentNetworkConfig.chainId,
              nativeCurrency: {
                name: 'HBAR',
                symbol: 'HBAR',
                decimals: 18
              },
              rpcUrls: [currentNetworkConfig.jsonRpcUrl]
            },
          ],
        });
      } catch (addError) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: `Hedera (${currentNetworkConfig.network})`,
                chainId: currentNetworkConfig.chainId,
                nativeCurrency: {
                  name: 'HBAR',
                  symbol: 'HBAR',
                  decimals: 18
                },
                rpcUrls: [currentNetworkConfig.jsonRpcUrl]
              },
            ],
          });
        } catch (addError) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: `Hedera (${currentNetworkConfig.network})`,
                  chainId: currentNetworkConfig.chainId,
                  nativeCurrency: {
                    name: 'HBAR',
                    symbol: 'HBAR',
                    decimals: 18
                  },
                  rpcUrls: [currentNetworkConfig.jsonRpcUrl]
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    }
    console.error(error);
  }
}

const { ethereum } = window as any;
const getProvider = () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }
  return new ethers.BrowserProvider(ethereum);
}



// returns a list of accounts
// otherwise empty array
export const connectToMetamask = async () => {
  const provider = getProvider();

  // keep track of accounts returned
  let accounts: string[] = []

  try {

    await switchToHederaNetwork(ethereum);
    accounts = await provider.send("eth_requestAccounts", []);
  } catch (error: any) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
    } else {
      console.error(error);
    }
  }

  return accounts;
}

class MetaMaskWallet implements WalletInterface {
 

  async getTemplate  ()  {
   
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contractAddress = appConfig.constants.SMARTCONTRACT_AGREEMENT_ADDRESS;
    const abi = abiData;
    const contract = new ethers.Contract(contractAddress, abi, signer)
    // Return the contract instance along with the user address
    return {contract, signer};
  }

  
  async associateHIDR() {
    // send the transaction
    // convert tokenId to contract id
   
    const hash = await this.executeContractFunction(
      ContractId.fromString(appConfig.constants.HIDR_TOKEN_ID),
      'associate',
      new ContractFunctionParameterBuilder(),
      appConfig.constants.METAMASK_GAS_LIMIT_ASSOCIATE
    );

    return hash;
  }

  async associateEMateraiNFT() {
    // send the transaction
    // convert tokenId to contract id
    const hash = await this.executeContractFunction(
      ContractId.fromString(appConfig.constants.NFT_E_MATERAI_ID.toString()),
      'associate',
      new ContractFunctionParameterBuilder(),
      appConfig.constants.METAMASK_GAS_LIMIT_ASSOCIATE
    );
    return hash;
  }




 async getAgreementsByAddress() {



    const {contract, signer} = await this.getTemplate();
  
    try {
      const agreements = await contract.getAgreementsByAddress(signer.address);
      return {agreements}
    } catch (error: any) {
     
      return null;
    }
  }

  async getAgreement(id: number) {

    const {contract} = await this.getTemplate();
  
    try {
      const agreement = await contract.getAgreement(id);
      return {agreement}
    } catch (error: any) {
     
      return null;
    }
  }



  async signAgreement( functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${"signAgreement"}(${functionParameters.buildAbiFunctionParams()})`
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(`0x${ContractId.fromString(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID).toSolidityAddress()}`, abi, signer);
    try {
       const txResult = await contract["signAgreement"](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit
        }
      );
      return txResult.hash;
    } catch (error: any) {
     
      return null;
    }
  }

  async createAgreement( functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${"createAgreement"}(${functionParameters.buildAbiFunctionParams()})`
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(`0x${ContractId.fromString(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID).toSolidityAddress()}`, abi, signer);
    try {
       const txResult = await contract["createAgreement"](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit
        }
      );
      return txResult.hash;
    } catch (error: any) {
     
      return null;
    }
  }



  // Attach NFT

  async attachNFT( functionParameters: ContractFunctionParameterBuilder,  serialNumber: number , gasLimit: number) {

    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${"attachNFT"}(${functionParameters.buildAbiFunctionParams()})`
    ];
    const nftAbi = [
    "function approve(address to, uint256 tokenId) external",
];

      const nftContract = new ethers.Contract(appConfig.constants.NFT_E_MATERAI_ADDRESS, nftAbi, signer);
      const approveTx = await nftContract.approve(appConfig.constants.SMARTCONTRACT_AGREEMENT_ADDRESS, serialNumber,  {gasLimit: gasLimit});
      await approveTx.wait();
 
    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(`0x${ContractId.fromString(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID).toSolidityAddress()}`, abi, signer);
    try {
       const txResult = await contract["attachNFT"](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit
        }
      );
      return txResult.hash;
    } catch (error: any) {
     
      return null;
    }
  }
  

  async buyNFT( functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${"buyNFT"}(${functionParameters.buildAbiFunctionParams()})`
    ];
   
    const hidrTokenAddress = appConfig.constants.HIDR_TOKEN_ADDRESS;

    const hidrTokenAbi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function transfer(address recipient, uint256 amount) external returns (bool)",
      "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)",
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "event Approval(address indexed owner, address indexed spender, uint256 value)",
  ];

    const hidrToken = new ethers.Contract(hidrTokenAddress, hidrTokenAbi, signer);

               // Approve the contract to spend HIDR tokens
        console.log(`- Approving HIDR tokens...\n`);
        const approveTx1 = await hidrToken.approve(appConfig.constants.SMARTCONTRACT_MATERAI_MARKET_ADDRESS, 11900);
        await approveTx1.wait();
        console.log(`- Approval of HIDR tokens successful to contract.\n`);


    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(`0x${ContractId.fromString(appConfig.constants.SMARTCONTRACT_MATERAI_MARKET_PLACE_ID).toSolidityAddress()}`, abi, signer);
    try {
       const txResult = await contract["buyNFT"](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit
        }
      );
      return txResult.hash;
    } catch (error: any) {
     
      return null;
    }
  }


  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const abi = [
      `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](...functionParameters, ethersOverrides)
    const contract = new ethers.Contract(`0x${contractId.toSolidityAddress()}`, abi, signer);
    try {
      const txResult = await contract[functionName](
        ...functionParameters.buildEthersParams(),
        {
          gasLimit: gasLimit === -1 ? undefined : gasLimit
        }
      );
      return txResult.hash;
    } catch (error: any) {
     
      return null;
    }
  }

  disconnect() {
  
  
    Swal.fire({
    
      title: "Hello!\nTo security reason, please use your metamask wallet to disconnect.",
     
      background: "#212529",
      iconColor: "#ffffff",
      confirmButtonColor: "#EB1D36",
      customClass: {
          title: "text-white",
      },
    
      icon: "info",
      confirmButtonText: "Okay",
    });
   
  }

  
};

export const metamaskWallet = new MetaMaskWallet();

export const MetaMaskClient = () => {
  const { setMetamaskAccountAddress } = useContext(MetamaskContext);
  useEffect(() => {
    // set the account address if already connected
    try {
      const provider = getProvider();
      provider.listAccounts().then((signers) => {
        if (signers.length !== 0) {
          // console.log("signer account:",signers);
          setMetamaskAccountAddress(signers[0].address,"");
        } else {
          setMetamaskAccountAddress("","");
        }
      });

      // listen for account changes and update the account address
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length !== 0) {
          // console.log("account changes;",accounts[0]);
          setMetamaskAccountAddress(accounts[0], "");
        } else {
          setMetamaskAccountAddress("","");
        }
      });

      // cleanup by removing listeners
      return () => {
        ethereum.removeAllListeners("accountsChanged");
      }
    } catch (error: any) {
      console.error(error.message ? error.message : error);
    }
  }, [setMetamaskAccountAddress]);

  return null;
}

