import axios from "axios";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import {  useEffect, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { appConfig } from "../config";
import Swal from "sweetalert2";
import { ContractFunctionParameterBuilder } from "../services/wallets/contractFunctionParameterBuilder";
import { hidrIcon } from "../assets";

const MateraiMarketPlacePage = () => {
    const { accountId, walletInterface } = useWalletInterface();   
    const navigate = useNavigate();

    const [hidrBalance, setHidrBalance] = useState(0);
    const [materaiAmount, setMateraiAmount] = useState(0);
    const [nftsForToken, setNftsForToken] = useState<{accountId: string; metaData: string; serial_number: number  }[]>([]);

   

    const getAccountBalances = async (accountId: string, tokenId: string): Promise<{ tokenBalance: number;}> => {
        if (!walletInterface && accountId) {
            return {tokenBalance: -1};
        }
        try {
            const response = await axios.get(`${appConfig.constants.API_BASE_URL}/accounts/${accountId}`);
            const tokens = response.data.balance.tokens as Array<{ token_id: string; balance: number }>;

           
             const tokenBalance =  tokens.find(token => token.token_id === tokenId)?.balance ?? -1;
        
  
            return  {tokenBalance} ;


        } catch (error) {
            console.error('Error fetching account balances:', error);
            return { tokenBalance: -1, };
        }
    };


    const getEMateraiList = async () =>  {
       
        const response = await axios.get(`${appConfig.constants.API_BASE_URL}/tokens/${appConfig.constants.NFT_E_MATERAI_ID}/nfts?account.id=${appConfig.constants.SMARTCONTRACT_MATERAI_MARKET_PLACE_ID}&limit=100`);
        return response.data.nfts;
      
    };


      const handleNotConnectWallet = () => {
        Swal.fire({
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#EB1D36",
            customClass: {
                title: "text-white",
            },
            title: `Wallet Not Connected!`,
            text: "Please connect your wallet to interact with the dApp",
            icon: "info",
            confirmButtonText: "Got it",
            
        });
      }


      const handleInsufiecientHIDR = () => {
        Swal.fire({
            background: "#212529",
            iconColor: "#ffffff",
            confirmButtonColor: "#EB1D36",
            customClass: {
                title: "text-white",
            },
            title: `Insufient HIDR`,
            text: "Do you want swap HBAR to HIDR with XenHash?",
            icon: "question",
            confirmButtonText: "Swap",
            preConfirm: () => {
                // Action to perform when the button is clicked
                // For example, redirect to the transaction URL
                window.open(`https://dapp.xenhash.finance`);
            }
        });
      }


    const associateAccountToHIDR = async () => {
        if (!walletInterface) return;
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
      
            const txId = await walletInterface.associateHIDR();

            if(txId != null){

                getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({tokenBalance})=>{
                    setHidrBalance(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch balances:', error);
                });
    
                getAccountBalances(accountId, appConfig.constants.NFT_E_MATERAI_ID).then(({tokenBalance})=>{
                    setMateraiAmount(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch balances:', error);
                });

                
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


            
           
        
          console.log("Associate account to HIDR successful, TxID:", txId);
        } catch (error) {
          console.error("Associate account to HIDR failed:", error);
        }
      };


    const  associateAccountToEMaterai = async () => {
        if (!walletInterface) return;
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
      
            const txId = await walletInterface.associateEMateraiNFT();

            if(txId != null){
                getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({tokenBalance})=>{
                    setHidrBalance(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch balances:', error);
                });
    
                getAccountBalances(accountId, appConfig.constants.NFT_E_MATERAI_ID).then(({tokenBalance})=>{
                    setMateraiAmount(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch balances:', error);
                });

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


           

           

          console.log("Associate account to HIDR successful, TxID:", txId);
        } catch (error) {
          console.error("Associate account to HIDR failed:", error);
        }
      };


      const buyNFTMateraiHandle = async (serialNumber: number) => {
        if (!walletInterface) return;
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
        const functionParameters = new ContractFunctionParameterBuilder()
        .addParam({ type: "uint256", name: "id", value: serialNumber});

            const txId = await walletInterface.buyNFT(functionParameters, appConfig.constants.METAMASK_GAS_LIMIT_AGREEMENT);

            if(txId != null){
                getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({tokenBalance})=>{
                    setHidrBalance(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch HIDR balances:', error);
                });
    
                getAccountBalances(accountId, appConfig.constants.NFT_E_MATERAI_ID).then(({tokenBalance})=>{
                    setMateraiAmount(tokenBalance);
                }) .catch(error => {
                    console.error('Failed to fetch Materai amount:', error);
                });
                getEMateraiList().then((materaiList)=>{
                    setNftsForToken(materaiList);
                }).catch(error => {
                    console.error('Failed to fetch materaiList:', error);
                });
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


           

          console.log("Buy NFT Successful, TxID:", txId);
        } catch (error) {
          console.error("Buy NFT failed:", error);
        }
      };


    useEffect(() => {
        if(accountId){
            getAccountBalances(accountId, appConfig.constants.HIDR_TOKEN_ID).then(({tokenBalance})=>{
                setHidrBalance(tokenBalance);
            }) .catch(error => {
                console.error('Failed to fetch balances:', error);
            });

            getAccountBalances(accountId, appConfig.constants.NFT_E_MATERAI_ID).then(({tokenBalance})=>{
                setMateraiAmount(tokenBalance);
            }) .catch(error => {
                console.error('Failed to fetch balances:', error);
            });
           
        }

        getEMateraiList().then((materaiList)=>{
            setNftsForToken(materaiList);
        }).catch(error => {
            console.error('Failed to fetch materaiList:', error);
        });

      }, [walletInterface, navigate, accountId]);






    

  return (
   

    <div className="w-full  px-8 py-12 container mx-auto pt-150px ">
     
     <div className="my-8 gap-4 flex flex-col md:flex-row justify-between">
     
       
        <div className="w-full md:w-3/6 bg-[#363d4a] justify-between flex py-8 px-6 shadow-sm rounded-xl">
        {walletInterface ?   <h4 className="font-medium text-2xl text-primaryColor">HIDR & e-Materai Balance</h4>  : null}

          <div className="flex flex-col gap-3 py-8">
         
          {walletInterface && hidrBalance != -1 ?      <div className="flex flex-row gap-2 items-center">
              <img src={hidrIcon} alt="HIDR" className="w-8 h-8" />
              <p className="font-medium text-white">
                {hidrBalance}{" "}
                <span className="font-bold">HIDR</span>
                
              </p>
              </div>:    walletInterface ?  <div className="text-white">Associate HIDR to show the balance </div> : <div className="text-white">Connect Wallet to show HIDR & NFT e-Materai balance</div> }

            
            {walletInterface && hidrBalance == -1 ? <button className="bg-primaryColor text-white py-2 px-4 rounded-md " onClick={()=>{associateAccountToHIDR()}}>Associate HIDR</button> : null}

           
            {walletInterface && materaiAmount != -1 ?   <div className="flex flex-row gap-2 items-center">
              <img src={`https://gateway.pinata.cloud/ipfs/${"bafkreiglkbptfzquzh4vs3gsf5ijutaiq5xrnhhe5ufnbkajvamw6gfeo4"}`} alt="HBAR" className="w-8 h-8" />
              <p className="font-medium text-white">
                {materaiAmount}{" "}
                <span className="font-bold text-white">e-Materai NFT</span>
              </p>
            </div> : walletInterface ? <div className="text-white">Associate e-Materai to show the balance</div> : <div></div>}
            {walletInterface && materaiAmount == -1 ? <button className="bg-primaryColor text-white py-2 px-4 rounded-md " onClick={()=>{associateAccountToEMaterai()}}>Associate e-Materai</button> : null}
          </div> 
        

         

         
        </div>
      </div>

     
        
<div className="grid grid-rows-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
    
        {  nftsForToken.map((nft) => {
         
          return (
            <div key={nft.serial_number} className="bg-white  rounded-lg py-8 px-6 shadow-sm">
            <img src={`https://gateway.pinata.cloud/ipfs/${"bafkreiglkbptfzquzh4vs3gsf5ijutaiq5xrnhhe5ufnbkajvamw6gfeo4"}`}  alt={`NFT ${nft.serial_number}`} className="w-full- h-auto" />
            <h3 className="font-medium pt-3">E-Materai Indonesia Legal</h3>
            <p className="flex flex-row justify-between pt-4">
              <span className="text-sm">
                Serial Number: {nft.serial_number}
              </span>
            
            </p> {
            walletInterface && materaiAmount == -1 ? <button className="mt-4 px-4 py-2 bg-primaryColor text-white rounded" onClick={()=>{associateAccountToEMaterai();}}>
                Associate e-Materai
            </button > :  walletInterface  && hidrBalance >= 11900 ? <button   className="mt-4 px-4 py-2 bg-primaryColor text-white rounded" onClick={() => {buyNFTMateraiHandle(nft.serial_number)}}>
             11900 HIDR
            </button>  :  walletInterface  && hidrBalance < 11900 ?   <button   className="mt-4 px-4 py-2 bg-primaryColor text-white rounded" onClick={() => {handleInsufiecientHIDR();}}>
             11900 HIDR
            </button> :  <button   className="mt-4 px-4 py-2 bg-primaryColor text-white rounded" onClick={() => {handleNotConnectWallet();}}>
             11900 HIDR
            </button> }

            
        

    

            </div>
          );
        }) }
      </div>

        

        </div>
  )
}

export default MateraiMarketPlacePage






