import {  ContractId, TokenId, TransactionId } from "@hashgraph/sdk";
import { ContractFunctionParameterBuilder } from "./contractFunctionParameterBuilder";

export interface WalletInterface {
  executeContractFunction: (contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) => Promise<TransactionId | string | null>;
  disconnect: () => void;
  associateHIDR: () => Promise<TransactionId | string | null>;
  associateEMateraiNFT: (tokenId: TokenId) => Promise<TransactionId | string | null>;


  createAgreement: ( functionParameters: ContractFunctionParameterBuilder, gasLimit: number, amount: number) => Promise<TransactionId | string | null>;
  signAgreement:( functionParameters: ContractFunctionParameterBuilder, gasLimit: number, amount: number) => Promise<TransactionId | string | null>;
  getAgreementsByAddress: () =>Promise<{ agreements: any;} | null>
  getAgreement: (id: number) =>Promise<{ agreement: any;} | null>
  buyNFT:( functionParameters: ContractFunctionParameterBuilder, gasLimit: number, amount: number) => Promise<TransactionId | string | null>;
 
}