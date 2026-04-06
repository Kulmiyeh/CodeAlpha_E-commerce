import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { User, Mail, Package, Settings, Heart, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const orderHistory = [
    { id: '#ORD-7281', date: 'Oct 12, 2023', total: '$345.00', status: 'Delivered' },
    { id: '#ORD-6192', date: 'Sep 25, 2023', total: '$129.99', status: 'Shipped' },
    { id: '#ORD-5541', date: 'Aug 10, 2023', total: '$89.50', status: 'Delivered' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6 text-center space-y-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full mx-auto border-4 border-blue-100 dark:border-blue-900/30"
              />
              <div>
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-lg" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            <nav className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-2 overflow-hidden">
              {[
                { icon: User, label: 'Personal Info', active: true },
                { icon: Package, label: 'My Orders' },
                { icon: Heart, label: 'Wishlist' },
                { icon: Settings, label: 'Settings' },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 space-y-6">
              <h3 className="text-xl font-bold">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <p className="font-medium">+1 (555) 000-0000</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                  <p className="font-medium">New York, USA</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 space-y-6">
              <h3 className="text-xl font-bold">Order History</h3>
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 border dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="space-y-1">
                      <p className="font-bold">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold">{order.total}</p>
                      <p className={`text-xs font-bold ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full">View All Orders</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
