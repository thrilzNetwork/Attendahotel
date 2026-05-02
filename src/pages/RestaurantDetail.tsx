import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { subscribeToMenu, subscribeToRestaurants } from '../services/dataService';
import { Restaurant, MenuItem } from '../types';
import { MenuItemCard } from '../components/MenuItemCard';
import { ChevronLeft, Star, Clock, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const { items: cartItems, total } = useCart();

  useEffect(() => {
    if (!id) return;
    const unsubRest = subscribeToRestaurants((rests) => {
      const found = rests.find(r => r.id === id);
      if (found) setRestaurant(found);
    });
    const unsubMenu = subscribeToMenu(id, setItems);
    return () => {
      unsubRest();
      unsubMenu();
    };
  }, [id]);

  if (!restaurant) return null;

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="pb-32 min-h-screen bg-gray-50/50">
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      <div className="relative -mt-10 px-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-black text-gray-900">{restaurant.name}</h1>
            <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded text-yellow-700 text-xs font-bold">
              <Star className="w-4 h-4 fill-yellow-700" />
              <span>{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">{restaurant.description}</p>
          
          <div className="flex items-center gap-6 py-4 border-y border-gray-50">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</span>
              <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cuisine</span>
              <span className="text-sm font-bold text-gray-900">{restaurant.cuisine}</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guest Discount</span>
              <span className="text-sm font-bold text-orange-600">{restaurant.discountPercent}% OFF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        {categories.map(cat => (
          <div key={cat} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">{cat}</h2>
            <div className="flex flex-col gap-4">
              {items.filter(i => i.category === cat).map((item: MenuItem) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-24 left-4 right-4 z-40"
        >
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-gray-900 text-white p-4 rounded-2xl flex justify-between items-center shadow-2xl hover:bg-black transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-orange-600 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm">
                {cartItems.length}
              </span>
              <span className="font-bold text-sm uppercase tracking-widest">View Cart</span>
            </div>
            <span className="text-lg font-black">${total.toFixed(2)}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
