import { useState } from 'react';
import { motion } from 'framer-motion';
import FlipCountdown from './FlipCountdown'; // Önceki oluşturduğumuz component

// Ana Sayfa
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Yeni Yıl Geri Sayımı</h1>
      <FlipCountdown 
        to="2025-01-01T00:00:00"
        labels={['Gün', 'Saat', 'Dakika', 'Saniye']}
        className="scale-125"
        onComplete={() => alert('Mutlu Yıllar!')}
      />
    </div>
  );
};

// Ürün Sayfası
const ProductPage = () => {
  return (
    <div className="min-h-screen bg-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Flash Sale!</h2>
          <div className="flex items-center gap-4 mb-6">
            <img src="/api/placeholder/200/200" alt="Product" className="rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Premium Ürün Paketi</h3>
              <p className="text-gray-600 mb-4">İndirim bitmeden önce!</p>
              <FlipCountdown 
                to={new Date().getTime() + 2 * 60 * 60 * 1000} // 2 saat
                labels={['Saat', 'Dakika', 'Saniye']}
                showLabels={false}
                className="scale-75"
              />
            </div>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Şimdi Satın Al
          </button>
        </div>
      </div>
    </div>
  );
};

// Etkinlik Sayfası
const EventPage = () => {
  const events = [
    { id: 1, name: "Tech Conference", date: "2025-03-15T09:00:00" },
    { id: 2, name: "Workshop", date: "2025-02-20T14:00:00" },
    { id: 3, name: "Webinar", date: "2025-01-30T18:00:00" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {events.map(event => (
          <motion.div 
            key={event.id}
            className="bg-white rounded-lg p-6 shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-2">{event.name}</h3>
            <FlipCountdown 
              to={event.date}
              labels={['Gün', 'Saat', 'Dakika', 'Saniye']}
              className="scale-90"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Kampanya Sayfası
const CampaignPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-900 to-rose-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Özel Teklif!</h2>
        <FlipCountdown 
          to={new Date().getTime() + 24 * 60 * 60 * 1000} // 24 saat
          labels={['Gün', 'Saat', 'Dakika', 'Saniye']}
          className="mb-6"
        />
        <input
          type="email"
          placeholder="E-posta adresiniz"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full bg-rose-600 text-white py-3 rounded hover:bg-rose-700">
          Kampanyadan Yararlan
        </button>
      </div>
    </div>
  );
};

// Coming Soon Sayfası
const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-5xl font-bold text-white mb-8"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 2 }}
      >
        YAKINDA
      </motion.h1>
      <FlipCountdown 
        to="2025-06-01T00:00:00"
        labels={['Gün', 'Saat', 'Dakika', 'Saniye']}
        className="scale-125 mb-12"
      />
      <div className="flex gap-4">
        <a href="#" className="text-white hover:text-gray-300">Twitter</a>
        <a href="#" className="text-white hover:text-gray-300">Instagram</a>
        <a href="#" className="text-white hover:text-gray-300">Facebook</a>
      </div>
    </div>
  );
};

export { HomePage, ProductPage, EventPage, CampaignPage, ComingSoonPage };