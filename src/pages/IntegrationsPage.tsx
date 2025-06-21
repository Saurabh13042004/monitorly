import React, { useState } from 'react';
import { Puzzle, Check, ExternalLink, Settings } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const integrations = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send alerts to Slack channels and receive notifications',
    logo: '💬',
    connected: true,
    category: 'Communication'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Get notified in Discord servers when monitors go down',
    logo: '🎮',
    connected: false,
    category: 'Communication'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Receive instant alerts via Telegram bot',
    logo: '✈️',
    connected: true,
    category: 'Communication'
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Send HTTP requests to custom endpoints',
    logo: '🔗',
    connected: true,
    category: 'Developer'
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Create incidents in PagerDuty for critical alerts',
    logo: '📟',
    connected: false,
    category: 'Incident Management',
    premium: true
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 5000+ apps through Zapier automation',
    logo: '⚡',
    connected: false,
    category: 'Automation'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Send alerts to Microsoft Teams channels',
    logo: '👥',
    connected: false,
    category: 'Communication'
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Traditional email notifications with customizable templates',
    logo: '📧',
    connected: true,
    category: 'Communication'
  },
  {
    id: 'pushover',
    name: 'Pushover',
    description: 'Push notifications to mobile devices',
    logo: '📱',
    connected: false,
    category: 'Mobile'
  }
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = ['All', 'Communication', 'Developer', 'Incident Management', 'Automation', 'Mobile'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConnect = (integrationId: string) => {
    console.log('Connecting to:', integrationId);
  };

  const handleDisconnect = (integrationId: string) => {
    console.log('Disconnecting from:', integrationId);
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
            <p className="text-gray-400 mt-1">Connect Monitorly with your favorite tools and services</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Available Integrations</p>
                  <p className="text-3xl font-bold text-white">{integrations.length}</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-2xl">
                  <Puzzle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Connected</p>
                  <p className="text-3xl font-bold text-green-400">
                    {integrations.filter(i => i.connected).length}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <Check className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-3xl font-bold text-blue-400">{categories.length - 1}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <Settings className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} hover={true}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.logo}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                        {integration.premium && (
                          <span className="px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full font-medium">
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{integration.category}</p>
                    </div>
                  </div>
                  {integration.connected && (
                    <div className="flex items-center space-x-1">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Connected</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-6">{integration.description}</p>

                <div className="flex space-x-2">
                  {integration.connected ? (
                    <>
                      <Button variant="secondary" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => handleConnect(integration.id)}
                      disabled={integration.premium}
                      className="w-full"
                      size="sm"
                    >
                      {integration.premium ? 'Upgrade Required' : 'Connect'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredIntegrations.length === 0 && (
            <Card>
              <div className="text-center py-12">
                <Puzzle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No integrations found</h3>
                <p className="text-gray-400">Try adjusting your search or category filter</p>
              </div>
            </Card>
          )}

          {/* Custom Integration CTA */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-white mb-2">Need a custom integration?</h3>
              <p className="text-gray-300 mb-6">
                We can build custom integrations for Enterprise customers. Contact our team to discuss your requirements.
              </p>
              <div className="flex justify-center">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}