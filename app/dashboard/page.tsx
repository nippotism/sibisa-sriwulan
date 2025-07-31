"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import writing from "/public/images/writing.png";
import Image from "next/image";
import { Search, Trash, UserRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormWithPopover from "@/components/form/form";
import { ConfirmDeleteModal } from "@/components/deleteModals/DeleteModals";
import logo from "/public/images/logo-sibisa.png";
import * as XLSX from "xlsx";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface User {
  id: number;
  name: string;
  numberPhone: string;
}

const Dashboard: React.FC = () => {

  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        console.log("Response:", response);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Polling setiap 1 detik

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData(data.filter((item) => item.id !== id));
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_data.xlsx");
  };

  return (
    <div className="bg-[#D4D5D5] h-screen w-full px-4">
      <div className="flex flex-row items-center justify-center md:space-x-56 space-x-8">
        <div>
          <Link
                href="/"
                className="flex items-center gap-2 text-[#3C5480] hover:underline mb-4"
              >
                <ArrowLeft />
                <span className="font-medium">Kembali ke Home</span>
              </Link>
          <h1 className="font-bold md:text-4xl text-2xl">Hi, Admin!</h1>
          <div className="flex flex-col items-center mt-4">
            <button
              onClick={() => exportToExcel(data)}
              className="bg-[#BACC58] text-white rounded-xl py-2 px-4"
            >
              Download Data
            </button>
          </div>
        </div>
        <Image src={logo} alt="Writing" width={200} />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start">
          <label className="md:text-xl text-lg">
            Pencarian berdasarkan nama
          </label>
          <div className="flex flex-col relative mb-6 w-72">
            <input
              type="text"
              placeholder="Masukkan nama"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-blue rounded-xl px-12 py-2 border-2 border-[#3C5480] text-xl"
            />
            <Search className="absolute left-2 bottom-3" />
          </div>
        </div>
        <div className="h-60 overflow-y-auto no-scrollbar">
          {loading ? (
            <p>Loading data...</p>
          ) : filteredData.length === 0 ? (
            <p>No data available</p>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="py-3 w-72 px-2 bg-[#BACC58] rounded-xl text-black mb-4"
              >
                <div className="flex flex-row justify-between">
                  <Link href={`dashboard/${item.id}`}>
                    <div className="flex flex-row justify-center gap-2">
                      <UserRound />
                      <h1>{item.name}</h1>
                    </div>
                  </Link>
                  <div className="flex flex-row justify-center gap-2">
                    <Trash
                      onClick={() => {
                        setSelectedUserId(item.id);
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-72">
          <FormWithPopover />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          if (selectedUserId !== null) {
            handleDelete(selectedUserId);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
