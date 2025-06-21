import React, { useState } from 'react';
import { Users, Plus, Mail, Shield, MoreVertical, Crown, User } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Owner',
    status: 'Active',
    joinedAt: '2024-01-01',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Admin',
    status: 'Active',
    joinedAt: '2024-01-15',
    lastActive: '1 day ago'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'Pending',
    joinedAt: '2024-01-20',
    lastActive: 'Never'
  }
];

export default function TeamManagement() {
  const [members, setMembers] = useState(teamMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleInvite = () => {
    // Send invitation
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner':
        return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'Admin':
        return <Shield className="h-4 w-4 text-blue-400" />;
      default:
        return <User className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'text-yellow-400';
      case 'Admin':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Team Management</h1>
              <p className="text-gray-400 mt-1">Manage your team members and their permissions</p>
            </div>
            <Button onClick={() => setShowInviteModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>

          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Members</p>
                  <p className="text-3xl font-bold text-white">{members.length}</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-2xl">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Members</p>
                  <p className="text-3xl font-bold text-green-400">
                    {members.filter(m => m.status === 'Active').length}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Invites</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {members.filter(m => m.status === 'Pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-2xl">
                  <Mail className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Members List */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Team Members</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Member</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Active</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(member.role)}
                          <span className={`font-medium ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          member.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{member.joinedAt}</td>
                      <td className="py-4 px-4 text-gray-300">{member.lastActive}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end">
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Role Permissions */}
          <Card className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-6">Role Permissions</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Permission</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Owner</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Admin</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'View monitors',
                    'Create monitors',
                    'Edit monitors',
                    'Delete monitors',
                    'Manage alerts',
                    'View team',
                    'Invite members',
                    'Remove members',
                    'Billing access'
                  ].map((permission, index) => (
                    <tr key={index} className="border-b border-gray-800/50">
                      <td className="py-3 px-4 text-white">{permission}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full mx-auto"></div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className={`w-5 h-5 rounded-full mx-auto ${
                          ['View monitors', 'Create monitors', 'Edit monitors', 'Manage alerts', 'View team'].includes(permission)
                            ? 'bg-green-500'
                            : 'bg-gray-600'
                        }`}></div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className={`w-5 h-5 rounded-full mx-auto ${
                          permission === 'View monitors' ? 'bg-green-500' : 'bg-gray-600'
                        }`}></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 border border-gray-800 rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Invite Team Member</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="colleague@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-200 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <Button onClick={handleInvite} className="flex-1">
                  Send Invitation
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowInviteModal(false)}
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