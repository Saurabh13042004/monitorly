import React, { useState } from 'react';
import { Key, Copy, Plus, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const apiKeys = [
  {
    id: 1,
    name: 'Main API Key',
    key: 'mntly_1234567890abcdef',
    permissions: 'Full Access',
    created: '2024-01-01',
    lastUsed: '2 hours ago'
  },
  {
    id: 2,
    name: 'Read-only Key',
    key: 'mntly_readonly_abcdef123456',
    permissions: 'Read Only',
    created: '2024-01-15',
    lastUsed: '1 day ago'
  }
];

export default function SettingsPage() {
  const [keys, setKeys] = useState(apiKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState('read');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleKeyVisibility = (keyId: number) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleCreateKey = () => {
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      key: `mntly_${Math.random().toString(36).substring(2, 15)}`,
      permissions: newKeyPermissions === 'read' ? 'Read Only' : 'Full Access',
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setKeys([...keys, newKey]);
    setShowCreateModal(false);
    setNewKeyName('');
  };

  const handleDeleteKey = (keyId: number) => {
    setKeys(keys.filter(key => key.id !== keyId));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 8) + '••••••••••••••••';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">API Keys & Settings</h1>
              <p className="text-gray-400 mt-1">Manage your API keys and account settings</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </div>

          {/* API Keys Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total API Keys</p>
                  <p className="text-3xl font-bold text-white">{keys.length}</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-2xl">
                  <Key className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Keys</p>
                  <p className="text-3xl font-bold text-green-400">{keys.length}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <RefreshCw className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">API Calls (30d)</p>
                  <p className="text-3xl font-bold text-blue-400">1,247</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <Copy className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* API Keys List */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">API Keys</h2>
              <p className="text-sm text-gray-400">Use these keys to access the Monitorly API</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Key</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Permissions</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Used</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((apiKey) => (
                    <tr key={apiKey.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-white font-medium">{apiKey.name}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <code className="text-sm text-gray-300 bg-dark-200 px-2 py-1 rounded">
                            {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            {visibleKeys.has(apiKey.id) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(apiKey.key)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          apiKey.permissions === 'Full Access'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          {apiKey.permissions}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{apiKey.created}</td>
                      <td className="py-4 px-4 text-gray-300">{apiKey.lastUsed}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleDeleteKey(apiKey.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* API Documentation */}
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">API Documentation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Authentication</h3>
                <p className="text-gray-300 mb-4">
                  Include your API key in the Authorization header of your requests:
                </p>
                <div className="bg-dark-200 rounded-xl p-4">
                  <code className="text-sm text-gray-300">
                    curl -H "Authorization: Bearer YOUR_API_KEY" https://api.monitorly.com/v1/monitors
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Common Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
                    <div>
                      <code className="text-green-400">GET /v1/monitors</code>
                      <p className="text-sm text-gray-400 mt-1">List all monitors</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
                    <div>
                      <code className="text-blue-400">POST /v1/monitors</code>
                      <p className="text-sm text-gray-400 mt-1">Create a new monitor</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
                    <div>
                      <code className="text-yellow-400">PUT /v1/monitors/:id</code>
                      <p className="text-sm text-gray-400 mt-1">Update a monitor</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-200 rounded-xl">
                    <div>
                      <code className="text-red-400">DELETE /v1/monitors/:id</code>
                      <p className="text-sm text-gray-400 mt-1">Delete a monitor</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline">
                  View Full Documentation
                </Button>
                <Button variant="ghost">
                  Download Postman Collection
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Create API Key</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="My API Key"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Permissions
                  </label>
                  <select
                    value={newKeyPermissions}
                    onChange={(e) => setNewKeyPermissions(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="read">Read Only</option>
                    <option value="full">Full Access</option>
                  </select>
                  <p className="text-sm text-gray-400 mt-1">
                    Read Only keys can only view data, Full Access keys can create, update, and delete resources.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button onClick={handleCreateKey} className="flex-1" disabled={!newKeyName}>
                  Create Key
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}