import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      setIsLoading(false);
      navigate(from, { replace: true });
      toast.success('Welcome back!');
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl border dark:border-gray-800 p-8 space-y-8 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="kulmiye@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-gray-800" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="rounded-xl">Google</Button>
          <Button variant="outline" className="rounded-xl">GitHub</Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
