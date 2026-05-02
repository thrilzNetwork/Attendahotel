import { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, OrderItem } from '../types';

interface CartContextType {
  items: OrderItem[];
  restaurantId: string | null;
  addToCart: (item: MenuItem, restaurantId: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const addToCart = (item: MenuItem, rid: string) => {
    if (restaurantId && restaurantId !== rid) {
      if (!confirm("You already have items from another restaurant. Start a new order?")) {
        return;
      }
      setItems([{ menuItemId: item.id, name: item.name, quantity: 1, price: item.discountedPrice || item.price }]);
      setRestaurantId(rid);
    } else {
      setRestaurantId(rid);
      setItems(prev => {
        const existing = prev.find(i => i.menuItemId === item.id);
        if (existing) {
          return prev.map(i => i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { menuItemId: item.id, name: item.name, quantity: 1, price: item.discountedPrice || item.price }];
      });
    }
  };

  const removeFromCart = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.menuItemId !== id);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => {
      const updated = prev.map(i => {
        if (i.menuItemId === id) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
      if (updated.length === 0) setRestaurantId(null);
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, restaurantId, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
