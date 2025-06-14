"use client";
import { ctaBackground } from "@/assets";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { motion } from "motion/react";
import Link from "next/link";
export function CalltoActions() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "Contract",
    },
    {
      text: "Document",
    },
    {
      text: "with",
    },
    {
      text: "HashSign.",
      className: " ",
    },
  ];
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(221, 20, 56, 0.5), rgba(221, 20, 56, 1)), url(${ctaBackground.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center justify-center bg-cover h-[40rem] overflox-x-hidden"
    >
      
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href={"https://dapp.hashsign.io"} target="_blank"><motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="rounded-md bg-secondaryColor  px-2 py-2 text-white font-medium"
        >Explore Our Products</motion.button></Link>
      </div>
    </div>
  );
}
