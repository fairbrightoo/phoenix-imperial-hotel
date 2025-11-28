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
    mpid: "a5d0d48c-636f-4f4f-8c62-164fbfd83baf"
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel,
    mpid: "6b1e9083-2292-475b-9ce8-409e754dd1fb"
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    mpid: "75405aef-98f6-42a7-aa4b-f6b7d7c0f837"
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    mpid: "50f48780-8a76-42bd-835b-7f4d9f3ae4ad"
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image,
    mpid: "fe1783c9-d620-4d49-9c7d-6532b378756f"
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    mpid: "47ae64f5-38bb-4075-927e-73d226a50f50"
  }] as any[];
  return <SortableContainer dndKitId="0bf73448-2112-4766-8283-e097bb0a3467" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="BranchAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="b305e3f5-1b95-44d8-a14b-cbc8a3b014fd" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="5bd65e28-453f-42d9-bb3b-f367e046b8e4" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="BranchAdminDashboard.tsx">
          <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="3" data-magicpath-path="BranchAdminDashboard.tsx">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1" data-magicpath-id="4" data-magicpath-path="BranchAdminDashboard.tsx">{branchName} Branch Admin</p>
        </SortableContainer>

        <SortableContainer dndKitId="e9b809f8-70c4-4e46-a2f8-db5e607a40de" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="5" data-magicpath-path="BranchAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="8" data-magicpath-path="BranchAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="a568aa6b-f76b-4475-9f9f-d600276f799d" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="9" data-magicpath-path="BranchAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="10" data-magicpath-path="BranchAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="5e18908e-473d-4b37-8fbe-fca7e9a061c3" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="11" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="6f53a999-ca4d-4b59-9719-2917663b1e40" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="12" data-magicpath-path="BranchAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="01d9e121-9a3f-4a32-85bf-9e0043c7abf6" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="13" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="1a5babc6-d86b-47c6-96e6-33c9479b40d5" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="BranchAdminDashboard.tsx">Dashboard Overview</h1>
                <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="BranchAdminDashboard.tsx">Welcome back, {user?.name}</p>
              </SortableContainer>

              {/* Stats Grid */}
              <SortableContainer dndKitId="eee7728d-32fc-4be3-9351-13bcec21fa72" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="17" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="3c80dff3-a258-4537-a781-35597d36b844" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="18" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="ed0fe3c3-dc3c-4fa5-b6bd-08513954a294" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="19" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="bd331c28-e683-4359-bab4-13954ada6fac" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="20" data-magicpath-path="BranchAdminDashboard.tsx">
                      <Calendar className="text-blue-400" size={24} data-magicpath-id="21" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                    <TrendingUp className="text-green-400" size={20} data-magicpath-id="22" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="23" data-magicpath-path="BranchAdminDashboard.tsx">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="24" data-magicpath-path="BranchAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="4b59900b-d158-4b4d-a67e-b3260b56052a" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="25" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="da35477c-faed-4d7a-aa4e-55ec1de4e4a3" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="26" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="b6aac066-bf42-4ace-93a5-f80d680e92aa" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center" data-magicpath-id="27" data-magicpath-path="BranchAdminDashboard.tsx">
                      <CheckCircle className="text-green-400" size={24} data-magicpath-id="28" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="29" data-magicpath-path="BranchAdminDashboard.tsx">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="30" data-magicpath-path="BranchAdminDashboard.tsx">Confirmed</div>
                </SortableContainer>

                <SortableContainer dndKitId="4be16ade-3e4f-4189-b144-afebcc3258b8" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="31" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="3566e28e-be34-4310-a3c0-a704e1a499d8" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="32" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="81303f50-7087-428c-bd04-a402b9681c0b" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="BranchAdminDashboard.tsx">
                      <DollarSign className="text-amber-400" size={24} data-magicpath-id="34" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="35" data-magicpath-path="BranchAdminDashboard.tsx">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="36" data-magicpath-path="BranchAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="d788ead2-1b6e-45f3-875d-74173c21df58" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="37" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="61c8b057-bf07-4985-a7bc-8973f0775c15" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="38" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="d11b19bb-b417-4f06-aa20-70f8f84f0c57" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center" data-magicpath-id="39" data-magicpath-path="BranchAdminDashboard.tsx">
                      <BarChart3 className="text-purple-400" size={24} data-magicpath-id="40" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="41" data-magicpath-path="BranchAdminDashboard.tsx">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="42" data-magicpath-path="BranchAdminDashboard.tsx">Occupancy Rate</div>
                </SortableContainer>
              </SortableContainer>

              {/* Recent Bookings */}
              <SortableContainer dndKitId="50d3bff0-c507-4c7d-a6f3-908259d7369a" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="43" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="44" data-magicpath-path="BranchAdminDashboard.tsx">Recent Bookings</h3>
                <SortableContainer dndKitId="ebbc8aef-3d94-4e42-bebe-8fa8fc3f0abc" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="45" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'rooms' && <SortableContainer dndKitId="e9d3d428-4061-45a3-a7b7-a07724a284a5" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="55" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="2e4e5b73-8e50-482d-a095-52cb799ba2f1" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="56" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="57" data-magicpath-path="BranchAdminDashboard.tsx">Rooms Management</h1>
                <SortableContainer dndKitId="7c7956e3-70d2-470f-b7d4-a442adf61f35" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="58" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="59" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Room
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="18b4d862-1853-4456-9ad0-ad0ce256eab2" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="60" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'bookings' && <SortableContainer dndKitId="d825287f-cc39-4ee9-9a35-fc98e5bff442" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="77" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="78" data-magicpath-path="BranchAdminDashboard.tsx">Bookings Management</h1>

              <SortableContainer dndKitId="32dc6454-d65e-431b-a7e6-c0f35cba64ff" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="79" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'testimonials' && <SortableContainer dndKitId="d76a70ac-ec34-445f-aefd-ac4541ff7732" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="99" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="3cd80336-83a4-42b3-b755-add7ed4c7f27" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="100" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="101" data-magicpath-path="BranchAdminDashboard.tsx">Testimonials</h1>
                <SortableContainer dndKitId="3182bb63-c624-43fd-85ce-7a76b361b799" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="102" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="103" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Testimonial
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="cc4163dd-f692-4cae-9cbb-cc6dc89e95f2" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="104" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'gallery' && <SortableContainer dndKitId="4bdc1a65-0de5-4e43-afb3-7566abdbe942" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="119" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="1f43e7fc-eacb-41f3-97d2-424911912e2b" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="120" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="121" data-magicpath-path="BranchAdminDashboard.tsx">Gallery</h1>
                <SortableContainer dndKitId="451e8e2e-baa5-4c48-bca2-68a491f2002a" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="122" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="123" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Upload Image
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="6187f525-92c3-4686-9e20-e6483caf8dfa" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-magicpath-id="124" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'settings' && <SortableContainer dndKitId="84ff6ada-89d0-4ba1-8856-a70f097d263f" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="132" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="133" data-magicpath-path="BranchAdminDashboard.tsx">Branch Settings</h1>

              <SortableContainer dndKitId="b1b72115-0849-400f-8cc0-37afa3e5de5d" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="134" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="135" data-magicpath-path="BranchAdminDashboard.tsx">Branch Information</h3>
                <SortableContainer dndKitId="ba0feaf3-c654-4836-ae56-8bf78cf05dee" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="136" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="2e821110-b3c8-4f87-8f67-d9e49c81b8f1" containerType="regular" prevTag="div" data-magicpath-id="137" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="138" data-magicpath-path="BranchAdminDashboard.tsx">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="139" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="68ae7294-59ee-427a-b07b-652bc59316b1" containerType="regular" prevTag="div" data-magicpath-id="140" data-magicpath-path="BranchAdminDashboard.tsx">
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

              <SortableContainer dndKitId="efe2c738-7b66-43b8-8a08-b4d64a8fed7e" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-magicpath-id="144" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="187406b3-7cf8-4dc7-8043-0d21f080b3f2" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="145" data-magicpath-path="BranchAdminDashboard.tsx">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} data-magicpath-id="146" data-magicpath-path="BranchAdminDashboard.tsx" />
                  <SortableContainer dndKitId="d22dad0d-a513-439f-8be1-c99586a003c4" containerType="regular" prevTag="div" data-magicpath-id="147" data-magicpath-path="BranchAdminDashboard.tsx">
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