// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import "./IHederaTokenService.sol";
import "./HederaTokenService.sol";

contract HashSign is HederaTokenService {
    address public owner;

    struct Agreement {
        uint256 id;
        string title; // Added title for the agreement
        address creator;
        address[] signatories;
         address[] hasSignedsignatories;
        bool completed;
        address[] attachedNFTs;
        uint256[] serialNumbers; // Added serial numbers of NFTs
        string ipfsHash;
    }

    struct AgreementDetail {
        uint256 id;
        string title; // Title included in the details
        bool completed;
        string ipfsHash;
        bool hasSigned; // Indicates if the user has signed the agreement
    }

    mapping(uint256 => Agreement) public agreements;
    mapping(uint256 => mapping(address => bool)) public hasSigned;

    uint256 public agreementCount;

    event AgreementCreated(uint256 id, string title, address creator, string ipfsHash);
    event AgreementSigned(uint256 id, address signatory);
    event NFTAttached(uint256 agreementId, address nftAddress, uint256 serialNumber);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier agreementExists(uint256 agreementId) {
        require(agreements[agreementId].id == agreementId, "Agreement does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to create an agreement with title
    function createAgreement(
        string memory title,
        string memory ipfsHash,
        address[] memory signatories
    ) external {
        agreementCount++;
        agreements[agreementCount] = Agreement(
            agreementCount,
            title,
            msg.sender,
            signatories,
               new address[](0),
            false,
            new address[](0),
            new uint256[](0) , 
            ipfsHash
        );
        emit AgreementCreated(agreementCount, title, msg.sender, ipfsHash);
    }

    // Function to sign an agreement
       // Function to sign an agreement
    function signAgreement(uint256 agreementId) external agreementExists(agreementId) {
        Agreement storage agreement = agreements[agreementId];
        require(!agreement.completed, "Agreement already completed");

        // Ensure the sender is a valid signatory
        bool isSignatory = false;
        for (uint256 i = 0; i < agreement.signatories.length; i++) {
            if (agreement.signatories[i] == msg.sender) {
                isSignatory = true;
                break;
            }
        }
        require(isSignatory, "Not an authorized signatory");

        // Prevent duplicate signing
        require(!hasSigned[agreementId][msg.sender], "Already signed this agreement");

        // Mark the sender as signed
        hasSigned[agreementId][msg.sender] = true;

        // Add the address to hasSignedsignatories
        agreement.hasSignedsignatories.push(msg.sender);

        // Check if all signatories have signed
        bool allSigned = true;
        for (uint256 i = 0; i < agreement.signatories.length; i++) {
            if (!hasSigned[agreementId][agreement.signatories[i]]) {
                allSigned = false;
                break;
            }
        }

        // Mark the agreement as completed if all have signed
        if (allSigned) {
            agreement.completed = true;
        }

        emit AgreementSigned(agreementId, msg.sender);
    }

    // Function to attach an NFT to an agreement
    function attachNFT(
        uint256 agreementId,
        address nftAddress,
        uint256 serialNumber
    ) external agreementExists(agreementId) {
        Agreement storage agreement = agreements[agreementId];
        require(msg.sender == agreement.creator, "Only creator can attach NFT");
        require(!agreement.completed, "Agreement already completed");

        agreement.attachedNFTs.push(nftAddress);
        agreement.serialNumbers.push(serialNumber); // Add the serial number

        int256 responseCode = HederaTokenService.transferNFT(
            nftAddress,
            msg.sender,
            address(this),
            int64(uint64(serialNumber))
        );

        require(responseCode == HederaResponseCodes.SUCCESS, "NFT transfer failed");

        emit NFTAttached(agreementId, nftAddress, serialNumber);
    }

    // Function to get agreement details by agreement ID
    function getAgreement(uint256 agreementId)
        external
        view
        agreementExists(agreementId)
        returns (
            uint256 id,
            string memory title,
            address creator,
            address[] memory signatories,
            address [] memory hasSignedsignatories,
            bool completed,
            address[] memory attachedNFTs,
            uint256[] memory serialNumbers,
            string memory ipfsHash
        )
    {
        Agreement memory agreement = agreements[agreementId];

        return (
            agreement.id,
            agreement.title,
            agreement.creator,
            agreement.signatories,
            agreement.hasSignedsignatories,
            agreement.completed,
            agreement.attachedNFTs,
            agreement.serialNumbers,
            agreement.ipfsHash
        );
    }

    // Function to get agreements by user address
    function getAgreementsByAddress(address user)
        external
        view
        returns (AgreementDetail[] memory)
    {
        uint256 count = 0;

        // First, count how many agreements involve the user
        for (uint256 i = 1; i <= agreementCount; i++) {
            Agreement memory agreement = agreements[i];
            for (uint256 j = 0; j < agreement.signatories.length; j++) {
                if (agreement.signatories[j] == user) {
                    count++;
                    break;
                }
            }
        }

        // Prepare the result array
        AgreementDetail[] memory results = new AgreementDetail[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= agreementCount; i++) {
            Agreement memory agreement = agreements[i];
            for (uint256 j = 0; j < agreement.signatories.length; j++) {
                if (agreement.signatories[j] == user) {
                    results[index] = AgreementDetail({
                        id: agreement.id,
                        title: agreement.title,
                        completed: agreement.completed,
                        ipfsHash: agreement.ipfsHash,
                        hasSigned: hasSigned[agreement.id][user]
                    });
                    index++;
                    break;
                }
            }
        }

        return results;
    }

     // Function to associate an NFT contract
    function associateNFT(address nftContractAddress) external onlyOwner {
        int response = HederaTokenService.associateToken(address(this), nftContractAddress);
        require(response == HederaResponseCodes.SUCCESS, "Token association failed");
    }
}
