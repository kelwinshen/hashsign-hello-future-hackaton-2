import { useEffect, useState } from "react";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { PinataSDK } from "pinata-web3";
import { appConfig } from "../config";
import { AccountId } from "@hashgraph/sdk";


// Initialize Pinata SDK with environment variables (Have to store in server actually!!! Just demo and its access service is also limited)
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YWE2ZmY0Yy1lOGI5LTQzYzktYmRhMi0zMjNlYTMxY2JlMmUiLCJlbWFpbCI6ImtlbHdpbndpdGhzaGVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwODJiOGNiNzNhNjc4MTY1OWUwOCIsInNjb3BlZEtleVNlY3JldCI6ImJiMDJiMTA0ODJkMzI4YjBiOWMwNjVmZTJlNTIyMWY4M2YxNzU5ZTAyNWQ1N2ZkODhhMzUxODU0MjY3NzQ2YmEiLCJleHAiOjE3NjYwNTIwNTR9.-hL6bfQeQ9Ti59woigS_KRwipwv90SAgmDioj9KVrek",
  pinataGateway: "brown-legislative-dove-71.mypinata.cloud",
});


const CreateAgreement = () => {
  const { accountId, walletInterface } = useWalletInterface();

  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);


  const convertAccountIdToSolidityAddress = (accountId: AccountId) => {
    const accountIdString =
      accountId.evmAddress !== null
        ? accountId.evmAddress.toString()
        : accountId.toSolidityAddress();
    return `0x${accountIdString}`;
  };


  useEffect(() => {
    if(!walletInterface) {
        setParticipants([])
        return;
    }
    const creatorEVMAddress = accountId.includes(".") ?  convertAccountIdToSolidityAddress(AccountId.fromString(accountId) ) : accountId;
    setParticipants([creatorEVMAddress])

  }, [accountId, walletInterface])
  


  // Handle file drop
  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length && acceptedFiles[0].type === "application/pdf") {
      setPdfFile(acceptedFiles[0]);
    } else {
      Swal.fire("Error", "Only PDF files are allowed.", "error");
    }
  };

  // Validate Ethereum address
  const isValidAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

  // Add participant
  const addParticipant = () => {
    if (isValidAddress(currentAddress) && !participants.find((element)=>(element == currentAddress.toLowerCase()))) {
      setParticipants([...participants, currentAddress.toLowerCase()]);
      setCurrentAddress("");
    } else {
      Swal.fire("Error", "Invalid Ethereum address format or already added!", "error");
      Swal.fire({
        background: "#212529",
        iconColor: "#ffffff",
        confirmButtonColor: "#EB1D36",
        customClass: {
            title: "text-white",
        },
       
        title: "Error",
        text: "Invalid Ethereum address format or already added!",
        icon: "error"
     
       
    });
    }
  };

  // Handle Create Agreement
  const handleCreateAgreement = async () => {
    

    if (!walletInterface) return;
    if (!pdfFile || !title || participants.length === 0) {
      
       
        
        Swal.fire({
          background: "#212529",
          iconColor: "#ffffff",
          confirmButtonColor: "#EB1D36",
          customClass: {
              title: "text-white",
          },
         
          title: "Error",
          text: "Not a PDF File",
          icon: "error"
       
         
      });
        return;
      }
      setUploading(true);

    try {
        Swal.fire({
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#EB1D36",
            customClass: {
                title: "text-white",
            },
           
            title: 'Confirm the transaction in your wallet\n&\n Wait for the processing.\n',
         
            showConfirmButton: true,
            allowOutsideClick: true,
            didOpen: () => {
                Swal.showLoading(); // Show the loading spinner
                
            }
        });

      // Upload PDF using Pinata
      const uploadResponse = await pinata.upload.file(pdfFile);
      const ipfsHash = uploadResponse.IpfsHash;
      
         // Create Agreement on Blockchain
      const functionParameters = new ContractFunctionParameterBuilder()
        .addParam({ type: "string", name: "title", value: title })
        .addParam({ type: "string", name: "ipfsHash", value: ipfsHash })
        .addParam({ type: "address[]",  name: "signatories" , value: participants});


      const txId = await walletInterface.createAgreement(
        functionParameters,
        appConfig.constants.METAMASK_GAS_LIMIT_AGREEMENT
      );

      if(txId != null){
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
          preConfirm: () => {
              // Action to perform when the button is clicked
              // For example, redirect to the transaction URL
              window.open(`https://hashscan.io/testnet/transaction/${txId}`);
          }
      });
       
      }  else{
        Swal.close();
      }


     
    } catch (error) {
      console.error("Error creating agreement:", error);
    
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Create New Agreement</h1>

      <label className="block mb-2 font-medium">Agreement Title</label>
      <input
        type="text"
        
         className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryColor"
        placeholder="Enter Agreement Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2 font-medium">Upload Agreement PDF</label>
      <Dropzone onDrop={handleFileDrop} accept={{ "application/pdf": [".pdf"] }}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="p-6 border-dashed border-2 rounded mb-4 cursor-pointer bg-white text-center"
          >
            <input {...getInputProps()} />
            {pdfFile ? (
              <p className="text-secondary font-medium">
                File uploaded: {pdfFile.name}
              </p>
            ) : (
              <p className="text-gray-500">Drag & drop a PDF file here, or click to upload</p>
            )}
          </div>
        )}
      </Dropzone>

      <label className="block mb-2 font-medium">
        Add Participants (EVM Address)
      </label>
      <div className="flex mb-4">
        <input
          type="text"
           className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryColor"
          placeholder="Enter EVM Address (0x...)"
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-primaryColor hover:bg-red-500 text-white rounded"
          onClick={addParticipant}
        >
          Add
        </button>
      </div>

      {/* List of Participants */}
      <ul className="list-disc ml-5 mb-4">
        {participants.map((address, index) => (
          <li key={index} className="text-sm text-gray-800">
            {address}
          </li>
        ))}
      </ul>

      {/* Create Agreement Button */}
      <button
        className={`w-full px-6 py-3 ${
          uploading ? "bg-gray-400" : "bg-primaryColor hover:bg-red-500"
        } text-white rounded font-medium`}
        disabled={uploading}
        onClick={async()=>{ handleCreateAgreement()}}
      >
        {uploading ? "Creating Agreement..." : "Create Agreement"}
      </button>
    </div>
  );
};

export default CreateAgreement;
