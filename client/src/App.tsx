import Footer from './components/Footer';
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider';
import AppRouter from './AppRouter';
import Header from './components/Header';
import BodyHolder from './subcomponents/BodyHolder';
import { useState } from 'react';



function App() {
  
  const [walletOpen, setWalletOpen] = useState(false);


  return (
      <AllWalletsProvider>
          <header>
          <Header _setWalletOpen={setWalletOpen} _walletOpen = {walletOpen}   />
          </header>
          <BodyHolder>
          <AppRouter _setWalletOpen={setWalletOpen}  />
          </BodyHolder>
          <Footer />
      </AllWalletsProvider>
 
  );
}

export default App;