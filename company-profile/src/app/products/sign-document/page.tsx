"use client";
import { signDocumentHome } from "@/assets";
import { CalltoActions, GridBenefits } from "@/components";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface signDocumentProps {
  title: string;
  description: string;
  link: string;
}

const signDocument = () => {
  const ProductBenefit: Array<signDocumentProps> = [
    {
      title: "Effortless Signing",
      description:
        "Experience seamless digital signing with our intuitive interface, designed to save you time and effort while ensuring document integrity.",
      link: "#",
    },
    {
      title: "Enhanced Security",
      description:
        "Rest easy knowing your documents are protected with top-notch encryption and blockchain technology, minimizing risk of unauthorized access.",
      link: "#",
    },
    {
      title: "Legal Compliance",
      description:
        "Our service is fully compliant with international e-signature regulations, providing legal validity and peace of mind for your transactions.",
      link: "#",
    },
    {
      title: "Global Accessibility",
      description:
        "Sign documents from anywhere in the world with our cloud-based platform, accessible on any device, anytime.",
      link: "#",
    },
    {
      title: "Cost Effective",
      description:
        "Save on paper, printing, and postage costs with our affordable digital signing solution, designed to fit any budget.",
      link: "#",
    },
    {
      title: "Eco-Friendly",
      description:
        "Reduce your carbon footprint with our paperless solution, contributing to a more sustainable future.",
      link: "#",
    },
  ];
  return (
    <>
      <section className="w-full container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-4xl font-bold">
              Secure, Fast, and Legal Digital Signatures with Blockchain
            </h2>
            <p>
              Sign your documents with blockchain technology that provides
              transparency, security, and legal validity.
            </p>
            <div>
              <Link href="https://dapp.hashsign.io" target="_blank"><motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
              >
                Try Now
              </motion.button></Link>
            </div>
          </div>

          <Image
            src={signDocumentHome}
            alt="dummy"
            width={500}
            height={500}
            className="lg:w-1/2 rounded-lg"
          />
        </div>
      </section>

      <section className="w-full bg-slate-100  py-8 px-4 xl:px-0 mt-10">
        <div className="container mx-auto pt-10">
          {/* text */}
          <div className="flex flex-col gap-4  text-center w-full md:w-4/6 mx-auto">
            <h2 className="text-3xl font-bold">What is Sign Document?</h2>
            <p>
              Sign Document is a blockchain-based digital signature service that
              allows you to sign documents legally, securely, and easily, without
              the risk of tampering.
            </p>
          </div>

          {/* grid */}
          <GridBenefits ProductBenefit={ProductBenefit} />
        </div>
      </section>

      <CalltoActions />
    </>
  );
};
  
export default signDocument;
