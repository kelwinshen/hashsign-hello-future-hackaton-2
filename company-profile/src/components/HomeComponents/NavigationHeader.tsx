"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { logoDark } from "@/assets";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export const NavigationHeader = () => {
  const [isMenuClick, setIsMenuClick] = useState(false);
  const [isSubMenuClick, setSubMenuClick] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSubMenuClick = (id: number) => {
    setSubMenuClick(isSubMenuClick === id ? null : id);
  };

  //TODO: please do something
  //FIXME: please do something

  console.log(`isMenuClick`, isMenuClick);
  console.log(`menu yg di klik`, isSubMenuClick);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuClick(false);
    }
  };

  useEffect(() => {
    if (isMenuClick) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuClick]);

  const contentMenu: {
    id: number;
    menuItem: string;
    link: string;
    prev?: boolean;
    submenu?: { menuItem: string; link: string; exerpt?: string }[];
  }[] = [
    {
      id: 1,
      menuItem: "Product",
      link: "/products",
      submenu: [
        {
          menuItem: "Sign Document",
          exerpt:
            "A digital signature service based on blockchain that is secure, fast, and legally binding.",
          link: "/products/sign-document",
        },
        {
          menuItem: "E-Materai",
          exerpt:
            "Electronic meterai based on blockchain that guarantees the authenticity of digital documents and complies with regulations.",
          link: "/products/materai",
        },
      ],
    },
    // {
    //   id: 2,
    //   menuItem: "Study Case",
    //   link: "#",
    //   submenu: [
    //     {
    //       menuItem: "Fintech",
    //       exerpt:
    //         "Transformasi digital keuangan dengan solusi blockchain yang aman dan efisien.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Asuransi",
    //       exerpt:
    //         "Penyimpanan dan pengelolaan dokumen polis secara transparan dan terpercaya.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Layanan Kesehatan",
    //       exerpt:
    //         "Digitalisasi dokumen medis dengan privasi dan keamanan tinggi.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Minyak & Gas",
    //       exerpt: "Otomasi proses kontrak dan kepatuhan dalam industri energi.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Perbankan",
    //       exerpt:
    //         "Keabsahan dokumen dan transaksi dengan teknologi berbasis blockchain.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Pendidikan",
    //       exerpt:
    //         "Pengelolaan sertifikat dan dokumen akademik yang tidak dapat dimanipulasi.",
    //       link: "#",
    //     },
    //     {
    //       menuItem: "Human Resources",
    //       exerpt:
    //         "Digitalisasi kontrak kerja dan dokumen karyawan yang legal dan efisien.",
    //       link: "#",
    //     },
    //   ],
    // },
    {
      id: 3,
      menuItem: "Company",
      link: "",
      submenu: [
        {
          menuItem: "About Us",
          exerpt:
            "Pioneer of secure, transparent, and trusted digital document solutions based on blockchain technology.",
          link: "/about",
        },

        {
          menuItem: "Whitepaper",
          exerpt:
            "Read our whitepaper to learn more about HashSign's vision, mission, and technology.",
          link: "https://drive.google.com/file/d/1I_Z7XbdF0B2snrW9Q2RXVdTsn_JgbU2X/view?usp=drive_link",
        },
        {
          menuItem: "Pitch Deck",
          exerpt:
            "Learn more about HashSign's mission, vision, and technology through our pitch deck.",
          link: "https://drive.google.com/file/d/1vdosdij9gQZAqA2zg3quTyPfOkPeMlWp/view?usp=drive_link",
        },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <motion.nav className="py-6 bg-white shadow-md fixed w-full z-[100]">
        <div className="container mx-auto flex flex-row justify-between items-center px-4 xl:px-0">
          <Link href={"/"}>
            <Image src={logoDark} className="w-40" alt="logo" />
          </Link>

          <div className="flex flex-row items-center gap-12">
            <ul className="hidden lg:flex  flex-row ">
              {contentMenu.map((item, index) => (
                <motion.li
                  className="group text-base text-black uppercase font-bold cursor-pointer hover:text-primaryColor hover:bg-primaryColor/10 py-2 px-4 rounded-[4px] ease-out duration-300"
                  key={index}
                >
                  <span className="flex flex-row gap-1 items-start">
                    <Link href={item.link}>{item.menuItem}</Link>
                    <Icon
                      icon="mdi:chevron-down"
                      className="text-2xl text-primaryColor"
                    />
                  </span>

                  <ul className="group-hover:flex bg-white shadow absolute translate-y-[10px] px-8 py-4 rounded-md hidden flex-col gap-4 translate-x-[-10px] duration-300 ease-in-out delay-300">
                    {item.submenu?.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.link}>
                        <li className="flex flex-row gap-2 items-start">
                          <Icon
                            icon="icons8:right-round"
                            className="text-2xl text-primaryColor"
                          />

                          <span className="flex flex-col gap-1 lg:w-[300px] xl:w-[400px] text-[#000]/50 hover:text-primaryColor ">
                            <p className="text-base ">{subItem.menuItem}</p>
                            <p className="text-sm normal-case font-semibold">
                              {subItem.exerpt}
                            </p>
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-row items-center gap-4">
              <Link href={'https://dapp.hashsign.io'} target="_blank" ><motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                className="hidden md:block rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
              >
                <span className="flex gap-1 items-center">
                  <Icon
                    icon="material-symbols:edit-document-outline"
                    className="text-2xl"
                  />
                  Create Agreement
                </span>
              </motion.button></Link>

              <div
                onClick={() => setIsMenuClick(!isMenuClick)}
                className="lg:hidden block"
              >
                <Icon
                  icon={`${isMenuClick ? "mdi:close" : "mdi:hamburger-menu"}`}
                  className="text-5xl lg:hidden text-primaryColor"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuClick && (
        <div className="lg:hidden w-full h-screen overflow-y-scroll bg-secondaryColor/50 z-[999] fixed">
          <AnimatePresence mode="popLayout">
            <motion.div
              ref={menuRef}
              initial={{ translateX: "100%", opacity: 0 }}
              animate={{ translateX: "0", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              exit={{ translateX: "100%", opacity: 0 }}
              className="w-10/12 bg-secondaryColor h-full absolute right-0 px-8 pt-8"
            >
              {/* Button Close Mobile Menu */}
              <div
                onClick={() => setIsMenuClick(!isMenuClick)}
                className="w-full justify-end flex"
              >
                <Icon icon="mdi:close" className="text-4xl text-white" />
              </div>

              {/* List Mobile Menus */}
              <ul className="w-full pt-12">
                {contentMenu.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-4   border-b-[1px] border-white/30 p-4 cursor-poin"
                  >
                    <div
                      onClick={() => handleSubMenuClick(item.id)}
                      className="flex flex-wrap justify-between items-center"
                    >
                      <span
                        className={`${
                          isSubMenuClick === item.id
                            ? "text-primaryColor"
                            : "text-white"
                        } text-2xl font-semibold uppercase`}
                      >
                        {item.menuItem}
                      </span>
                      <Icon
                        icon={`${
                          isSubMenuClick === item.id
                            ? "mdi:chevron-down"
                            : "mdi:chevron-right"
                        }`}
                        className={`text-4xl ${
                          isSubMenuClick === item.id
                            ? "text-primaryColor"
                            : "text-white"
                        }`}
                      />
                    </div>

                    {isSubMenuClick === item.id && item.submenu && (
                      <>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="group">
                            <Link
                              href={subItem.link}
                              className="flex flex-row gap-2"
                              onClick={() => setIsMenuClick(false)}
                            >
                              <Icon
                                icon="icons8:right-round"
                                className="text-3xl text-white group-hover:text-primaryColor"
                              />
                              <span className="text-white text-lg group-hover:text-primaryColor font-semibold">
                                {subItem.menuItem}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </>
                    )}
                    {/* {isMobileMenuClick &&
                    item.submenu?.map((subItem, subIndex) => (
                      <li  className="group">
                        <Link href={"#"} className="flex flex-row gap-2">
                          <Icon
                            icon="icons8:right-round"
                            className="text-3xl text-white group-hover:text-primaryColor"
                          />
                          <span className="text-white text-lg group-hover:text-primaryColor font-semibold">
                            {subItem.menuItem}
                          </span>
                        </Link>
                      </li>
                    ))} */}
                  </li>
                ))}

                <li className="pt-8">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className=" rounded-md bg-primaryColor px-2 py-2 text-white font-medium"
                  >
                    <span className="flex gap-1 items-center">
                      <Icon
                        icon="material-symbols:edit-document-outline"
                        className="text-2xl"
                      />
                      Open Dashboard
                    </span>
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
