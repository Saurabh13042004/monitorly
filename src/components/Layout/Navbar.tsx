import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, User, Bell, Settings, Menu } from 'lucide-react';

interface NavbarProps {
  isLanding?: boolean;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function Navbar({ isLanding = false, onToggleSidebar, sidebarOpen }: NavbarProps) {
  if (isLanding) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-dark-300/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold text-white">Monitorly</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-2xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-100/50 backdrop-blur-md border-b border-gray-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <Link to="/dashboard" className="flex items-center space-x-2 z-10">
              <Monitor className="h-8 w-8 text-secondary" />
              <span className="text-xl font-bold text-white">Monitorly</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-gray-300 hidden sm:block">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}