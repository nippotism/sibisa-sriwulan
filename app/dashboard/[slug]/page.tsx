"use client";

import { Phone, UserRound } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import looking from "/public/images/looking.png";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [besi, setBesi] = useState<number>(0);
  const [kaca, setKaca] = useState<number>(0);
  const [kertas, setKertas] = useState<number>(0);
  const [plastik, setPlastik] = useState<number>(0);
  const [sterofoam, setSterofoam] = useState<number>(0);
  const [pointsToDeduct, setPointsToDeduct] = useState<number>(0);

  const isAnyWasteFilled =
    besi > 0 || kaca > 0 || kertas > 0 || plastik > 0 || sterofoam > 0;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${decodedSlug}`);
        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [decodedSlug]);

  const handleSubmit = async () => {
    if (!user || !isAnyWasteFilled) return;

    const updatedData = { besi, kaca, kertas, plastik, sterofoam };

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setBesi(0);
        setKaca(0);
        setKertas(0);
        setPlastik(0);
        setSterofoam(0);
      } else {
        console.error("Failed to update user", await response.json());
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDeductPoints = async () => {
    if (!user || pointsToDeduct <= 0 || user.totalPoints < pointsToDeduct) {
      alert("Insufficient points or invalid input.");
      return;
    }

    const updatedUser = {
      ...user,
      totalPoints: user.totalPoints - pointsToDeduct,
    };

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
        setPointsToDeduct(0);
      } else {
        console.error("Failed to deduct points", await response.json());
      }
    } catch (error) {
      console.error("Failed to deduct points", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-row justify-center items-center px-2 py-4">
        <h1 className="md:text-3xl text-2xl font-bold mr-2">
          Perbarui Jumlah Sampah & Points
        </h1>
        <Image src={looking} alt="looking" />
      </div>

      <div className="flex flex-col items-center flex-grow">
        {loading ? (
          <p className="text-gray-500 py-10 animate-pulse">Loading...</p>
        ) : user ? (
          <>
            {/* User Info */}
            <h2 className="font-bold mb-2">Kunjungan Terakhir : <span className="font-medium">{user.updatedAt? new Date(user.updatedAt).toLocaleDateString() : "N/A"}</span></h2>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2 items-center">
                <UserRound />
                <h1>{user.name}</h1>
              </div>
            </div>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2 items-center">
                <Phone />
                <h1>{user.numberPhone}</h1>
              </div>
            </div>

            {/* Statistik Sampah */}
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Statistik Sampah</h2>
              <div className="bg-[#3C5480] rounded-xl text-white p-4">
                <div className="flex justify-between mb-2">
                  <span>Besi:</span>
                  <span>{user.besi || 0} kg</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Kaca:</span>
                  <span>{user.kaca || 0} kg</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Kertas:</span>
                  <span>{user.kertas || 0} kg</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Plastik:</span>
                  <span>{user.plastik || 0} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Sterofoam:</span>
                  <span>{user.sterofoam || 0} kg</span>
                </div>
              </div>
            </div>

            {/* Input: Jumlah Sampah */}
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Jumlah Sampah</h2>
              <div className="bg-[#3C5480] rounded-xl text-black p-4">
                {[
                  ["Besi", besi, setBesi],
                  ["Kaca", kaca, setKaca],
                  ["Kertas", kertas, setKertas],
                  ["Plastik", plastik, setPlastik],
                  ["Sterofoam", sterofoam, setSterofoam],
                ].map(([label, value, setter]) => (
                  <div key={label} className="flex justify-between mb-2">
                    <label className="text-white">{label} (kg):</label>
                    <input
                      type="number"
                      value={value as number}
                      onChange={(e) =>
                        (setter as React.Dispatch<React.SetStateAction<number>>)(
                          parseFloat(e.target.value)
                        )
                      }
                      className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Penukaran Points */}
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Penukaran Poin</h2>
              <div className="bg-[#3C5480] rounded-xl text-black p-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white">Penukaran Points:</label>
                  <input
                    type="number"
                    value={pointsToDeduct}
                    onChange={(e) =>
                      setPointsToDeduct(parseFloat(e.target.value))
                    }
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Total</h2>
              <div className="bg-[#3C5480] rounded-xl text-white p-4">
                <div className="flex justify-between mb-2">
                  <span>Berat Total</span>
                  <span>{user.totalWeight || 0} kg</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Points Keseluruhan</span>
                  <span>{user.totalPoints || 0} pts</span>
                </div>
              </div>
            </div>

            {/* Buttons with Rule Logic */}
            <div className="flex justify-center gap-4 mb-6">
              <Button
                className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
                onClick={handleSubmit}
                disabled={pointsToDeduct > 0}
              >
                Submit
              </Button>
              <Button
                className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
                onClick={handleDeductPoints}
                disabled={isAnyWasteFilled}
              >
                Tukar Points
              </Button>
            </div>
          </>
        ) : (
          <p className="text-red-500 py-10">User not found</p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
