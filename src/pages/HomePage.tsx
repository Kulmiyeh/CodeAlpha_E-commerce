import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Zap } from 'lucide-react';
import API from '../lib/api';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { Loader } from '../components/Loader';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get('/products', { params: { pageSize: 4 } });
        setFeaturedProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/ecommerce/1920/1080"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Upgrade Your <span className="text-blue-600">Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover our curated collection of premium electronics, accessories, and home essentials. Quality that speaks for itself.
            </p>
            <div className="flex space-x-4">
              <Link to="/products">
                <Button size="lg" className="rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?category=Electronics">
                <Button variant="outline" size="lg" className="rounded-full">
                  View Categories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" },
            { icon: Zap, title: "Fast Delivery", desc: "Within 2-3 business days" },
            { icon: ShoppingBag, title: "Easy Returns", desc: "30-day return policy" }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-3">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center rounded-xl">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-500">Our handpicked selection of top-rated items.</p>
          </div>
          <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full"><Loader /></div>
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-3xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Newsletter</h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col md:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white text-gray-900 focus:outline-none"
            />
            <Button className="rounded-full bg-gray-900 hover:bg-gray-800">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
