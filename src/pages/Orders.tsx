import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToGuestOrders } from '../services/dataService';
import { Order } from '../types';
import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STATUS_CONFIG = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Processing' },
  preparing: { icon: Package, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Preparing' },
  delivering: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', label: 'On its way' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToGuestOrders(user.uid, (data) => {
      setOrders(data as Order[]);
    });
    return unsub;
  }, [user]);

  return (
    <div className="pb-32 pt-4 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Your Orders</h1>

      <div className="space-y-6">
        <AnimatePresence>
          {orders.map((order, i) => {
            const config = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const Icon = config.icon;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Order ID</span>
                    <span className="text-xs font-mono font-bold text-gray-900">#{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase">{config.label}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="text-xs font-bold text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Placed At</span>
                    <span className="text-xs font-bold text-gray-900">{order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Paid</span>
                    <span className="text-xl font-black text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
