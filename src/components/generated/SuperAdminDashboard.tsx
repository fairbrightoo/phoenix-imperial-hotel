import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Shield, Settings, Globe, Hotel, BarChart3, FileText, Image, Menu as MenuIcon, Plus, Edit, Trash2, Check, X, Crown, Building2, Lock, Unlock } from 'lucide-react';
import { useAuth } from './AuthContext';
import { BRANCHES, MOCK_USERS, ROOMS_BY_BRANCH, MOCK_BOOKINGS } from './mockData';
interface SuperAdminDashboardProps {
  onClose: () => void;
  mpid?: string;
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
    icon: LayoutDashboard,
    mpid: "6fb773a0-505a-41bc-b0c2-5ae77279e644"
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2,
    mpid: "befc30de-fff6-46df-bfec-98c6aefb41c3"
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users,
    mpid: "46df6ddd-15ef-4d89-beea-5a259a885e37"
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield,
    mpid: "8039e920-431f-45ce-ab79-9cef20291c8f"
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe,
    mpid: "8adccb0a-ec9a-4dde-9a84-79755a0c2e86"
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    mpid: "d2d1b4cd-2bc2-4014-8be7-26209ab254c2"
  }] as any[];
  return <SortableContainer dndKitId="983b6baa-4b06-43ca-b6d6-a0e78b257dba" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="SuperAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="3015fc3b-c775-47e1-b88e-50389c5ab976" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="979823b7-71bb-4c75-b892-ecdc98f12e7f" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="SuperAdminDashboard.tsx">
          <SortableContainer dndKitId="46e53207-80d6-469f-b9a9-22e0727a2894" containerType="regular" prevTag="div" className="flex items-center gap-2 mb-2" data-magicpath-id="3" data-magicpath-path="SuperAdminDashboard.tsx">
            <Crown className="text-amber-500" size={24} data-magicpath-id="4" data-magicpath-path="SuperAdminDashboard.tsx" />
            <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="5" data-magicpath-path="SuperAdminDashboard.tsx">Phoenix Imperial</h2>
          </SortableContainer>
          <p className="text-xs text-zinc-500 uppercase tracking-wider" data-magicpath-id="6" data-magicpath-path="SuperAdminDashboard.tsx">Super Administrator</p>
        </SortableContainer>

        <SortableContainer dndKitId="f329c34d-bc05-4f79-ab2a-b369dc89608f" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="7" data-magicpath-path="SuperAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="SuperAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="SuperAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="10" data-magicpath-path="SuperAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="78c01a84-6afb-48ff-9fd8-b67e4613333d" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="11" data-magicpath-path="SuperAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="12" data-magicpath-path="SuperAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="1e1cf867-084d-4f5e-b97d-07ddf6376e6b" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="13" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="0c388483-433f-4ccb-916f-936ad499c0a9" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="14" data-magicpath-path="SuperAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="9fa31051-5720-4b05-a82a-8096f134a911" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="15" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="12d44905-b967-4d81-a219-570f303e6c46" containerType="regular" prevTag="div" data-magicpath-id="16" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="17" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin Dashboard</h1>
                <p className="text-zinc-400" data-magicpath-id="18" data-magicpath-path="SuperAdminDashboard.tsx">Complete control over all branches and settings</p>
              </SortableContainer>

              {/* Global Stats */}
              <SortableContainer dndKitId="a02bdf3e-5667-4d04-884a-ab12825348d2" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="19" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="8ba3f964-5099-4364-a1b4-2c324dcddfd5" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg" data-magicpath-id="20" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="ca1b0953-c1e0-47d0-87f2-03e0e3097302" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="5ccc37d2-3029-4ec9-8ba8-9535a9d2451b" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center" data-magicpath-id="22" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Hotel className="text-blue-400" size={24} data-magicpath-id="23" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="24" data-magicpath-path="SuperAdminDashboard.tsx">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="25" data-magicpath-path="SuperAdminDashboard.tsx">Active Branches</div>
                </SortableContainer>

                <SortableContainer dndKitId="4384ab90-0e32-4998-9bab-9c02bac00693" containerType="regular" prevTag="div" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg" data-magicpath-id="26" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="0dcf3d8a-9cf9-46ac-a088-01c4d167aa0d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="27" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="bf15ec78-7dd8-423d-a328-2c50c7052ac9" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center" data-magicpath-id="28" data-magicpath-path="SuperAdminDashboard.tsx">
                      <FileText className="text-green-400" size={24} data-magicpath-id="29" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="30" data-magicpath-path="SuperAdminDashboard.tsx">{totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="31" data-magicpath-path="SuperAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="2084d6de-13f3-47d7-9c91-670e496461a9" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg" data-magicpath-id="32" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="cbb619bb-1761-4926-8450-b13f3700af07" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="33" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="07392dc7-8f36-4806-a011-ca80bb648b2a" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="SuperAdminDashboard.tsx">
                      <BarChart3 className="text-amber-400" size={24} data-magicpath-id="35" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="36" data-magicpath-path="SuperAdminDashboard.tsx">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="37" data-magicpath-path="SuperAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="a2f8f5e3-4ad9-498a-8a8b-597d50ea4066" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg" data-magicpath-id="38" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="4d4db9ec-798c-41e2-bc03-1df5bb7e282e" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="39" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="525a5bd5-1429-4088-b7dc-99d3afdb27f5" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Users className="text-purple-400" size={24} data-magicpath-id="41" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="42" data-magicpath-path="SuperAdminDashboard.tsx">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="43" data-magicpath-path="SuperAdminDashboard.tsx">Total Users</div>
                </SortableContainer>
              </SortableContainer>

              {/* Branch Performance */}
              <SortableContainer dndKitId="2121c72b-6ff8-4f23-946b-6ce49a31e7b2" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="44" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="43ecb9f9-ca9d-417e-a812-1bd488a6b485" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="45" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="46" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="47" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Abuja Branch
                  </h3>
                  <SortableContainer dndKitId="df664f17-3349-48d4-8111-3d0f0a99b8da" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="48" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="c2121644-1134-4194-b588-f0e3b1bc06f0" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="49" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="50" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="51" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e5dba312-c2d9-4d13-961b-0fc41c340550" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="52" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="54" data-magicpath-path="SuperAdminDashboard.tsx">{abujaBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="03895713-fd61-4f9a-8261-5497db38ae20" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="55" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="56" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="57" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="c52374c7-c155-4dd5-ae8b-a8e4b1fec8ed" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="58" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="59" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="60" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Lagos Branch
                  </h3>
                  <SortableContainer dndKitId="bc6bf41a-988a-4aaa-aee1-277099599182" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="61" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="07986ad0-edad-4574-b7c1-9454f082f5ae" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="62" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="63" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="64" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e5fe268a-67a8-4d98-8c36-86fe17c637d5" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="65" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="66" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="67" data-magicpath-path="SuperAdminDashboard.tsx">{lagosBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="b01d4925-aa36-4901-9861-83eeafd3c593" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="68" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="69" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="70" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'lagos').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Branch Management */}
          {activeSection === 'branches' && <SortableContainer dndKitId="210ff861-1ce4-45e8-9966-e769b1f2f8eb" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="71" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="abef4ea5-2aed-4cdb-9781-2c49f3c8483b" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="72" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="73" data-magicpath-path="SuperAdminDashboard.tsx">Branch Management</h1>
                <SortableContainer dndKitId="3032f809-bcc7-457b-b1e3-1f16019587cd" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="74" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="75" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add New Branch
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="71a8fe60-172a-468a-b338-de48d73246b4" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="76" data-magicpath-path="SuperAdminDashboard.tsx">
                {BRANCHES.map(branch => <div key={branch.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="77" data-magicpath-path="SuperAdminDashboard.tsx">
                    <div className="flex items-start justify-between mb-4" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="78" data-magicpath-path="SuperAdminDashboard.tsx">
                      <div className="flex items-center gap-3" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="79" data-magicpath-path="SuperAdminDashboard.tsx">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="80" data-magicpath-path="SuperAdminDashboard.tsx">
                          <Building2 className="text-amber-500" size={24} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="81" data-magicpath-path="SuperAdminDashboard.tsx" />
                        </div>
                        <div data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="82" data-magicpath-path="SuperAdminDashboard.tsx">
                          <h3 className="text-xl font-serif text-white" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="83" data-magicpath-path="SuperAdminDashboard.tsx">{branch.name}</h3>
                          <p className="text-sm text-amber-400 uppercase tracking-wider" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="city:unknown" data-magicpath-id="84" data-magicpath-path="SuperAdminDashboard.tsx">{branch.city}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="85" data-magicpath-path="SuperAdminDashboard.tsx">
                        Active
                      </span>
                    </div>

                    <div className="space-y-2 text-sm mb-4" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="86" data-magicpath-path="SuperAdminDashboard.tsx">
                      <p className="text-zinc-400" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="address:unknown" data-magicpath-id="87" data-magicpath-path="SuperAdminDashboard.tsx">{branch.address}</p>
                      <p className="text-zinc-400" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="phone:unknown" data-magicpath-id="88" data-magicpath-path="SuperAdminDashboard.tsx">{branch.phone}</p>
                      <p className="text-zinc-400" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="email:unknown" data-magicpath-id="89" data-magicpath-path="SuperAdminDashboard.tsx">{branch.email}</p>
                    </div>

                    <div className="flex gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="90" data-magicpath-path="SuperAdminDashboard.tsx">
                      <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded transition-colors flex items-center justify-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="91" data-magicpath-path="SuperAdminDashboard.tsx">
                        <Edit size={16} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="92" data-magicpath-path="SuperAdminDashboard.tsx" />
                        Edit
                      </button>
                      <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors flex items-center justify-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="93" data-magicpath-path="SuperAdminDashboard.tsx">
                        <Settings size={16} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="94" data-magicpath-path="SuperAdminDashboard.tsx" />
                        Configure
                      </button>
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>}

          {/* Admin Users */}
          {activeSection === 'admins' && <SortableContainer dndKitId="fcc88602-240a-483c-bc04-a9f6a06ff4bd" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="95" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="a7224201-0ae4-4849-ba8e-26785d8e130c" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="96" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="97" data-magicpath-path="SuperAdminDashboard.tsx">Admin Users</h1>
                <SortableContainer dndKitId="33aa2385-42d2-42c4-9fbb-7030b1fe553a" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="98" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="99" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add Admin
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="40bc92b5-37fd-4f04-91df-42d913224fc5" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="100" data-magicpath-path="SuperAdminDashboard.tsx">
                <table className="w-full" data-magicpath-id="101" data-magicpath-path="SuperAdminDashboard.tsx">
                  <thead className="bg-zinc-900" data-magicpath-id="102" data-magicpath-path="SuperAdminDashboard.tsx">
                    <tr data-magicpath-id="103" data-magicpath-path="SuperAdminDashboard.tsx">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="104" data-magicpath-path="SuperAdminDashboard.tsx">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="105" data-magicpath-path="SuperAdminDashboard.tsx">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="106" data-magicpath-path="SuperAdminDashboard.tsx">
                        Branch
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="107" data-magicpath-path="SuperAdminDashboard.tsx">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="108" data-magicpath-path="SuperAdminDashboard.tsx">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700" data-magicpath-id="109" data-magicpath-path="SuperAdminDashboard.tsx">
                    {MOCK_USERS.filter(u => u.role !== 'customer').map(admin => <tr key={admin.id} className="hover:bg-zinc-750" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="110" data-magicpath-path="SuperAdminDashboard.tsx">
                        <td className="px-6 py-4 whitespace-nowrap" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="111" data-magicpath-path="SuperAdminDashboard.tsx">
                          <div className="flex items-center gap-3" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="112" data-magicpath-path="SuperAdminDashboard.tsx">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="113" data-magicpath-path="SuperAdminDashboard.tsx">
                              {admin.role === 'super_admin' ? <Crown className="text-amber-500" size={18} data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="114" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Shield className="text-blue-400" size={18} data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="115" data-magicpath-path="SuperAdminDashboard.tsx" />}
                            </div>
                            <div data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="116" data-magicpath-path="SuperAdminDashboard.tsx">
                              <p className="text-white font-medium" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="117" data-magicpath-path="SuperAdminDashboard.tsx">{admin.name}</p>
                              <p className="text-xs text-zinc-500" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-field="email:unknown" data-magicpath-id="118" data-magicpath-path="SuperAdminDashboard.tsx">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="119" data-magicpath-path="SuperAdminDashboard.tsx">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.role === 'super_admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`} data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="120" data-magicpath-path="SuperAdminDashboard.tsx">
                            {admin.role.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="121" data-magicpath-path="SuperAdminDashboard.tsx">
                          {admin.branchId ? admin.branchId.toUpperCase() : 'All Branches'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="122" data-magicpath-path="SuperAdminDashboard.tsx">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="123" data-magicpath-path="SuperAdminDashboard.tsx">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="124" data-magicpath-path="SuperAdminDashboard.tsx">
                          <button className="text-amber-500 hover:text-amber-400 mr-3" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="125" data-magicpath-path="SuperAdminDashboard.tsx">Edit</button>
                          {admin.role !== 'super_admin' && <button className="text-red-500 hover:text-red-400" data-magicpath-uuid={(admin as any)["mpid"] ?? "unsafe"} data-magicpath-id="126" data-magicpath-path="SuperAdminDashboard.tsx">Remove</button>}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </SortableContainer>
            </SortableContainer>}

          {/* Roles & Permissions */}
          {activeSection === 'permissions' && <SortableContainer dndKitId="d22e8b96-af70-40ca-bd28-02c6d2d0499d" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="127" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="128" data-magicpath-path="SuperAdminDashboard.tsx">Roles & Permissions</h1>

              <SortableContainer dndKitId="4fe6a287-c874-4d34-9d11-f024dbf8754d" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="129" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Branch Admin Permissions */}
                <SortableContainer dndKitId="b308c3ff-9d7f-4f47-a943-36cffb39e5ed" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="130" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="a6d3f490-db87-4c7a-9f10-b2efd0a11374" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="131" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="c0c263f2-4651-4332-8ee9-5f737b396e7c" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="132" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Shield className="text-blue-400" size={24} data-magicpath-id="133" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="b914ab12-0032-4957-9e99-8fbbf368802a" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="135" data-magicpath-path="SuperAdminDashboard.tsx">Branch Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="SuperAdminDashboard.tsx">Branch-specific management</p>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="e2eb8936-4e8c-4ec1-9b1d-5bd8dd33451b" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="137" data-magicpath-path="SuperAdminDashboard.tsx">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true,
                  mpid: "9266c1ae-ac3b-46e5-974d-711a043eb101"
                }, {
                  name: 'View Bookings',
                  enabled: true,
                  mpid: "57f2031d-e22c-4a37-975b-2b8ed3060307"
                }, {
                  name: 'Manage Bookings',
                  enabled: true,
                  mpid: "25d36237-cfbb-434d-a3cb-b00b260a55ef"
                }, {
                  name: 'Manage Testimonials',
                  enabled: true,
                  mpid: "b8d758ed-3a94-4418-867b-db66a9c82619"
                }, {
                  name: 'Manage Gallery',
                  enabled: true,
                  mpid: "8ae8483a-4513-444f-8d14-3c77f702c365"
                }, {
                  name: 'Branch Settings',
                  enabled: true,
                  mpid: "5f562088-e2bf-47ba-88df-e22c959cf420"
                }, {
                  name: 'Global Settings',
                  enabled: false,
                  mpid: "6f3d7d5f-04af-4437-a2ea-9c2f2db29832"
                }, {
                  name: 'User Management',
                  enabled: false,
                  mpid: "0c8c78c0-4249-4fbf-9dd7-d3a35799b207"
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="139" data-magicpath-path="SuperAdminDashboard.tsx">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Lock className="text-red-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="SuperAdminDashboard.tsx" />}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Super Admin Permissions */}
                <SortableContainer dndKitId="4302710c-e99b-47c8-bc1e-4992ddf77c17" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-amber-700 p-6" data-magicpath-id="142" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="2193a236-30c2-4dea-8490-03c7aa654767" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="143" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="e3f0d72d-a9ac-49fc-a6b6-bcb62f91fa53" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="144" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Crown className="text-amber-500" size={24} data-magicpath-id="145" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="61ca6b49-57b0-427a-b56d-b31e13fea30c" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="147" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="SuperAdminDashboard.tsx">Full system control</p>
                    </SortableContainer>
                  </SortableContainer>

                  <div className="space-y-3" data-magicpath-id="149" data-magicpath-path="SuperAdminDashboard.tsx">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <SortableContainer dndKitId="9cb72794-b14b-45ed-8624-e04d24429534" containerType="regular" prevTag="div" key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-id="150" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-id="151" data-magicpath-path="SuperAdminDashboard.tsx">{permission}</span>
                        <Check className="text-green-400" size={18} data-magicpath-id="152" data-magicpath-path="SuperAdminDashboard.tsx" />
                      </SortableContainer>)}
                  </div>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Global Content */}
          {activeSection === 'global-content' && <SortableContainer dndKitId="01da6261-81a4-479b-9deb-e6435047e271" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="153" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="154" data-magicpath-path="SuperAdminDashboard.tsx">Global Content Management</h1>
              <p className="text-zinc-400" data-magicpath-id="155" data-magicpath-path="SuperAdminDashboard.tsx">
                Manage content that appears across all branches (Hero, Navigation, Footer)
              </p>

              <SortableContainer dndKitId="096db6cd-dc44-4556-8246-671eab93f82a" containerType="regular" prevTag="div" className="grid gap-6" data-magicpath-id="156" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Hero Section */}
                <SortableContainer dndKitId="dc51eceb-20db-4fe8-beaa-846966dfe757" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="157" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="111ac098-0d9b-4c2d-9ad2-fbf9fd69faca" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="158" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="159" data-magicpath-path="SuperAdminDashboard.tsx">Hero Section</h3>
                    <SortableContainer dndKitId="6272c58b-dc3d-4e45-8f51-f9636f158d84" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="160" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="161" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Slides
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="162" data-magicpath-path="SuperAdminDashboard.tsx">Manage homepage hero slider images and text</p>
                </SortableContainer>

                {/* Navigation */}
                <SortableContainer dndKitId="2ee1c404-ff63-4ddd-ad80-2c537e07f6ab" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="163" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="631e6343-9a3a-4c21-99b4-fc38ff58e16d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="164" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="165" data-magicpath-path="SuperAdminDashboard.tsx">Navigation Menu</h3>
                    <SortableContainer dndKitId="d6f6916c-b773-46b0-9cf6-93b0b2b76a03" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="166" data-magicpath-path="SuperAdminDashboard.tsx">
                      <MenuIcon size={16} data-magicpath-id="167" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Menu
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="168" data-magicpath-path="SuperAdminDashboard.tsx">Manage global navigation links and structure</p>
                </SortableContainer>

                {/* Footer */}
                <SortableContainer dndKitId="eb218fea-1d9d-45a5-aa60-232037cfa516" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="169" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="443ec2f0-1bf4-4c16-8755-bb8a2cee9a6d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="170" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="171" data-magicpath-path="SuperAdminDashboard.tsx">Footer Content</h3>
                    <SortableContainer dndKitId="fde61ab4-bd0f-4b09-a9ca-50bb0d88ea0b" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="172" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="173" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Footer
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="174" data-magicpath-path="SuperAdminDashboard.tsx">Manage footer text, links, and social media</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="0854c0c6-4f70-4848-9e41-5e8f35224ce4" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="175" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="176" data-magicpath-path="SuperAdminDashboard.tsx">System Settings</h1>

              <SortableContainer dndKitId="910d9d75-0a87-422f-811b-ffe73f66f70b" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="177" data-magicpath-path="SuperAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-6" data-magicpath-id="178" data-magicpath-path="SuperAdminDashboard.tsx">General Settings</h3>
                <SortableContainer dndKitId="5133dc07-2b7f-418e-920e-703d35131d05" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="179" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="bd6e9758-9480-4fc2-bcb2-82eaf01f5f25" containerType="regular" prevTag="div" data-magicpath-id="180" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="181" data-magicpath-path="SuperAdminDashboard.tsx">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="182" data-magicpath-path="SuperAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="54c4b80d-c5b5-46e0-a427-25f1e2fe0e93" containerType="regular" prevTag="div" data-magicpath-id="183" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="184" data-magicpath-path="SuperAdminDashboard.tsx">
                      Default Currency
                    </label>
                    <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="185" data-magicpath-path="SuperAdminDashboard.tsx">
                      <option data-magicpath-id="186" data-magicpath-path="SuperAdminDashboard.tsx">NGN - Nigerian Naira</option>
                      <option data-magicpath-id="187" data-magicpath-path="SuperAdminDashboard.tsx">USD - US Dollar</option>
                      <option data-magicpath-id="188" data-magicpath-path="SuperAdminDashboard.tsx">EUR - Euro</option>
                    </select>
                  </SortableContainer>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium" data-magicpath-id="189" data-magicpath-path="SuperAdminDashboard.tsx">
                    Save Changes
                  </button>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};