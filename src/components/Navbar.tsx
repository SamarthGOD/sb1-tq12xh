import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const location = useLocation();
  const { user, setUser } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="ml-2 font-semibold text-gray-900">Healthcare Portal</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </div>
              </Link>
            </div>
          </div>

          {user && (
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}