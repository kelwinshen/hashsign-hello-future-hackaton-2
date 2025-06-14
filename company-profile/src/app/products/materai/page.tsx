"use client";
import { materaiHome } from "@/assets";
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
  const materaiContent: Array<signDocumentProps> = [
    {
      title: "Fast and Reliable",
      description:
        "Get your documents notarized quickly and efficiently with our eMaterai service. Our secure and reliable platform ensures that your documents are authenticated and verified in no time.",
      link: "#",
    },
    {
      title: "Cost-Effective",
      description:
        "Ditch the hassle of physical notarization and reduce your costs with our eMaterai service. Our digital platform provides a cost-effective solution for all your notarization needs.",
      link: "#",
    },
    {
      title: "Convenience at its Best",
      description:
        "Our eMaterai service is designed to provide convenience at its best. With our digital platform, you can get your documents notarized from anywhere in the world, at any time.",
      link: "#",
    },
    {
      title: "Increased Security",
      description:
        "Our eMaterai service uses advanced encryption and digital signature technology to ensure the security and integrity of your documents. Rest assured that your documents are safe and secure with us.",
      link: "#",
    },
    {
      title: "Legal Compliance",
      description:
        "Our eMaterai service is fully compliant with international laws and regulations. You can rest assured that your documents are legally binding and recognized by authorities around the world.",
      link: "#",
    },
    {
      title: "Environmentally Friendly",
      description:
        "Our eMaterai service is an environmentally friendly solution for all your notarization needs. By going digital, you can reduce your carbon footprint and contribute to a more sustainable future.",
      link: "#",
    },
  ];

  return (
    <>
      <section className="w-full container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-4xl font-bold">
              Legal, Secure, and Integrated E-Meterai with Blockchain
              Technology.
            </h2>
            <p>
              A forgery-proof, regulation-compliant, and user-friendly
              electronic stamping solution.
            </p>
            <div>
              <Link href="https://dapp.hashsign.io" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
                >
                  Try Now
                </motion.button>
              </Link>
            </div>
          </div>

          <Image
            src={materaiHome}
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
            <h2 className="text-3xl font-bold">What is eMaterai?</h2>
            <p>
              eMaterai is a blockchain-based digital signature service that
              enables you to sign documents securely, efficiently, and legally,
              without the risk of tampering.
            </p>
          </div>

          {/* grid */}
          <GridBenefits ProductBenefit={materaiContent} />
        </div>
      </section>

      <CalltoActions />
    </>
  );
};

export default signDocument;
