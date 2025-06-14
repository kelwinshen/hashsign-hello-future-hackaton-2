
import { WalletConnectContext } from "../../../contexts/WalletConnectContext";
import { useCallback, useContext, useEffect } from 'react';
import { WalletInterface } from "../walletInterface";
import { AccountId, ContractCallQuery, ContractExecuteTransaction, ContractFunctionParameters, ContractId, LedgerId, TokenAssociateTransaction} from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { appConfig } from "../../../config";
import { SignClientTypes } from "@walletconnect/types";
import { DAppConnector, HederaJsonRpcMethod, HederaSessionEvent, HederaChainId} from "@hashgraph/hedera-wallet-connect";
import EventEmitter from "events";


// Created refreshEvent because `dappConnector.walletConnectClient.on(eventName, syncWithWalletConnectContext)` would not call syncWithWalletConnectContext
// Reference usage from walletconnect implementation https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/lib/dapp/index.ts#L120C1-L124C9


const refreshEvent = new EventEmitter();

// Create a new project in walletconnect cloud to generate a project id
const walletConnectProjectId = "25668fbb9339f6f2a83df4c44ed2589f";
const currentNetworkConfig = appConfig.networks.testnet;
const hederaNetwork = currentNetworkConfig.network;
// const hederaClient = Client.forName(hederaNetwork);


// Adapted from walletconnect dapp example:
// https://github.com/hashgraph/hedera-wallet-connect/blob/main/src/examples/typescript/dapp/main.ts#L87C1-L101C4
const metadata: SignClientTypes.Metadata = {
  name: "HashSign",
  description: "Digital Identity & Signature Powered by DLT",
  url: window.location.origin,
  icons: [window.location.origin + "/hashsign.ico"],
}
const dappConnector = new DAppConnector(
  metadata,
  LedgerId.fromString(hederaNetwork),
  walletConnectProjectId,
  Object.values(HederaJsonRpcMethod),
  [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
  [HederaChainId.Testnet],
);

// ensure walletconnect is initialized only once
let walletConnectInitPromise: Promise<void> | undefined = undefined;

const initializeWalletConnect = async () => {
  if (walletConnectInitPromise === undefined) {
    walletConnectInitPromise = dappConnector.init();
  }
  await walletConnectInitPromise;
};

export const openWalletConnectModal = async () => {
  await initializeWalletConnect();
  await dappConnector.openModal().then(() => {
    refreshEvent.emit("sync");
  });
};

class WalletConnectWallet implements WalletInterface {

  private getSigner() {
    if (dappConnector.signers.length === 0) {
      throw new Error('No signers found!');
    }
    return dappConnector.signers[0];
  }

  private getAccountId() {
    // Need to convert from walletconnect's AccountId to hashgraph/sdk's AccountId because walletconnect's AccountId and hashgraph/sdk's AccountId are not the same!
    return AccountId.fromString(this.getSigner().getAccountId().toString());
  }




  async associateHIDR() {
    
    const associateTokenTransaction = new TokenAssociateTransaction()
      .setAccountId(this.getAccountId())
      .setTokenIds([appConfig.constants.HIDR_TOKEN_ID]);

    const signer = this.getSigner();
    await associateTokenTransaction.freezeWithSigner(signer);
    const txResult = await associateTokenTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }


  async associateEMateraiNFT () {
    
    const associateTokenTransaction = new TokenAssociateTransaction()
      .setAccountId(this.getAccountId())
      .setTokenIds([appConfig.constants.NFT_E_MATERAI_ID]);

    const signer = this.getSigner();
    await associateTokenTransaction.freezeWithSigner(signer);
    const txResult = await associateTokenTransaction.executeWithSigner(signer);
    return txResult ? txResult.transactionId : null;
  }

  async createAgreement( functionParameters: ContractFunctionParameterBuilder,  gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID)
      .setGas(gasLimit)
      .setFunction("createAgreement", functionParameters.buildHAPIParams());

    const signer = this.getSigner();
    await tx.freezeWithSigner(signer);
    const txResult = await tx.executeWithSigner(signer);

    return txResult ? txResult.transactionId : null;
  }



  async signAgreement( functionParameters: ContractFunctionParameterBuilder,  gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID)
      .setGas(gasLimit)
      .setFunction("signAgreement", functionParameters.buildHAPIParams());

    const signer = this.getSigner();
    await tx.freezeWithSigner(signer);
    const txResult = await tx.executeWithSigner(signer);

    // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // after getting the contract call results, use ethers and abi.decode to decode the call_result
    return txResult ? txResult.transactionId : null;
  }


  async attachNFT(functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    try {
      const signer = this.getSigner();
  
      // Approve the NFT for the contract
      const approveTx = new ContractExecuteTransaction()
        .setContractId(appConfig.constants.NFT_E_MATERAI_ID)
        .setGas(gasLimit)
        .setFunction(
          "approve",
          new ContractFunctionParameters()
            .addAddress(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID)
            .addUint64(10)
        );
      
      await approveTx.freezeWithSigner(signer);
      const approveResult = await approveTx.executeWithSigner(signer);
      console.log("Approval Result:", approveResult.transactionId);
  
      // Attach the NFT after approval
      const attachTx = new ContractExecuteTransaction()
        .setContractId(appConfig.constants.SMARTCONTRACT_AGREEMENT_ID)
        .setGas(gasLimit)
        .setFunction("attachNFT", functionParameters.buildHAPIParams());
  
      await attachTx.freezeWithSigner(signer);
      const attachResult = await attachTx.executeWithSigner(signer);
  
      console.log("Attach Result:", attachResult.transactionId);
  
      return attachResult ? attachResult.transactionId : null;
    } catch (error) {
      console.error("Error during NFT attachment:", error);
      throw error;
    }
  }
  
  





 
  async getAgreementsByAddress() {
  
    const contractId = appConfig.constants.SMARTCONTRACT_AGREEMENT_ID;
    try {
      const agreements= new  ContractCallQuery()
      .setContractId(contractId).setFunction("getAgreementsByAddress").setSenderAccountId(this.getSigner().getAccountId().toString());

      if (agreements) {
        
        return { agreements }; 
      } else {
        throw new Error("Transaction failed.");
      }
    } catch (error) {

      return null;
    }
  }


   
  async getAgreement() {
  

    const contractId = appConfig.constants.SMARTCONTRACT_AGREEMENT_ID;
    try {
      const agreement= new  ContractCallQuery()
      .setContractId(contractId).setFunction("getAgreement").setSenderAccountId(this.getSigner().getAccountId().toString());

      if (agreement) {
        
        return { agreement }; 
      } else {
        throw new Error("Transaction failed.");
      }
    } catch (error) {
      console.error("Failed to fetch agreements by address:", error);
      return null;
    }
  }


 

  async buyNFT( functionParameters: ContractFunctionParameterBuilder,  gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(appConfig.constants.SMARTCONTRACT_MATERAI_MARKET_PLACE_ID)
      .setGas(gasLimit)
      .setFunction("buyNFT", functionParameters.buildHAPIParams());

    const signer = this.getSigner();
    await tx.freezeWithSigner(signer);
    const txResult = await tx.executeWithSigner(signer);

    // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // after getting the contract call results, use ethers and abi.decode to decode the call_result
    return txResult ? txResult.transactionId : null;
  }


  



  // Purpose: build contract execute transaction and send to wallet for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    const signer = this.getSigner();
    await tx.freezeWithSigner(signer);
    const txResult = await tx.executeWithSigner(signer);

    // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // after getting the contract call results, use ethers and abi.decode to decode the call_result
    return txResult ? txResult.transactionId : null;
  }
  disconnect() {
    dappConnector.disconnectAll().then(() => {
      refreshEvent.emit("sync");
    });
  }
};
export const walletConnectWallet = new WalletConnectWallet();

// this component will sync the walletconnect state with the context
export const WalletConnectClient = () => {
  // use the HashpackContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected } = useContext(WalletConnectContext);

  // sync the walletconnect state with the context
  const syncWithWalletConnectContext = useCallback(() => {
    const accountId = dappConnector.signers[0]?.getAccountId()?.toString();
    if (accountId) {
      setAccountId(accountId);
      setIsConnected(true);
    } else {
      setAccountId('');
      setIsConnected(false);
    }
  }, [setAccountId, setIsConnected]);

  useEffect(() => {
    // Sync after walletconnect finishes initializing
    
    refreshEvent.addListener("sync", syncWithWalletConnectContext);

    initializeWalletConnect().then(() => {
      syncWithWalletConnectContext();
    });

    return () => {
      refreshEvent.removeListener("sync", syncWithWalletConnectContext);
    }
  }, [syncWithWalletConnectContext]);
  return null;
};
