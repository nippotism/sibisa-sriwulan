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

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxMTNf0CxNi90-UQftBUpMGTimVzHu8tY",
  authDomain: "kknbelajar-8d518.firebaseapp.com",
  databaseURL: "https://kknbelajar-8d518-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kknbelajar-8d518",
  storageBucket: "kknbelajar-8d518.appspot.com",
  messagingSenderId: "714353011191",
  appId: "1:714353011191:web:e5f73708910b1d86fb26f2",
  measurementId: "G-BT968RDP5E"
};

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
  const [temperatureData, setTemperatureData] = useState<{ x: number; y: number }[]>([]);
  const [humidityData, setHumidityData] = useState<{ x: number; y: number }[]>([]);
  const [lastFertilizerTime, setLastFertilizerTime] = useState<number | null>(null);
  const [lastFertilizerDate, setLastFertilizerDate] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeRangeHours, setTimeRangeHours] = useState(3); // Default: 3 hours

  useEffect(() => {
    const storedFertilizerTime = localStorage.getItem("lastFertilizerTime");
    if (storedFertilizerTime) {
      const lastFertilizerTimeMillis = parseInt(storedFertilizerTime, 10);
      const countdownEnd = lastFertilizerTimeMillis + 3 * 24 * 60 * 60 * 1000;

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
              await remove(ref(database, `/sensorData/${timestamp}`));
            }
          });
        }
      } catch (error) {
        console.error("Error cleaning up old data:", error);
      }
    };

    cleanupOldData();

    const unsubscribe = onValue(
      sensorDataRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const now = Date.now();
          const startTime = now - timeRangeHours * 60 * 60 * 1000;
          const filteredTemperatureData: { x: number; y: number }[] = [];
          const filteredHumidityData: { x: number; y: number }[] = [];

          Object.keys(data).forEach((key) => {
            const timestampMillis = parseInt(data[key].timestamp, 10) * 1000;
            const gmt7Offset = 7 * 60 * 60 * 1000;
            const utcTimestamp = timestampMillis - gmt7Offset;

            if (utcTimestamp >= startTime && utcTimestamp <= now) {
              filteredTemperatureData.push({
                x: utcTimestamp,
                y: data[key].temperature,
              });
              filteredHumidityData.push({
                x: utcTimestamp,
                y: data[key].humidity,
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

    return () => unsubscribe();
  }, [timeRangeHours]);

  useEffect(() => {
    if (lastFertilizerTime) {
      const countdownEnd = lastFertilizerTime + 3 * 24 * 60 * 60 * 1000;
      const intervalId = setInterval(() => {
        const remainingTime = countdownEnd - Date.now();
        if (remainingTime <= 0) {
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
    humidityData.length > 0
      ? humidityData[humidityData.length - 1].y
      : "N/A";

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
        borderColor: "#34D399",
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
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Monitor Suhu dan Kelembapan</h1>
          <div>
            <label htmlFor="timeRange" className="mr-2 text-sm font-medium text-gray-700">Rentang Waktu:</label>
            <select
              id="timeRange"
              value={timeRangeHours}
              onChange={(e) => setTimeRangeHours(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={3}>3 Jam</option>
              <option value={5}>5 Jam</option>
              <option value={10}>10 Jam</option>
              <option value={24}>1 Hari</option>
            </select>
          </div>
        </div>
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
              Waktu pengisian pupuk telah berakhir. Silakan isi pupuk untuk memulai periode baru.
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
