import { useEffect, useState } from "react";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import SideMenu from "../components/SideMenu";
import DashboardContent from "../components/DashboardContent";
import AllDocument from "../components/AllDocument";
import DetailInfo from "../components/DetailInfo";
import CreateAgreement from "../components/CreateAgreement";
import { Issuer, Signer, logo, noAgreement } from "../assets";

const Dapp: React.FC = () => {
  const { accountId, walletInterface } = useWalletInterface();

  const [agreements, setAgreements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState("progress");

  // Fetch agreements data
  const fetchAgreements = async () => {
    if (!walletInterface) return;

    setLoading(true);
    try {
      const agreementsData = await walletInterface.getAgreementsByAddress();
      const formattedAgreements = agreementsData?.agreements.map(
        (agreement: any) => ({
          id: Number(agreement[0]),
          title: agreement[1],
          completed: agreement[2],
          ipfsHash: agreement[3],
          hasSigned: agreement[4],
        })
      );
      setAgreements(formattedAgreements);
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the menu changes or wallet/account is updated
  useEffect(() => {
    if (activeMenu === "progress" || activeMenu === "completed") {
      fetchAgreements();
    }
  }, [activeMenu, walletInterface, accountId]);

  const filteredAgreements =
    activeMenu === "completed"
      ? agreements.filter((a) => a.completed)
      : agreements.filter((a) => !a.completed);

  const documentContent = filteredAgreements.map((agreement) => ({
    id: agreement.id,
    role: agreement.hasSigned ? Signer : Issuer,
    nameDocument: agreement.title,
    agreementStatus: agreement.completed ? "Complete" : "Pending",
    signStatus: agreement.hasSigned ? "Signed" : "Not Signed",
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      {walletInterface ? (
        <div className="flex flex-row h-screen">
          {/* Sidebar */}
          <SideMenu
            onMenuClick={(menu) => {
              setSelectedAgreement(null); // Reset selected agreement
              setActiveMenu(menu);
            }}
            activeMenu={activeMenu}
          />

          {/* Content */}
          <DashboardContent>
            {activeMenu === "create" ? (
              <CreateAgreement />
            ) : !selectedAgreement ? (
              <>
                {loading ? (
                  <div className="flex flex-col justify-center items-center min-h-[600px] space-y-4">
                  <div className="animate-spin-slow">
                    <img src={logo} alt="Hash Sign" className="w-[150px] h-[150px]" />
                  </div>
                  <p className="text-lg font-semibold text-primaryColor animate-pulse">
                    {"Loading agreements..."}
                  </p>
                </div>
                ) : filteredAgreements.length > 0 ? (
                  <AllDocument
                    documentContent={documentContent}
                    onRowClick={(id) => setSelectedAgreement(id)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center mt-12">
                    <img src={noAgreement} alt="No Agreements Found" className="w-48 h-48 mb-4" />
                    <p className="text-lg text-center text-gray-600">
                      No {activeMenu === "completed" ? "completed" : "progress"} agreements found.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <DetailInfo agreementId={selectedAgreement} onBack={() => setSelectedAgreement(null)} />
            )}
          </DashboardContent>
        </div>
      ) : (

        <div className="flex flex-col justify-center items-center min-h-[600px] space-y-4">
        <div>
          <img src={logo} alt="Hash Sign" className="w-[150px] h-[150px]" />
        </div>
        <h2 className="text-xl font-semibold">Ooopss...</h2>
        <h2 className="text-xl font-semibold">Connect your wallet to interact with the dApp.</h2>
       
       
        
      </div>


      )}
    </div>
  );
};

export default Dapp;
