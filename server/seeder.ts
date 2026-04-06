import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import connectDB from './config/db';

import { isDbConnected } from './config/db';

dotenv.config();

const products = [
  {
    title: "Premium Wireless Headphones",
    description: "Experience high-fidelity sound with our premium wireless noise-canceling headphones. Perfect for music lovers and professionals alike.",
    price: 299.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/headphones/600/600",
    stock: 15,
    rating: 4.8,
    numReviews: 12
  },
  {
    title: "Minimalist Smart Watch",
    description: "Stay connected and track your fitness with this sleek, minimalist smart watch. Features heart rate monitoring and 7-day battery life.",
    price: 199.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/watch/600/600",
    stock: 25,
    rating: 4.5,
    numReviews: 8
  },
  {
    title: "Leather Weekend Bag",
    description: "A handcrafted genuine leather bag designed for your short trips. Durable, stylish, and spacious enough for all your essentials.",
    price: 149.50,
    category: "Accessories",
    image: "https://picsum.photos/seed/bag/600/600",
    stock: 10,
    rating: 4.7,
    numReviews: 15
  },
  {
    title: "Ergonomic Office Chair",
    description: "Work in comfort with our fully adjustable ergonomic office chair. Designed to support your posture during long working hours.",
    price: 349.00,
    category: "Furniture",
    image: "https://picsum.photos/seed/chair/600/600",
    stock: 8,
    rating: 4.9,
    numReviews: 20
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();

  if (!isDbConnected) {
    console.error('❌ Cannot run seeder without a database connection.');
    console.error('Please provide a MONGODB_URI in your environment variables.');
    process.exit(1);
  }

  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

runSeeder();
