import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Hotel, Calendar, Users, MessageSquare, Image, BarChart3, Settings, Star, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { ROOMS_BY_BRANCH, MOCK_BOOKINGS, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';
import { BranchId } from './types';
interface BranchAdminDashboardProps {
  onClose: () => void;
  mpid?: string;
}
export const BranchAdminDashboard: React.FC<BranchAdminDashboardProps> = ({
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'rooms' | 'bookings' | 'testimonials' | 'gallery' | 'settings'>('overview');
  const branchId = user?.branchId as BranchId;
  const branchName = branchId === 'abuja' ? 'Abuja' : 'Lagos';

  // Branch-specific data
  const rooms = ROOMS_BY_BRANCH[branchId] || [];
  const bookings = MOCK_BOOKINGS.filter(b => b.branchId === branchId);
  const testimonials = TESTIMONIALS_BY_BRANCH[branchId] || [];
  const gallery = GALLERY_BY_BRANCH[branchId] || [];

  // Statistics
  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.available).length,
    occupancyRate: Math.round(bookings.filter(b => b.status === 'confirmed').length / rooms.length * 100)
  };
  const menuItems = [{
    id: 'overview',
    label: 'Overview',
    icon: Home,
    mpid: "48e04642-1aa8-47cf-9340-ddffeda1b270"
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel,
    mpid: "f1cf10f3-1f0f-480a-a703-8b13820e9e4d"
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    mpid: "09cb64df-9a19-4e97-b9c4-655dbd091e9a"
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    mpid: "5e9c44d2-8ca2-4647-b49f-237a88950645"
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image,
    mpid: "3810199a-5ca7-4107-84c2-7cf693909702"
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    mpid: "3d544985-70be-4730-8467-3ff29365c663"
  }] as any[];
  return <SortableContainer dndKitId="c71a4dca-521a-4379-b756-1671d0c03da8" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="BranchAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="d192ddbf-07ff-45c4-85af-5fc79d66ade5" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="120140e1-717e-4266-ad84-de6bc2c8b623" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="BranchAdminDashboard.tsx">
          <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="3" data-magicpath-path="BranchAdminDashboard.tsx">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1" data-magicpath-id="4" data-magicpath-path="BranchAdminDashboard.tsx">{branchName} Branch Admin</p>
        </SortableContainer>

        <SortableContainer dndKitId="8df5fa2b-78bc-4737-af67-64290397210d" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="5" data-magicpath-path="BranchAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="8" data-magicpath-path="BranchAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="e54d3770-3be4-496d-abbd-dee230e7eb29" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="9" data-magicpath-path="BranchAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="10" data-magicpath-path="BranchAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="d11d655e-9f7c-4f48-bf9b-2931c0b06103" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="11" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="b4b104c4-2924-4fce-932f-6fb8e1e83657" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="12" data-magicpath-path="BranchAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="703a38f5-3407-4e73-a7c3-f41aead897a8" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="13" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="254e3464-157c-4c24-a4eb-54453d34a73b" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="BranchAdminDashboard.tsx">Dashboard Overview</h1>
                <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="BranchAdminDashboard.tsx">Welcome back, {user?.name}</p>
              </SortableContainer>

              {/* Stats Grid */}
              <SortableContainer dndKitId="6712b1d4-6b30-471e-a1a4-c858d884d939" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="17" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="410581f5-61f7-49e0-83b0-aa3665cf5bb9" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="18" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="2f91887c-a636-4b23-a0e4-b621594459eb" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="19" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="f9719157-13ad-4c52-904d-85a1e6409748" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="20" data-magicpath-path="BranchAdminDashboard.tsx">
                      <Calendar className="text-blue-400" size={24} data-magicpath-id="21" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                    <TrendingUp className="text-green-400" size={20} data-magicpath-id="22" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="23" data-magicpath-path="BranchAdminDashboard.tsx">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="24" data-magicpath-path="BranchAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="2cdcf010-a768-49ca-bad0-2b8a23a120aa" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="25" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="1f7353f0-6d5d-43c4-a045-1501f937c4f5" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="26" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="c789c71d-6042-48b1-a864-f646b038c3ed" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center" data-magicpath-id="27" data-magicpath-path="BranchAdminDashboard.tsx">
                      <CheckCircle className="text-green-400" size={24} data-magicpath-id="28" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="29" data-magicpath-path="BranchAdminDashboard.tsx">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="30" data-magicpath-path="BranchAdminDashboard.tsx">Confirmed</div>
                </SortableContainer>

                <SortableContainer dndKitId="62f5e5ff-4184-4294-a5b8-5a38e6359315" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="31" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="a68bf785-1658-472e-83e5-b96f1ae040d4" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="32" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="17ecfc70-3d65-4129-bcaa-b325b035b931" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="BranchAdminDashboard.tsx">
                      <DollarSign className="text-amber-400" size={24} data-magicpath-id="34" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="35" data-magicpath-path="BranchAdminDashboard.tsx">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="36" data-magicpath-path="BranchAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="616400c0-ac03-4a2a-bf6f-87054a7bf12f" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="37" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="3e785079-4144-4f1a-b308-d54f9685fc5a" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="38" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="4a7453ae-86de-44b3-b9dd-e5a80b61383f" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center" data-magicpath-id="39" data-magicpath-path="BranchAdminDashboard.tsx">
                      <BarChart3 className="text-purple-400" size={24} data-magicpath-id="40" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="41" data-magicpath-path="BranchAdminDashboard.tsx">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="42" data-magicpath-path="BranchAdminDashboard.tsx">Occupancy Rate</div>
                </SortableContainer>
              </SortableContainer>

              {/* Recent Bookings */}
              <SortableContainer dndKitId="33b50284-3810-4fc8-9604-0261568f2381" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="43" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="44" data-magicpath-path="BranchAdminDashboard.tsx">Recent Bookings</h3>
                <SortableContainer dndKitId="fcb0bbb8-3d67-44e7-bfb0-0f1a50ba2dee" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="45" data-magicpath-path="BranchAdminDashboard.tsx">
                  {bookings.slice(0, 5).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId);
                return <div key={booking.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="46" data-magicpath-path="BranchAdminDashboard.tsx">
                        <div className="flex items-center gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="47" data-magicpath-path="BranchAdminDashboard.tsx">
                          <div className={`w-2 h-2 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400' : booking.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="48" data-magicpath-path="BranchAdminDashboard.tsx" />
                          <div data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="BranchAdminDashboard.tsx">
                            <p className="text-white font-medium" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="BranchAdminDashboard.tsx">{room?.name}</p>
                            <p className="text-xs text-zinc-500" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown,checkOut:unknown" data-magicpath-id="51" data-magicpath-path="BranchAdminDashboard.tsx">
                              {booking.checkIn} - {booking.checkOut}
                            </p>
                          </div>
                        </div>
                        <div className="text-right" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="BranchAdminDashboard.tsx">
                          <p className="text-amber-400 font-serif" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="BranchAdminDashboard.tsx">₦{booking.totalPrice.toLocaleString()}</p>
                          <p className="text-xs text-zinc-500 capitalize" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="54" data-magicpath-path="BranchAdminDashboard.tsx">{booking.status}</p>
                        </div>
                      </div>;
              })}
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}

          {/* Rooms Management */}
          {activeSection === 'rooms' && <SortableContainer dndKitId="330bbd11-db4b-4098-8372-a9ade37da1dc" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="55" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="c03a79ec-a24f-44c5-84ab-d12e07e91adf" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="56" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="57" data-magicpath-path="BranchAdminDashboard.tsx">Rooms Management</h1>
                <SortableContainer dndKitId="b6b58395-0b55-439b-99aa-6e0b4b157b5c" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="58" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="59" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Room
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="0b8c1efd-c62f-4826-b142-098237ffb1f0" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="60" data-magicpath-path="BranchAdminDashboard.tsx">
                {rooms.map(room => <div key={room.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="BranchAdminDashboard.tsx">
                    <img src={room.images[0]} alt={room.name} className="w-full h-48 object-cover" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="BranchAdminDashboard.tsx" />
                    <div className="p-6" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="63" data-magicpath-path="BranchAdminDashboard.tsx">
                      <div className="flex items-start justify-between mb-3" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="64" data-magicpath-path="BranchAdminDashboard.tsx">
                        <div data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="65" data-magicpath-path="BranchAdminDashboard.tsx">
                          <h3 className="text-xl font-serif text-white mb-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="66" data-magicpath-path="BranchAdminDashboard.tsx">{room.name}</h3>
                          <p className="text-sm text-zinc-400" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="type:unknown" data-magicpath-id="67" data-magicpath-path="BranchAdminDashboard.tsx">{room.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="68" data-magicpath-path="BranchAdminDashboard.tsx">
                          {room.available ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm mb-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:unknown" data-magicpath-id="69" data-magicpath-path="BranchAdminDashboard.tsx">{room.description}</p>
                      <div className="flex items-center justify-between" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="70" data-magicpath-path="BranchAdminDashboard.tsx">
                        <span className="text-2xl font-serif text-amber-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="71" data-magicpath-path="BranchAdminDashboard.tsx">₦{room.price.toLocaleString()}</span>
                        <div className="flex gap-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="72" data-magicpath-path="BranchAdminDashboard.tsx">
                          <button className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="73" data-magicpath-path="BranchAdminDashboard.tsx">
                            <Edit size={16} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="74" data-magicpath-path="BranchAdminDashboard.tsx" />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="75" data-magicpath-path="BranchAdminDashboard.tsx">
                            <Trash2 size={16} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="76" data-magicpath-path="BranchAdminDashboard.tsx" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>}

          {/* Bookings Management */}
          {activeSection === 'bookings' && <SortableContainer dndKitId="081db586-6625-4e71-bc5c-f43b9603508d" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="77" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="78" data-magicpath-path="BranchAdminDashboard.tsx">Bookings Management</h1>

              <SortableContainer dndKitId="2be856bc-37ba-4e37-a125-c4676497e864" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="79" data-magicpath-path="BranchAdminDashboard.tsx">
                <table className="w-full" data-magicpath-id="80" data-magicpath-path="BranchAdminDashboard.tsx">
                  <thead className="bg-zinc-900" data-magicpath-id="81" data-magicpath-path="BranchAdminDashboard.tsx">
                    <tr data-magicpath-id="82" data-magicpath-path="BranchAdminDashboard.tsx">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="83" data-magicpath-path="BranchAdminDashboard.tsx">
                        Booking ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="84" data-magicpath-path="BranchAdminDashboard.tsx">
                        Room
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="85" data-magicpath-path="BranchAdminDashboard.tsx">
                        Dates
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="86" data-magicpath-path="BranchAdminDashboard.tsx">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="87" data-magicpath-path="BranchAdminDashboard.tsx">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider" data-magicpath-id="88" data-magicpath-path="BranchAdminDashboard.tsx">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700" data-magicpath-id="89" data-magicpath-path="BranchAdminDashboard.tsx">
                    {bookings.map(booking => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  return <tr key={booking.id} className="hover:bg-zinc-750" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="90" data-magicpath-path="BranchAdminDashboard.tsx">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="91" data-magicpath-path="BranchAdminDashboard.tsx">
                            #{booking.id.slice(-8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="92" data-magicpath-path="BranchAdminDashboard.tsx">
                            {room?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown,checkOut:unknown" data-magicpath-id="93" data-magicpath-path="BranchAdminDashboard.tsx">
                            {booking.checkIn} to {booking.checkOut}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="94" data-magicpath-path="BranchAdminDashboard.tsx">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="95" data-magicpath-path="BranchAdminDashboard.tsx">
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-400 font-serif" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="96" data-magicpath-path="BranchAdminDashboard.tsx">
                            ₦{booking.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="97" data-magicpath-path="BranchAdminDashboard.tsx">
                            <button className="text-amber-500 hover:text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="98" data-magicpath-path="BranchAdminDashboard.tsx">View</button>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </SortableContainer>
            </SortableContainer>}

          {/* Testimonials */}
          {activeSection === 'testimonials' && <SortableContainer dndKitId="e239db0a-e5ff-43f2-9e6d-d24cb3859b88" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="99" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="7a42efee-ed24-468b-9a00-3eaefc3b7181" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="100" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="101" data-magicpath-path="BranchAdminDashboard.tsx">Testimonials</h1>
                <SortableContainer dndKitId="4ee47c10-be97-4693-ab40-6ab8057d09d7" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="102" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="103" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Testimonial
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="9b7922fa-00b3-4e1a-8020-7e40a967c796" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="104" data-magicpath-path="BranchAdminDashboard.tsx">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="105" data-magicpath-path="BranchAdminDashboard.tsx">
                    <div className="flex items-center justify-between mb-4" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="106" data-magicpath-path="BranchAdminDashboard.tsx">
                      <div className="flex items-center gap-1 text-amber-400" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="107" data-magicpath-path="BranchAdminDashboard.tsx">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < testimonial.rating ? 'currentColor' : 'none'} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="108" data-magicpath-path="BranchAdminDashboard.tsx" />)}
                      </div>
                      <div className="flex gap-2" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="109" data-magicpath-path="BranchAdminDashboard.tsx">
                        <button className="p-1 text-zinc-400 hover:text-white" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="110" data-magicpath-path="BranchAdminDashboard.tsx">
                          <Edit size={16} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="111" data-magicpath-path="BranchAdminDashboard.tsx" />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-300" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="112" data-magicpath-path="BranchAdminDashboard.tsx">
                          <Trash2 size={16} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="113" data-magicpath-path="BranchAdminDashboard.tsx" />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-300 italic mb-4" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="comment:unknown" data-magicpath-id="114" data-magicpath-path="BranchAdminDashboard.tsx">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-between" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="115" data-magicpath-path="BranchAdminDashboard.tsx">
                      <span className="text-white font-medium" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="userName:unknown" data-magicpath-id="116" data-magicpath-path="BranchAdminDashboard.tsx">{testimonial.userName}</span>
                      {testimonial.verified && <span className="text-xs text-green-400 flex items-center gap-1" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="117" data-magicpath-path="BranchAdminDashboard.tsx">
                          <CheckCircle size={12} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="118" data-magicpath-path="BranchAdminDashboard.tsx" /> Verified
                        </span>}
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>}

          {/* Gallery */}
          {activeSection === 'gallery' && <SortableContainer dndKitId="503a4b23-6123-4d68-8a83-952bf7ff33f2" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="119" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="906f6d5d-8df5-4b4d-80a4-d05cb82d0e03" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="120" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="121" data-magicpath-path="BranchAdminDashboard.tsx">Gallery</h1>
                <SortableContainer dndKitId="cae8e319-3f4f-48b9-af63-dedbb82d745b" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="122" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="123" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Upload Image
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="03972ca1-f7c6-4e27-89c1-92e13bbe9b1f" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-magicpath-id="124" data-magicpath-path="BranchAdminDashboard.tsx">
                {gallery.map(item => <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="125" data-magicpath-path="BranchAdminDashboard.tsx">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="imageUrl:unknown" data-magicpath-id="126" data-magicpath-path="BranchAdminDashboard.tsx" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="127" data-magicpath-path="BranchAdminDashboard.tsx">
                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="128" data-magicpath-path="BranchAdminDashboard.tsx">
                        <Edit size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="129" data-magicpath-path="BranchAdminDashboard.tsx" />
                      </button>
                      <button className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="130" data-magicpath-path="BranchAdminDashboard.tsx">
                        <Trash2 size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="131" data-magicpath-path="BranchAdminDashboard.tsx" />
                      </button>
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>}

          {/* Settings */}
          {activeSection === 'settings' && <SortableContainer dndKitId="55a40685-8f72-4523-87d9-7b21eb23e9e1" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="132" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="133" data-magicpath-path="BranchAdminDashboard.tsx">Branch Settings</h1>

              <SortableContainer dndKitId="536fab19-1697-4a2d-9219-9b0419e78afd" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="134" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="135" data-magicpath-path="BranchAdminDashboard.tsx">Branch Information</h3>
                <SortableContainer dndKitId="d8fc5fcb-decc-443c-a40f-3b7363782cd0" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="136" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="e4d6aa1d-3277-4ba8-b76d-bf36468096fa" containerType="regular" prevTag="div" data-magicpath-id="137" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="138" data-magicpath-path="BranchAdminDashboard.tsx">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="139" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="757d5c6d-38a7-4016-9da4-72e35db3986c" containerType="regular" prevTag="div" data-magicpath-id="140" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="141" data-magicpath-path="BranchAdminDashboard.tsx">
                      Contact Email
                    </label>
                    <input type="email" defaultValue={`${branchId}@phoeniximperial.com`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="142" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium" data-magicpath-id="143" data-magicpath-path="BranchAdminDashboard.tsx">
                    Save Changes
                  </button>
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="5b335271-051c-4581-827c-6bd6397f4095" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-magicpath-id="144" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="95aaee41-c52c-4b0a-a7f0-388923295ecf" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="145" data-magicpath-path="BranchAdminDashboard.tsx">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} data-magicpath-id="146" data-magicpath-path="BranchAdminDashboard.tsx" />
                  <SortableContainer dndKitId="c25b7c28-846e-44a0-af7a-f9bc6cbb91af" containerType="regular" prevTag="div" data-magicpath-id="147" data-magicpath-path="BranchAdminDashboard.tsx">
                    <h4 className="text-amber-400 font-medium mb-1" data-magicpath-id="148" data-magicpath-path="BranchAdminDashboard.tsx">Limited Access</h4>
                    <p className="text-sm text-zinc-400" data-magicpath-id="149" data-magicpath-path="BranchAdminDashboard.tsx">
                      As a branch admin, you can only manage content and bookings for the {branchName} branch.
                      Global settings and permissions are controlled by the Super Admin.
                    </p>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>}
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};