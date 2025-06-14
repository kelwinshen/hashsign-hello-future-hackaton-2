import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import Swal from "sweetalert2";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { appConfig } from "../config";
import { AccountId } from "@hashgraph/sdk";


const AgreementDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [agreement, setAgreement] = useState<{
    id: number;
    title: string;
    creator: string;
    signatories: string[];
    hasSignedsignatories: string[];
    completed: boolean;
    attachedNFTs: string[];
    serialNumbers: number[];
    ipfsHash: string;
  }>();

  const [loadingGetAgreement, setLoadingGetAgreement] = useState(false);

  const { accountId, walletInterface } = useWalletInterface();

  // Function to convert Hedera AccountId to EVM address
  const convertAccountIdToSolidityAddress = (accountId: AccountId) => {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();
    return `0x${accountIdString}`;
  };

  // Fetch agreement details
  const fetchAgreementById = async () => {
    if (!walletInterface) return;
    setLoadingGetAgreement(true);
    try {
      const agreementData = await walletInterface.getAgreement(Number(id));
     
      setAgreement(agreementData?.agreement);
    
      
    } catch (error) {
      console.error("Error fetching agreement details:", error);
    } finally {
      setLoadingGetAgreement(false);
    }
  };

  // Handle signing the agreement
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
        title: "Confirm the transaction in your wallet\n&\n Wait for the processing.\n",
       
        showConfirmButton: true,
        allowOutsideClick: true,
        didOpen: () => Swal.showLoading(),
      });

      const functionParameters = new ContractFunctionParameterBuilder()
        .addParam({ type: "uint256", name: "id", value: id });

      const txId = await walletInterface.signAgreement(
        functionParameters,
        appConfig.constants.METAMASK_GAS_LIMIT_AGREEMENT
      );
      if (txId != null) {
        Swal.fire({
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#EB1D36",
            customClass: {
                title: "text-white",
            },
          title: `Check your transaction in the blockchain!`,
          icon: "success",
          confirmButtonText: "Check in HashScan",
          preConfirm: () => window.open(`https://hashscan.io/testnet/transaction/${txId}`),
        });
      } else {
        Swal.close();
      }
    } catch (error) {
      console.error("Sign Agreement Failed:", error);
    }
  };

  useEffect(() => {
    if (id) fetchAgreementById();
  }, [id, walletInterface]);

  const getIPFSLink = (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash}`;

  // EVM address of the connected wallet
  const userEVMAddress = accountId ? convertAccountIdToSolidityAddress(AccountId.fromString(accountId)) : "";

  // Check if user is the creator
  const isCreator = agreement?.creator.toLowerCase() === userEVMAddress.toLowerCase();

  // Check if user is a participant
  const isParticipant = agreement?.signatories.some(
    (signatory) => signatory.toLowerCase() === userEVMAddress.toLowerCase()
  );

  // Check if user has signed
  const hasSigned = agreement?.hasSignedsignatories.some(
    (signed) => signed.toLowerCase() === userEVMAddress.toLowerCase()
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-[150px]">
      {loadingGetAgreement ? (
         <div className="flex justify-center items-center">
        
       </div>
      ) : agreement ? (
        <div className="p-6 border rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-4">Agreement Details</h1>
          <p>
            <strong>ID:</strong> {agreement.id.toString()}
          </p>
          <p>
            <strong>Title:</strong> {agreement.title}
          </p>
          <p>
            <strong>Creator:</strong> {agreement.creator}
          </p>
          <p>
            <strong>Status:</strong> {agreement.completed ? "Completed" : "Pending"}
          </p>


          {/* Conditional Buttons */}
          {isCreator && !agreement.completed  && !agreement.attachedNFTs ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => console.log("Attach e-Materai")}
            >
              Attach e-Materai (Optional)
            </button>
          ) : isCreator && agreement.attachedNFTs ?    <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4" disabled>
                 Attached e-Materai
                 </button> :  null}


{agreement.attachedNFTs.length > 0 ? 
           (
             <a href={`https://hashscan.io/testnet/token/${agreement.attachedNFTs}/${agreement.serialNumbers}`}>
                <p>
                   <strong>E-Materai NFT: { agreement.attachedNFTs}</strong>{" "}
                   <p>
                   <strong>Serial Number:</strong> {  agreement.serialNumbers.toString()}
                 </p>
                 </p>
                </a> 
           )
          : null}





          {isParticipant && !hasSigned && !agreement.completed ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={handleSignAgreement}
            >
              Sign Agreement
            </button>
          ) : null}

          {isParticipant && hasSigned ? (
            <button className="bg-green-400 text-white px-4 py-2 rounded-lg mt-4" disabled>
              Signed
            </button>
          ) : null}

          

          <p>
            <strong>Participants:</strong>
          </p>
          <ul className="list-disc ml-5">
            {agreement.signatories.map((signatory: string, index: number) => (
              <li key={index}>{signatory}</li>
            ))}
          </ul>

          <p>
            <strong>Signed:</strong>
          </p>
          <ul className="list-disc ml-5">
            {agreement.hasSignedsignatories.map((signedSignatory: string, index: number) => (
              <li key={index}>{signedSignatory}</li>
            ))}
          </ul>

          <p>
            <strong>IPFS Document:</strong>{" "}
            {agreement.ipfsHash ? (
              <iframe
                src={getIPFSLink(agreement.ipfsHash)}
                width="100%"
                height="500px"
                title="Agreement PDF"
                className="mt-4 border rounded"
              />
            ) : (
              "No document attached"
            )}
          </p>
        </div>
      ) : (
        <p>Agreement not found.</p>
      )}
    </div>
  );
};

export default AgreementDetails;
