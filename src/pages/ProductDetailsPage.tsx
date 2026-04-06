import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import API from '../lib/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <p className="text-gray-500">The product you are looking for doesn't exist.</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.title} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border dark:border-gray-800">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold leading-tight">{product.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-500 text-sm">(120 reviews)</span>
              </div>
              <span className="text-green-600 font-medium text-sm">In Stock ({product.stock})</span>
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-xl dark:border-gray-700 h-12">
                <Button
                  variant="ghost"
                  className="h-full px-4 rounded-l-xl"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  className="h-full px-4 rounded-r-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1 rounded-xl h-12" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
