"use client";
import { materaiHome, signDocumentHome } from "@/assets";
import { CalltoActions } from "@/components";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <>
      <section className="w-full container mx-auto py-8 px-4">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
            <div className="lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-4xl font-bold">
                Secure, Fast, and Legal Digital Signatures with Blockchain.
              </h2>
              <p>
                Sign your documents with blockchain technology that provides
                transparency, security, and legal validity.
              </p>
              <div>
                <Link href={"/products/sign-document"}><motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
                >Learn More</motion.button></Link>
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

          <div className="flex flex-col lg:flex-row-reverse justify-between gap-8 items-center">
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
                <Link href="/products/materai"><motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
                >Learn More</motion.button></Link>
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
        </div>
      </section>
      <div className="h-[200px]"></div>
      <CalltoActions />
    </>
  );
};

export default Products;
