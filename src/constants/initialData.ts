export const SAMPLE_RESTAURANTS = [
  {
    id: "rest-tamarindo",
    name: "Tamarindo Kitchen",
    description: "Authentic coastal flavors and fresh tropical seafood.",
    cuisine: "Latin Fusion",
    rating: 4.9,
    deliveryTime: "15-25 min",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=800&auto=format&fit=crop",
    discountPercent: 20,
    isFeatured: true
  },
  {
    id: "rest-1",
    name: "Bella Italia",
    description: "Authentic wood-fired pizzas and homemade pasta.",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    discountPercent: 15,
    isFeatured: true
  },
  {
    id: "rest-2",
    name: "Sakura Zen",
    description: "Premium sushi and traditional Japanese flavors.",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-45 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    discountPercent: 10,
    isFeatured: false
  },
  {
    id: "rest-3",
    name: "The Craft Burger",
    description: "Gourmet burgers with locally sourced ingredients.",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    discountPercent: 20,
    isFeatured: true
  },
  {
    id: "rest-green",
    name: "Green Garden",
    description: "Fresh, healthy salads and organic cold-pressed juices.",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    discountPercent: 10,
    isFeatured: false
  }
];

export const SAMPLE_MENU_ITEMS = {
  "rest-tamarindo": [
    { id: "mt-1", restaurantId: "rest-tamarindo", name: "Ceviche Clasico", description: "Fresh sea bass, lime juice, cilantro, red onions.", price: 19.00, discountedPrice: 15.20, category: "Starters", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400&auto=format&fit=crop" },
    { id: "mt-2", restaurantId: "rest-tamarindo", name: "Lomo Saltado", description: "Beef stir-fry with onions, tomatoes, and crispy fries.", price: 26.00, discountedPrice: 20.80, category: "Main Course", image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=400&auto=format&fit=crop" }
  ],
  "rest-1": [
    { id: "m1-1", restaurantId: "rest-1", name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, basil.", price: 18.00, discountedPrice: 15.30, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbcd80ad00?q=80&w=400&auto=format&fit=crop" },
    { id: "m1-2", restaurantId: "rest-1", name: "Fettuccine Alfredo", description: "Rich creamy sauce with parmesan.", price: 22.00, discountedPrice: 18.70, category: "Pasta", image: "https://images.unsplash.com/photo-1645112481351-f2f2ac355b25?q=80&w=400&auto=format&fit=crop" }
  ],
  "rest-2": [
    { id: "m2-1", restaurantId: "rest-2", name: "Dragon Roll", description: "Tempura shrimp, avocado, eel sauce.", price: 16.00, discountedPrice: 14.40, category: "Sushi", image: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=400&auto=format&fit=crop" },
    { id: "m2-2", restaurantId: "rest-2", name: "Miso Soup", description: "Silken tofu, seaweed, dashi broth.", price: 6.00, discountedPrice: 5.40, category: "Sides", image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=400&auto=format&fit=crop" }
  ],
  "rest-3": [
    { id: "m3-1", restaurantId: "rest-3", name: "Truffle Burger", description: "Waygu beef, truffle aioli, swiss cheese.", price: 24.00, discountedPrice: 19.20, category: "Burgers", image: "https://images.unsplash.com/photo-1550317138-10000687ad32?q=80&w=400&auto=format&fit=crop" },
    { id: "m3-2", restaurantId: "rest-3", name: "Sweet Potato Fries", description: "Dusted with sea salt and rosemary.", price: 8.00, discountedPrice: 6.40, category: "Sides", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=400&auto=format&fit=crop" }
  ],
  "rest-green": [
    { id: "mg-1", restaurantId: "rest-green", name: "Quinoa Bowl", description: "Kale, roasted sweet potato, chickpeas, tahini.", price: 15.00, discountedPrice: 13.50, category: "Salads", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop" },
    { id: "mg-2", restaurantId: "rest-green", name: "Green Detox Juice", description: "Cucumber, apple, celery, spinach, lemon.", price: 9.00, discountedPrice: 8.10, category: "Juices", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=400&auto=format&fit=crop" }
  ]
};
