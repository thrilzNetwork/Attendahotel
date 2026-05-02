import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, User, LogIn, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { motion } from 'motion/react';

export function Navbar() {
  const { user, login } = useAuth();
  const { items } = useCart();
  const itemCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="hidden md:flex items-center gap-2 font-bold text-xl text-orange-600">
        <Store className="w-6 h-6" />
        <span>HotelDine</span>
      </div>
      
      <div className="flex justify-between items-center w-full md:w-auto md:gap-8">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </NavLink>

        <NavLink 
          to="/orders" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400'}`}
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider">Orders</span>
        </NavLink>

        {user ? (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-600' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
          </NavLink>
        ) : (
          <button 
            onClick={login}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-600 transition-colors"
          >
            <LogIn className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}
