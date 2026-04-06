import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Button } from './Button';

interface CartItemProps {
  item: any;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 py-4 border-b dark:border-gray-800 last:border-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border dark:border-gray-800">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3 className="line-clamp-1">{item.title}</h3>
          <p className="ml-4 font-bold">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)} each</p>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => removeFromCart(item._id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
