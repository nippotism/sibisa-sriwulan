// In your component (e.g. Navbar or Sidebar)
import { useState } from "react";

export default function SaranButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whatsapp");
      const data = await res.json();

      if (data.number) {
        const message = encodeURIComponent(
          "Halo, saya ingin memberikan saran dan kritik mengenai aplikasi ini."
        );
        const url = `https://wa.me/${data.number}?text=${message}`;
        window.open(url, "_blank");
      } else {
        alert("Nomor WhatsApp tidak ditemukan.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil nomor WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="block px-4 py-2 hover:underline text-left w-full"
    >
      {loading ? "Membuka..." : "Saran & Kritik"}
    </button>
  );
}
