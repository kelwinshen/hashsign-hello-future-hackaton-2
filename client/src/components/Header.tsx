import { useState, useEffect, useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { WalletSelectionDialog } from "./WalletSelectionDialog";
import { metamaskHedera, walletConnectHedera, Profile, logo } from "../assets";
import { Icon } from "@iconify/react";

interface HeaderProps {
  _walletOpen: boolean;
  _setWalletOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ _walletOpen, _setWalletOpen }) => {
  const { accountId, walletInterface } = useWalletInterface();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleConnect = async () => {
    if (accountId) {
      walletInterface.disconnect();
    } else {
      _setWalletOpen(true);
    }
  };

  const formatAddress = (data: string) => {
    if (data.length > 10) {
      return data.slice(0, 5) + "..." + data.slice(-5);
    } else {
      return data;
    }
  };

  useEffect(() => {
    if (accountId) {
      _setWalletOpen(false);
    }
  }, [accountId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-sm relative z-50 px-8">
        <div className="flex flex-row justify-between items-center">
          {/* Logo */}
          <img src={logo} alt="Hash Sign" className="w-[150px]" />

          <div className="flex flex-row gap-4 items-center">
          

            {/* Wallet/Profile Section */}
            {accountId ? (
              <div className="relative flex items-center">
                <div
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  onClick={() => setIsMenuVisible((prev) => !prev)}
                >
                  <img
                    src={
                      accountId.includes(".")
                        ? walletConnectHedera
                        : metamaskHedera
                    }
                    alt="Wallet Icon"
                    className="h-6 w-6"
                  />
                  <div className="hidden md:flex flex-col">
                    <div className="flex flex-row items-center">
                      <h4 className="font-medium text-black">
                        {accountId.includes(".")
                          ? accountId
                          : formatAddress(accountId)}
                      </h4>
                      <Icon
                        icon="lsicon:down-filled"
                        
                        height="20"
                        className="ml-2 text-black"
                      />
                    </div>
                  </div>
                  <img src={Profile} alt="Profile" className="h-8 w-8 rounded-full" />
                </div>

                {/* Dropdown Menu */}
                {isMenuVisible && (
                  <div
                    ref={menuRef}
                    className="absolute top-12 right-0 w-56 backdrop-blur-lg bg-white shadow-lg rounded-[8px] py-2 border-[0.3px]"
                  >
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-black hover:bg-gray-100"
                      onClick={() => {
                        handleConnect();
                        setIsMenuVisible(false);
                      }}
                    >
                      <span>Disconnect</span>
                      <FiLogOut size={"20px"} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="flex flex-row gap-2 items-center rounded-lg bg-primaryColor px-4 py-2 text-white"
              >
                <Icon icon="mdi:wallet" className="w-6 h-6 text-white" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Wallet Dialog */}
      {_walletOpen && <WalletSelectionDialog _setWalletOpen={_setWalletOpen} />}
    </>
  );
};

export default Header;
