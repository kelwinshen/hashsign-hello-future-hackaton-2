const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

// SETTINGS
const network = "testnet";
const rpcUrl = `https://${network}.hashio.io/api`;
const explorerURL = `https://hashscan.io/${network}`;
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);

// Load ABI and Bytecode
const abi = JSON.parse(fs.readFileSync("./contracts/artifacts/HashSign.abi").toString());
const bytecode = fs.readFileSync("./contracts/artifacts/HashSign.bin").toString();



async function main() {
    try {
        console.log("\n=== Deploying HashSign Contract ===\n");

        

        // Deploy the contract
        const gasLimit = 10000000;
        const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
        const deployTx = await contractFactory.deploy({ gasLimit });
        console.log(`Transaction sent: ${deployTx.deployTransaction.hash}`);
        const deployedContract = await deployTx.deployTransaction.wait();
        const contractAddress = deployedContract.contractAddress;
        console.log(`Contract deployed to address: ${contractAddress}`);
        console.log(`See details on HashScan: ${explorerURL}/address/${contractAddress}\n`);

        // Initialize contract instance
        const hashSignContract = new ethers.Contract(contractAddress, abi, signer);

        // Associate NFT
        console.log("Associating NFT e-Materai...");
        const nftAddress = "0x0000000000000000000000000000000000505bc6";
        const associateTx = await hashSignContract.associateNFT(nftAddress);
        await associateTx.wait();
        console.log("NFT token successfully associated with the smart contract\n");


        const nftAbi = [
            "function approve(address to, uint256 tokenId) external"
        ];
        
        const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
        

        // Create Agreement
        console.log("- Creating a new agreement...");
        const title = "Agreement of Travybug"
        const ipfsHashes = "bafybeih2fo7c4av4jionmbnbgamhbcjruzfxbo6a5zbeb7rndyayxlqet4";
        const signatories = [
            "0xD74012E54b054093563249a2B4fD1e3b3cBf6a12",
        ];
        const createTx = await hashSignContract.createAgreement(title, ipfsHashes, signatories);
        console.log(`Transaction sent: ${createTx.hash}`);
        await createTx.wait();
        console.log("Agreement created successfully!\n");

        const agreementId = 1;

           // Attach NFT
           const serialNumber = 9;

           console.log("Approving NFT...");
        
           // Call approve function
           const approveTx = await nftContract.approve(hashSignContract.address, serialNumber,  {gasLimit: gasLimit});
           await approveTx.wait();
       
           console.log("NFT approved successfully!");


           console.log(`- Attaching NFT to the agreement with ID ${agreementId}...`);
           const attachTx = await hashSignContract.attachNFT(agreementId, nftAddress, serialNumber, {gasLimit: gasLimit});
           console.log(`Transaction sent: ${attachTx.hash}`);
           await attachTx.wait();
           console.log("NFT attached successfully!\n");

         // Sign Agreement
       
         console.log(`- Signing the agreement with ID ${agreementId}...`);
         const signTx = await hashSignContract.signAgreement(agreementId);
         console.log(`Transaction sent: ${signTx.hash}`);
         await signTx.wait();
         console.log("Agreement signed successfully!\n");
       

        // Fetch Agreement Details
        console.log(`- Fetching details for agreement ID ${agreementId}...`);
        const agreement = await hashSignContract.getAgreement(agreementId);
        console.log(agreement);
        const agreementByAddress = await hashSignContract.getAgreementByAddress(signer.address);
        console.log(agreementByAddress);
        
        console.log("\n=== Interaction Complete ===");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);
