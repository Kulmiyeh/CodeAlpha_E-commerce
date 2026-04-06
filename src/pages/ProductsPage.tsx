import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../lib/api';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Loader } from '../components/Loader';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>(['All']);

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/products', {
          params: {
            keyword: currentSearch,
            pageNumber: currentPage,
            category: currentCategory === 'All' ? '' : currentCategory,
            sort: currentSort,
          },
        });
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentSearch, currentPage, currentCategory, currentSort]);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/products');
        const allProducts = data.products; // This is just a sample, ideally backend provides categories
        const uniqueCategories = ['All', ...new Set(allProducts.map((p: any) => p.category)) as any];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => {
      if (category === 'All') prev.delete('category');
      else prev.set('category', category);
      return prev;
    });
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSearchParams(prev => {
      prev.set('sort', sort);
      return prev;
    });
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-gray-500">{products.length} items found</p>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={currentSearch}
              onChange={(e) => {
                setSearchParams(prev => {
                  if (e.target.value) prev.set('search', e.target.value);
                  else prev.delete('search');
                  return prev;
                });
                setCurrentPage(1);
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`md:w-64 space-y-8 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex justify-between items-center">
              Categories
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)} className="md:hidden">
                <X className="h-4 w-4" />
              </Button>
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-sm rounded-lg text-left transition-colors ${
                    currentCategory === cat
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Sort By</h3>
            <select
              className="w-full p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-10">
          {loading ? (
            <Loader />
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product as any} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 pt-10 border-t dark:border-gray-800">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'primary' : 'outline'}
                      size="sm"
                      className="w-10 h-10 rounded-lg"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchParams({})}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
