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
    mpid: "703ed71a-0c88-4466-8e6e-d1045dc10d31"
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2,
    mpid: "50867fa9-4c05-45ed-a5c0-f16d4f454b9a"
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users,
    mpid: "09782308-2fb6-40e5-b972-a99e6af82d60"
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield,
    mpid: "b2d7ee4d-ed14-4c99-904f-260c8b0d86b0"
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe,
    mpid: "96eca636-5a52-4555-b5ab-e2532031ab4f"
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    mpid: "977095f6-688e-4193-86d8-3e7b7439ce4f"
  }] as any[];
  return <SortableContainer dndKitId="c1909d94-9352-4754-ae64-9ced7e3f7715" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="SuperAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="1dde3176-9329-4723-b256-205a1a22776b" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="88704846-b589-4027-8ae1-e63ef1250089" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="SuperAdminDashboard.tsx">
          <SortableContainer dndKitId="da2d42ea-2d4b-45b8-b710-a1a3ab703789" containerType="regular" prevTag="div" className="flex items-center gap-2 mb-2" data-magicpath-id="3" data-magicpath-path="SuperAdminDashboard.tsx">
            <Crown className="text-amber-500" size={24} data-magicpath-id="4" data-magicpath-path="SuperAdminDashboard.tsx" />
            <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="5" data-magicpath-path="SuperAdminDashboard.tsx">Phoenix Imperial</h2>
          </SortableContainer>
          <p className="text-xs text-zinc-500 uppercase tracking-wider" data-magicpath-id="6" data-magicpath-path="SuperAdminDashboard.tsx">Super Administrator</p>
        </SortableContainer>

        <SortableContainer dndKitId="139bf249-727d-4cad-ae4c-c7339aaad875" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="7" data-magicpath-path="SuperAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="SuperAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="SuperAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="10" data-magicpath-path="SuperAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="ab2b2ed1-053d-4638-8694-dc56c1e67ee1" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="11" data-magicpath-path="SuperAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="12" data-magicpath-path="SuperAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="16e88813-7f80-44ca-8ae1-46a33a894fef" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="13" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="475038c5-bed9-466a-ac54-ed7b57c94384" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="14" data-magicpath-path="SuperAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="e93a6dad-cecc-42c5-9c99-d8dec34c25a9" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="15" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="be43a1c9-78a7-49a1-93c3-be133d771f11" containerType="regular" prevTag="div" data-magicpath-id="16" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="17" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin Dashboard</h1>
                <p className="text-zinc-400" data-magicpath-id="18" data-magicpath-path="SuperAdminDashboard.tsx">Complete control over all branches and settings</p>
              </SortableContainer>

              {/* Global Stats */}
              <SortableContainer dndKitId="19eaa387-6579-4df6-bd53-3e6069fac406" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="19" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="30783a5d-d3e9-4255-b4d0-975d887a4648" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg" data-magicpath-id="20" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="17a8eaff-f08d-4a55-b39b-7118589e218a" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="fc14b4d6-c29f-4fd7-92a0-8eb85d76fd81" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center" data-magicpath-id="22" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Hotel className="text-blue-400" size={24} data-magicpath-id="23" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="24" data-magicpath-path="SuperAdminDashboard.tsx">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="25" data-magicpath-path="SuperAdminDashboard.tsx">Active Branches</div>
                </SortableContainer>

                <SortableContainer dndKitId="5e967bd6-611b-473a-8431-1a23b14c9687" containerType="regular" prevTag="div" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg" data-magicpath-id="26" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="655fc7a4-d27b-4e0f-9f7e-13f36f74bb24" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="27" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="530272e5-5d5f-49ea-86db-e1e5f6dc4840" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center" data-magicpath-id="28" data-magicpath-path="SuperAdminDashboard.tsx">
                      <FileText className="text-green-400" size={24} data-magicpath-id="29" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="30" data-magicpath-path="SuperAdminDashboard.tsx">{totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="31" data-magicpath-path="SuperAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="8853688e-4572-415f-9e03-13ee991ba03d" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg" data-magicpath-id="32" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="a62ac71c-f87c-4e81-922c-868f63e457d3" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="33" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="2ab5f49c-59c1-4e99-8c1d-dafa393a420e" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="SuperAdminDashboard.tsx">
                      <BarChart3 className="text-amber-400" size={24} data-magicpath-id="35" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="36" data-magicpath-path="SuperAdminDashboard.tsx">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="37" data-magicpath-path="SuperAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="abbb2acf-61df-4367-9e5e-ce5fe4b28981" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg" data-magicpath-id="38" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="7cc4cb5a-ef15-4e09-bfeb-578ea1dd007d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="39" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="bd4eded4-a8d0-4d0d-afe7-09ae009fc999" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Users className="text-purple-400" size={24} data-magicpath-id="41" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="42" data-magicpath-path="SuperAdminDashboard.tsx">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="43" data-magicpath-path="SuperAdminDashboard.tsx">Total Users</div>
                </SortableContainer>
              </SortableContainer>

              {/* Branch Performance */}
              <SortableContainer dndKitId="668d0fcb-e450-4d7f-bb38-4ac069929511" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="44" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="91cd7d96-413f-46dc-8370-67700f0dcb70" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="45" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="46" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="47" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Abuja Branch
                  </h3>
                  <SortableContainer dndKitId="ce643000-95d6-435a-8bff-4a092615e401" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="48" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="5b6ba4ac-4a8e-4053-b910-07b9b43fff8f" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="49" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="50" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="51" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="f29fb2c3-ef50-45dc-9777-05cdd87c391d" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="52" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="54" data-magicpath-path="SuperAdminDashboard.tsx">{abujaBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="ab3d35f4-f7b8-4114-9a54-815ba5696a44" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="55" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="56" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="57" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="8a0e5716-bc7c-4be0-8849-0a347c1fbb6e" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="58" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="59" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="60" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Lagos Branch
                  </h3>
                  <SortableContainer dndKitId="2c28861d-95b2-4817-8154-5e6d4f222e9d" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="61" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="ae4832f6-2e33-4040-9222-69a4c3967923" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="62" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="63" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="64" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="0c158303-7636-49b3-925c-7e6f137d5220" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="65" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="66" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="67" data-magicpath-path="SuperAdminDashboard.tsx">{lagosBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="fe5b0261-050b-4725-ab24-2330196c8b63" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="68" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'branches' && <SortableContainer dndKitId="3b9c831f-842a-4db9-99de-a8a0d863ad81" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="71" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="94cc02a3-5129-425f-96c1-26f685e03896" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="72" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="73" data-magicpath-path="SuperAdminDashboard.tsx">Branch Management</h1>
                <SortableContainer dndKitId="5db7cc01-ccfb-4562-8a38-56442d150250" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="74" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="75" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add New Branch
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="d46fb9d0-c412-47ff-b934-2a734ebcb926" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="76" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'admins' && <SortableContainer dndKitId="55b624e5-8929-4df9-80e6-1b2f2aee30dd" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="95" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="8079c6c0-1c2d-48bc-92a4-a09d83b198b3" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="96" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="97" data-magicpath-path="SuperAdminDashboard.tsx">Admin Users</h1>
                <SortableContainer dndKitId="8237cb94-0e46-4ea4-b77c-8b2dc66450aa" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="98" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="99" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add Admin
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="343fb768-805a-4434-8982-7d1dc80b48d3" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="100" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'permissions' && <SortableContainer dndKitId="70499da6-7ca1-4599-9449-ba7d79cd61a8" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="127" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="128" data-magicpath-path="SuperAdminDashboard.tsx">Roles & Permissions</h1>

              <SortableContainer dndKitId="10592ba5-7932-4e68-bc93-feb8b92071d5" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="129" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Branch Admin Permissions */}
                <SortableContainer dndKitId="5faaeb21-ea54-4734-9355-36e92f2215bb" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="130" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="7f2f28d5-1780-4819-bc9a-82b41de85e33" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="131" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="12d2f34e-a29e-4ab9-af78-847e96aea8b2" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="132" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Shield className="text-blue-400" size={24} data-magicpath-id="133" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="ffe0afd9-91bc-41b2-8867-b3dbe0324cea" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="135" data-magicpath-path="SuperAdminDashboard.tsx">Branch Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="SuperAdminDashboard.tsx">Branch-specific management</p>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="88a444a9-f14e-4230-90ea-0d7d2d591a19" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="137" data-magicpath-path="SuperAdminDashboard.tsx">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true,
                  mpid: "041f9609-e609-45c1-bee5-f866e0218518"
                }, {
                  name: 'View Bookings',
                  enabled: true,
                  mpid: "d632076e-ae96-4e9d-9a0f-cd24015c3a18"
                }, {
                  name: 'Manage Bookings',
                  enabled: true,
                  mpid: "318285b4-b2b7-42bd-9fcc-07ff1a63e0b4"
                }, {
                  name: 'Manage Testimonials',
                  enabled: true,
                  mpid: "edaf79db-a5cf-415d-aa1c-5682f46513a3"
                }, {
                  name: 'Manage Gallery',
                  enabled: true,
                  mpid: "4940d585-4da3-427d-8d09-30bdeb9fc0ab"
                }, {
                  name: 'Branch Settings',
                  enabled: true,
                  mpid: "10650f50-93c1-448d-a782-0d54871d8087"
                }, {
                  name: 'Global Settings',
                  enabled: false,
                  mpid: "d8cb9a7c-9486-413e-a4e3-c3f7050da6d1"
                }, {
                  name: 'User Management',
                  enabled: false,
                  mpid: "9369cb9f-59b6-477d-b1ab-34a2d7c3e125"
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="139" data-magicpath-path="SuperAdminDashboard.tsx">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Lock className="text-red-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="SuperAdminDashboard.tsx" />}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Super Admin Permissions */}
                <SortableContainer dndKitId="0b35b9ce-84a9-46a4-8e5c-52673f126b27" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-amber-700 p-6" data-magicpath-id="142" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="019c60c3-ba8b-4c57-b9d3-735d641b44c1" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="143" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="f0630023-475d-485c-a1f3-f08227e66c37" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="144" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Crown className="text-amber-500" size={24} data-magicpath-id="145" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="cf3bd14e-7db6-470f-b447-c1939f713e23" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="147" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="SuperAdminDashboard.tsx">Full system control</p>
                    </SortableContainer>
                  </SortableContainer>

                  <div className="space-y-3" data-magicpath-id="149" data-magicpath-path="SuperAdminDashboard.tsx">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <SortableContainer dndKitId="73b2f487-cea2-4dc9-8079-7915c8f7f906" containerType="regular" prevTag="div" key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-id="150" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-id="151" data-magicpath-path="SuperAdminDashboard.tsx">{permission}</span>
                        <Check className="text-green-400" size={18} data-magicpath-id="152" data-magicpath-path="SuperAdminDashboard.tsx" />
                      </SortableContainer>)}
                  </div>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Global Content */}
          {activeSection === 'global-content' && <SortableContainer dndKitId="13d4d9e8-3aec-41b6-8477-47b514993aa9" containerType="regular" prevTag="motion.div" initial={{
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

              <SortableContainer dndKitId="3b2cf0f6-2e7c-459d-ae77-6050e6c08abc" containerType="regular" prevTag="div" className="grid gap-6" data-magicpath-id="156" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Hero Section */}
                <SortableContainer dndKitId="746be9fd-1fc4-458c-923d-03f13206909f" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="157" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="d48db1b4-2720-47da-8813-3be727f041ae" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="158" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="159" data-magicpath-path="SuperAdminDashboard.tsx">Hero Section</h3>
                    <SortableContainer dndKitId="ee753313-13fa-483d-abc7-68f03e826632" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="160" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="161" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Slides
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="162" data-magicpath-path="SuperAdminDashboard.tsx">Manage homepage hero slider images and text</p>
                </SortableContainer>

                {/* Navigation */}
                <SortableContainer dndKitId="914ec6ed-ee2d-4b77-a745-b172140277d5" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="163" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="c0e548bb-1fa1-4676-b9a6-23b4864a4743" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="164" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="165" data-magicpath-path="SuperAdminDashboard.tsx">Navigation Menu</h3>
                    <SortableContainer dndKitId="a9647672-d0c7-47b1-8b82-8075ad0ac541" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="166" data-magicpath-path="SuperAdminDashboard.tsx">
                      <MenuIcon size={16} data-magicpath-id="167" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Menu
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="168" data-magicpath-path="SuperAdminDashboard.tsx">Manage global navigation links and structure</p>
                </SortableContainer>

                {/* Footer */}
                <SortableContainer dndKitId="c3459a3d-b94a-432b-93a3-bee9836161fa" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="169" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="87bb7926-00d1-4ca2-97a0-51cfc979cad2" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="170" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="171" data-magicpath-path="SuperAdminDashboard.tsx">Footer Content</h3>
                    <SortableContainer dndKitId="692d15dc-b6ac-4911-aa12-ef8b5d3f175f" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="172" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="173" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Footer
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="174" data-magicpath-path="SuperAdminDashboard.tsx">Manage footer text, links, and social media</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="6f530e81-525f-468b-8d61-f28256702deb" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="175" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="176" data-magicpath-path="SuperAdminDashboard.tsx">System Settings</h1>

              <SortableContainer dndKitId="db06a399-5995-439c-927f-003bb7484393" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="177" data-magicpath-path="SuperAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-6" data-magicpath-id="178" data-magicpath-path="SuperAdminDashboard.tsx">General Settings</h3>
                <SortableContainer dndKitId="6239d0a4-ed72-426c-8d14-9a04e47f9d58" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="179" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="129e8f3e-be07-4c65-993b-fd4549e1e522" containerType="regular" prevTag="div" data-magicpath-id="180" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="181" data-magicpath-path="SuperAdminDashboard.tsx">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="182" data-magicpath-path="SuperAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="1b62e4ee-6746-438e-94a4-33697423a679" containerType="regular" prevTag="div" data-magicpath-id="183" data-magicpath-path="SuperAdminDashboard.tsx">
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