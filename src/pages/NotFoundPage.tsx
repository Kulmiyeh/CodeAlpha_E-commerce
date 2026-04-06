import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-8">
      <div className="relative">
        <h1 className="text-[150px] font-black text-gray-100 dark:text-gray-900 leading-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="h-20 w-20 text-blue-600 animate-bounce" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Oops! Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <Link to="/">
        <Button size="lg" className="rounded-full">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
