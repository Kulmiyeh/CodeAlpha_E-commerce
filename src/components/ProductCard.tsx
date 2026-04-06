import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../lib/utils';
import { Button } from './Button';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.error('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <Button variant="secondary" size="icon" className="rounded-full" onClick={toggleWishlist}>
            <Heart className={`h-5 w-5 ${isInWishlist(product._id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Eye className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
          {product.category}
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product._id}`} className="font-bold text-lg hover:text-blue-600 transition-colors line-clamp-1">
            {product.title}
          </Link>
        </div>

        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </span>
          <Button size="sm" onClick={handleAddToCart} className="rounded-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
