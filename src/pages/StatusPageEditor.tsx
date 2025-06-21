import React, { useState } from 'react';
import { Eye, Globe, Settings, Palette, Shield } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function StatusPageEditor() {
  const [statusPage, setStatusPage] = useState({
    name: 'Service Status',
    domain: '',
    customDomain: '',
    removeBranding: false,
    password: '',
    language: 'en',
    showUptime: true,
    showCharts: true,
    showIncidents: true,
    theme: 'dark'
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSave = () => {
    // Save status page configuration
    console.log('Saving status page:', statusPage);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="max-w-7xl pt-20 mx-auto relative z-10">
          {/* Header - Fixed positioning issue */}
          <div className="flex items-center justify-between mb-8 relative z-20">
            <div>
              <h1 className="text-3xl font-bold text-white">Status Page Editor</h1>
              <p className="text-gray-400 mt-1">Create and customize your public status page</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Globe className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <div className="space-y-6">
              {/* Basic Settings */}
              <Card>
                <div className="flex items-center mb-6">
                  <Settings className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-white">Basic Settings</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status Page Name
                    </label>
                    <input
                      type="text"
                      value={statusPage.name}
                      onChange={(e) => setStatusPage({ ...statusPage, name: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Service Status"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Homepage URL
                    </label>
                    <input
                      type="url"
                      value={statusPage.domain}
                      onChange={(e) => setStatusPage({ ...statusPage, domain: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Custom Domain (CNAME)
                    </label>
                    <input
                      type="text"
                      value={statusPage.customDomain}
                      onChange={(e) => setStatusPage({ ...statusPage, customDomain: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="status.example.com"
                    />
                    <p className="text-sm text-gray-400 mt-1">Pro feature - Use your own domain</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={statusPage.language}
                      onChange={(e) => setStatusPage({ ...statusPage, language: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Access Control */}
              <Card>
                <div className="flex items-center mb-6">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-white">Access Control</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password Protection
                    </label>
                    <input
                      type="password"
                      value={statusPage.password}
                      onChange={(e) => setStatusPage({ ...statusPage, password: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Leave empty for public access"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Remove Monitorly Branding</p>
                      <p className="text-sm text-gray-400">Hide "Powered by Monitorly" footer</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={statusPage.removeBranding}
                        onChange={(e) => setStatusPage({ ...statusPage, removeBranding: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Display Options */}
              <Card>
                <div className="flex items-center mb-6">
                  <Palette className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold text-white">Display Options</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Show Uptime Percentage</p>
                      <p className="text-sm text-gray-400">Display overall uptime statistics</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={statusPage.showUptime}
                        onChange={(e) => setStatusPage({ ...statusPage, showUptime: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Show Response Time Charts</p>
                      <p className="text-sm text-gray-400">Display historical response time data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={statusPage.showCharts}
                        onChange={(e) => setStatusPage({ ...statusPage, showCharts: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Show Incident History</p>
                      <p className="text-sm text-gray-400">Display past incidents and outages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={statusPage.showIncidents}
                        onChange={(e) => setStatusPage({ ...statusPage, showIncidents: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={statusPage.theme}
                      onChange={(e) => setStatusPage({ ...statusPage, theme: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold text-white mb-6">Preview</h2>
                
                <div className="bg-dark-200 rounded-2xl p-6 min-h-[600px]">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">{statusPage.name}</h1>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-medium">All Systems Operational</span>
                    </div>
                  </div>

                  {statusPage.showUptime && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">99.9%</div>
                        <div className="text-sm text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">245ms</div>
                        <div className="text-sm text-gray-400">Response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">0</div>
                        <div className="text-sm text-gray-400">Incidents</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-100 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white">Website</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-100 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white">API</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Operational</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-100 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white">Database</span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Operational</span>
                    </div>
                  </div>

                  {statusPage.showIncidents && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Recent Incidents</h3>
                      <div className="text-center text-gray-400 py-8">
                        No incidents reported in the last 30 days.
                      </div>
                    </div>
                  )}

                  {!statusPage.removeBranding && (
                    <div className="text-center mt-8 pt-6 border-t border-gray-700">
                      <p className="text-xs text-gray-500">Powered by Monitorly</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}