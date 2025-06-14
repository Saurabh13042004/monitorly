import React, { useState } from 'react';
import { X, Globe, Lock } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppContext';

interface AddMonitorModalProps {
  onClose: () => void;
}

export default function AddMonitorModal({ onClose }: AddMonitorModalProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'HTTPS' as 'HTTP' | 'HTTPS',
    interval: 5,
    email: '',
    tags: '',
    sslCheck: true,
    domainCheck: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMonitor = {
      id: Date.now().toString(),
      name: formData.name || formData.url,
      url: formData.url,
      type: formData.type,
      status: 'UP' as const,
      uptime: 100,
      responseTime: Math.floor(Math.random() * 300) + 100,
      lastCheck: 'just now',
      nextCheck: `in ${formData.interval} minutes`,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
    };

    dispatch({ type: 'ADD_MONITOR', payload: newMonitor });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-100 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Add New Monitor</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Monitor Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Monitor Type</label>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setFormData({ ...formData, type: 'HTTP' })}
                className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                  formData.type === 'HTTP'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-white">HTTP</p>
                    <p className="text-sm text-gray-400">Standard web monitoring</p>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setFormData({ ...formData, type: 'HTTPS' })}
                className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                  formData.type === 'HTTPS'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-white">HTTPS</p>
                    <p className="text-sm text-gray-400">Secure web monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Website URL *
            </label>
            <input
              id="url"
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="https://example.com"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Monitor Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="My Website (optional)"
            />
          </div>

          {/* Check Interval */}
          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-gray-300 mb-2">
              Check Interval
            </label>
            <select
              id="interval"
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value={1}>1 minute (Pro)</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
            <p className="text-sm text-gray-400 mt-1">Higher frequency checks require a paid plan</p>
          </div>

          {/* Email Alert */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Alert Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="alerts@example.com"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="production, critical, api (comma separated)"
            />
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">SSL Expiry Alerts</p>
                <p className="text-sm text-gray-400">Get notified before SSL certificates expire</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sslCheck}
                  onChange={(e) => setFormData({ ...formData, sslCheck: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Domain Validity Check</p>
                <p className="text-sm text-gray-400">Monitor domain expiration dates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.domainCheck}
                  onChange={(e) => setFormData({ ...formData, domainCheck: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button type="submit" className="flex-1">
              Create Monitor
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}