import { useEffect, useState } from 'react';
import { subscribeToRestaurants } from '../services/dataService';
import { Restaurant } from '../types';
import { RestaurantCard } from '../components/RestaurantCard';
import { useAuth } from '../contexts/AuthContext';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { seedDatabase } from '../services/seedService';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { profile } = useAuth();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsub = subscribeToRestaurants(setRestaurants);
    return unsub;
  }, []);

  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">
              Hello, {profile?.name?.split(' ')[0] || 'Guest'}!
            </h1>
            <p className="text-gray-500 font-medium">Room {profile?.roomNumber || 'Concierge Desk'}</p>
          </div>
          <div className="bg-orange-50 p-2 rounded-xl border border-orange-100 flex flex-col items-center">
            <span className="text-[9px] font-black uppercase text-orange-600 tracking-tighter">Concierge</span>
            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 mb-8 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-black uppercase tracking-tight mb-1">Hotel Curated</h3>
          <p className="text-sm text-gray-400 mb-4 leading-snug">Hand-picked nearby restaurants with guest-only pricing.</p>
          <div className="flex gap-2">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">• 100% Quality Audited</span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">• Priority Delivery</span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search nearby restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-sm font-medium"
        />
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-900 leading-none">Nearby Partner Restaurants</h2>
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-1 rounded flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
            Live Now
          </span>
        </div>
        <div className="flex flex-col gap-6">
          {filtered.length > 0 ? filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <RestaurantCard restaurant={r} />
            </motion.div>
          )) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No restaurants found matching your search.</p>
              <button 
                onClick={() => seedDatabase()}
                className="mt-4 text-xs font-bold text-orange-600 underline"
              >
                Seed Sample Data
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
