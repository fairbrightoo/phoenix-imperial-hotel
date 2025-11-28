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
    mpid: "a065323a-ccea-4fa8-9ef8-69b6e3f41b7d"
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel,
    mpid: "3f9450d7-7f0e-41e8-b91f-86515705f0bc"
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar,
    mpid: "61f72dca-65dd-4287-9132-4b5c27f0110c"
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    mpid: "eb08411c-8725-430f-9c34-07b6cadb66f6"
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image,
    mpid: "e178ace6-3103-4077-a561-d9cd429756de"
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    mpid: "35bc32af-14d6-4d31-8eaa-a5e255699118"
  }] as any[];
  return <SortableContainer dndKitId="4de9e7e2-155f-49c2-b787-69a1ef8ee271" containerType="regular" prevTag="div" className="flex h-full bg-zinc-900 text-white" data-magicpath-id="0" data-magicpath-path="BranchAdminDashboard.tsx">
      {/* Sidebar */}
      <SortableContainer dndKitId="f4e1f3ef-9fdd-4507-804e-6cd9f3f7a21b" containerType="regular" prevTag="aside" className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col" data-magicpath-id="1" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="144e9771-d3a6-48ac-a11f-3cd98c5ef044" containerType="regular" prevTag="div" className="p-6 border-b border-zinc-800" data-magicpath-id="2" data-magicpath-path="BranchAdminDashboard.tsx">
          <h2 className="text-xl font-serif text-amber-500" data-magicpath-id="3" data-magicpath-path="BranchAdminDashboard.tsx">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1" data-magicpath-id="4" data-magicpath-path="BranchAdminDashboard.tsx">{branchName} Branch Admin</p>
        </SortableContainer>

        <SortableContainer dndKitId="a29e60df-0287-4c25-b1b9-dfecd651298b" containerType="collection" prevTag="nav" className="flex-1 p-4 space-y-1" data-magicpath-id="5" data-magicpath-path="BranchAdminDashboard.tsx">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchAdminDashboard.tsx">
              <item.icon size={18} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchAdminDashboard.tsx" />
              <span className="text-sm font-medium" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:string" data-magicpath-id="8" data-magicpath-path="BranchAdminDashboard.tsx">{item.label}</span>
            </button>)}
        </SortableContainer>

        <SortableContainer dndKitId="4f53e3f9-efae-4d4c-84c0-245c96740c1e" containerType="regular" prevTag="div" className="p-4 border-t border-zinc-800" data-magicpath-id="9" data-magicpath-path="BranchAdminDashboard.tsx">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="10" data-magicpath-path="BranchAdminDashboard.tsx">
            Logout
          </button>
        </SortableContainer>
      </SortableContainer>

      {/* Main Content */}
      <SortableContainer dndKitId="d91accf0-dd6e-4e3b-bc74-f420549c2ae0" containerType="regular" prevTag="main" className="flex-1 overflow-y-auto" data-magicpath-id="11" data-magicpath-path="BranchAdminDashboard.tsx">
        <SortableContainer dndKitId="8eefb47e-b43d-456f-85f6-d372339883e8" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="12" data-magicpath-path="BranchAdminDashboard.tsx">
          {/* Overview */}
          {activeSection === 'overview' && <SortableContainer dndKitId="5efd7421-a2d8-4ee3-b47e-aea91701f13f" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="13" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="63a2cb37-483e-41a3-8886-9a35e39f4674" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white mb-2" data-magicpath-id="15" data-magicpath-path="BranchAdminDashboard.tsx">Dashboard Overview</h1>
                <p className="text-zinc-400" data-magicpath-id="16" data-magicpath-path="BranchAdminDashboard.tsx">Welcome back, {user?.name}</p>
              </SortableContainer>

              {/* Stats Grid */}
              <SortableContainer dndKitId="58c76a39-21e4-4121-9c64-bd6c7d958f04" containerType="regular" prevTag="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-magicpath-id="17" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="cd084497-3ac4-4ffe-9059-9a31734e74bd" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="18" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="2f95fd42-f3d3-4d98-80e0-dc5573bd52c1" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="19" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="96a73f0f-e4ef-4ffa-9d7f-8010dc7a4311" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center" data-magicpath-id="20" data-magicpath-path="BranchAdminDashboard.tsx">
                      <Calendar className="text-blue-400" size={24} data-magicpath-id="21" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                    <TrendingUp className="text-green-400" size={20} data-magicpath-id="22" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="23" data-magicpath-path="BranchAdminDashboard.tsx">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="24" data-magicpath-path="BranchAdminDashboard.tsx">Total Bookings</div>
                </SortableContainer>

                <SortableContainer dndKitId="53c59cf4-b1fd-4e70-8910-4f6c1b8c1e9b" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="25" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="cd1c241b-86fe-4225-907d-5ab1cfe3bbc7" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="26" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="8aea5bb0-9b01-4655-922a-352bdf7f1f92" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center" data-magicpath-id="27" data-magicpath-path="BranchAdminDashboard.tsx">
                      <CheckCircle className="text-green-400" size={24} data-magicpath-id="28" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="29" data-magicpath-path="BranchAdminDashboard.tsx">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="30" data-magicpath-path="BranchAdminDashboard.tsx">Confirmed</div>
                </SortableContainer>

                <SortableContainer dndKitId="176739ce-1f07-42fa-9a2c-ad22989226a8" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="31" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="813bb3b2-0cc2-4932-be63-7a0b3749297e" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="32" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="917dfecb-10ea-4157-a99f-4f2b1af91eef" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="BranchAdminDashboard.tsx">
                      <DollarSign className="text-amber-400" size={24} data-magicpath-id="34" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="35" data-magicpath-path="BranchAdminDashboard.tsx">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="36" data-magicpath-path="BranchAdminDashboard.tsx">Total Revenue</div>
                </SortableContainer>

                <SortableContainer dndKitId="53d15e71-3213-4710-bdf4-1bd74daeefd3" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg border border-zinc-700" data-magicpath-id="37" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="5ffd2c36-8c71-4df4-a6c7-84d82cb14831" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="38" data-magicpath-path="BranchAdminDashboard.tsx">
                    <SortableContainer dndKitId="c4eb5841-0684-4ee9-a49e-e61530c16047" containerType="regular" prevTag="div" className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center" data-magicpath-id="39" data-magicpath-path="BranchAdminDashboard.tsx">
                      <BarChart3 className="text-purple-400" size={24} data-magicpath-id="40" data-magicpath-path="BranchAdminDashboard.tsx" />
                    </SortableContainer>
                  </SortableContainer>
                  <div className="text-3xl font-serif text-white mb-1" data-magicpath-id="41" data-magicpath-path="BranchAdminDashboard.tsx">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400" data-magicpath-id="42" data-magicpath-path="BranchAdminDashboard.tsx">Occupancy Rate</div>
                </SortableContainer>
              </SortableContainer>

              {/* Recent Bookings */}
              <SortableContainer dndKitId="c2112904-d19e-484f-b7f7-7666b0c06957" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="43" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="44" data-magicpath-path="BranchAdminDashboard.tsx">Recent Bookings</h3>
                <SortableContainer dndKitId="6b0082f1-05a6-4c22-824b-a6e17ae2a801" containerType="collection" prevTag="div" className="space-y-3" data-magicpath-id="45" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'rooms' && <SortableContainer dndKitId="5a07b239-4944-403e-ac99-0dfd0848a677" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="55" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="fc9d7d92-3437-4733-96cb-071389f75c07" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="56" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="57" data-magicpath-path="BranchAdminDashboard.tsx">Rooms Management</h1>
                <SortableContainer dndKitId="c3adeea5-befa-4fe8-93cc-0e41eccc0dd4" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="58" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="59" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Room
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="35780092-5eb6-464b-b3c7-93521820560d" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="60" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'bookings' && <SortableContainer dndKitId="0c95622c-202e-4c1d-ac43-e72fe5a062e9" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="77" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="78" data-magicpath-path="BranchAdminDashboard.tsx">Bookings Management</h1>

              <SortableContainer dndKitId="b22d3166-6403-41b6-993d-a07a0a65cd6a" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-id="79" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'testimonials' && <SortableContainer dndKitId="3a823df0-7cac-4006-a81c-b658bee9ad1c" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="99" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="1533e295-9cfa-42f7-8c42-eb0b8b6f74db" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="100" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="101" data-magicpath-path="BranchAdminDashboard.tsx">Testimonials</h1>
                <SortableContainer dndKitId="5bf2a585-d496-499c-bc78-b24742c2bf3f" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="102" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="103" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Add Testimonial
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="d4040835-3478-4892-8281-3dd3675da2d4" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="104" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'gallery' && <SortableContainer dndKitId="74f4fac0-f676-4a5f-9894-21fd540d2477" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="119" data-magicpath-path="BranchAdminDashboard.tsx">
              <SortableContainer dndKitId="a9c93aff-4bd9-4d2b-b447-32e1999654d3" containerType="regular" prevTag="div" className="flex items-center justify-between" data-magicpath-id="120" data-magicpath-path="BranchAdminDashboard.tsx">
                <h1 className="text-3xl font-serif text-white" data-magicpath-id="121" data-magicpath-path="BranchAdminDashboard.tsx">Gallery</h1>
                <SortableContainer dndKitId="bb54c3f3-de19-4d0d-a28c-c164c5d72e16" containerType="regular" prevTag="button" className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors" data-magicpath-id="122" data-magicpath-path="BranchAdminDashboard.tsx">
                  <Plus size={18} data-magicpath-id="123" data-magicpath-path="BranchAdminDashboard.tsx" />
                  Upload Image
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="ce253786-f9b2-4c4e-98c8-854e0567556b" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-magicpath-id="124" data-magicpath-path="BranchAdminDashboard.tsx">
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
          {activeSection === 'settings' && <SortableContainer dndKitId="3fa85402-7151-452f-87a1-3bf7b15e5709" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6" data-magicpath-id="132" data-magicpath-path="BranchAdminDashboard.tsx">
              <h1 className="text-3xl font-serif text-white" data-magicpath-id="133" data-magicpath-path="BranchAdminDashboard.tsx">Branch Settings</h1>

              <SortableContainer dndKitId="d5ef5bfb-6128-4916-b80f-1336ba55127f" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="134" data-magicpath-path="BranchAdminDashboard.tsx">
                <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="135" data-magicpath-path="BranchAdminDashboard.tsx">Branch Information</h3>
                <SortableContainer dndKitId="6b807562-ed1d-41bb-82de-313309c9a868" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="136" data-magicpath-path="BranchAdminDashboard.tsx">
                  <SortableContainer dndKitId="8ecb07e6-8d77-4e4e-ad8d-c64ddec0d544" containerType="regular" prevTag="div" data-magicpath-id="137" data-magicpath-path="BranchAdminDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2" data-magicpath-id="138" data-magicpath-path="BranchAdminDashboard.tsx">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="139" data-magicpath-path="BranchAdminDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="f8d1fc4b-1e57-4f26-90ee-e482fae8a21b" containerType="regular" prevTag="div" data-magicpath-id="140" data-magicpath-path="BranchAdminDashboard.tsx">
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

              <SortableContainer dndKitId="ff51f0bd-5cab-4ad2-8457-33a73f620354" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-magicpath-id="144" data-magicpath-path="BranchAdminDashboard.tsx">
                <SortableContainer dndKitId="60b4f297-657b-47a3-84ed-146b58468de8" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="145" data-magicpath-path="BranchAdminDashboard.tsx">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} data-magicpath-id="146" data-magicpath-path="BranchAdminDashboard.tsx" />
                  <SortableContainer dndKitId="2f22d057-9b82-48e8-b1de-a035ab6d2d68" containerType="regular" prevTag="div" data-magicpath-id="147" data-magicpath-path="BranchAdminDashboard.tsx">
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