import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Webhook, Smartphone, Plus, Trash2, TestTube } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const alertChannels = [
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    description: 'Send alerts via email',
    configured: true,
    config: { email: 'admin@example.com' }
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: MessageSquare,
    description: 'Send alerts to Slack channels',
    configured: false,
    config: {}
  },
  {
    id: 'webhook',
    name: 'Webhook',
    icon: Webhook,
    description: 'Send alerts to custom webhooks',
    configured: true,
    config: { url: 'https://api.example.com/webhook' }
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: Smartphone,
    description: 'Send alerts via SMS (Premium)',
    configured: false,
    config: {},
    premium: true
  }
];

export default function AlertSettings() {
  const [channels, setChannels] = useState(alertChannels);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTest = (channelId: string) => {
    // Send test alert
    console.log('Testing channel:', channelId);
  };

  const handleToggle = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, configured: !channel.configured }
        : channel
    ));
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
      
      <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="max-w-4xl pt-20 mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Alert Settings</h1>
              <p className="text-gray-400 mt-1">Configure how you want to receive notifications</p>
            </div>
            <Button onClick={() => setShowAddChannel(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Channel
            </Button>
          </div>

          {/* Global Alert Settings */}
          <Card className="mb-8">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-white">Global Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Enable Alerts</p>
                  <p className="text-sm text-gray-400">Receive notifications when monitors go down</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Alert Grouping</p>
                  <p className="text-sm text-gray-400">Group multiple alerts within 5 minutes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Escalation</p>
                  <p className="text-sm text-gray-400">Send additional alerts if not acknowledged</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Alert Channels */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Alert Channels</h2>
            
            {channels.map((channel) => {
              const IconComponent = channel.icon;
              return (
                <Card key={channel.id} hover={true}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${
                        channel.configured ? 'bg-green-500/20' : 'bg-gray-700'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          channel.configured ? 'text-green-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{channel.name}</h3>
                          {channel.premium && (
                            <span className="px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full font-medium">
                              Pro
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400">{channel.description}</p>
                        {channel.configured && channel.config.email && (
                          <p className="text-sm text-gray-500 mt-1">{channel.config.email}</p>
                        )}
                        {channel.configured && channel.config.url && (
                          <p className="text-sm text-gray-500 mt-1">{channel.config.url}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {channel.configured && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTest(channel.id)}
                        >
                          <TestTube className="h-4 w-4 mr-1" />
                          Test
                        </Button>
                      )}
                      <Button 
                        variant={channel.configured ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => handleToggle(channel.id)}
                        disabled={channel.premium}
                      >
                        {channel.configured ? 'Edit' : 'Configure'}
                      </Button>
                      {channel.configured && (
                        <button
                          onClick={() => handleToggle(channel.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Alert Rules */}
          <Card className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-6">Alert Rules</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-200 rounded-xl">
                <div>
                  <p className="text-white font-medium">Monitor goes down</p>
                  <p className="text-sm text-gray-400">Immediate alert when a monitor fails</p>
                </div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-200 rounded-xl">
                <div>
                  <p className="text-white font-medium">Monitor comes back up</p>
                  <p className="text-sm text-gray-400">Alert when a monitor recovers</p>
                </div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-200 rounded-xl">
                <div>
                  <p className="text-white font-medium">SSL certificate expires</p>
                  <p className="text-sm text-gray-400">Alert 30 days before SSL expiry</p>
                </div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-dark-200 rounded-xl">
                <div>
                  <p className="text-white font-medium">Response time threshold</p>
                  <p className="text-sm text-gray-400">Alert when response time exceeds 5 seconds</p>
                </div>
                <span className="text-gray-400 text-sm font-medium">Inactive</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}