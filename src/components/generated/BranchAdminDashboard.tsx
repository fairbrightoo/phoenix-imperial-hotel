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
    mpid: "10a32739-cdd8-42f7-ba11-190baf673295"
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel,
    mpid: "0fc6c225-b8b8-4a3f-93cb-f78698cebd52"
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    mpid: "d2ce19b3-1125-495c-b274-25f3151459d4"
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    mpid: "6a0b32c3-a497-4e1b-8c36-f228c3615074"
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image,
    mpid: "84bce4ba-d1fe-469c-8722-dcbce9f6194e"
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    mpid: "861ea332-d979-452b-9d92-44ed4774749b"
  }] as any[];
  return <SortableContainer dndKitId="db6d1700-d3e3-4c1c-b98d-ce72e2d131b1" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="BranchAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="80914617-dd45-48eb-bce0-c89cb79cd5f4" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="64700330-51f9-43ec-93b6-712591fc91b2" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="BranchAdminDashboard.tsx">
          <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="3" data-magicpath-path="BranchAdminDashboard.tsx">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1" data-magicpath-id="4" data-magicpath-path="BranchAdminDashboard.tsx">{branchName} Branch Admin</p>
        </SortableContainer>

        <SortableContainer dndKitId="5747c09b-ac85-4865-bdee-13e92cc23b6c" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="5" data-magicpath-path="BranchAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="8" data-magicpath-path="BranchAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="3dfdf040-2c3e-468a-9517-93c6ed9a1d60" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="9" data-magicpath-path="BranchAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="10" data-magicpath-path="BranchAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="a9053fb3-813c-48e7-b6bf-964c49734a5a" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="11" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="9f785418-1509-4e73-8ba2-38a7e3618457" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="12" data-magicpath-path="BranchAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="a06ca15c-541e-4150-90d3-a6fc483525c0" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="13" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="980bcb3e-8ebc-464c-92ae-9763d3e8b01f" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="BranchAdminDashboard.tsx">Dashboard Overview</h1>
                <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="BranchAdminDashboard.tsx">Welcome back, {user?.name}</p>
              </SortableContainer>

              {/* Stats Grid */}
              <SortableContainer dndKitId="9c984fb3-8071-4be6-a476-816639fc1213" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="17" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="eefcc20d-4bb0-4a5e-9d43-1f1ce0cb1da7" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="18" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="9a35e828-0102-48fd-9c77-d90e11313c10" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="19" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="a7d85694-7c0d-4f10-ba7d-41ce80600ffd" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="20" data-magicpath-path="BranchAdminDashboard.tsx">
                      <Calendar className="text-blue-400" size={24} data-magicpath-id="21" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                    <TrendingUp className="text-green-400" size={20} data-magicpath-id="22" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="23" data-magicpath-path="BranchAdminDashboard.tsx">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="24" data-magicpath-path="BranchAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="56cbf4c3-5a42-4784-81bf-25126727e278" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="25" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="70238d32-863c-42ae-b824-a2265c67928b" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="26" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="4d60e0ca-61ed-471b-be18-dda86a238c5e" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center" data-magicpath-id="27" data-magicpath-path="BranchAdminDashboard.tsx">
                      <CheckCircle className="text-green-400" size={24} data-magicpath-id="28" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="29" data-magicpath-path="BranchAdminDashboard.tsx">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="30" data-magicpath-path="BranchAdminDashboard.tsx">Confirmed</div>
                </SortableContainer>

                <SortableContainer dndKitId="cebe15d3-bee1-41cd-8af9-6c8fd617b97f" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="31" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="0dea0b21-6919-4792-82d9-4f3823c1221f" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="32" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="3dd3cdca-6faa-4a63-bc92-a5e11bf5ff40" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="BranchAdminDashboard.tsx">
                      <DollarSign className="text-amber-400" size={24} data-magicpath-id="34" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="35" data-magicpath-path="BranchAdminDashboard.tsx">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="36" data-magicpath-path="BranchAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="634e7f54-b99e-4170-a2b2-6a3b353f64a9" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="37" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="40489cfd-c064-4aef-a410-b685f47897c7" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="38" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="7c067eac-5cde-4e73-b661-6e0da3f95089" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center" data-magicpath-id="39" data-magicpath-path="BranchAdminDashboard.tsx">
                      <BarChart3 className="text-purple-400" size={24} data-magicpath-id="40" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="41" data-magicpath-path="BranchAdminDashboard.tsx">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="42" data-magicpath-path="BranchAdminDashboard.tsx">Occupancy Rate</div>
                </SortableContainer>
              </SortableContainer>

              {/* Recent Bookings */}
              <SortableContainer dndKitId="24788d79-c93a-480d-a7b8-d4fe0aa5b412" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="43" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="44" data-magicpath-path="BranchAdminDashboard.tsx">Recent Bookings</h3>
                <SortableContainer dndKitId="9582fdd8-def0-4f21-a57f-eeeb3479af4d" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="45" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'rooms' && <SortableContainer dndKitId="7a53b6a3-1393-4551-a5cb-6b5edcacaebe" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="55" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="a147319e-b0d7-4dea-8138-82d5a7ab856d" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="56" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="57" data-magicpath-path="BranchAdminDashboard.tsx">Rooms Management</h1>
                <SortableContainer dndKitId="ffa8469d-85af-44b4-9ded-c09f8d80f3bd" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="58" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="59" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Room
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="7b58cc82-eeec-4576-9beb-4dc4666c6dd5" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="60" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'bookings' && <SortableContainer dndKitId="b6270900-9b41-4320-ae1d-e7adf7e8cb94" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="77" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="78" data-magicpath-path="BranchAdminDashboard.tsx">Bookings Management</h1>

              <SortableContainer dndKitId="0c380d5d-85b8-4e1a-bc3a-ddf0094278dd" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="79" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'testimonials' && <SortableContainer dndKitId="ca189404-a77e-457d-977f-38d48b9ed186" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="99" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="47ac4c52-5bb3-47b5-b242-a7e91a538b51" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="100" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="101" data-magicpath-path="BranchAdminDashboard.tsx">Testimonials</h1>
                <SortableContainer dndKitId="14f1dcbe-d2be-43b2-8501-9178a3dc09d1" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="102" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="103" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Testimonial
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="1100c087-8197-417e-9b0d-e27da8987088" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="104" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'gallery' && <SortableContainer dndKitId="61fbb35d-105c-4050-b635-e36da388d3b9" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="119" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="4ad3c2be-6350-414a-bb3b-8d3f9c401b8e" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="120" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="121" data-magicpath-path="BranchAdminDashboard.tsx">Gallery</h1>
                <SortableContainer dndKitId="138f7821-c30e-40bb-a588-05038284d4b9" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="122" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="123" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Upload Image
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="226eb184-11ad-4fc7-9333-fc0f410fb36d" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-magicpath-id="124" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'settings' && <SortableContainer dndKitId="4a969e16-9418-4eeb-ad32-f8bbe877fab7" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="132" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="133" data-magicpath-path="BranchAdminDashboard.tsx">Branch Settings</h1>

              <SortableContainer dndKitId="e25ea115-b1d2-4d89-9afc-d639c94ef74f" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="134" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="135" data-magicpath-path="BranchAdminDashboard.tsx">Branch Information</h3>
                <SortableContainer dndKitId="b742dd53-7583-4b80-afe5-076190391a67" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="136" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="262393ab-cb84-4ae4-94d9-d78946822e84" containerType="regular" prevTag="div" data-magicpath-id="137" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="138" data-magicpath-path="BranchAdminDashboard.tsx">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="139" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="fce070ea-9fd6-479b-a140-7ca6ad1bad99" containerType="regular" prevTag="div" data-magicpath-id="140" data-magicpath-path="BranchAdminDashboard.tsx">
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

              <SortableContainer dndKitId="b81a64e0-677b-45b0-a0ce-fc371404200c" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-magicpath-id="144" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="4e1b3c15-647e-4b1d-b9ae-9d2603a6d4cc" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="145" data-magicpath-path="BranchAdminDashboard.tsx">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} data-magicpath-id="146" data-magicpath-path="BranchAdminDashboard.tsx" />
                  <SortableContainer dndKitId="b6efcc97-deae-4f91-8f7f-0ce1c056eff4" containerType="regular" prevTag="div" data-magicpath-id="147" data-magicpath-path="BranchAdminDashboard.tsx">
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