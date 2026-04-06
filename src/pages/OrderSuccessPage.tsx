import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { Button } from '../components/Button';
import { motion } from 'motion/react';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="h-24 w-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="h-12 w-12" />
      </motion.div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Order Placed Successfully!</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Thank you for your purchase. Your order <span className="font-bold text-gray-900 dark:text-gray-100">#ORD-{Math.floor(Math.random() * 10000)}</span> has been received and is being processed.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full border dark:border-gray-800 flex items-center space-x-4 text-left">
        <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <Package className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold">Track your order</h3>
          <p className="text-sm text-gray-500">We'll send you an email with tracking details once your order ships.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/profile">
          <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto">
            View Order History
          </Button>
        </Link>
        <Link to="/products">
          <Button size="lg" className="rounded-full w-full sm:w-auto">
            Continue Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
