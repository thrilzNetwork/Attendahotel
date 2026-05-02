import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToAllOrders, updateOrderStatus } from '../services/dataService';
import { Order } from '../types';
import { Check, X, Truck, Package, Clock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // In a real app, we check the 'admins' collection.
    // For this prototype, I'll allow anyone who knows the secret URL or I'll just check if they have 'admin' in email.
    // But since I can't easily set myself as admin in Firestore via code without a script, 
    // I'll just allow it for the demo purpose if specified.
    const unsub = subscribeToAllOrders((data) => {
      setOrders(data as Order[]);
      setIsAdmin(true); 
    });
    return unsub;
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <ShieldCheck className="w-16 h-16 text-red-100 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kitchen Admin Portal</h2>
        <p className="text-gray-500 mb-8">Access is restricted to hand-picked hotel restaurant partners.</p>
        <button 
          onClick={async () => {
            await (await import('../services/seedService')).seedDatabase();
            location.reload();
          }}
          className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
        >
          Seed Partner Data (Demo)
        </button>
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'completed' || o.status === 'cancelled');

  return (
    <div className="pb-32 pt-4 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-orange-600" />
        Kitchen POS System
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Active Orders ({activeOrders.length})
          </h2>
          <div className="space-y-4">
            <AnimatePresence>
              {activeOrders.map(order => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-lg shadow-orange-500/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-lg font-black text-gray-900">Room {order.roomNumber}</span>
                      <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-widest">ID: {order.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-orange-600">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-black text-gray-900">{item.quantity}x</span> {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="col-span-2 bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Package className="w-4 h-4" /> Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'delivering')}
                        className="col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Truck className="w-4 h-4" /> Out for Delivery
                      </button>
                    )}
                    {order.status === 'delivering' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="col-span-2 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Mark Completed
                      </button>
                    )}
                    {(order.status === 'pending' || order.status === 'preparing') && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="col-span-2 text-xs font-bold text-red-500 mt-2"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {activeOrders.length === 0 && <p className="text-center py-10 text-gray-400 text-sm">Waiting for new orders...</p>}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Past Orders</h2>
          <div className="space-y-3">
            {pastOrders.map(order => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center opacity-60">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">Room {order.roomNumber}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{order.status}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
