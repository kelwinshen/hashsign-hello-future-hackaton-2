import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import { DocumentPreview, DocumentInfo } from ".";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import Swal from "sweetalert2";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "../config";
import { AccountId } from "@hashgraph/sdk";
import axios from "axios";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";

const DetailInfo = ({
  agreementId,
  onBack,
}: {
  agreementId: number;
  onBack: () => void;
}) => {
  const { walletInterface, accountId } = useWalletInterface();
  const [agreement, setAgreement] = useState<{ id: number;
    title: string;
    creator: string;
    signatories: string[];
    hasSignedsignatories: string[];
    completed: boolean;
    attachedNFTs: string[];
    serialNumbers: number[];
    ipfsHash: string;}>();
  
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();
  const [view, setView] = useState<"document" | "info">("document");

  // Convert Hedera AccountId to EVM Address
  const convertAccountIdToSolidityAddress = (accountId: AccountId) => {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();
    return `0x${accountIdString}`;
  };

  const fetchAgreementDetails = async () => {
    if (!walletInterface) return;
    setLoading(true);
    try {
      const result = await walletInterface.getAgreement(agreementId);
      setAgreement(result?.agreement);
    } catch (error) {
      console.error("Error fetching agreement details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   

    fetchAgreementDetails();

    


  }, [walletInterface, agreementId]);

  // Check User Roles
  const userEVMAddress = accountId
    ? convertAccountIdToSolidityAddress(AccountId.fromString(accountId))
    : "";

  const isCreator =
    agreement?.creator.toLowerCase() === userEVMAddress.toLowerCase();

  const isParticipant = agreement?.signatories.some(
    (signatory: string) =>
      signatory.toLowerCase() === userEVMAddress.toLowerCase()
  );

  const hasSigned = agreement?.hasSignedsignatories.some(
    (signed: string) => signed.toLowerCase() === userEVMAddress.toLowerCase()
  );

  const isFinal = agreement?.completed;
  const nftAttached = agreement?.attachedNFTs.length == 1 ? true : false

  // Handle Signing the Agreement
  const handleSignAgreement = async () => {
    if (!walletInterface) return;
    try {
      Swal.fire({
        background: "#212529",
        iconColor: "#ffffff",
        confirmButtonColor: "#EB1D36",
        customClass: {
            title: "text-white",
        },
        title: "Confirm the transaction in your wallet\n&\n Wait for processing.",
        showConfirmButton: true,
        didOpen: () => Swal.showLoading(),
      });

      const functionParameters = new ContractFunctionParameterBuilder().addParam(
        { type: "uint256", name: "id", value: agreementId }
      );

      const txId = await walletInterface.signAgreement(
        functionParameters,
        appConfig.constants.METAMASK_GAS_LIMIT_AGREEMENT
      );

      if (txId) {
        fetchAgreementDetails();
        Swal.fire({
          background: "#212529",
          iconColor: "#ffffff",
          confirmButtonColor: "#EB1D36",
          customClass: {
              title: "text-white",
          },
          icon: "success",
          title: "Signed Successfully!",
          confirmButtonText: "View Transaction",
          preConfirm: () =>
            window.open(
              `https://hashscan.io/testnet/transaction/${txId}`,
              "_blank"
            ),
        });
      }
    } catch (error) {
      console.error("Signing failed:", error);
    }
  };

  const getEMateraiList = async () => {
    if(!accountId){
      return;
    }
    try {
      let response;
  
      if (accountId.includes(".")) {
        // Use the basic API if accountId includes "."
        response = await axios.get(
          `${appConfig.constants.API_BASE_URL}/tokens/${appConfig.constants.NFT_E_MATERAI_ID}/nfts?account.id=${accountId}&limit=100`
        );
        return response.data.nfts;
      } else {
        // Use the general API otherwise
        response = await axios.get(
          `${appConfig.constants.API_BASE_URL}/accounts/${accountId}/nfts?=${appConfig.constants.NFT_E_MATERAI_ID}`
        );
        console.log(response.data.nfts)
        return response.data.nfts;
      }
    } catch (error) {
      console.error("Error fetching e-Materai list:", error);
      return [];
    }
  };
  

 // Handle Attaching e-Materai
  const handleAttachNFT =  async (agreementId: number, nftAddress: string) => {
    if (!walletInterface) return;
    try {
      Swal.fire({
        background: "#212529",
        iconColor: "#ffffff",
        confirmButtonColor: "#EB1D36",
        customClass: {
            title: "text-white",
        },
        title: "Confirm the transaction in your wallet\n&\n Wait for processing.",
        showConfirmButton: true,
        didOpen: () => Swal.showLoading(),
      });

      const materaiList = await getEMateraiList();

      

      const functionParameters = new ContractFunctionParameterBuilder().addParam(
        { type: "uint256", name: "agreementId", value: agreementId }).addParam(
          { type: "address", name: "nftAddress", value: nftAddress }
      ).addParam(
        { type: "uint256", name: "serialNumber", value: Number(materaiList[0].serial_number) }
    );

      const txId = await walletInterface.attachNFT(
        functionParameters,
        Number(materaiList[0].serial_number),
        appConfig.constants.METAMASK_GAS_LIMIT_AGREEMENT
      );

      if (txId) {
        fetchAgreementDetails();
        Swal.fire({
          background: "#212529",
          iconColor: "#ffffff",
          confirmButtonColor: "#EB1D36",
          customClass: {
              title: "text-white",
          },
          icon: "success",
          title: "Signed Successfully!",
          confirmButtonText: "View Transaction",
          preConfirm: () =>
            window.open(
              `https://hashscan.io/testnet/transaction/${txId}`,
              "_blank"
            ),
        });
      }
    } catch (error) {
      Swal.fire({
        
        background: "#212529",
        iconColor: "#ffffff",
        confirmButtonColor: "#EB1D36",
        customClass: {
            title: "text-white",
        },
        title: `Oops!`,
        text: "You are running out of e-Materai",
        icon: "info",
        confirmButtonText: "Buy now",
        preConfirm: () => {
            // Action to perform when the button is clicked
            // For example, redirect to the transaction URL
          navigate("/stamp-store");
        }
    });
      console.error("Attach Materai failed:", error);
    }
  };

  

  return (
    <section className="px-2 md:px-8">
      {/* Header */}
      <div className="border-b border-black/30 py-8 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer text-black/70 hover:text-primaryColor"
          onClick={onBack}
        >
          <Icon icon="akar-icons:arrow-left" />
          <span className="text-sm">Back</span>
        </div>

        {/* Buttons aligned to the right */}
        <div className="flex gap-4">
          {!isFinal ? (
            <>
              {isCreator && (
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    nftAttached
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={nftAttached}
                  onClick={()=>{handleAttachNFT(agreementId, appConfig.constants.NFT_E_MATERAI_ADDRESS )}}
                >
                  {nftAttached ? "NFT Attached" : "Attach e-Materai"}
                </button>
              )}
              {isParticipant && (
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    hasSigned
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={hasSigned}
                  onClick={handleSignAgreement}
                >
                  {hasSigned ? "Signed" : "Sign Agreement"}
                </button>
              )}
            </>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-green-500 text-white cursor-not-allowed"
              disabled
            >
              Completed
            </button>
          )}
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-4 py-6">
        <button
          onClick={() => setView("document")}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            view === "document" ? "bg-red-100 text-red-500" : "bg-gray-200"
          }`}
        >
          <Icon icon="mdi:file-document-outline" className="inline mr-2" />
          Document
        </button>
        <button
          onClick={() => setView("info")}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            view === "info" ? "bg-red-100 text-red-500" : "bg-gray-200"
          }`}
        >
          <Icon icon="mdi:information-outline" className="inline mr-2" />
          Information
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="animate-spin-slow">
          <img src={logo} alt="Hash Sign" className="w-[150px] h-[150px]" />
        </div>
        <p className="text-lg font-semibold text-primaryColor animate-pulse">
          {"Loading Agreement Details..."}
        </p>
      </div>
      ) : agreement ? (
        <>
          {/* Toggle View */}
          {view === "document" ? (
            <DocumentPreview ipfsHash={agreement.ipfsHash} />
          ) : (
            <DocumentInfo
              title={agreement.title}
              owner={agreement.creator}
              signatories={agreement.signatories}
              signedSignatories={agreement.hasSignedsignatories}
              eMaterai={agreement.attachedNFTs}
              serialNumber={agreement.serialNumbers}
            />
          )}
        </>
      ) : (
        <p>Agreement not found.</p>
      )}
    </section>
  );
};

export default DetailInfo;
