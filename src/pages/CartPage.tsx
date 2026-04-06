import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button';
import { formatPrice } from '../lib/utils';

const CartPage: React.FC = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="h-24 w-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-full">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6">
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t dark:border-gray-800 flex justify-between items-center">
              <Button variant="ghost" className="text-red-600" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
              <Link to="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>{formatPrice(totalPrice * 0.1)}</span>
              </div>
              <div className="pt-4 border-t dark:border-gray-800 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">{formatPrice(totalPrice * 1.1)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button size="lg" className="w-full rounded-xl">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
