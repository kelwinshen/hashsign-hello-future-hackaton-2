import React from "react";

const statusBar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {

    
    const greenStatus = ['Complete', 'Signed']; // Status apa aja yang warna hijau
    const yellowStatus = ['Pending', 'Not Signed']; // Status apa aja yang warna kuning
    let statusColor = '';

    // Set status color jika children sesuai dengan tiap Color Status
    if (children === greenStatus[0] || children === greenStatus[1]) {
         statusColor = "bg-[#D6E9D1] text-[#628A55]";
    }else if (children === yellowStatus[0] || children === yellowStatus[1]) {
        statusColor = "bg-[#E9E8D1] text-[#5D5B24]";
    }

  return (
    <>
      <div
        className={`${statusColor} px-2 py-1 text-sm md:text-base rounded flex items-center justify-center ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default statusBar;
