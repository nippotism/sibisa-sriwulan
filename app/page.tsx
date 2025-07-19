"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "/public/images/logo-sibisa.png";
import LandingPage from "@/components/landingPage/landingpage";
import SelamatDatang from "@/components/selamatDatang/selamat-datang";
import About from "@/components/about/about";
import Memilah from "@/components/memilah/memilah";

import AOS from "aos";

import "aos/dist/aos.css";
import Denah from "@/components/denah/denah";
import AkhirKata from "@/components/akhirKata/akhir-kata";
import Footer from "@/components/footer/footer";
import FlowingMenu from "@/components/header/FlowingMenu/FlowingMenu";

const demoItems = [
  { link: '#profil-desa', text: 'Profil Desa', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#sibisa', text: 'Sibisa', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#pilah-sampah', text: 'Pilah Sampah', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#fermentasi', text: 'Pupuk', image: 'https://picsum.photos/600/400?random=4' }
];


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply/remove dark class on HTML tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const [loading, setLoading] = useState(false); // jadiin false dlu
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
        <Image
          alt="logo"
          src={logo}
          width={500}
          height={500}
          className="mb-4"
        />
        <div className="spinner"></div>
        <style jsx>{`
          .spinner {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
  <>
    <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow"
        >
          {darkMode ? (<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
          </svg>) : (<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clip-rule="evenodd"/>
            </svg>)}
        </button>
      </div>
      <a
        href="/dashboard"
        className="fixed bottom-10 right-10 z-50 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-colors"
      >
        Admin Panel
      </a>
    <div style={{ height: '360px', position: 'relative' }}>
      <FlowingMenu items={demoItems} />
    </div>

    <div id="desa-sriwulan">
      <LandingPage />
    </div>

    <div id="profil-desa">
      <SelamatDatang />
    </div>

    <div id="sibisa">
      <About />
    </div>

    <div id="pilah-sampah">
      <Memilah />
    </div>

    <div id="pupuk">
      <Denah />
    </div>

    <AkhirKata />
    <Footer />
  </>
);

}
