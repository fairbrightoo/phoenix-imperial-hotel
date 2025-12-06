import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAlert } from '../ui/AlertContext';
import { LayoutDashboard, Users, Shield, Settings, Globe, Hotel, BarChart3, FileText, Image, Menu as MenuIcon, Plus, Edit, Trash2, Check, X, Crown, Building2, Lock, Unlock } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTenant } from './TenantContext';
import api from '../../services/api';
import { BranchFormModal, BranchFormData } from './BranchFormModal';
import { UserFormModal, UserFormData } from './UserFormModal';
import { RoleFormModal, RoleFormData } from './RoleFormModal';
import { HeroSlidesFormModal } from './HeroSlidesFormModal';
import { NavigationMenuFormModal } from './NavigationMenuFormModal';
import { FooterContentFormModal } from './FooterContentFormModal';
import { Branch, User, Role } from './types';

interface SuperAdminDashboardProps {
  onClose: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onClose
}) => {
  const {
    user,
    users,
    logout,
    addUser,
    updateUser,
    deleteUser,
    roles,
    permissions,
    addRole,
    updateRole,
    deleteRole
  } = useAuth();
  const { branches, allBranches, updateBranch, addBranch, globalContent, updateGlobalContent, systemSettings, updateSystemSettings } = useTenant();
  const { showAlert } = useAlert();
  const [activeSection, setActiveSection] = useState<'overview' | 'branches' | 'admins' | 'permissions' | 'global-content' | 'settings'>('overview');

  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userModalTitle, setUserModalTitle] = useState('');

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleModalTitle, setRoleModalTitle] = useState('');

  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // System Settings State
  const [settingsForm, setSettingsForm] = useState({
    hotelName: '',
    defaultCurrency: ''
  });

  // Real Data State
  const [realBookings, setRealBookings] = useState<any[]>([]);
  const [realRooms, setRealRooms] = useState<any[]>([]);
  const [realUsers, setRealUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching dashboard data...');
        const [bookingsRes, roomsRes, usersRes] = await Promise.allSettled([
          api.get('/bookings'),
          api.get('/rooms'),
          api.get('/users')
        ]);

        if (bookingsRes.status === 'fulfilled') {
          setRealBookings(bookingsRes.value.data);
        } else {
          console.error('Failed to fetch bookings:', bookingsRes.reason);
          // Don't show alert on initial load to avoid spam, just log
        }

        if (roomsRes.status === 'fulfilled') {
          setRealRooms(roomsRes.value.data);
        } else {
          console.error('Failed to fetch rooms:', roomsRes.reason);
        }

        if (usersRes.status === 'fulfilled') {
          const mappedUsers = usersRes.value.data.map((u: any) => ({
            ...u,
            branchId: u.branchId || u.branch_id,
            createdAt: u.createdAt || u.created_at
          }));
          setRealUsers(mappedUsers);
        } else {
          console.error('Failed to fetch users:', usersRes.reason);
          if (usersRes.reason?.response?.status === 401) {
            showAlert('Session expired. Please logout and login again.', 'error');
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  // Initialize settings form when systemSettings loads
  useEffect(() => {
    if (systemSettings) {
      setSettingsForm(systemSettings);
    }
  }, [systemSettings]);

  const handleSaveSettings = () => {
    updateSystemSettings(settingsForm);
    showAlert('System settings saved successfully!', 'success');
  };

  const [branchModalMode, setBranchModalMode] = useState<'create' | 'edit_basic' | 'edit_config'>('create');

  const handleAddBranch = () => {
    setEditingBranch(null);
    setModalTitle('Add New Branch');
    setBranchModalMode('create');
    setIsBranchModalOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setModalTitle('Edit Branch Details');
    setBranchModalMode('edit_basic');
    setIsBranchModalOpen(true);
  };

  const handleConfigureBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setModalTitle('Configure Branch Settings');
    setBranchModalMode('edit_config');
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = async (data: BranchFormData) => {
    try {
      if (editingBranch) {
        await api.put(`/branches/${editingBranch.id}`, data);
        showAlert('Branch updated successfully', 'success');
      } else {
        const newBranchId = data.name.toLowerCase().replace(/\s+/g, '-');
        await api.post('/branches', { ...data, id: newBranchId });
        showAlert('Branch created successfully', 'success');
      }

      // Refresh branches list
      const response = await api.get('/branches');
      if (response.data) {
        // We need to update the TenantContext state. 
        // Since TenantContext exposes setAllBranches via a hack or we just reload the page?
        // Actually, TenantContext doesn't expose a "setBranches" or "refresh" method.
        // But updateBranch updates local state. 
        // Better: We should probably reload the page or add a refresh method to TenantContext.
        // For now, let's just update the local state using the existing methods to reflect changes immediately without reload,
        // BUT the context loads from API on mount.

        // Wait, TenantContext has updateBranch and addBranch which update LOCAL state.
        // So if we call API AND call those methods, it should be fine.

        if (editingBranch) {
          updateBranch(editingBranch.id, data);
        } else {
          const newBranch = { ...data, id: data.name.toLowerCase().replace(/\s+/g, '-'), created_at: new Date(), updated_at: new Date() } as any;
          addBranch(newBranch);
        }

        // Ideally, we should trigger a re-fetch in TenantContext, but for now this syncs UI and Backend.
      }

      setIsBranchModalOpen(false);
      setEditingBranch(null);
    } catch (error: any) {
      console.error('Failed to save branch:', error);
      showAlert(error.response?.data?.message || 'Failed to save branch', 'error');
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserModalTitle('Add New Admin');
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserModalTitle('Edit Admin User');
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      deleteUser(userId);
    }
  };

  const handleSaveUser = async (data: UserFormData) => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, data);
        showAlert('User updated successfully', 'success');
      } else {
        await api.post('/users', data);
        showAlert('User created successfully', 'success');
      }

      // Refresh users list
      const usersRes = await api.get('/users');
      const mappedUsers = usersRes.data.map((u: any) => ({
        ...u,
        branchId: u.branchId || u.branch_id,
        createdAt: u.createdAt || u.created_at
      }));
      setRealUsers(mappedUsers);

      setIsUserModalOpen(false);
      setEditingUser(null);
    } catch (error: any) {
      console.error('Failed to save user:', error);
      showAlert(error.response?.data?.message || 'Failed to save user', 'error');
    }
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setRoleModalTitle('Create New Role');
    setIsRoleModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleModalTitle('Edit Role');
    setIsRoleModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      deleteRole(roleId);
    }
  };

  const handleSaveRole = (data: RoleFormData) => {
    if (editingRole) {
      updateRole(editingRole.id, data);
    } else {
      const newRole: Role = {
        id: `role-${Date.now()}`,
        name: data.name,
        description: data.description,
        permissions: data.permissions,
        isSystem: false
      };
      addRole(newRole);
    }
    setIsRoleModalOpen(false);
    setEditingRole(null);
  };

  // Calculate global statistics
  const totalBookings = realBookings.length;
  const totalRevenue = realBookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, curr) => acc + (Number(curr.total_price) || Number(curr.totalPrice) || 0), 0);
  const totalUsers = realUsers.length;

  // Helper to filter by branch
  const getBranchBookings = (branchId: string) => realBookings.filter(b => b.branch_id === branchId || b.branchId === branchId).length;
  const getBranchRevenue = (branchId: string) => realBookings
    .filter(b => (b.branch_id === branchId || b.branchId === branchId) && (b.status === 'confirmed' || b.status === 'completed'))
    .reduce((sum, b) => sum + (Number(b.total_price) || Number(b.totalPrice) || 0), 0);
  const getBranchRooms = (branchId: string) => realRooms.filter(r => r.branch_id === branchId || r.branchId === branchId).length;

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
    label: 'Settings',
    icon: Settings
  }] as any[];

  console.log('SuperAdminDashboard: Mounting (Full Restore)');

  return (
    <div className="flex h-full bg-zinc-900 text-white relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col
        transition-transform duration-300 transform
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-2">
            <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-12 h-auto" />
            <div className="flex flex-col">
              <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">PHOENIX</h1>
              <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">IMPERIAL</h1>
            </div>
          </div>
          <p className="text-xs text-[#FEFCF9] uppercase tracking-wider">Super Administrator</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-500/10 text-amber-500' : 'text-[#FEFCF9] hover:bg-sidebar-accent hover:text-amber-500'}`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button onClick={() => {
            logout();
            onClose();
          }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-8 h-auto" />
            <span className="font-serif text-amber-500">Phoenix Imperial</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-zinc-400 hover:text-white"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        <div className="p-4 md:p-8">
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
                <div className="text-3xl font-serif text-white mb-1">{branches.length}</div>
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
                  ₦{totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-zinc-400">Total Revenue</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <Users className="text-purple-400" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-serif text-white mb-1">{totalUsers}</div>
                <div className="text-sm text-zinc-400">Total Users</div>
              </div>
            </div>

            {/* Branch Performance */}
            <div className="grid md:grid-cols-2 gap-6">
              {branches.map(branch => (
                <div key={branch.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-amber-500" />
                    {branch.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Total Rooms:</span>
                      <span className="text-white font-medium">{getBranchRooms(branch.id)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Bookings:</span>
                      <span className="text-white font-medium">{getBranchBookings(branch.id)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400">Revenue:</span>
                      <span className="text-amber-400 font-serif">
                        ₦{getBranchRevenue(branch.id).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
              <button
                onClick={handleAddBranch}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add New Branch
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {allBranches.map(branch => <div key={branch.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
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
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${branch.status === 'inactive' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {branch.status ? branch.status.charAt(0).toUpperCase() + branch.status.slice(1) : 'Active'}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p className="text-zinc-400">{branch.address}</p>
                  <p className="text-zinc-400">{branch.phone}</p>
                  <p className="text-zinc-400">{branch.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditBranch(branch)}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleConfigureBranch(branch)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors flex items-center justify-center gap-2"
                  >
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
              <button
                onClick={handleAddUser}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
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
                  {realUsers.filter(u => u.role !== 'customer').map(admin => <tr key={admin.id} className="hover:bg-zinc-750">
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.status === 'inactive' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {admin.status ? admin.status.charAt(0).toUpperCase() + admin.status.slice(1) : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(admin)}
                          className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(admin.id)}
                          className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-serif text-white">Roles & Permissions</h1>
              <button
                onClick={handleAddRole}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add Role
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {roles.map(role => (
                <div key={role.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role.name === 'Super Admin' ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                        {role.name === 'Super Admin' ? <Crown className="text-amber-500" size={24} /> : <Shield className="text-blue-400" size={24} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white">{role.name}</h3>
                        <p className="text-sm text-zinc-400">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {role.id !== 'super_admin' && (
                        <button
                          onClick={() => handleEditRole(role)}
                          className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                          title="Edit Role"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      {!role.isSystem && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-red-400 transition-colors"
                          title="Delete Role"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    {permissions.map(permission => {
                      const hasPermission = role.permissions.includes(permission.id);
                      return (
                        <div key={permission.id} className="flex items-center justify-between p-3 bg-zinc-900 rounded">
                          <span className="text-zinc-300 text-sm">{permission.name}</span>
                          {hasPermission ? <Check className="text-green-400" size={18} /> : <Lock className="text-zinc-600" size={18} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
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
                  <button
                    onClick={() => setIsHeroModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                  >
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
                  <button
                    onClick={() => setIsNavModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                  >
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
                  <button
                    onClick={() => setIsFooterModalOpen(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                  >
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
                  <input
                    type="text"
                    value={settingsForm.hotelName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotelName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settingsForm.defaultCurrency}
                    onChange={(e) => setSettingsForm({ ...settingsForm, defaultCurrency: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                  >
                    <option value="NGN - Nigerian Naira">NGN - Nigerian Naira</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                    <option value="EUR - Euro">EUR - Euro</option>
                  </select>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
              <h3 className="text-xl font-serif text-white mb-6">Security Settings</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newPassword = formData.get('newPassword') as string;
                const confirmPassword = formData.get('confirmPassword') as string;

                if (newPassword !== confirmPassword) {
                  showAlert('Passwords do not match', 'error');
                  return;
                }

                if (newPassword.length < 6) {
                  showAlert('Password must be at least 6 characters', 'error');
                  return;
                }

                try {
                  await api.put('/users/profile', { password: newPassword });
                  showAlert('Password updated successfully', 'success');
                  (e.target as HTMLFormElement).reset();
                } catch (error: any) {
                  console.error('Failed to update password:', error);
                  showAlert('Failed to update password', 'error');
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      New Password
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      required
                      placeholder="Enter new password"
                      className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Confirm New Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm new password"
                      className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors font-medium"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>}
        </div>
      </main>

      {/* Modals */}
      <BranchFormModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onSubmit={handleSaveBranch}
        initialData={editingBranch}
        title={modalTitle}
        mode={branchModalMode}
      />

      <UserFormModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
        branches={allBranches}
        title={userModalTitle}
      />

      <RoleFormModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSubmit={handleSaveRole}
        initialData={editingRole}
        permissions={permissions}
        title={roleModalTitle}
      />

      <HeroSlidesFormModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        onSubmit={(data) => {
          updateGlobalContent('hero', data);
          setIsHeroModalOpen(false);
        }}
        initialData={globalContent.hero}
      />

      <NavigationMenuFormModal
        isOpen={isNavModalOpen}
        onClose={() => setIsNavModalOpen(false)}
        onSubmit={(data) => {
          updateGlobalContent('navigation', data);
          setIsNavModalOpen(false);
        }}
        initialData={globalContent.navigation}
      />

      <FooterContentFormModal
        isOpen={isFooterModalOpen}
        onClose={() => setIsFooterModalOpen(false)}
        onSubmit={(data) => {
          updateGlobalContent('footer', data);
          setIsFooterModalOpen(false);
        }}
        initialData={globalContent.footer}
      />
    </div>
  );
};