import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


// import AgreementDetails from "./pages/ShareAgreementDetailsPage";
import MateraiMarketPlacePage from "./pages/MateraiMarketPlacePage";
import CreateAgreementPage from "./components/CreateAgreement";
import Dapp from "./pages/Dapp";


interface AppRouterProps {
 
  _setWalletOpen: (value: boolean) => void;
}


const AppRouter: React.FC<AppRouterProps> = ({ }) => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dapp />} />
      {/* <Route path="/agreement/:id" element={<AgreementDetails />} /> */}
      <Route path="/stamp-store" element={<MateraiMarketPlacePage />} />
      <Route path="/create-agreement" element={<CreateAgreementPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter;

