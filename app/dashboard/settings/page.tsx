'use client';

import { useState } from 'react';

const SettingPage = () => {
  const [localNumber, setLocalNumber] = useState(''); // only the number after +62
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const fullNumber = `+62${localNumber.replace(/^0+/, '')}`; // ensure no leading zero

    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: fullNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memperbarui nomor');
      }

      setMessage({ type: 'success', text: data.message });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#D4D5D5] min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold text-[#3C5480] mb-6">Pengaturan WhatsApp</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="number" className="block text-[#3C5480] font-semibold mb-1">
              Nomor WhatsApp
            </label>
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-200 rounded-l-xl border-y-2 border-l-2 border-[#3C5480] text-[#3C5480] font-medium">
                +62
              </span>
              <input
                type="tel"
                id="number"
                name="number"
                value={localNumber}
                onChange={(e) => setLocalNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="81234567890"
                className="w-full px-4 py-2 rounded-r-xl border-y-2 border-r-2 border-[#3C5480] bg-blue"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#3C5480] text-white px-6 py-2 rounded-2xl hover:bg-[#324468] disabled:opacity-60"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>

          {message && (
            <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
