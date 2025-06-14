import React from 'react';

// Define the props type
interface AppBarProps {
  children?: React.ReactNode;
}

function AppBar({ children }: AppBarProps) {
  return (
    <div className=' fixed w-full z-50'>
      {children}
    </div>
  );
}

export default AppBar;
