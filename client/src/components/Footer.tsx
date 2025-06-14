import { Discord, secondaryLogo, Telegram, Twitter } from "../assets";

export default function Footer() {
  return (
    <section className="mx-4 py-[60px] lg:container sm:mx-auto bg-[#212529]">
      <div className="flex flex-col gap-10 md:gap-24">
        {/* Gradient Line */}
        <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

        {/* Logo and Social Links */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-evenly items-center justify-center">
          <div>
            <img src={secondaryLogo} alt="Logo" className="w-[170px] h-auto" />
          </div>

          {/* Social Links */}
          <div className="lg:flex flex-col gap-8 hidden">
            <div className="flex flex-row gap-4 justify-center">
              <a href="https://x.com/hashsignio">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Twitter} alt="Twitter" className="w-6 h-6" />
                </div>
              </a>
              <a href="https://t.me/hashsignio">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Telegram} alt="Telegram" className="w-6 h-6" />
                </div>
              </a>
              <a href="https://discord.gg/WazvCnwU">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Discord} alt="Discord" className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Line */}
        <div className="flex flex-col gap-8">
          <hr className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent border-0" />

          {/* Mobile Social Links */}
          <div className="flex flex-col gap-8 lg:hidden">
            <h4 className="text-white text-[18px] font-semibold text-center">
              Contact Us
            </h4>
            <div className="flex flex-row gap-4 justify-center">
              <a href="https://x.com/hashsignio">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Twitter} alt="Twitter" className="w-6 h-6" />
                </div>
              </a>
              <a href="https://t.me/hashsignio">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Telegram} alt="Telegram" className="w-6 h-6" />
                </div>
              </a>
              <a href="https://discord.gg/WazvCnwU">
                <div className="bg-white/20 border-[0.1px] border-white rounded-full p-4 hover:bg-white/50">
                  <img src={Discord} alt="Discord" className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col-reverse text-center text-white gap-8 lg:flex-row lg:justify-between lg:mx-10 xl:mx-1 xl:justify-between">
            <span>©hashsign.io All rights reserved.</span>
            <div className="flex flex-row gap-3 justify-center text-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
