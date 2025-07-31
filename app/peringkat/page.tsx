"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // home icon
import { FaMedal } from "react-icons/fa"; // badge icons

type User = {
  id: string;
  name: string;
  totalPoints: number;
  totalWeight: number;
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      // Sort users by points descending
      const sorted = [...data].sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    }

    fetchUsers();
  }, []);

  const renderBadge = (index: number) => {
    const colors = ["text-yellow-400", "text-gray-400", "text-orange-500"];
    if (index < 3) {
      return (
        <FaMedal
          className={`inline-block mr-2 ${colors[index]}`}
          title={`${index + 1} place`}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-6 items-center">
      {/* Home Button */}
      <div className="w-full max-w-3xl flex justify-start mb-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#3C5480] hover:underline"
        >
          <ArrowLeft />
          <span className="font-medium">Kembali ke Home</span>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#3C5480]">Peringkat</h1>

      {/* Leaderboard Table */}
      <div className="w-full max-w-3xl bg-white shadow rounded-xl p-4 mb-8">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-[#3C5480] font-bold border-b-2 border-[#BACC58]">
              <th className="py-2">Peringkat</th>
              <th className="py-2">Nama</th>
              <th className="py-2 text-right">Total Poin</th>
              <th className="py-2 text-right">Total Kg</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-b last:border-none">
                <td className="py-2">
                  {renderBadge(index)}
                  {index + 1}
                </td>
                <td className="py-2">{user.name}</td>
                <td className="py-2 text-right">{user.totalPoints || 0}</td>
                <td className="py-2 text-right">{user.totalWeight || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
