import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { placeOrder } from '../services/dataService';
import { ChevronLeft, Home, CreditCard, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, restaurantId, clearCart } = useCart();
  const { profile, updateProfile, user } = useAuth();
  const [room, setRoom] = useState(profile?.roomNumber || '');
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Home className="w-16 h-16 text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Choose a restaurant to start ordering delicious food.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!room) {
      alert("Please provide your room number.");
      return;
    }
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    setLoading(true);
    try {
      if (room !== profile?.roomNumber) {
        await updateProfile({ roomNumber: room });
      }

      await placeOrder({
        guestId: user.uid,
        restaurantId,
        items,
        total,
        roomNumber: room,
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-32 pt-4 px-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Checkout</h1>
      </div>

      <div className="space-y-6">
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-orange-600" />
            <h2 className="font-bold text-gray-900">Delivery Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Room Number</label>
              <input 
                type="text" 
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. 402"
                className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all outline-none font-bold"
              />
            </div>
            <p className="text-xs text-gray-400 italic">Orders are delivered directly to your room door.</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-orange-600" />
            <h2 className="font-bold text-gray-900">Order Summary</h2>
          </div>
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.menuItemId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                </span>
                <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-400 uppercase">Total Amount</span>
            <span className="text-2xl font-black text-gray-900">${total.toFixed(2)}</span>
          </div>
        </section>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          onClick={handlePlaceOrder}
          className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Place Order
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
