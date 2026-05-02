import { Restaurant } from '../types';
import { Star, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <motion.div 
        whileHover={{ y: -4 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-orange-900/20">
            <Tag className="w-3 h-3" />
            <span>{restaurant.discountPercent}% OFF</span>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-orange-600 shadow-sm border border-orange-100 flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-orange-600" />
              <span>Hotel Audited</span>
            </div>
            {restaurant.isFeatured && (
              <div className="bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-sm flex items-center gap-1">
                <span>Exclusive</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{restaurant.name}</h3>
            <div className="flex items-center gap-1 text-gray-900 text-xs font-black">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-1">{restaurant.description}</p>
          
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {restaurant.deliveryTime}
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{restaurant.cuisine}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
