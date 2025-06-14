"use client";
import { signDocumentHeader } from "@/assets";
import { CalltoActions, GridBenefits } from "@/components";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

interface signDocumentProps {
  title: string;
  description: string;
  link: string;
}

const Fintech = () => {

  const ProductBenefit : Array<signDocumentProps> = [
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
    {
      title: "Title Here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
      link: "#",
    },
  ];

  return (
    <>
      <section className="w-full container mx-auto py-8 px-4">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
            <div className="lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-4xl font-bold">Privy untuk Fintech</h2>
              <p>
                Mengaktifkan inklusi keuangan untuk semua orang melalui tanda
                tangan digital dan teknologi identitas digital
              </p>
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
                >
                  Coba Sekarang
                </motion.button>
              </div>
            </div>

            <Image
              src={signDocumentHeader}
              alt="dummy"
              width={500}
              height={500}
              className="lg:w-1/2 rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-20 py-20 mt-8">
            <h2 className="text-center text-black text-2xl md:text-4xl font-bold">Mendukung fintech dengan transaksi yang lebih aman dan tanda tangan digital yang mengikat secara hukum</h2>
        </div>

        <GridBenefits ProductBenefit={ProductBenefit} />
      </section>

      <CalltoActions />
    </>
  );
};

export default Fintech;
