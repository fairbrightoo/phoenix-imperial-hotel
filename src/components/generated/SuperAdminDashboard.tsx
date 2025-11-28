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
    mpid: "7ceb3374-a4e1-4a9e-88af-58d9cdc087fd"
  }, {
    id: 'branches',
    label: 'Branch Management',
    icon: Building2,
    mpid: "ba3b505d-2c9c-453e-b840-3ae45dbee5bd"
  }, {
    id: 'admins',
    label: 'Admin Users',
    icon: Users,
    mpid: "e752d1e5-1a95-44ee-bfa1-833318a35036"
  }, {
    id: 'permissions',
    label: 'Roles & Permissions',
    icon: Shield,
    mpid: "4d5d2533-cbaf-4fdd-9b19-6d0705b2e38e"
  }, {
    id: 'global-content',
    label: 'Global Content',
    icon: Globe,
    mpid: "2b502704-a9e3-4520-8ac7-bb2194a6fed3"
  }, {
    id: 'settings',
    label: 'System Settings',
    icon: Settings,
    mpid: "2e755736-c029-4709-9af5-914b03fdbceb"
  }] as any[];
  return <SortableContainer dndKitId="61f7f046-a7de-40da-a526-038f924ba03e" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="SuperAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="4d49182b-a1fc-491f-8f3c-90249faf19c5" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="e5892074-087c-42f5-8816-d28115ba4b5a" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="SuperAdminDashboard.tsx">
          <SortableContainer dndKitId="29b25428-dec4-4fb9-b9e0-acd05266410a" containerType="regular" prevTag="div" className="flex items-center gap-2 mb-2" data-magicpath-id="3" data-magicpath-path="SuperAdminDashboard.tsx">
            <Crown className="text-amber-500" size={24} data-magicpath-id="4" data-magicpath-path="SuperAdminDashboard.tsx" />
            <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="5" data-magicpath-path="SuperAdminDashboard.tsx">Phoenix Imperial</h2>
          </SortableContainer>
          <p className="text-xs text-zinc-500 uppercase tracking-wider" data-magicpath-id="6" data-magicpath-path="SuperAdminDashboard.tsx">Super Administrator</p>
        </SortableContainer>

        <SortableContainer dndKitId="10413c25-a3ac-4b49-ac84-8885dbcd1304" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="7" data-magicpath-path="SuperAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="SuperAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="SuperAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="10" data-magicpath-path="SuperAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="611c9619-8e7b-4b9a-95bc-ccad6e6185d1" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="11" data-magicpath-path="SuperAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="12" data-magicpath-path="SuperAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="0655077d-8dc2-442d-bad1-3cfd64415adc" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="13" data-magicpath-path="SuperAdminDashboard.tsx">
        <SortableContainer dndKitId="12a5f346-18f4-4052-849a-9b580acac283" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="14" data-magicpath-path="SuperAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="f71ed4e5-db58-435f-8431-8ad64745bdbc" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="15" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="c564e639-bcf2-40a9-a293-d5add6c3fe12" containerType="regular" prevTag="div" data-magicpath-id="16" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="17" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin Dashboard</h1>
                <p className="text-zinc-400" data-magicpath-id="18" data-magicpath-path="SuperAdminDashboard.tsx">Complete control over all branches and settings</p>
              </SortableContainer>

              {/* Global Stats */}
              <SortableContainer dndKitId="cbb3c7f2-4193-4901-b67e-260dc058649e" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="19" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="313f0379-580e-403a-8922-74b951fc4a49" containerType="regular" prevTag="div" className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 p-6 rounded-lg" data-magicpath-id="20" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="bafc1ed5-23df-4236-b47f-fcbed4ec8122" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="23db473d-c451-48b5-b8b6-b0cf0c454590" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center" data-magicpath-id="22" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Hotel className="text-blue-400" size={24} data-magicpath-id="23" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="24" data-magicpath-path="SuperAdminDashboard.tsx">{BRANCHES.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="25" data-magicpath-path="SuperAdminDashboard.tsx">Active Branches</div>
                </SortableContainer>

                <SortableContainer dndKitId="d2a81fc9-4dc6-4142-ba73-5bd52ea1ea6a" containerType="regular" prevTag="div" className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 p-6 rounded-lg" data-magicpath-id="26" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="f1250496-0094-433a-8be5-72a42138097d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="27" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="e22f29fc-dabe-4eef-9573-32bcff991eb8" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center" data-magicpath-id="28" data-magicpath-path="SuperAdminDashboard.tsx">
                      <FileText className="text-green-400" size={24} data-magicpath-id="29" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="30" data-magicpath-path="SuperAdminDashboard.tsx">{totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="31" data-magicpath-path="SuperAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="3d056b21-7b74-4e5a-8bfc-167b85bf5046" containerType="regular" prevTag="div" className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 p-6 rounded-lg" data-magicpath-id="32" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="30a91450-66ec-4613-b33c-3e3c6d4e4610" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="33" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="524a2974-9704-4c0f-b9b6-3f7d3c7b742f" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/30 flex items-center justify-center" data-magicpath-id="34" data-magicpath-path="SuperAdminDashboard.tsx">
                      <BarChart3 className="text-amber-400" size={24} data-magicpath-id="35" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="36" data-magicpath-path="SuperAdminDashboard.tsx">
                    ₦{(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="37" data-magicpath-path="SuperAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="4ee94628-3a60-4c7f-b5c8-a8c520c3260b" containerType="regular" prevTag="div" className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 p-6 rounded-lg" data-magicpath-id="38" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="448515f7-612a-471e-a119-19035591c452" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="39" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="75f6b3ed-a51b-4c8c-8244-9888b05c9e2a" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Users className="text-purple-400" size={24} data-magicpath-id="41" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="42" data-magicpath-path="SuperAdminDashboard.tsx">{MOCK_USERS.length}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="43" data-magicpath-path="SuperAdminDashboard.tsx">Total Users</div>
                </SortableContainer>
              </SortableContainer>

              {/* Branch Performance */}
              <SortableContainer dndKitId="9ced29e7-6494-4623-b895-3d0cbb385e9d" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="44" data-magicpath-path="SuperAdminDashboard.tsx">
                <SortableContainer dndKitId="2f5e307a-8c10-4fd7-aa61-72927ed01f43" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="45" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="46" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="47" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Abuja Branch
                  </h3>
                  <SortableContainer dndKitId="93b02184-3457-4f31-88f1-3031d15de782" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="48" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="06e4ec30-ff77-4cc6-a226-c44ad7110e32" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="49" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="50" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="51" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.abuja.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="b0938320-ec3a-4fee-8620-72129db0b739" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="52" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="54" data-magicpath-path="SuperAdminDashboard.tsx">{abujaBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="d7dd18c4-c1e9-46c6-aab6-42111d9d88b5" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="55" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="56" data-magicpath-path="SuperAdminDashboard.tsx">Revenue:</span>
                      <span className="text-amber-400 font-serif" data-magicpath-id="57" data-magicpath-path="SuperAdminDashboard.tsx">
                        ₦
                        {MOCK_BOOKINGS.filter(b => b.branchId === 'abuja').reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                      </span>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="6896a25e-15ab-498c-a6a3-38550c126dea" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="58" data-magicpath-path="SuperAdminDashboard.tsx">
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2" data-magicpath-id="59" data-magicpath-path="SuperAdminDashboard.tsx">
                    <Building2 size={20} className="text-amber-500" data-magicpath-id="60" data-magicpath-path="SuperAdminDashboard.tsx" />
                    Lagos Branch
                  </h3>
                  <SortableContainer dndKitId="f11d2442-05f3-45c9-b340-ef8a491b7d49" containerType="regular" prevTag="div" className="space-y-3" data-magicpath-id="61" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="9fb46f5b-5591-4fa7-b4e2-d04a117c7859" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="62" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="63" data-magicpath-path="SuperAdminDashboard.tsx">Total Rooms:</span>
                      <span className="text-white font-medium" data-magicpath-id="64" data-magicpath-path="SuperAdminDashboard.tsx">{ROOMS_BY_BRANCH.lagos.length}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e8d53e61-14e7-481d-a85e-9a37a0f9f187" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="65" data-magicpath-path="SuperAdminDashboard.tsx">
                      <span className="text-zinc-400" data-magicpath-id="66" data-magicpath-path="SuperAdminDashboard.tsx">Bookings:</span>
                      <span className="text-white font-medium" data-magicpath-id="67" data-magicpath-path="SuperAdminDashboard.tsx">{lagosBookings}</span>
                    </SortableContainer>
                    <SortableContainer dndKitId="e1aac5f3-57b5-4326-8447-ee2b9b02555d" containerType="regular" prevTag="div" className="flex justify-between items-center" data-magicpath-id="68" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'branches' && <SortableContainer dndKitId="9166d7cd-abee-4fa4-8efe-33a7d0184198" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="71" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="9e325fd5-bac6-4a51-9795-46d73873d177" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="72" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="73" data-magicpath-path="SuperAdminDashboard.tsx">Branch Management</h1>
                <SortableContainer dndKitId="21f4e4e9-2db6-4a73-a963-b9a33e245bd6" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="74" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="75" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add New Branch
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="45548e11-169c-49f3-9d95-5ed2e18d64ee" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="76" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'admins' && <SortableContainer dndKitId="60024a9e-688c-43da-80f6-64da56bdd8d1" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="95" data-magicpath-path="SuperAdminDashboard.tsx">
              <SortableContainer dndKitId="c5497062-65f7-4566-b3ec-3aaab3261bad" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="96" data-magicpath-path="SuperAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="97" data-magicpath-path="SuperAdminDashboard.tsx">Admin Users</h1>
                <SortableContainer dndKitId="ec04ade9-2af4-49ab-b0f4-3ee2de9dbb5a" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="98" data-magicpath-path="SuperAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="99" data-magicpath-path="SuperAdminDashboard.tsx" />
                  Add Admin
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="d33ed31d-59c2-4466-88e1-9ad581657d3a" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="100" data-magicpath-path="SuperAdminDashboard.tsx">
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
          {activeSection === 'permissions' && <SortableContainer dndKitId="51d7df36-c70a-4370-aaa5-6a1cadae7883" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="127" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="128" data-magicpath-path="SuperAdminDashboard.tsx">Roles & Permissions</h1>

              <SortableContainer dndKitId="c3dbb975-18cf-4b4e-85ea-1f5e52869747" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="129" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Branch Admin Permissions */}
                <SortableContainer dndKitId="f5e750cf-f5b3-46f1-b1a0-e93462784e21" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="130" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="a9af0c31-287a-4e4d-bc4e-cf1995bf07e0" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="131" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="08ed2821-71a7-498e-9835-3561c7b8022d" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="132" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Shield className="text-blue-400" size={24} data-magicpath-id="133" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="2b33fc22-99ba-4e28-95e7-be9b92c9523c" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="135" data-magicpath-path="SuperAdminDashboard.tsx">Branch Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="SuperAdminDashboard.tsx">Branch-specific management</p>
                    </SortableContainer>
                  </SortableContainer>

                  <SortableContainer dndKitId="7ab047b2-741f-47a0-9b7a-a588cb35f6ea" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="137" data-magicpath-path="SuperAdminDashboard.tsx">
                    {[{
                  name: 'Manage Rooms',
                  enabled: true,
                  mpid: "f05f63a1-bc9c-43ce-b2d0-73359cbac3ec"
                }, {
                  name: 'View Bookings',
                  enabled: true,
                  mpid: "ef4261c6-4899-4522-a6cd-d44ded843339"
                }, {
                  name: 'Manage Bookings',
                  enabled: true,
                  mpid: "5e18415e-af3f-48b1-8674-12a4ad047cf2"
                }, {
                  name: 'Manage Testimonials',
                  enabled: true,
                  mpid: "d438d587-d712-4d26-8c10-d0e8dda17f45"
                }, {
                  name: 'Manage Gallery',
                  enabled: true,
                  mpid: "cea41e75-89f2-4833-b9a8-400b8fe246f2"
                }, {
                  name: 'Branch Settings',
                  enabled: true,
                  mpid: "dce98a82-3d0a-4921-b146-bf53510788f7"
                }, {
                  name: 'Global Settings',
                  enabled: false,
                  mpid: "0022810b-b9fd-40ea-8013-850875bc79b6"
                }, {
                  name: 'User Management',
                  enabled: false,
                  mpid: "99a8e6b9-c913-419b-81c1-d39992f54676"
                }].map(permission => <div key={permission.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="139" data-magicpath-path="SuperAdminDashboard.tsx">{permission.name}</span>
                        {permission.enabled ? <Unlock className="text-green-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="SuperAdminDashboard.tsx" /> : <Lock className="text-red-400" size={18} data-magicpath-uuid={(permission as any)["mpid"] ?? "unsafe"} data-magicpath-id="141" data-magicpath-path="SuperAdminDashboard.tsx" />}
                      </div>)}
                  </SortableContainer>
                </SortableContainer>

                {/* Super Admin Permissions */}
                <SortableContainer dndKitId="7021fc5f-5211-4900-884a-095a718d8157" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-amber-700 p-6" data-magicpath-id="142" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="f3af52ca-1a12-4f9a-a2db-d308e81ef949" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-6" data-magicpath-id="143" data-magicpath-path="SuperAdminDashboard.tsx">
                    <SortableContainer dndKitId="d6ba7c6b-f067-41eb-9b2c-14d59ec420e5" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="144" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Crown className="text-amber-500" size={24} data-magicpath-id="145" data-magicpath-path="SuperAdminDashboard.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="1448f2a5-ee37-44b1-83f9-a0593bcdcd9d" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="SuperAdminDashboard.tsx">
                      <h3 className="text-xl font-serif text-white" data-magicpath-id="147" data-magicpath-path="SuperAdminDashboard.tsx">Super Admin</h3>
                      <p className="text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="SuperAdminDashboard.tsx">Full system control</p>
                    </SortableContainer>
                  </SortableContainer>

                  <div className="space-y-3" data-magicpath-id="149" data-magicpath-path="SuperAdminDashboard.tsx">
                    {['All Branch Admin Permissions', 'Manage All Branches', 'Create/Remove Branches', 'User & Admin Management', 'Roles & Permissions', 'Global Content Management', 'System Settings', 'Analytics & Reports'].map(permission => <SortableContainer dndKitId="0d11b1ad-624a-4908-9552-18de7a23dc81" containerType="regular" prevTag="div" key={permission} className="flex items-center justify-between p-3 bg-zinc-900 rounded" data-magicpath-id="150" data-magicpath-path="SuperAdminDashboard.tsx">
                        <span className="text-zinc-300 text-sm" data-magicpath-id="151" data-magicpath-path="SuperAdminDashboard.tsx">{permission}</span>
                        <Check className="text-green-400" size={18} data-magicpath-id="152" data-magicpath-path="SuperAdminDashboard.tsx" />
                      </SortableContainer>)}
                  </div>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Global Content */}
          {activeSection === 'global-content' && <SortableContainer dndKitId="323633f6-2ed3-40e1-8387-1b1242271ebc" containerType="regular" prevTag="motion.div" initial={{
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

              <SortableContainer dndKitId="7f398648-7354-4749-9ed5-e8ad4c5d0cfc" containerType="regular" prevTag="div" className="grid gap-6" data-magicpath-id="156" data-magicpath-path="SuperAdminDashboard.tsx">
                {/* Hero Section */}
                <SortableContainer dndKitId="85bac69f-a590-41b4-833b-e871124f42f1" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="157" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="fa8578b1-2d42-4fef-a46d-0ff6494e2775" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="158" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="159" data-magicpath-path="SuperAdminDashboard.tsx">Hero Section</h3>
                    <SortableContainer dndKitId="66510f09-f17b-4b98-90bd-343c499d9cc6" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="160" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="161" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Slides
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="162" data-magicpath-path="SuperAdminDashboard.tsx">Manage homepage hero slider images and text</p>
                </SortableContainer>

                {/* Navigation */}
                <SortableContainer dndKitId="8c161f48-8db7-4347-a09c-9bebe96dd8de" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="163" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="4a35cf30-c88e-48e4-9a29-0d1b3cd2eb4d" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="164" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="165" data-magicpath-path="SuperAdminDashboard.tsx">Navigation Menu</h3>
                    <SortableContainer dndKitId="6f44b057-9229-4e08-a5aa-bd9fe849881b" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="166" data-magicpath-path="SuperAdminDashboard.tsx">
                      <MenuIcon size={16} data-magicpath-id="167" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Menu
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="168" data-magicpath-path="SuperAdminDashboard.tsx">Manage global navigation links and structure</p>
                </SortableContainer>

                {/* Footer */}
                <SortableContainer dndKitId="5196ccb3-5657-4d7d-8347-3b71c602a164" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="169" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="a695c2e9-8d59-4588-9996-75d92c937712" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="170" data-magicpath-path="SuperAdminDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="171" data-magicpath-path="SuperAdminDashboard.tsx">Footer Content</h3>
                    <SortableContainer dndKitId="346370e0-871d-42dd-9f91-943a729e3275" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2" data-magicpath-id="172" data-magicpath-path="SuperAdminDashboard.tsx">
                      <Edit size={16} data-magicpath-id="173" data-magicpath-path="SuperAdminDashboard.tsx" />
                      Edit Footer
                    </SortableContainer>
                  </SortableContainer>
                  <p className="text-zinc-400 text-sm" data-magicpath-id="174" data-magicpath-path="SuperAdminDashboard.tsx">Manage footer text, links, and social media</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="78de15b3-74a4-4de7-8a31-f23ca64607d4" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="175" data-magicpath-path="SuperAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="176" data-magicpath-path="SuperAdminDashboard.tsx">System Settings</h1>

              <SortableContainer dndKitId="eaf8bb50-c9c0-48aa-91eb-053485f626df" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="177" data-magicpath-path="SuperAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-6" data-magicpath-id="178" data-magicpath-path="SuperAdminDashboard.tsx">General Settings</h3>
                <SortableContainer dndKitId="a0d83953-4ceb-4437-a8b6-dcedbb166656" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="179" data-magicpath-path="SuperAdminDashboard.tsx">
                  <SortableContainer dndKitId="1986a7af-c313-40ce-96ab-84c113503464" containerType="regular" prevTag="div" data-magicpath-id="180" data-magicpath-path="SuperAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="181" data-magicpath-path="SuperAdminDashboard.tsx">
                      Hotel Chain Name
                    </label>
                    <input type="text" defaultValue="Phoenix Imperial Hotels" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="182" data-magicpath-path="SuperAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="a29fa3c4-fe72-4f59-a389-1d4ec39575cd" containerType="regular" prevTag="div" data-magicpath-id="183" data-magicpath-path="SuperAdminDashboard.tsx">
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