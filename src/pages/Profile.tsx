import { LogOut, Home, User as UserIcon, Award, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { profile, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  return (
    <div className="pb-32 pt-4 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <UserIcon className="w-10 h-10 text-orange-600" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">{profile.name}</h1>
        <p className="text-gray-500">{profile.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <Award className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-gray-900">{profile.points}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Guest Points</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
          <Home className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <span className="text-2xl font-black text-gray-900">{profile.roomNumber || '---'}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Room Number</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <button 
          onClick={() => navigate('/admin')}
          className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
        >
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <span className="font-bold text-gray-900 block">Kitchen POS</span>
            <span className="text-xs text-gray-400">Order management for partners</span>
          </div>
        </button>

        <button 
          onClick={logout}
          className="w-full p-5 flex items-center gap-4 hover:bg-red-50 transition-colors text-red-600"
        >
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="font-bold block">Logout</span>
            <span className="text-xs text-red-300">End your session</span>
          </div>
        </button>
      </div>

      <div className="p-6 bg-orange-600 rounded-3xl text-white shadow-xl">
        <h3 className="font-black text-lg mb-2 uppercase tracking-tight">Stay Perks</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          As a guest at our hotel, you receive exclusive discounts from all local partner restaurants. 
          Your points add up for free desserts and priority delivery!
        </p>
      </div>
    </div>
  );
}
