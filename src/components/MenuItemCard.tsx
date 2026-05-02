import { MenuItem } from '../types';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

interface MenuItemCardProps {
  item: MenuItem;
  key?: React.Key;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find(i => i.menuItemId === item.id);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-50 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-2">
          <span className="font-bold text-orange-600">${item.discountedPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-400 line-through">${item.price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="w-24 flex flex-col items-center gap-2">
        <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!cartItem ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => addToCart(item, item.restaurantId)}
                className="w-full py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add
              </motion.button>
            ) : (
              <motion.div
                key="controls"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-between bg-gray-100 rounded-lg p-1"
              >
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-gray-900">{cartItem.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
