import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Hotel, Calendar, Users, MessageSquare, Image, BarChart3, Settings, Star, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { ROOMS_BY_BRANCH, MOCK_BOOKINGS, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';
import { BranchId } from './types';
interface BranchAdminDashboardProps {
  onClose: () => void;
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
    icon: Home
  }, {
    id: 'rooms',
    label: 'Rooms',
    icon: Hotel
  }, {
    id: 'bookings',
    label: 'Bookings',
    icon: Calendar
  }, {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquare
  }, {
    id: 'gallery',
    label: 'Gallery',
    icon: Image
  }, {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }] as any[];
  return <div className="flex h-full bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-serif text-amber-500">Phoenix Imperial</h2>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{branchName} Branch Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>)}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => {
          logout();
          onClose();
        }} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Overview */}
          {activeSection === 'overview' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div>
                <h1 className="text-3xl font-serif text-white mb-2">Dashboard Overview</h1>
                <p className="text-zinc-400">Welcome back, {user?.name}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Calendar className="text-blue-400" size={24} />
                    </div>
                    <TrendingUp className="text-green-400" size={20} />
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{stats.totalBookings}</div>
                  <div className="text-sm text-zinc-400">Total Bookings</div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="text-green-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{stats.confirmedBookings}</div>
                  <div className="text-sm text-zinc-400">Confirmed</div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <DollarSign className="text-amber-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-zinc-400">Total Revenue</div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <BarChart3 className="text-purple-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">{stats.occupancyRate}%</div>
                  <div className="text-sm text-zinc-400">Occupancy Rate</div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                <h3 className="text-xl font-serif text-white mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId);
                return <div key={booking.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400' : booking.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                          <div>
                            <p className="text-white font-medium">{room?.name}</p>
                            <p className="text-xs text-zinc-500">
                              {booking.checkIn} - {booking.checkOut}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-serif">₦{booking.totalPrice.toLocaleString()}</p>
                          <p className="text-xs text-zinc-500 capitalize">{booking.status}</p>
                        </div>
                      </div>;
              })}
                </div>
              </div>
            </motion.div>}

          {/* Rooms Management */}
          {activeSection === 'rooms' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Rooms Management</h1>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Add Room
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {rooms.map(room => <div key={room.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                    <img src={room.images[0]} alt={room.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-serif text-white mb-1">{room.name}</h3>
                          <p className="text-sm text-zinc-400">{room.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {room.available ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm mb-4">{room.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-serif text-amber-500">₦{room.price.toLocaleString()}</span>
                        <div className="flex gap-2">
                          <button className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </motion.div>}

          {/* Bookings Management */}
          {activeSection === 'bookings' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <h1 className="text-3xl font-serif text-white">Bookings Management</h1>

              <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Room
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {bookings.map(booking => {
                  const room = rooms.find(r => r.id === booking.roomId);
                  return <tr key={booking.id} className="hover:bg-zinc-750">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                            #{booking.id.slice(-8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {room?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                            {booking.checkIn} to {booking.checkOut}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-400 font-serif">
                            ₦{booking.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-amber-500 hover:text-amber-400">View</button>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>
            </motion.div>}

          {/* Testimonials */}
          {activeSection === 'testimonials' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Testimonials</h1>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Add Testimonial
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < testimonial.rating ? 'currentColor' : 'none'} />)}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1 text-zinc-400 hover:text-white">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-300 italic mb-4">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{testimonial.userName}</span>
                      {testimonial.verified && <span className="text-xs text-green-400 flex items-center gap-1">
                          <CheckCircle size={12} /> Verified
                        </span>}
                    </div>
                  </div>)}
              </div>
            </motion.div>}

          {/* Gallery */}
          {activeSection === 'gallery' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif text-white">Gallery</h1>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
                  <Plus size={18} />
                  Upload Image
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map(item => <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>)}
              </div>
            </motion.div>}

          {/* Settings */}
          {activeSection === 'settings' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <h1 className="text-3xl font-serif text-white">Branch Settings</h1>

              <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
                <h3 className="text-xl font-serif text-white mb-4">Branch Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Branch Name
                    </label>
                    <input type="text" defaultValue={`Phoenix Imperial ${branchName}`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Contact Email
                    </label>
                    <input type="email" defaultValue={`${branchId}@phoeniximperial.com`} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500" />
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-amber-400 font-medium mb-1">Limited Access</h4>
                    <p className="text-sm text-zinc-400">
                      As a branch admin, you can only manage content and bookings for the {branchName} branch.
                      Global settings and permissions are controlled by the Super Admin.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>}
        </div>
      </main>
    </div>;
};