// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./HederaTokenService.sol";
import "./HederaResponsesCodes.sol";

contract MateraiMarketplace is HederaTokenService, Ownable {
    address public hidrTokenAddress;
    uint256 public nftPrice = 11900; // Price per NFT in HIDR (smallest unit)
    address public nftContractAddress;
    uint256[] public availableNFTs;

    event NFTBought(address buyer, uint256 serialNumber);
    event HIDRWithdrawn(address owner, uint256 amount);
    event TokenAssociated(address contractAddress, address tokenAddress);

    constructor(address _nftContractAddress, address _hidrTokenAddress)
        Ownable(msg.sender) // Pass the deployer's address to the Ownable constructor
    {
        nftContractAddress = _nftContractAddress;
        hidrTokenAddress = _hidrTokenAddress;
    }

    // Associate HIDR Token with Contract
    function associateHIDRToken() external onlyOwner {
        int256 response = HederaTokenService.associateToken(address(this), hidrTokenAddress);
        require(response == HederaResponseCodes.SUCCESS, "Token Association Failed");
        emit TokenAssociated(address(this), hidrTokenAddress);
    }

     //Associate NFT
    function associateNFT() external onlyOwner {
    int response = HederaTokenService.associateToken(address(this), nftContractAddress);
    require(response == HederaResponseCodes.SUCCESS, "Token association failed");
}
 
    // Add e-Materai NFTs to sale inventory
    function addNFTsToInventory(uint256[] memory serialNumbers) external onlyOwner {
        for (uint256 i = 0; i < serialNumbers.length; i++) {
            availableNFTs.push(serialNumbers[i]);
        }
    }

   function buyNFT(uint256 serialNumber) external {
        require(isAvailable(serialNumber), "NFT not available");

        // Transfer HIDR from buyer to contract
        int256 response = HederaTokenService.transferToken(
            hidrTokenAddress,
            msg.sender,
            address(this),
            int64(uint64(nftPrice))
        );
        require(response == HederaResponseCodes.SUCCESS, "HIDR transfer failed");

        // Transfer NFT to the buyer
        int256 nftTransferResponse = HederaTokenService.transferNFT(
            nftContractAddress,
            address(this),
            msg.sender,
            int64(uint64(serialNumber))
        );
        require(nftTransferResponse == HederaResponseCodes.SUCCESS, "NFT transfer failed");

        // Remove NFT from inventory
        removeFromInventory(serialNumber);

        // Emit event
        emit NFTBought(msg.sender, serialNumber);
    }

    // Withdraw HIDR tokens
    function withdrawHIDR(uint256 amount) external onlyOwner {
        int256 response = HederaTokenService.transferToken(
            hidrTokenAddress,
            address(this),
            msg.sender,
            int64(uint64(amount))
        );
        require(response == HederaResponseCodes.SUCCESS, "HIDR withdrawal failed");

        emit HIDRWithdrawn(msg.sender, amount);
    }

    // Helper function to check if an NFT is available
    function isAvailable(uint256 serialNumber) internal view returns (bool) {
        for (uint256 i = 0; i < availableNFTs.length; i++) {
            if (availableNFTs[i] == serialNumber) {
                return true;
            }
        }
        return false;
    }

    // Helper function to remove an NFT from inventory
    function removeFromInventory(uint256 serialNumber) internal {
        for (uint256 i = 0; i < availableNFTs.length; i++) {
            if (availableNFTs[i] == serialNumber) {
                availableNFTs[i] = availableNFTs[availableNFTs.length - 1];
                availableNFTs.pop();
                break;
            }
        }
    }

   

}
