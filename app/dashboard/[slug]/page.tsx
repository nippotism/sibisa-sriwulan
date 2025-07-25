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
  const [besi, setBesi] = useState<number>(0);
  const [kaca, setKaca] = useState<number>(0);
  const [kertas, setKertas] = useState<number>(0);
  const [plastik, setPlastik] = useState<number>(0);
  const [sterofoam, setSterofoam] = useState<number>(0);
  const [pointsToDeduct, setPointsToDeduct] = useState<number>(0);

  const pointRates = {
    besi: 5000,
    kaca: 4000,
    kertas: 3000,
    plastik: 2000,
    sterofoam: 1000,
  };

  // Fetch user data from the database on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${decodedSlug}`);
        const data: User = await response.json();
        setUser(data); // Set user data including total weight and points
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [decodedSlug]);

  const calculateTotalPoints = () => {
    return (
      besi * pointRates.besi +
      kaca * pointRates.kaca +
      kertas * pointRates.kertas +
      plastik * pointRates.plastik +
      sterofoam * pointRates.sterofoam
    );
  };

  const calculateTotalWeight = () => {
    return besi + kaca + kertas + plastik + sterofoam;
  };

  const handleSubmit = async () => {
    if (user) {
      // Mengirim data yang hanya terkait dengan jenis sampah ke server
      const updatedData = {
        besi,
        kaca,
        kertas,
        plastik,
        sterofoam,
      };

      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          // Update state user dengan data yang baru di-fetch dari server
          setUser(updatedUser);
        } else {
          console.error("Failed to update user", await response.json());
        }

        // Reset input fields
        setBesi(0);
        setKaca(0);
        setKertas(0);
        setPlastik(0);
        setSterofoam(0);
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }
  };

  const handleDeductPoints = async () => {
    if (user && pointsToDeduct > 0 && user.totalPoints >= pointsToDeduct) {
      // Deduct points from the user
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints - pointsToDeduct,
      };

      try {
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        // Reset the pointsToDeduct input field after successful deduction
        setPointsToDeduct(0);

        // Update user data in the state with the new total points
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to deduct points", error);
      }
    } else {
      alert("Insufficient points or invalid input.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center px-2 bg-gray-50">
        <h1 className="md:text-3xl text-2xl font-bold">
          Perbarui Jumlah Sampah & Points
        </h1>
        <Image src={looking} alt="looking" />
      </div>
      <div className="flex flex-col items-center bg-gray-50">
        {user ? (
          <div>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2">
                <UserRound />
                <h1>{user.name}</h1>
              </div>
            </div>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2">
                <Phone />
                <h1>{user.numberPhone}</h1>
              </div>
            </div>
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Jumlah Sampah</h2>
              <div className="bg-[#3C5480] rounded-xl text-black p-4">
                <div className="flex justify-between mb-2">
                  <label className="text-white">Besi (kg):</label>
                  <input
                    type="number"
                    value={besi}
                    onChange={(e) => setBesi(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="text-white">Kaca (kg):</label>
                  <input
                    type="number"
                    value={kaca}
                    onChange={(e) => setKaca(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="text-white">Kertas (kg):</label>
                  <input
                    type="number"
                    value={kertas}
                    onChange={(e) => setKertas(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="text-white">Plastik (kg):</label>
                  <input
                    type="number"
                    value={plastik}
                    onChange={(e) => setPlastik(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="text-white">Sterofoam (kg):</label>
                  <input
                    type="number"
                    value={sterofoam}
                    onChange={(e) => setSterofoam(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
              </div>
            </div>
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
            <div className="flex justify-center gap-4 mb-3">
              <Button
                className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
                onClick={handleDeductPoints}
              >
                Tukar Points
              </Button>
            </div>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
