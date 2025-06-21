import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, AlertTriangle, Clock, MoreVertical, Play, Pause, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { MonitorCardSkeleton, TableSkeleton } from '../components/ui/SkeletonLoader';
import UptimeChart from '../components/dashboard/UptimeChart';
import DashboardWidget from '../components/dashboard/DashboardWidget';
import SearchInput from '../components/ui/SearchInput';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';
import AddMonitorModal from '../components/modals/AddMonitorModal';
import { generateTimeRange, formatRelativeTime, getUptimeColor } from '../utils/dateUtils';

// Sample data for the response time chart
const responseTimeData = [
  { name: 'Mon', responseTime: 245 },
  { name: 'Tue', responseTime: 238 },
  { name: 'Wed', responseTime: 252 },
  { name: 'Thu', responseTime: 234 },
  { name: 'Fri', responseTime: 241 },
  { name: 'Sat', responseTime: 239 },
  { name: 'Sun', responseTime: 247 },
];

export default function DashboardPage() {
  const { state } = useApp();
  const { addToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [uptimeData, setUptimeData] = useState(generateTimeRange('7d'));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update uptime data when time range changes
  useEffect(() => {
    setUptimeData(generateTimeRange(timeRange));
  }, [timeRange]);

  const handleDropdownToggle = (monitorId: string) => {
    setActiveDropdown(activeDropdown === monitorId ? null : monitorId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleAddMonitor = () => {
    setShowAddModal(true);
  };

  const handleMonitorAction = (action: string, monitorName: string) => {
    addToast({
      type: 'success',
      title: `Monitor ${action}`,
      message: `${monitorName} has been ${action.toLowerCase()}`,
    });
    setActiveDropdown(null);
  };

  // Filter monitors based on search term
  const filteredMonitors = state.monitors.filter(monitor =>
    monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monitor.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monitor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div>
        <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onAddMonitor={handleAddMonitor} />
        
        <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <div className="h-8 w-48 bg-gray-700/50 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-700/50 rounded-2xl animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <MonitorCardSkeleton key={i} />
              ))}
            </div>

            {/* Chart Skeleton */}
            <Card className="mb-8">
              <div className="h-6 w-48 bg-gray-700/50 rounded mb-6 animate-pulse"></div>
              <div className="h-64 bg-gray-700/50 rounded animate-pulse"></div>
            </Card>

            {/* Table Skeleton */}
            <Card>
              <div className="h-6 w-32 bg-gray-700/50 rounded mb-6 animate-pulse"></div>
              <TableSkeleton />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onAddMonitor={handleAddMonitor} />
      
      <div className={`pt-28 p-4 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Monitor your websites and services</p>
            </div>
            <Button onClick={handleAddMonitor}>
              <Plus className="h-4 w-4 mr-2" />
              Add Monitor
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardWidget id="uptime-widget" title="Total Uptime">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-3xl font-bold ${getUptimeColor(state.stats.totalUptime)}`}>
                    {state.stats.totalUptime}%
                  </p>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </DashboardWidget>

            <DashboardWidget id="incidents-widget" title="Incidents">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-red-400">{state.stats.incidents}</p>
                  <p className="text-gray-400 text-sm">This month</p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-2xl">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </DashboardWidget>

            <DashboardWidget id="response-time-widget" title="Avg Response Time">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-400">{state.stats.avgResponseTime}ms</p>
                  <p className="text-gray-400 text-sm">Last 24 hours</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </DashboardWidget>
          </div>

          {/* Uptime Trend Chart */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Uptime Trend</h2>
              <div className="flex items-center space-x-2">
                {(['24h', '7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-primary text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <UptimeChart data={uptimeData} timeRange={timeRange} />
          </Card>

          {/* Response Time Chart */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Response Time (Last 7 Days)</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  Response Time
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
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

          {/* Monitors List */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Your Monitors</h2>
                <p className="text-sm text-gray-400 ml-4">{filteredMonitors.length} monitors</p>
              </div>
              <SearchInput
                placeholder="Search monitors..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="w-full sm:w-64"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Uptime</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Response Time</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Check</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Tags</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMonitors.map((monitor) => (
                    <tr key={monitor.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-medium">{monitor.name}</p>
                          <p className="text-sm text-gray-400">{monitor.url}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={monitor.status} />
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${getUptimeColor(monitor.uptime)}`}>
                          {monitor.uptime}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white">
                          {monitor.status === 'DOWN' ? 'N/A' : `${monitor.responseTime}ms`}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-400">{monitor.lastCheck}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {monitor.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="relative">
                          <button
                            onClick={() => handleDropdownToggle(monitor.id)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          
                          {activeDropdown === monitor.id && (
                            <div className="absolute right-0 top-8 bg-dark-100 border border-gray-700 rounded-2xl shadow-lg z-10 min-w-[150px]">
                              <button 
                                onClick={() => handleMonitorAction('Resumed', monitor.name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-t-2xl transition-colors"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Resume
                              </button>
                              <button 
                                onClick={() => handleMonitorAction('Paused', monitor.name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                              >
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </button>
                              <button 
                                onClick={() => handleMonitorAction('Deleted', monitor.name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-b-2xl transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredMonitors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    {searchTerm ? 'No monitors found matching your search.' : 'No monitors yet. Add your first monitor to get started!'}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {showAddModal && (
        <AddMonitorModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}