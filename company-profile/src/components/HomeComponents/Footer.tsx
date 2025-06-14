import { logoWhite } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondaryColor w-full py-4 px-4 xl:px-0">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start py-14">
          {/* Logo and Description */}
          <section className="flex flex-col gap-4 w-full md:w-1/4">
            <Image src={logoWhite} className="w-40" alt="Company Logo" />
            <p className="text-white text-sm leading-relaxed">
              We provide secure digital identity solutions for individuals and
              businesses, ensuring data protection.
            </p>
          </section>

          {/* Navigation Menus */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap gap-8 w-full md:w-3/4 justify-between"
          >
            {/* Product Menu */}
            <section
              aria-labelledby="product-menu"
              className="flex flex-col gap-4 w-full sm:w-2/3 md:w-1/5"
            >
              <h2 id="use-case-menu" className="text-white font-semibold">
                Social
              </h2>
              <ul className="text-white text-sm flex flex-col gap-2">
                <Link
                  href="https://x.com/hashsignio" target="_blank"
                  className="hover:underline"
                >Twitter</Link>
                <Link href={"https://discord.gg/WazvCnwU"} target="_blank" className="hover:underline">Discord</Link>
                <Link href={"https://t.me/hashsignio"} target="_blank" className="hover:underline">Telegram</Link>
              </ul>
            </section>

            {/* Use Case Menu */}
            <section
              aria-labelledby="use-case-menu"
              className="flex flex-col gap-4 w-full sm:w-1/3 md:w-1/4"
            >
              <h2 id="use-case-menu" className="text-white font-semibold">
                Product
              </h2>
              <ul className="text-white text-sm flex flex-col gap-2">
                <Link
                  href="/products/sign-document"
                  className="hover:underline"
                >
                  Document
                </Link>
                <Link href={"/products/materai"} className="hover:underline">
                  E-Materai
                </Link>
              </ul>
            </section>

            {/* Company Menu */}
            <section
              aria-labelledby="company-menu"
              className="flex flex-col gap-4 w-full sm:w-1/3 md:w-1/4"
            >
              <h2 id="company-menu" className="text-white font-semibold">
                Company Menu
              </h2>
              <ul className="text-white text-sm flex flex-col gap-2">
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
                <Link
                  href={
                    "https://drive.google.com/file/d/1I_Z7XbdF0B2snrW9Q2RXVdTsn_JgbU2X/view?usp=drive_link"
                  }
                  target="_blank"
                  className="hover:underline"
                >
                  WhitePaper
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1vdosdij9gQZAqA2zg3quTyPfOkPeMlWp/view?usp=drive_link"
                  target="_blank"
                  className="hover:underline"
                >
                  Pitch Deck
                </Link>
              </ul>
            </section>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="w-full border-t-[1px] border-white/50 py-4 text-center">
          <p className="text-white text-sm">
            &copy; 2024 Hash Sign - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
