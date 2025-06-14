import Swal from "sweetalert2";
import { Metamask, WalletConnect } from "../assets";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import { openWalletConnectModal } from "../services/wallets/walletconnect/walletConnectClient";

import { IoClose } from "react-icons/io5";


interface WalletSelectionDialogProps {
   
    _setWalletOpen: (value: boolean) => void;
   
  }

  
  export const  WalletSelectionDialog = (props: WalletSelectionDialogProps) => {
    const {  _setWalletOpen} = props;

  return (
   <div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="mx-5">
        <div className="container flex flex-col max-w-md gap-12 px-8 py-8 mx-auto bg-white rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-[#212529]">Connect Wallet</h1>
            <button onClick={()=>{_setWalletOpen(false)}}>
              <IoClose color="#212529" size={"20px"} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#212529]"  onClick={async() => {
              try {
               await connectToMetamask();
                
              } catch (error) {
                Swal.fire({
                  background: "#212529",
                  iconColor: "#ffffff",
                  confirmButtonColor: "#EB1D36",
                  customClass: {
                      title: "text-white",
                  },
                 
                  title: "Metamask not detected",
                
                  icon: "info"
               
                 
              });
              }
          }}>
              <span className="text-sm text-[#212529] font-medium">MetaMask</span>
              <img src={ Metamask} alt="MetaMask" className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-between p-4 border-2 rounded-xl hover:border-[#212529]" onClick={async() => {
           try {
            _setWalletOpen(false);
            await openWalletConnectModal();
            
           } catch (error) {
            Swal.fire({
              background: "#212529",
              iconColor: "#ffffff",
              confirmButtonColor: "#EB1D36",
              customClass: {
                  title: "text-white",
              },
             
              title: "Walletconnect not detected",
            
              icon: "info"
           
             
          });
           }
          }}>
              <span className="text-sm text-[#212529] font-medium">Wallet Connect</span>
              <img src={WalletConnect} alt="HashPack" className="w-8 h-8" />
            </div>
          </div>
          <div>
            <p className="text-[#212529] text-sm">By continuing, you agree to our <b>Terms</b> and <b>Privacy Policy</b>.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}




