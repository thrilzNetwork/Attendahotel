export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  discountPercent: number;
  isFeatured: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  category: string;
  image: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  guestId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  roomNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestProfile {
  id: string;
  name: string;
  roomNumber: string;
  email: string;
  points: number;
  checkedIn: boolean;
}
