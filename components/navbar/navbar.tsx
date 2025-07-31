"use client";
import React from "react";
import { Activity, Settings, House, LogOutIcon, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/logout/actions";

const Navbar = () => {
  const pathname = usePathname();

  const navbarClassName = pathname.startsWith("/dashboard/")
    ? "sticky bottom-0 w-full p-4 z-10 bg-white"
    : "fixed bottom-0 w-full p-4 z-10 bg-transparent";

  return (
    <div className={navbarClassName}>
      <div className="flex flex-row justify-between md:justify-center items-center px-4 md:px-0 space-x-4 md:space-x-16">
        <Link href="/dashboard">
          <div className="flex flex-col items-center text-xs">
            <House size={24} />
            <span className="hidden md:block">Beranda</span>
          </div>
        </Link>
        <Link href="/dashboard/monitoring">
          <div className="flex flex-col items-center text-xs">
            <Activity size={24} />
            <span className="hidden md:block">Monitoring</span>
          </div>
        </Link>
        <a
          href="https://docs.google.com/spreadsheets/d/1hyyoJQPLwHS1hFUEee_yfh7S1qclQ9wUENcuGgSiLVg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-xs"
        >
          <FileSpreadsheet size={24} />
          <span className="hidden md:block">Pencatatan</span>
        </a>
        <Link href="/dashboard/settings">
          <div className="flex flex-col items-center text-xs">
            <Settings size={24} />
            <span className="hidden md:block">Pengaturan</span>
          </div>
        </Link>
        <form action={logout}>
          <button type="submit" className="flex flex-col items-center text-xs">
            <LogOutIcon size={24} />
            <span className="hidden md:block">Keluar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
