export interface Product {
  _id: string;
  id?: number; // Keep for compatibility if needed
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  stock: number;
}

export const products: Product[] = [
  {
    _id: '1',
    id: 1,
    title: "Premium Wireless Headphones",
    description: "Experience high-fidelity sound with our premium wireless noise-canceling headphones. Perfect for music lovers and professionals alike.",
    price: 299.99,
    rating: 4.8,
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones/600/600",
    stock: 15
  },
  {
    _id: '2',
    id: 2,
    title: "Minimalist Smart Watch",
    description: "Stay connected and track your fitness with this sleek, minimalist smart watch. Features heart rate monitoring and 7-day battery life.",
    price: 199.99,
    rating: 4.5,
    category: "Electronics",
    image: "https://picsum.photos/seed/watch/600/600",
    stock: 25
  },
  {
    _id: '3',
    id: 3,
    title: "Leather Weekend Bag",
    description: "A handcrafted genuine leather bag designed for your short trips. Durable, stylish, and spacious enough for all your essentials.",
    price: 149.50,
    rating: 4.7,
    category: "Accessories",
    image: "https://picsum.photos/seed/bag/600/600",
    stock: 10
  },
  {
    _id: '4',
    id: 4,
    title: "Ergonomic Office Chair",
    description: "Work in comfort with our fully adjustable ergonomic office chair. Designed to support your posture during long working hours.",
    price: 349.00,
    rating: 4.9,
    category: "Furniture",
    image: "https://picsum.photos/seed/chair/600/600",
    stock: 8
  },
  {
    _id: '5',
    id: 5,
    title: "Mechanical Gaming Keyboard",
    description: "Tactile, fast, and durable. This RGB mechanical keyboard will take your gaming experience to the next level.",
    price: 129.99,
    rating: 4.6,
    category: "Electronics",
    image: "https://picsum.photos/seed/keyboard/600/600",
    stock: 20
  },
  {
    _id: '6',
    id: 6,
    title: "Portable Bluetooth Speaker",
    description: "Waterproof and powerful. Take your music anywhere with this compact yet loud Bluetooth speaker.",
    price: 79.99,
    rating: 4.4,
    category: "Electronics",
    image: "https://picsum.photos/seed/speaker/600/600",
    stock: 40
  },
  {
    _id: '7',
    id: 7,
    title: "Ceramic Coffee Mug Set",
    description: "A set of 4 minimalist ceramic mugs. Perfect for your morning coffee or afternoon tea.",
    price: 35.00,
    rating: 4.3,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/mug/600/600",
    stock: 50
  },
  {
    _id: '8',
    id: 8,
    title: "Cotton Comfort Hoodie",
    description: "Soft, breathable, and incredibly comfortable. This premium cotton hoodie is a wardrobe essential.",
    price: 55.00,
    rating: 4.7,
    category: "Apparel",
    image: "https://picsum.photos/seed/hoodie/600/600",
    stock: 30
  }
];

export const categories = ["All", ...new Set(products.map(p => p.category))];
