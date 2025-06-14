const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

// SETTINGS
const network = "testnet";
const nftContractAddress = "0x0000000000000000000000000000000000505bc6"; //Materai Address
const hidrTokenAddress = "0x0000000000000000000000000000000000478662"; // HIDR Token Address
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = `https://${network}.hashio.io/api`;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);

// Load ABI and Bytecode
const abi = fs.readFileSync("./contracts/artifacts/MateraiMarketPlace.abi").toString();
const bytecode = fs.readFileSync("./contracts/artifacts/MateraiMarketPlace.bin").toString();

async function main() {
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

   

   
    let gasLimit = 10000000;
    // // // Deploy Contract
    console.log("\n=== Deploying Materai Marketplace Contract ===\n");
    const Contract = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await Contract.deploy(nftContractAddress, hidrTokenAddress);
    await contract.deployTransaction.wait();

    console.log(`Contract deployed at: ${contract.address}`);
    console.log(`See details on HashScan: https://hashscan.io/${network}/address/${contract.address}\n`);

    // Associate HIDR Token with Contract
    console.log("Associating HIDR Token...");
    const associateTx = await contract.associateHIDRToken();
    await associateTx.wait();
    console.log("HIDR Token associated successfully!");

    //  const contractAddress = "0x473e631CD927030bfc89040d219ba4fa46d1139c";
    // const contract = new ethers.Contract(contractAddress, abi, signer);

    // //Associate e-Materai NFT with Contract
    console.log("Associating NFT e-Materai...");
    const associateTx2 = await contract.associateNFT({gasLimit: gasLimit});
    await associateTx2.wait();
    console.log("NFT token successfully associated with the smart contract");

    //   Approve the contract to spend HIDR tokens
      console.log(`- Approving HIDR tokens...\n`);
      const approveTx1 = await hidrToken.functions.approve(contractAddress, 100000000);
      await approveTx1.wait();
      console.log(`- Approval of HIDR tokens successful to contract.\n`);

    
    // Add NFTs to Inventory
    console.log("\nAdding NFTs to inventory...");
    const serialNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
       ; // Example NFT serial numbers
    const addNFTsTx = await contract.addNFTsToInventory(serialNumbers);
    await addNFTsTx.wait();
    console.log("NFTs added to inventory!");

    // Buyer Buys an NFT
    console.log("\nBuyer purchasing NFT...");
    const buyNFTTx = await contract.buyNFT(2 ,{gasLimit: gasLimit});
    await buyNFTTx.wait();
    console.log("NFT purchased successfully!");

    // // Withdraw HIDR
    console.log("\nWithdrawing HIDR...");
    const withdrawTx = await contract.withdrawHIDR(11900); // Amount to withdraw
    await withdrawTx.wait();
    console.log("HIDR withdrawn successfully!");
}

main().catch(console.error);
