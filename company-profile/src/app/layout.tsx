import type { Metadata } from "next";

import "./globals.css";
import { Footer, NavigationHeader } from "@/components";

export const metadata: Metadata = {
  title: "HashSign - The Future of Digital Signatures",
  description:
    "Experience the future of digital signatures with HashSign, ensuring secure and efficient document handling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationHeader />
        <div className="w-full h-[106px] "></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
