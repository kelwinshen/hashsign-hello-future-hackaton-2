"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { AccessWallet, DocumentUpload, TrustwithKYC } from "@/assets";
import Image from "next/image";

const content = [
  {
    title: "Access with Wallet-Sign In",
    description:
      "HashSign transforms the login experience with easy access through digital wallets, removing the need for passwords. This approach boosts convenience, ensuring secure and authorized access while maintaining top-level security. Enjoy a seamless, trustworthy experience with HashSign",
    content: (
      <Image
        src={AccessWallet}
        alt="Trust with KYC"
        className="w-full h-auto saturate-0"
      />
    ),
  },
  {
    title: "Trust with KYC Authentication",
    description:
      "HashSign’s Know-Your-Customer (KYC) process ensures a secure environment for document signing. By verifying each user’s identity before uploading or signing documents, we minimize fraud risks, confirm authenticity, and enhance the platform’s credibility and reliability.",
    content: (
      <Image
        src={TrustwithKYC}
        alt="Trust with KYC"
        className="w-full h-auto saturate-0"
      />
    ),
  },
  {
    title: "Document Upload & Signing",
    description:
      "HashSign simplifies uploading and signing documents. Users can quickly upload PDF files and begin signing, eliminating physical paperwork and traditional methods. This saves time, reduces errors, and streamlines everything from legal contracts to personal documents, boosting overall efficiency.",
    content: (
      <Image
        src={DocumentUpload}
        alt="Trust with KYC"
        className="w-full h-auto saturate-0"
      />
    ),
  },
];
export function Benefits() {
  return (
    <div className="w-full h-full mt-20">
      <StickyScroll content={content} />
    </div>
  );
}
