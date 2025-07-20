import { Instagram, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-[#232D40] text-[#D4D5D5] flex lg:flex-row md:px-0 px-4 flex-col  justify-evenly py-4 md:space-y-0 space-y-4">
        <div>
          <div className="space-y-2">
            <h1 className="font-bold text-3xl">DESA SRIWULAN</h1>
            <p>The land of enchantment</p>
          </div>
          <div className="space-y-4 mt-4">
            <h1 className="font-bold text-xl">CONTACT US</h1>
            <div className="flex flex-row text-sm  space-x-2">
              <Instagram color="#ffffff" />
              <p>@ppkormawa_bemftundip</p>
            </div>
            <div className="flex flex-row text-sm space-x-2">
              <Mail color="#ffffff" />
              <p>ppkormawabemftundip2024@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-3xl">FITUR</h1>
          <div>
              <a href="/dashboard/monitoring" className="block px-4 py-2">
                Monitoring
              </a>
          </div>
          <div>
              <a href="/dashboard" className="block px-4 py-2">
                Bank Sampah
              </a>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold mb-2">LOCATION</h1>
          <div className="max-w-full overflow-hidden text-[#D4D5D5] md:w-[500px] h-[160px] rounded-xl">
            <div id="embedded-map-display" className="h-full w-full max-w-full">
              <iframe
                className="h-full w-full border-0"
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?q=sriwulan+kendal&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              ></iframe>
            </div>
            <a
              className="code-for-google-map"
              href="https://www.bootstrapskins.com/themes"
              id="grab-maps-authorization"
            >
              premium bootstrap themes
            </a>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center font-medium md:text-lg text-xs text-white dark:text-black">
          © Copyright 2024 | PPK ORMAWA BEM FT UNDIP | KKNT UNDIP 2025
        </h1>
      </div>
    </>
  );
};

export default Footer;
