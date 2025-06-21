import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Clock, TrendingUp, AlertTriangle, Settings, Play, Pause } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';

const responseTimeData = [
  { time: '00:00', responseTime: 245, uptime: 100 },
  { time: '04:00', responseTime: 238, uptime: 100 },
  { time: '08:00', responseTime: 0, uptime: 0 },
  { time: '12:00', responseTime: 252, uptime: 100 },
  { time: '16:00', responseTime: 234, uptime: 100 },
  { time: '20:00', responseTime: 241, uptime: 100 },
];

const uptimeData = [
  { period: '24h', uptime: 99.2 },
  { period: '7d', uptime: 99.8 },
  { period: '30d', uptime: 99.1 },
  { period: '90d', uptime: 98.9 },
];

const incidents = [
  {
    id: 1,
    started: '2024-01-15 08:30',
    duration: '15 minutes',
    resolved: '2024-01-15 08:45',
    cause: 'Server timeout',
    status: 'resolved'
  },
  {
    id: 2,
    started: '2024-01-12 14:20',
    duration: '8 minutes',
    resolved: '2024-01-12 14:28',
    cause: 'DNS resolution failed',
    status: 'resolved'
  },
  {
    id: 3,
    started: '2024-01-10 22:15',
    duration: '22 minutes',
    resolved: '2024-01-10 22:37',
    cause: 'Connection refused',
    status: 'resolved'
  }
];

export default function MonitorDetailPage() {
  const { id } = useParams();
  const { state } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const monitor = state.monitors.find(m => m.id === id);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  if (!monitor) {
    return (
      <div>
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'} flex items-center justify-center`}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Monitor not found</h1>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link 
              to="/dashboard" 
              className="p-2 text-gray-400 hover:text-white transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Globe className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-white">{monitor.name}</h1>
                <StatusBadge status={monitor.status} />
              </div>
              <p className="text-gray-400">{monitor.url}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline">
                {monitor.status === 'PAUSED' ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Current Status</p>
                <div className="text-2xl font-bold mb-2">
                  {monitor.status === 'UP' ? (
                    <span className="text-green-400">ONLINE</span>
                  ) : (
                    <span className="text-red-400">OFFLINE</span>
                  )}
                </div>
                <p className="text-sm text-gray-400">Last checked: {monitor.lastCheck}</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Response Time</p>
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {monitor.status === 'DOWN' ? 'N/A' : `${monitor.responseTime}ms`}
                </div>
                <p className="text-sm text-gray-400">Average over 24h</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Uptime (30d)</p>
                <div className="text-2xl font-bold text-green-400 mb-2">{monitor.uptime}%</div>
                <p className="text-sm text-gray-400">30-day average</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">SSL Certificate</p>
                <div className="text-2xl font-bold text-green-400 mb-2">Valid</div>
                <p className="text-sm text-gray-400">Expires in 89 days</p>
              </div>
            </Card>
          </div>

          {/* Uptime Overview */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Uptime Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {uptimeData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{item.uptime}%</div>
                  <div className="text-gray-400">{item.period}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Response Time Chart */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Response Time (Last 24 Hours)</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  Response Time
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Downtime
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      color: '#fff'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Incidents */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Incidents</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Started</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Resolved</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Cause</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white">{incident.started}</td>
                      <td className="py-4 px-4 text-gray-300">{incident.duration}</td>
                      <td className="py-4 px-4 text-gray-300">{incident.resolved}</td>
                      <td className="py-4 px-4 text-gray-300">{incident.cause}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-medium">
                          Resolved
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* SSL & Domain Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">SSL Certificate</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-medium">Valid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expires</span>
                  <span className="text-white">March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Issuer</span>
                  <span className="text-white">Let's Encrypt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Days remaining</span>
                  <span className="text-white">89 days</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Domain Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Domain</span>
                  <span className="text-white">example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Registered</span>
                  <span className="text-white">January 1, 2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Expires</span>
                  <span className="text-white">January 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Registrar</span>
                  <span className="text-white">Namecheap</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}