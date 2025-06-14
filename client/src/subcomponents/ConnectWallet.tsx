

import React from 'react';

// Define the props type
interface ConnectWalletButtonrProps {
  children?: React.ReactNode;
}

function ConnectWalletButton({ children }: ConnectWalletButtonrProps) {
  return (
    <div className='fixed w-full'>
      {children}
    </div>
  );
}

export default ConnectWalletButton;
