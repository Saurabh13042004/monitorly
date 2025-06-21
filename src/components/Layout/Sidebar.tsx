import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Bell, 
  Globe, 
  Puzzle, 
  Users, 
  Key,
  Settings,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Status Pages', href: '/status-pages', icon: Globe },
  { name: 'Integrations', href: '/integrations', icon: Puzzle },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'API Keys', href: '/settings', icon: Key },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMonitor?: () => void;
}

export default function Sidebar({ isOpen, onClose, onAddMonitor }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-dark-100/50 backdrop-blur-md border-r border-gray-800 pt-20 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
        
        <nav className="p-6">
          <ul className="space-y-2">
            {/* Add Monitor Button */}
            <li>
              <button
                onClick={() => {
                  onAddMonitor?.();
                  onClose();
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all w-full text-left bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Add Monitor</span>
              </button>
            </li>
            
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}