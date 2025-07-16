"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, get } from "firebase/database";
import "chartjs-adapter-date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkQ840T4Y3XS7Kx-7RRrv1G7UNW6N-v2s",
  authDomain: "ppk-bemft.firebaseapp.com",
  databaseURL: "https://ppk-bemft-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ppk-bemft",
  storageBucket: "ppk-bemft.appspot.com",
  messagingSenderId: "139150074196",
  appId: "1:139150074196:web:b8d868072daaf6f75128c1",
  measurementId: "G-C93XSZ63D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

ChartJS.register(
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.raw.y}`,
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "second",
        tooltipFormat: "dd MMM yyyy HH:mm:ss",
        displayFormats: {
          second: "HH:mm:ss",
        },
      },
      title: {
        display: true,
        text: "Waktu",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
        stepSize: 10,
      },
    },
    y: {
      title: {
        display: true,
        text: "Nilai",
      },
      beginAtZero: true,
    },
  },
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TemperatureMonitor: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<
    { x: number; y: number }[]
  >([]);
  const [humidityData, setHumidityData] = useState<{ x: number; y: number }[]>(
    []
  );
  const [lastFertilizerTime, setLastFertilizerTime] = useState<number | null>(
    null
  );
  const [lastFertilizerDate, setLastFertilizerDate] = useState<string | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const storedFertilizerTime = localStorage.getItem("lastFertilizerTime");
    if (storedFertilizerTime) {
      const lastFertilizerTimeMillis = parseInt(storedFertilizerTime, 10);
      const countdownEnd = lastFertilizerTimeMillis + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

      if (Date.now() < countdownEnd) {
        setLastFertilizerTime(lastFertilizerTimeMillis);
        setLastFertilizerDate(formatDate(lastFertilizerTimeMillis));
      } else {
        localStorage.removeItem("lastFertilizerTime");
        setIsPopupOpen(true);
      }
    } else {
      setIsPopupOpen(true);
    }
  }, []);

  useEffect(() => {
    const sensorDataRef = ref(database, "/sensorData");

    const cleanupOldData = async () => {
      const now = Date.now();
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

      try {
        const snapshot = await get(sensorDataRef);
        const data = snapshot.val();

        if (data) {
          Object.keys(data).forEach(async (timestamp) => {
            const timestampMillis = parseInt(timestamp, 10);

            if (timestampMillis < oneWeekAgo) {
              // Hapus data yang lebih dari satu minggu
              await remove(ref(database, `/sensorData/${timestamp}`));
            }
          });
        }
      } catch (error) {
        console.error("Error cleaning up old data:", error);
      }
    };

    cleanupOldData();

    onValue(
      sensorDataRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const now = Date.now();
          const threeHoursAgo = now - 3 * 60 * 60 * 1000;

          const filteredTemperatureData: { x: number; y: number }[] = [];
          const filteredHumidityData: { x: number; y: number }[] = [];

          Object.keys(data).forEach((timestamp) => {
            const timestampMillis = parseInt(timestamp, 10);

            if (timestampMillis >= threeHoursAgo && timestampMillis <= now) {
              filteredTemperatureData.push({
                x: timestampMillis,
                y: data[timestamp].temperature,
              });
              filteredHumidityData.push({
                x: timestampMillis,
                y: data[timestamp].humidity,
              });
            }
          });

          setTemperatureData(filteredTemperatureData);
          setHumidityData(filteredHumidityData);
        } else {
          console.warn("No data found for the given time range.");
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (lastFertilizerTime) {
      const countdownEnd = lastFertilizerTime + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
      const intervalId = setInterval(() => {
        const remainingTime = countdownEnd - Date.now();
        console.log(
          `Countdown: ${Math.max(remainingTime / 1000, 0).toFixed(0)} seconds`
        );

        if (remainingTime <= 0) {
          // Hapus semua data setelah 3 hari
          setTemperatureData([]);
          setHumidityData([]);
          setLastFertilizerTime(null);
          localStorage.removeItem("lastFertilizerTime");
          setIsPopupOpen(true);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastFertilizerTime]);

  const latestTemperature =
    temperatureData.length > 0
      ? temperatureData[temperatureData.length - 1].y
      : "N/A";
  const latestHumidity =
    humidityData.length > 0 ? humidityData[humidityData.length - 1].y : "N/A";

  const handleFertilizerSubmit = () => {
    const now = Date.now();
    setLastFertilizerTime(now);
    setLastFertilizerDate(formatDate(now));
    localStorage.setItem("lastFertilizerTime", now.toString());
    setIsPopupOpen(false);
  };

  const tempChartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Suhu (°C)",
        data: temperatureData,
        borderColor: "#34D399", // Tailwind Green
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        fill: true,
      },
    ],
  };

  const humidityChartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Kelembapan (%)",
        data: humidityData,
        borderColor: "#3B82F6", // Tailwind Blue
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Monitor Suhu dan Kelembapan
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Grafik Suhu</h2>
          <Line data={tempChartData} options={options} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Grafik Kelembapan</h2>
          <Line data={humidityChartData} options={options} />
        </div>
        <div className="flex justify-between text-lg mb-4">
          <span>Suhu Terbaru: {latestTemperature}°C</span>
          <span>Kelembapan Terbaru: {latestHumidity}%</span>
        </div>
        {lastFertilizerDate && (
          <div className="text-lg mb-4">
            <span>Pengisian Pupuk Terakhir: {lastFertilizerDate}</span>
          </div>
        )}
      </div>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pengingat Pengisian Pupuk</DialogTitle>
            <DialogDescription>
              Waktu pengisian pupuk telah berakhir. Silakan isi pupuk untuk
              memulai periode baru.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={handleFertilizerSubmit} variant="default">
              Isi Pupuk
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemperatureMonitor;
