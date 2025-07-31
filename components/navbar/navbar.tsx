"use client";
import React from "react";
import { Activity,Settings, House, LogOutIcon,FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/logout/actions";

const Navbar = () => {
  const pathname = usePathname();

  // Tentukan kelas berdasarkan URL
  const navbarClassName = pathname.startsWith("/dashboard/")
    ? "sticky bottom-0 w-full p-4 z-10 bg-white"
    : "fixed bottom-0 w-full p-4 z-10 bg-transparent";

  return (
    <div className={navbarClassName}>
      <div className="flex flex-row justify-center items-center space-x-8 md:space-x-32">
        <Link href="/dashboard">
          <div className="flex flex-col items-center">
            <House />
            Beranda
          </div>
        </Link>
        <Link href="/dashboard/monitoring">
          <div className="flex flex-col items-center">
            <Activity />
            Monitoring
          </div>
        </Link>
        <a
          href="https://docs.google.com/spreadsheets/d/1hyyoJQPLwHS1hFUEee_yfh7S1qclQ9wUENcuGgSiLVg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <FileSpreadsheet />
          Pencatatan
        </a>
        <Link href="/dashboard/settings">
          <div className="flex flex-col items-center">
            <Settings />
            Pengaturan
          </div>
        </Link>
        <form action={logout} className="flex flex-col items-center">
          <LogOutIcon />
          <button type="submit">Keluar</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;


