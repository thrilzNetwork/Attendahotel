import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
            <main className="mx-auto max-w-7xl md:pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Navbar />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
