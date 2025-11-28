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
    mpid: "029d6c7d-d301-4466-9318-60373c38f1a0"
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2,
    mpid: "fb35666a-068d-4846-b8c1-331c30e854ce"
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users,
    mpid: "7c502482-ea92-49cd-8de8-ccbbed597f93"
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield,
    mpid: "57449c31-0f2f-4557-a758-2455abc9bf7b"
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe,
    mpid: "48701c0c-d649-425a-b90e-14c5785479df"
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    mpid: "d85ac127-6cde-4940-ba7c-b18bf7cdd67d"
  }] as any[];
  return <SortableContainer dndKitId="a0891b74-a0dc-4297-a874-776ecb04dcb5" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="SuperAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="800adffc-5f17-4da8-bace-72289290e0bf" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="d5c71b33-2ccd-474e-9d27-e085c844471a" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="SuperAdminDashboard.tsx">
          <SortableContainer dndKitId="a57678a8-b39c-4960-a341-9cb4c00bbca0" containerType="regular" prevTag="div" className="flex items-center gap-2 mb-2" data-magicpath-id="3" data-magicpath-path="SuperAdminDashboard.tsx">
            <Crown className="text-amber-500" size={24} data-magicpath-id="4" data-magicpath-path="SuperAdminDashboard.tsx" />
            <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="5" data-magicpath-path="SuperAdminDashboard.tsx">Phoenix Imperial</h2>
          </SortableContainer>
          <p className="text-xs text-zinc-500 uppercase tracking-wider" data-magicpath-id="6" data-magicpath-path="SuperAdminDashboard.tsx">Super Administrator</p>
        </SortableContainer>

        <SortableContainer dndKitId="790d2594-6146-4465-82f8-00ba72c311a7" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="7" data-magicpath-path="SuperAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="SuperAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="SuperAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="10" data-magicpath-path="SuperAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="cc84ac00-2e5c-4d7b-b57c-432896499052" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="11" data-magicpath-path="SuperAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="12" data-magicpath-path="SuperAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="ebe4da4a-9449-4dc4-ab83-8210509081c5" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="13" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="1f760eb2-bd42-46bb-8d6d-058fdba4fac5" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="14" data-magicpath-path="SuperAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="712b86ce-c333-4e89-b196-f5610eb7c33b" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="15" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="154541bc-966f-400b-b1bb-42bf45e416f7" containerType="regular" prevTag="div" data-magicpath-id="16" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="17" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin Dashboard</h1>
                <p className="text-zinc-400" data-magicpath-id="18" data-magicpath-path="SuperAdminDashboard.tsx">Complete control over all branches and settings</p>
              </SortableContainer>

              {/* Global Stats */}
              <SortableContainer dndKitId="969da94d-f544-4844-b62d-9cd51a096e6d" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="19" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="953c37dd-f95f-406a-883d-d9680f1c36f3" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg" data-magicpath-id="20" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="eb35084a-1c10-4ea0-b398-de3f00dcf84b" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="e7ed1b1e-b4e1-4479-8572-3713d4ed5f1d" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center" data-magicpath-id="22" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Hotel className="text-blue-400" size={24} data-magicpath-id="23" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="24" data-magicpath-path="SuperAdminDashboard.tsx">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="25" data-magicpath-path="SuperAdminDashboard.tsx">Active Branches</div>
                </SortableContainer>

                <SortableContainer dndKitId="7c7b9275-140e-4e5a-8f71-27912bde34f6" containerType="regular" prevTag="div" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg" data-magicpath-id="26" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="6d32f7e7-a6cf-4d8a-9cfd-7cf37d098870" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="27" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="9d807e21-93ad-425d-bfa5-d55dd7735af2" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center" data-magicpath-id="28" data-magicpath-path="SuperAdminDashboard.tsx">
                      <FileText className="text-green-400" size={24} data-magicpath-id="29" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="30" data-magicpath-path="SuperAdminDashboard.tsx">{totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="31" data-magicpath-path="SuperAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="0c370aed-7abd-4019-9b29-3b652d705121" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg" data-magicpath-id="32" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="4d1972aa-c281-470f-b830-381da8eba615" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="33" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="2b241008-0e3c-4cc4-aeb1-7f6d40433683" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="SuperAdminDashboard.tsx">
                      <BarChart3 className="text-amber-400" size={24} data-magicpath-id="35" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="36" data-magicpath-path="SuperAdminDashboard.tsx">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="37" data-magicpath-path="SuperAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="bbb9d62d-92f2-4a89-ad65-776dcb811836" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg" data-magicpath-id="38" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="b228f3ae-7831-44e4-932c-7e1f9fde3221" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="39" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="bab43733-eb5d-4cae-97e1-efaeec42e55d" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Users className="text-purple-400" size={24} data-magicpath-id="41" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="42" data-magicpath-path="SuperAdminDashboard.tsx">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="43" data-magicpath-path="SuperAdminDashboard.tsx">Total Users</div>
                </SortableContainer>
              </SortableContainer>

              {/* Branch Performance */}
              <SortableContainer dndKitId="62be5cf1-5803-45db-9af8-5d5c35522dba" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="44" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="4a9e0cfc-8241-491c-ad6b-10ec244b6de3" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="45" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="46" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="47" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Abuja Branch
                  </h3>
                  <SortableContainer dndKitId="f8909594-907a-4a02-aedf-0bc5a4193b7b" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="48" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="9b46b49a-ff93-465b-8f40-47f20b56d3bc" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="49" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="50" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="51" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="492310c0-aafb-4747-902b-7ab058dea9cf" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="52" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="54" data-magicpath-path="SuperAdminDashboard.tsx">{abujaBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="69ea1029-c90d-483e-b2ba-eb2224ba6aef" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="55" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="56" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="57" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="12a427db-3004-4490-b9ec-15b93dd97e2d" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="58" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="59" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="60" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Lagos Branch
                  </h3>
                  <SortableContainer dndKitId="42343cf0-49da-4825-8b63-ab3f25c10a01" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="61" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="706e1ff7-6f68-46cc-babc-bbacf23c0b6c" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="62" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="63" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="64" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="047a8416-ae7b-4059-9742-583a14ebe7d0" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="65" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="66" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="67" data-magicpath-path="SuperAdminDashboard.tsx">{lagosBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="fa5ddda5-2a60-42c1-b941-7c1f50d72ea9" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="68" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'branches' && <SortableContainer dndKitId="3574d05d-f453-4dec-93ff-6d8938977ab5" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="71" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="3274920a-6b55-4648-890c-1c0385409028" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="72" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="73" data-magicpath-path="SuperAdminDashboard.tsx">Branch Management</h1>
                <SortableContainer dndKitId="86780924-65e7-47ab-9520-55ab478cda44" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="74" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="75" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add New Branch
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="1c894d9d-164a-41a7-96b7-ca1f0622d72c" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="76" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'admins' && <SortableContainer dndKitId="8fb96955-bf61-45d1-ae5d-29b63eba48c5" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="95" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="eb266531-d961-4865-93ff-ac2d0f5d7916" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="96" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="97" data-magicpath-path="SuperAdminDashboard.tsx">Admin Users</h1>
                <SortableContainer dndKitId="854ed7ce-1466-48e8-95bc-834da316104c" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="98" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="99" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add Admin
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="f6af9061-f1c4-45b0-aabc-69304b9225cf" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="100" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'permissions' && <SortableContainer dndKitId="eb22c3b3-8fb2-4a41-ae85-eb0994535e77" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="127" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="128" data-magicpath-path="SuperAdminDashboard.tsx">Roles & Permissions</h1>

              <SortableContainer dndKitId="4c75be14-4d4e-437e-9b54-617c375e4d9c" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="129" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Branch Admin Permissions */}
                <SortableContainer dndKitId="df82643b-7805-4a37-9d48-1fb3b50c25a9" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="130" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="b16dec78-7c33-497b-ac84-5f20134f20bd" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="131" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="01c30d76-2069-4f08-8784-aee18f7d4c8a" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="132" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Shield className="text-blue-400" size={24} data-magicpath-id="133" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="f9c723dd-05f3-4618-abb4-ed9b89e8fc0a" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="135" data-magicpath-path="SuperAdminDashboard.tsx">Branch Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="SuperAdminDashboard.tsx">Branch-specific management</p>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="220a2310-de2f-481f-8966-b3afead816b0" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="137" data-magicpath-path="SuperAdminDashboard.tsx">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true,
                  mpid: "178615f2-5bcc-4ee7-90e8-3e7d3ae4ceb8"
                }, {
                  name: 'View Bookings',
                  enabled: true,
                  mpid: "d975056f-b1af-4277-a617-172eab72ae25"
                }, {
                  name: 'Manage Bookings',
                  enabled: true,
                  mpid: "f173db3d-daea-47f2-b886-d9ecd50c1484"
                }, {
                  name: 'Manage Testimonials',
                  enabled: true,
                  mpid: "41a30854-67ad-478c-90eb-62cddd561f22"
                }, {
                  name: 'Manage Gallery',
                  enabled: true,
                  mpid: "3fa99c14-0d43-410e-ace1-9d5619768cb8"
                }, {
                  name: 'Branch Settings',
                  enabled: true,
                  mpid: "11442ed4-077c-472b-bb24-b9ec13f9e36b"
                }, {
                  name: 'Global Settings',
                  enabled: false,
                  mpid: "01af0df9-b2e2-4495-9630-48ac1f14ddc2"
                }, {
                  name: 'User Management',
                  enabled: false,
                  mpid: "ebada6a5-474e-4066-a8cd-ab00ecf348f6"
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="139" data-magicpath-path="SuperAdminDashboard.tsx">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Lock className="text-red-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="SuperAdminDashboard.tsx" />}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Super Admin Permissions */}
                <SortableContainer dndKitId="638dda19-10a4-433d-af9e-dd2971a0e764" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-amber-700 p-6" data-magicpath-id="142" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="b72909dc-e2b4-4711-ac44-b1c40dbc4d46" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="143" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="1d308680-f4be-457c-97a7-b566369e5b15" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="144" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Crown className="text-amber-500" size={24} data-magicpath-id="145" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="f5f6a6c2-e368-4777-8d8d-6cd8c8a8c6bd" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="147" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="SuperAdminDashboard.tsx">Full system control</p>
                    </SortableContainer>
                  </SortableContainer>

                  <div className="space-y-3" data-magicpath-id="149" data-magicpath-path="SuperAdminDashboard.tsx">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <SortableContainer dndKitId="3b1a4359-b642-42d7-8930-bd72a1765d6a" containerType="regular" prevTag="div" key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-id="150" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-id="151" data-magicpath-path="SuperAdminDashboard.tsx">{permission}</span>
                        <Check className="text-green-400" size={18} data-magicpath-id="152" data-magicpath-path="SuperAdminDashboard.tsx" />
                      </SortableContainer>)}
                  </div>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Global Content */}
          {activeSection === 'global-content' && <SortableContainer dndKitId="8c283f0d-179e-411b-b5d4-3e8c2d77d088" containerType="regular" prevTag="motion.div" initial={{
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

              <SortableContainer dndKitId="bb3f5614-43ab-4dc3-80ff-fbfc130e337e" containerType="regular" prevTag="div" className="grid gap-6" data-magicpath-id="156" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Hero Section */}
                <SortableContainer dndKitId="27a839be-9aed-46ee-9ab4-bfa41fadf6c9" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="157" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="b9878a5c-4151-459f-ad77-c43f168430a4" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="158" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="159" data-magicpath-path="SuperAdminDashboard.tsx">Hero Section</h3>
                    <SortableContainer dndKitId="a667e40e-78bd-4c97-bce7-50c4ed548cab" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="160" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="161" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Slides
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="162" data-magicpath-path="SuperAdminDashboard.tsx">Manage homepage hero slider images and text</p>
                </SortableContainer>

                {/* Navigation */}
                <SortableContainer dndKitId="aed83df1-2019-4ffa-ac64-ffb917001c9b" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="163" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="115fc069-b943-4589-9ebb-0ce08a413251" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="164" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="165" data-magicpath-path="SuperAdminDashboard.tsx">Navigation Menu</h3>
                    <SortableContainer dndKitId="6fc8acff-0d73-4d60-b573-e3319190c063" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="166" data-magicpath-path="SuperAdminDashboard.tsx">
                      <MenuIcon size={16} data-magicpath-id="167" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Menu
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="168" data-magicpath-path="SuperAdminDashboard.tsx">Manage global navigation links and structure</p>
                </SortableContainer>

                {/* Footer */}
                <SortableContainer dndKitId="4a73620a-e62d-4237-a9aa-bede0b7976e8" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="169" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="d0b0ed2b-be16-4320-bfa0-d955c65e28c7" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="170" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="171" data-magicpath-path="SuperAdminDashboard.tsx">Footer Content</h3>
                    <SortableContainer dndKitId="36714281-4cd2-4d02-87be-67fc1fbfddd3" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="172" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="173" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Footer
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="174" data-magicpath-path="SuperAdminDashboard.tsx">Manage footer text, links, and social media</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="a5710a2f-6e64-428e-b254-6602f9a961ad" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="175" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="176" data-magicpath-path="SuperAdminDashboard.tsx">System Settings</h1>

              <SortableContainer dndKitId="db8fdbf3-8e04-4394-bf1e-e8c603a71a90" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="177" data-magicpath-path="SuperAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-6" data-magicpath-id="178" data-magicpath-path="SuperAdminDashboard.tsx">General Settings</h3>
                <SortableContainer dndKitId="bcfd722d-a4ba-4624-8867-7dcefc769445" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="179" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="ff84acd2-b4e7-4549-9be1-89cbf2a3829a" containerType="regular" prevTag="div" data-magicpath-id="180" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="181" data-magicpath-path="SuperAdminDashboard.tsx">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="182" data-magicpath-path="SuperAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="c1993418-8f7a-4468-bd58-42b9da4c818e" containerType="regular" prevTag="div" data-magicpath-id="183" data-magicpath-path="SuperAdminDashboard.tsx">
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