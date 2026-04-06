import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigate('/order-success');
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/products">
          <Button>Go to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/cart" className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6 space-y-6">
            <div className="flex items-center space-x-2 text-lg font-bold">
              <Truck className="h-5 w-5 text-blue-600" />
              <h2>Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" placeholder="Kulmiye" required />
              <Input label="Last Name" placeholder="Hussein" required />
              <Input label="Email" type="email" placeholder="kulmiye@gmail.com" className="md:col-span-2" required />
              <Input label="Address" placeholder="123 Main St" className="md:col-span-2" required />
              <Input label="City" placeholder="Mogadisho" required />
              <Input label="Zip Code" placeholder="10001" required />
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6 space-y-6">
            <div className="flex items-center space-x-2 text-lg font-bold">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h2>Payment Method</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 rounded-full border-4 border-blue-600" />
                  <span className="font-medium">Credit / Debit Card</span>
                </div>
                <div className="flex space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Card Number" placeholder="0000 0000 0000 0000" className="md:col-span-2" required />
                <Input label="Expiry Date" placeholder="MM/YY" required />
                <Input label="CVV" placeholder="123" required />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.title} <span className="font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t dark:border-gray-800 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(totalPrice * 1.1)}</span>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-xl" isLoading={isLoading}>
              Place Order
            </Button>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure encrypted checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
