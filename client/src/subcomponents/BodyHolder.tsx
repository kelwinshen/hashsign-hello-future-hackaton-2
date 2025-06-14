import React from 'react';

// Define the props type
interface BodyHolderProps {
  children?: React.ReactNode;
}

function BodyHolder({ children }: BodyHolderProps) {
  return (
    <div>
      {children}
    </div>
  );
}

export default BodyHolder;
