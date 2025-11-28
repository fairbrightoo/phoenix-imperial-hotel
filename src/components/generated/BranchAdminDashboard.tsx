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
    mpid: "ccfbe8ff-0492-4f32-968f-7dca56e643c3"
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel,
    mpid: "08c8c397-88c7-4715-9447-ef3d425c6729"
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    mpid: "25dc3edf-4aa2-48e9-a075-5b8423c297c1"
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    mpid: "ff00c2dc-44bc-4ab4-b298-73c5f429e6ae"
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image,
    mpid: "3e54ce71-09ab-4648-9ffd-66adf9795144"
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    mpid: "f88016e6-8588-45a9-bbae-dea7fa9f1ae4"
  }] as any[];
  return <SortableContainer dndKitId="b6c54d1c-1341-4ed8-8028-558c3b59f166" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="BranchAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="1664cb60-9a31-4cb3-8b1d-ce993b645373" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="2b800bfa-7776-45d9-afbe-3e076b676cd0" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="BranchAdminDashboard.tsx">
          <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="3" data-magicpath-path="BranchAdminDashboard.tsx">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1" data-magicpath-id="4" data-magicpath-path="BranchAdminDashboard.tsx">{branchName} Branch Admin</p>
        </SortableContainer>

        <SortableContainer dndKitId="5363b695-0d12-4f1a-a89e-172e6e03f978" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="5" data-magicpath-path="BranchAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="8" data-magicpath-path="BranchAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="cdcc8f73-4f9f-4a11-a17d-ef717c7ab330" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="9" data-magicpath-path="BranchAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="10" data-magicpath-path="BranchAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="73349d59-a039-4463-a58d-c8ff37d325cb" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="11" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="a5eaa523-906c-4cf0-82bf-ce58e16344a0" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="12" data-magicpath-path="BranchAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="fa61a249-47d8-493c-9907-c1ad1aa48a08" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="13" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="511dabbc-3b58-4aa5-a9dc-0925af1d3eb1" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="BranchAdminDashboard.tsx">Dashboard Overview</h1>
                <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="BranchAdminDashboard.tsx">Welcome back, {user?.name}</p>
              </SortableContainer>

              {/* Stats Grid */}
              <SortableContainer dndKitId="56ce9199-3d82-41cd-beda-27f6a3e0a80b" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="17" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="89fb67a4-055c-46d9-bd99-0e80cfc189e6" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="18" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="42e4fac0-d85c-49fa-a18e-0de305d1c149" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="19" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="8e0df96a-298f-4a5c-b1ba-87e29ca0d39c" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="20" data-magicpath-path="BranchAdminDashboard.tsx">
                      <Calendar className="text-blue-400" size={24} data-magicpath-id="21" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                    <TrendingUp className="text-green-400" size={20} data-magicpath-id="22" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="23" data-magicpath-path="BranchAdminDashboard.tsx">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="24" data-magicpath-path="BranchAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="7fa6f3aa-1521-47b2-99a0-29fe2df4de59" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="25" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="9fc12005-c9e5-4df6-8172-841ad299d5d2" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="26" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="6ab5ef0a-b8be-4bfb-a1af-9719f1ddc7a0" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center" data-magicpath-id="27" data-magicpath-path="BranchAdminDashboard.tsx">
                      <CheckCircle className="text-green-400" size={24} data-magicpath-id="28" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="29" data-magicpath-path="BranchAdminDashboard.tsx">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="30" data-magicpath-path="BranchAdminDashboard.tsx">Confirmed</div>
                </SortableContainer>

                <SortableContainer dndKitId="d1c400b4-4352-4913-8ce5-f981fabcfc13" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="31" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="595f89c2-e067-4340-bded-d4f367c79283" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="32" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="097f62fa-1fdf-4eca-a6da-15f65f52d62c" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="BranchAdminDashboard.tsx">
                      <DollarSign className="text-amber-400" size={24} data-magicpath-id="34" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="35" data-magicpath-path="BranchAdminDashboard.tsx">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="36" data-magicpath-path="BranchAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="0fe7156d-ff82-4d09-b849-4ac4c33d6b89" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="37" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="62090198-451e-4b9e-a210-a5b747b22388" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="38" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="6c1f767f-1a77-400c-8a18-b47aee83068d" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center" data-magicpath-id="39" data-magicpath-path="BranchAdminDashboard.tsx">
                      <BarChart3 className="text-purple-400" size={24} data-magicpath-id="40" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="41" data-magicpath-path="BranchAdminDashboard.tsx">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="42" data-magicpath-path="BranchAdminDashboard.tsx">Occupancy Rate</div>
                </SortableContainer>
              </SortableContainer>

              {/* Recent Bookings */}
              <SortableContainer dndKitId="86a37ee7-21ca-4446-a037-314df4929fc8" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="43" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="44" data-magicpath-path="BranchAdminDashboard.tsx">Recent Bookings</h3>
                <SortableContainer dndKitId="f6fac97a-d5fd-4c9b-a204-7656942a7ca9" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="45" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'rooms' && <SortableContainer dndKitId="2f2fb2bf-b181-4ad4-a2fc-120be79e52c1" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="55" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="72abf9a4-e4b7-45ba-8434-75ae17195737" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="56" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="57" data-magicpath-path="BranchAdminDashboard.tsx">Rooms Management</h1>
                <SortableContainer dndKitId="b89163cd-d0c7-4f80-8d32-f119904201db" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="58" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="59" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Room
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="0cb3775b-1d16-4f04-908f-b3c64e60dcbd" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="60" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'bookings' && <SortableContainer dndKitId="2a10ac96-5615-4f3a-9c32-25f2b48b1871" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="77" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="78" data-magicpath-path="BranchAdminDashboard.tsx">Bookings Management</h1>

              <SortableContainer dndKitId="3e72be6f-9ba2-4dc1-81bb-fd6d4ee0cd47" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="79" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'testimonials' && <SortableContainer dndKitId="48f73382-4a10-4d41-a31f-ce11b855c0eb" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="99" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="c726e382-4a5b-49ea-922b-ab422e5e8bef" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="100" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="101" data-magicpath-path="BranchAdminDashboard.tsx">Testimonials</h1>
                <SortableContainer dndKitId="8d83908f-dffc-4377-a727-9f1e88b0720e" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="102" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="103" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Testimonial
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="2e3efe92-65fe-4aaf-8cd9-42aff77f4ad5" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="104" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'gallery' && <SortableContainer dndKitId="3985c051-f74e-4d72-ac12-280b0ad11772" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="119" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="3942e47b-f95e-47de-a455-7cb0f6af99b8" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="120" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="121" data-magicpath-path="BranchAdminDashboard.tsx">Gallery</h1>
                <SortableContainer dndKitId="2ca47e60-622c-4850-bbc1-5f518d586f75" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="122" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="123" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Upload Image
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="a219dfa7-cc73-44a5-84c2-348f4d705eb8" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-magicpath-id="124" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'settings' && <SortableContainer dndKitId="7bed3621-81e5-4763-96a4-109c74bed2cb" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="132" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="133" data-magicpath-path="BranchAdminDashboard.tsx">Branch Settings</h1>

              <SortableContainer dndKitId="c457bc0e-3c0c-484f-8748-89c22b54f054" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="134" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="135" data-magicpath-path="BranchAdminDashboard.tsx">Branch Information</h3>
                <SortableContainer dndKitId="56706d56-09a2-4138-98a9-df2beeafefa0" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="136" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="c7b0e2e3-cfa3-4a94-a65a-4d296fbdbb60" containerType="regular" prevTag="div" data-magicpath-id="137" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="138" data-magicpath-path="BranchAdminDashboard.tsx">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="139" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="a5403274-7891-4184-84a2-6f71198154f2" containerType="regular" prevTag="div" data-magicpath-id="140" data-magicpath-path="BranchAdminDashboard.tsx">
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

              <SortableContainer dndKitId="542638a4-acdc-4cb6-b0d7-50b94eff2c33" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-magicpath-id="144" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="ad775d5b-ef92-4238-b632-c27c9ad3f57d" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="145" data-magicpath-path="BranchAdminDashboard.tsx">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} data-magicpath-id="146" data-magicpath-path="BranchAdminDashboard.tsx" />
                  <SortableContainer dndKitId="10e31211-8cfa-4175-8f32-a567da2c6ba3" containerType="regular" prevTag="div" data-magicpath-id="147" data-magicpath-path="BranchAdminDashboard.tsx">
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