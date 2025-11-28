import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Shield, Settings, Globe, Hotel, BarChart3, FileText, Image, Menu as MenuIcon, Plus, Edit, Trash2, Check, X, Crown, Building2, Lock, Unlock } from 'lucide-react';
import { useAuth } from './AuthContext';
import { BRANCHES, MOCK_USERS, ROOMS_BY_BRANCH, MOCK_BOOKINGS } from './mockData';
interface SuperAdminDashboardProps {
  onClose: () => void;
}
export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'branches' | 'admins' | 'permissions' | 'global-content' | 'settings'>('overview');

  // Calculate global statistics
  const totalBookings = MOCK_BOOKINGS.length;
  const totalRevenue = MOCK_BOOKINGS.reduce((sum, b) => sum + b.totalPrice, 0);
  const abujaBookings = MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').length;
  const lagosBookings = MOCK_BOOKINGS.filter(b => b.branchId === 'lagos').length;
  const totalRooms = Object.values(ROOMS_BY_BRANCH).flat().length;
  const menuItems = [{
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings
  }] as any[];
  return <div className="flex h-full bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-amber-500" size={24} />
            <h2 className="text-xl font-serif text-amber-500">Phoenix Imperial</h2>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Super Administrator</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>)}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Overview */}
          {activeSection === 'overview' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div>
                <h1 className="text-3xl font-serif text-white mb-2">Super Admin Dashboard</h1>
                <p className="text-zinc-400">Complete control over all branches and settings</p>
              </div>

              {/* Global Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                      <Hotel className="text-blue-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400">Active Branches</div>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                      <FileText className="text-green-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{totalBookings}</div>
                  <div className="text-sm text-zinc-400">Total Bookings</div>
                </div>

                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center">
                      <BarChart3 className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                      <Users className="text-purple-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400">Total Users</div>
                </div>
              </div>

              {/* Branch Performance */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-amber-500" />
                    Abuja Branch
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Total Rooms:</span>
                      <span className="text-white font-medium">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Bookings:</span>
                      <span className="text-white font-medium">{abujaBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Revenue:</span>
                      <span className="text-amber-400 font-serif">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-amber-500" />
                    Lagos Branch
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Total Rooms:</span>
                      <span className="text-white font-medium">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Bookings:</span>
                      <span className="text-white font-medium">{lagosBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Revenue:</span>
                      <span className="text-amber-400 font-serif">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'lagos').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Branch Management */}
          {activeSection === 'branches' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Branch Management</h1>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Add New Branch
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {BRANCHES.map(branch => <div key={branch.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Building2 className="text-amber-500" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif text-white">{branch.name}</h3>
                          <p className="text-sm text-amber-400 uppercase tracking-wider">{branch.city}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <p className="text-zinc-400">{branch.address}</p>
                      <p className="text-zinc-400">{branch.phone}</p>
                      <p className="text-zinc-400">{branch.email}</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded transition-colors flex items-center justify-center gap-2">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors flex items-center justify-center gap-2">
                        <Settings size={16} />
                        Configure
                      </button>
                    </div>
                  </div>)}
              </div>
            </motion.div>}

          {/* Admin Users */}
          {activeSection === 'admins' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Admin Users</h1>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Add Admin
                </button>
              </div>

              <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Branch
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {MOCK_USERS.filter(u => u.role !== 'customer').map(admin => <tr key={admin.id} className="hover:bg-zinc-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                              {admin.role === 'super_admin' ? <Crown className="text-amber-500" size={18} /> : <Shield className="text-blue-400" size={18} />}
                            </div>
                            <div>
                              <p className="text-white font-medium">{admin.name}</p>
                              <p className="text-xs text-zinc-500">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.role === 'super_admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {admin.role.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {admin.branchId ? admin.branchId.toUpperCase() : 'All Branches'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-amber-500 hover:text-amber-400 mr-3">Edit</button>
                          {admin.role !== 'super_admin' && <button className="text-red-500 hover:text-red-400">Remove</button>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </motion.div>}

          {/* Roles & Permissions */}
          {activeSection === 'permissions' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <h1 className="text-3xl font-serif text-white">Roles & Permissions</h1>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Branch Admin Permissions */}
                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white">Branch Admin</h3>
                      <p className="text-sm text-zinc-400">Branch-specific management</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true
                }, {
                  name: 'View Bookings',
                  enabled: true
                }, {
                  name: 'Manage Bookings',
                  enabled: true
                }, {
                  name: 'Manage Testimonials',
                  enabled: true
                }, {
                  name: 'Manage Gallery',
                  enabled: true
                }, {
                  name: 'Branch Settings',
                  enabled: true
                }, {
                  name: 'Global Settings',
                  enabled: false
                }, {
                  name: 'User Management',
                  enabled: false
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded">
                        <span className="text-zinc-300 text-sm">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} /> : <Lock className="text-red-400" size={18} />}
                      </div>)}
                  </div>
                </div>

                {/* Super Admin Permissions */}
                <div className="bg-zinc-800 rounded-lg border border-amber-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Crown className="text-amber-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white">Super Admin</h3>
                      <p className="text-sm text-zinc-400">Full system control</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <div key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded">
                        <span className="text-zinc-300 text-sm">{permission}</span>
                        <Check className="text-green-400" size={18} />
                      </div>)}
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Global Content */}
          {activeSection === 'global-content' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <h1 className="text-3xl font-serif text-white">Global Content Management</h1>
              <p className="text-zinc-400">
                Manage content that appears across all branches (Hero, Navigation, Footer)
              </p>

              <div className="grid gap-6">
                {/* Hero Section */}
                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif text-white">Hero Section</h3>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                      <Edit size={16} />
                      Edit Slides
                    </button>
                  </div>
                  <p className="text-zinc-400 text-sm">Manage homepage hero slider images and text</p>
                </div>

                {/* Navigation */}
                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif text-white">Navigation Menu</h3>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                      <MenuIcon size={16} />
                      Edit Menu
                    </button>
                  </div>
                  <p className="text-zinc-400 text-sm">Manage global navigation links and structure</p>
                </div>

                {/* Footer */}
                <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif text-white">Footer Content</h3>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                      <Edit size={16} />
                      Edit Footer
                    </button>
                  </div>
                  <p className="text-zinc-400 text-sm">Manage footer text, links, and social media</p>
                </div>
              </div>
            </motion.div>}

          {/* Settings */}
          {activeSection === 'settings' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <h1 className="text-3xl font-serif text-white">System Settings</h1>

              <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                <h3 className="text-xl font-serif text-white mb-6">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Default Currency
                    </label>
                    <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500">
                      <option>NGN - Nigerian Naira</option>
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                    </select>
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>}
        </div>
      </main>
    </div>;
};