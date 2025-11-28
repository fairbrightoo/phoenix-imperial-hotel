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
    mpid: "62036eb7-395f-4e90-a91b-3e51aaaaaeff"
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2,
    mpid: "19b075ee-6714-4317-a87e-5c090567b498"
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users,
    mpid: "d17e80b8-4b05-4719-8853-07e1b100a602"
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield,
    mpid: "a110a26e-98ad-4000-b087-030fd2efa1ba"
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe,
    mpid: "824f279d-8779-4e6a-83c2-9f6739597d1b"
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    mpid: "2910729c-a72e-49ab-85a6-ab3c52d463d7"
  }] as any[];
  return <SortableContainer dndKitId="7744d503-f442-475e-96fa-fb8d6ec78a68" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="SuperAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="daac1562-46fc-4bb8-888e-2d6419f9d99e" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="072c2a39-fdfd-4b15-9927-2e8bd87e32b1" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="SuperAdminDashboard.tsx">
          <SortableContainer dndKitId="2180abfd-4995-4017-9f90-2d47136d476d" containerType="regular" prevTag="div" className="flex items-center gap-2 mb-2" data-magicpath-id="3" data-magicpath-path="SuperAdminDashboard.tsx">
            <Crown className="text-amber-500" size={24} data-magicpath-id="4" data-magicpath-path="SuperAdminDashboard.tsx" />
            <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="5" data-magicpath-path="SuperAdminDashboard.tsx">Phoenix Imperial</h2>
          </SortableContainer>
          <p className="text-xs text-zinc-500 uppercase tracking-wider" data-magicpath-id="6" data-magicpath-path="SuperAdminDashboard.tsx">Super Administrator</p>
        </SortableContainer>

        <SortableContainer dndKitId="5e3aeaff-aa86-4ee4-999e-c8df50d8371d" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="7" data-magicpath-path="SuperAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="SuperAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="SuperAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="10" data-magicpath-path="SuperAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="934ef1a4-ae72-468f-8a91-4fda1389b67e" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="11" data-magicpath-path="SuperAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="12" data-magicpath-path="SuperAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="64e72b0c-498b-4610-b9b7-70482e217170" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="13" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="5e98783f-fc40-4166-86ce-c389c4a0b42a" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="14" data-magicpath-path="SuperAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="b2ad6d4e-86b3-4574-ad63-cef5775ac2d9" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="15" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="7e16b97b-98e1-4958-b5ec-6e2e41be9d09" containerType="regular" prevTag="div" data-magicpath-id="16" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="17" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin Dashboard</h1>
                <p className="text-zinc-400" data-magicpath-id="18" data-magicpath-path="SuperAdminDashboard.tsx">Complete control over all branches and settings</p>
              </SortableContainer>

              {/* Global Stats */}
              <SortableContainer dndKitId="92ad2065-c0ef-4fdb-be2a-44bf1840e5e3" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="19" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="a5124937-e2a7-40ee-a3a1-fd1d11b55fae" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg" data-magicpath-id="20" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="3d15ec03-651e-4162-8558-00e6f9654bb9" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="6fb79c43-d357-4c09-a3dd-e7f6617a5d10" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center" data-magicpath-id="22" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Hotel className="text-blue-400" size={24} data-magicpath-id="23" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="24" data-magicpath-path="SuperAdminDashboard.tsx">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="25" data-magicpath-path="SuperAdminDashboard.tsx">Active Branches</div>
                </SortableContainer>

                <SortableContainer dndKitId="c9eacb3c-3c51-48d7-bab7-6e3fefb0ea4f" containerType="regular" prevTag="div" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg" data-magicpath-id="26" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="1e85ad1b-6a5b-4564-b516-fe578df5366c" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="27" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="c1d33ace-32ed-48d0-a802-251d15dbaf29" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center" data-magicpath-id="28" data-magicpath-path="SuperAdminDashboard.tsx">
                      <FileText className="text-green-400" size={24} data-magicpath-id="29" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="30" data-magicpath-path="SuperAdminDashboard.tsx">{totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="31" data-magicpath-path="SuperAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="ac721afa-e31a-41ca-a81c-18fe68d55bbf" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg" data-magicpath-id="32" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="77294621-29a3-4b0a-aeef-c77e083d648c" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="33" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="3d227bd2-ca1f-4f4e-b19b-78ccee9f3196" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="SuperAdminDashboard.tsx">
                      <BarChart3 className="text-amber-400" size={24} data-magicpath-id="35" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="36" data-magicpath-path="SuperAdminDashboard.tsx">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="37" data-magicpath-path="SuperAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="e2db3b72-abea-4e56-ac82-d7f8e6aedb28" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg" data-magicpath-id="38" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="b0a45578-40cd-4a39-a71f-28b9cfee7d68" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="39" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="89e5c103-0d85-42b8-a83f-58a21c6880ce" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Users className="text-purple-400" size={24} data-magicpath-id="41" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="42" data-magicpath-path="SuperAdminDashboard.tsx">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="43" data-magicpath-path="SuperAdminDashboard.tsx">Total Users</div>
                </SortableContainer>
              </SortableContainer>

              {/* Branch Performance */}
              <SortableContainer dndKitId="5e978866-2c25-4a9c-94fa-43687ef6eac9" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="44" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="2d108d2a-d255-459c-b7c6-8a70c5b73c55" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="45" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="46" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="47" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Abuja Branch
                  </h3>
                  <SortableContainer dndKitId="bc2237f3-591f-4b0b-ba0f-5dbe3a2cbc9b" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="48" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="d8220077-087e-42a8-b114-0b011a7bfde7" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="49" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="50" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="51" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="9a50a9f9-2fa9-4a62-bf36-eb97e694a80f" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="52" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="54" data-magicpath-path="SuperAdminDashboard.tsx">{abujaBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="c00f9421-d61c-457d-90d7-dfea91cd12e0" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="55" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="56" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="57" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="9d60bd08-b74b-4f70-b6cd-6a5d50747a59" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="58" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="59" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="60" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Lagos Branch
                  </h3>
                  <SortableContainer dndKitId="9f916fb6-aacf-4e09-810e-5a6b379ffc1d" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="61" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="fc519a9d-e6d6-400d-8d32-596611815b95" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="62" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="63" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="64" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="febdf1cb-e329-463d-b0f4-b7406e5fddc9" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="65" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="66" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="67" data-magicpath-path="SuperAdminDashboard.tsx">{lagosBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="073aba15-a7a2-405a-9107-b299f5bd07cd" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="68" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'branches' && <SortableContainer dndKitId="4d1732d8-9ed2-4f3c-af7a-9d1f592f47e2" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="71" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="c46a1749-cee0-4321-a42d-4a8e1e9a1276" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="72" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="73" data-magicpath-path="SuperAdminDashboard.tsx">Branch Management</h1>
                <SortableContainer dndKitId="600f1a39-fdd0-44fb-aec2-c06cac71dc9c" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="74" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="75" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add New Branch
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="545b0f9e-5c8f-46f1-b52d-d3e90948ee7c" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="76" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'admins' && <SortableContainer dndKitId="7e184dc4-f968-4783-a75f-2195eaba1abb" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="95" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="dc0ceddc-8dd2-4e4c-b374-12f037a10247" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="96" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="97" data-magicpath-path="SuperAdminDashboard.tsx">Admin Users</h1>
                <SortableContainer dndKitId="bc80fe57-10db-49dd-8e53-1749438705ce" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="98" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="99" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add Admin
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="d007e46d-e5b1-4264-a1bf-98923e1fa3d1" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="100" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'permissions' && <SortableContainer dndKitId="55116aa6-1d4d-4dd9-ad2f-d404e613b754" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="127" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="128" data-magicpath-path="SuperAdminDashboard.tsx">Roles & Permissions</h1>

              <SortableContainer dndKitId="90a2ddd9-c4da-472f-8368-e5c269fa1e21" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="129" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Branch Admin Permissions */}
                <SortableContainer dndKitId="0c2514f3-93ee-4e4a-91c6-2def15f800ae" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="130" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="fcbb90be-8c5f-4350-a354-2dfe98fa7fcd" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="131" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="5e2cfc0c-8182-4f9f-9ee1-0ed783daa919" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="132" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Shield className="text-blue-400" size={24} data-magicpath-id="133" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="cf5892f7-f8ee-4993-94a7-555de3666d22" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="135" data-magicpath-path="SuperAdminDashboard.tsx">Branch Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="SuperAdminDashboard.tsx">Branch-specific management</p>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="5ba78822-c08c-4c1d-9f24-3459a8c7d5a9" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="137" data-magicpath-path="SuperAdminDashboard.tsx">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true,
                  mpid: "12e4714c-ff3f-4c00-9e08-cdfa4c560363"
                }, {
                  name: 'View Bookings',
                  enabled: true,
                  mpid: "807eacb8-9f9c-46d1-bee9-0f16d5921002"
                }, {
                  name: 'Manage Bookings',
                  enabled: true,
                  mpid: "b88a7abe-7d54-4799-ae01-0e4aaa96881d"
                }, {
                  name: 'Manage Testimonials',
                  enabled: true,
                  mpid: "b594d0d8-96a9-4708-aed7-1772bbf00987"
                }, {
                  name: 'Manage Gallery',
                  enabled: true,
                  mpid: "d2b8f063-f541-41b2-90eb-cde3824c039f"
                }, {
                  name: 'Branch Settings',
                  enabled: true,
                  mpid: "2a7a6fed-b215-46fd-a6f9-f264b0a4a034"
                }, {
                  name: 'Global Settings',
                  enabled: false,
                  mpid: "131eaa04-3912-4736-969a-4aafac7bcc36"
                }, {
                  name: 'User Management',
                  enabled: false,
                  mpid: "051ec0d9-a6ac-4f64-9304-ad6fc6d9cf0d"
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="139" data-magicpath-path="SuperAdminDashboard.tsx">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Lock className="text-red-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="SuperAdminDashboard.tsx" />}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Super Admin Permissions */}
                <SortableContainer dndKitId="88488434-1d90-45c4-8961-c4e61c9f988e" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-amber-700 p-6" data-magicpath-id="142" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="84c390cc-6b72-4a40-9a49-7889a9e2306e" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="143" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="9814c185-ffd0-4d37-b17e-30b78c64030f" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="144" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Crown className="text-amber-500" size={24} data-magicpath-id="145" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="205d37ad-57a0-4509-99e6-465906f4c80c" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="147" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="SuperAdminDashboard.tsx">Full system control</p>
                    </SortableContainer>
                  </SortableContainer>

                  <div className="space-y-3" data-magicpath-id="149" data-magicpath-path="SuperAdminDashboard.tsx">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <SortableContainer dndKitId="3ac52664-b2b9-4556-8e69-1f9f34c9e547" containerType="regular" prevTag="div" key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-id="150" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-id="151" data-magicpath-path="SuperAdminDashboard.tsx">{permission}</span>
                        <Check className="text-green-400" size={18} data-magicpath-id="152" data-magicpath-path="SuperAdminDashboard.tsx" />
                      </SortableContainer>)}
                  </div>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Global Content */}
          {activeSection === 'global-content' && <SortableContainer dndKitId="de1ddcb7-83d9-4565-a210-53c5847c7d61" containerType="regular" prevTag="motion.div" initial={{
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

              <SortableContainer dndKitId="1d929a74-60f8-4b25-aac2-da94a3e48ee6" containerType="regular" prevTag="div" className="grid gap-6" data-magicpath-id="156" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Hero Section */}
                <SortableContainer dndKitId="9edcd422-882b-4cb6-be51-8d2418844a2b" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="157" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="3343f30b-e963-427f-83ec-bf231c92ac09" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="158" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="159" data-magicpath-path="SuperAdminDashboard.tsx">Hero Section</h3>
                    <SortableContainer dndKitId="6e87a405-8332-44c6-8d7c-598601c971a8" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="160" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="161" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Slides
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="162" data-magicpath-path="SuperAdminDashboard.tsx">Manage homepage hero slider images and text</p>
                </SortableContainer>

                {/* Navigation */}
                <SortableContainer dndKitId="114f6bcc-5c35-4c88-ac02-0792681ef06b" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="163" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="70c139de-2d07-4dbb-9732-ff69b3265947" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="164" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="165" data-magicpath-path="SuperAdminDashboard.tsx">Navigation Menu</h3>
                    <SortableContainer dndKitId="529c2952-f1b4-48dc-85f6-a00a3a7c6a05" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="166" data-magicpath-path="SuperAdminDashboard.tsx">
                      <MenuIcon size={16} data-magicpath-id="167" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Menu
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="168" data-magicpath-path="SuperAdminDashboard.tsx">Manage global navigation links and structure</p>
                </SortableContainer>

                {/* Footer */}
                <SortableContainer dndKitId="bc78b0b2-3969-4cc8-bce9-2f3c6237a4d5" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="169" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="29681016-a195-463e-98a6-fc4d213d8d51" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="170" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="171" data-magicpath-path="SuperAdminDashboard.tsx">Footer Content</h3>
                    <SortableContainer dndKitId="bd9562eb-f8b6-48e8-a8f1-b8a3f6e3b9c3" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="172" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="173" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Footer
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="174" data-magicpath-path="SuperAdminDashboard.tsx">Manage footer text, links, and social media</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="5a1d1a2e-eeff-43fe-8c28-9965b97edab1" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="175" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="176" data-magicpath-path="SuperAdminDashboard.tsx">System Settings</h1>

              <SortableContainer dndKitId="e5f6fbef-7255-4357-90bb-1b76e63f10de" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="177" data-magicpath-path="SuperAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-6" data-magicpath-id="178" data-magicpath-path="SuperAdminDashboard.tsx">General Settings</h3>
                <SortableContainer dndKitId="4023a11b-ec51-483a-93db-f0f1c707cb38" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="179" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="02257ca1-f69c-43a1-b28b-1bf03d49c45d" containerType="regular" prevTag="div" data-magicpath-id="180" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="181" data-magicpath-path="SuperAdminDashboard.tsx">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="182" data-magicpath-path="SuperAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="25f97010-f281-4586-bae8-09f876401577" containerType="regular" prevTag="div" data-magicpath-id="183" data-magicpath-path="SuperAdminDashboard.tsx">
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