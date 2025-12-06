import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User as UserIcon, LogOut, Check, Star, Building2 } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from './AuthContext';
import { useTenant } from './TenantContext';
import { Booking } from './types';

import { useAlert } from '../ui/AlertContext';

import { BookingDetailsModal } from './BookingDetailsModal';

interface CustomerDashboardProps {
  onClose: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const {
    currentBranch,
    branches
  } = useTenant();
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [activeBookingTab, setActiveBookingTab] = useState<string>('all');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  // Fetch bookings for current user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const response = await api.get(`/bookings?userId=${user.id}`);
        const safeParseJSON = (data: any) => {
          if (typeof data === 'string') {
            try {
              const parsed = JSON.parse(data);
              if (typeof parsed === 'string') return JSON.parse(parsed);
              return parsed;
            } catch (e) {
              return [];
            }
          }
          return data;
        };

        const normalizedBookings = response.data.map((b: any) => ({
          ...b,
          totalPrice: Number(b.total_price || b.totalPrice || 0),
          checkIn: b.check_in || b.checkIn,
          checkOut: b.check_out || b.checkOut,
          branchId: b.branch_id || b.branchId,
          roomId: b.room_id || b.roomId,
          userId: b.user_id || b.userId,
          specialRequests: b.special_requests || b.specialRequests,
          createdAt: b.created_at || b.createdAt,
          Room: b.Room ? {
            ...b.Room,
            images: safeParseJSON(b.Room.images),
            amenities: safeParseJSON(b.Room.amenities)
          } : null
        }));
        setUserBookings(normalizedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await api.put(`/bookings/${bookingId}`, { status: 'cancelled' });
      setUserBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      if (viewingBooking && viewingBooking.id === bookingId) {
        setViewingBooking(prev => prev ? { ...prev, status: 'cancelled' } : null);
      }
      showAlert('Booking cancelled successfully', 'success');
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      showAlert('Failed to cancel booking', 'error');
    }
  };

  const getBookingDetails = (booking: any) => {
    // Use the Room data from the API response if available
    const room = booking.Room;
    const branch = branches.find(b => b.id === booking.branch_id);

    return {
      branch,
      room,
      branchId: booking.branch_id
    };
  };
  return <>
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950">
      <div>
        <h2 className="text-2xl font-serif text-white">My Account</h2>
        <p className="text-zinc-400 text-sm mt-1">{user?.email}</p>
      </div>
      <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white">
        <X size={20} />
      </button>
    </div>

    {/* Tabs */}
    <div className="flex border-b border-zinc-800 bg-zinc-950">
      <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`}>
        My Bookings
      </button>
      <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`}>
        Profile
      </button>
    </div>

    {/* Content */}
    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
      <AnimatePresence mode="wait">
        {/* Bookings Tab */}
        {activeTab === 'bookings' && <motion.div key="bookings" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-4">

          {/* Branch Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveBookingTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeBookingTab === 'all' ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
            >
              All Bookings
            </button>
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => setActiveBookingTab(branch.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeBookingTab === branch.id ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
              >
                {branch.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-zinc-400">Loading bookings...</div>
          ) : userBookings.length === 0 ? <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">No bookings yet</p>
            <p className="text-zinc-600 text-sm mt-2">
              Start exploring our branches and book your stay!
            </p>
          </div> : userBookings
            .filter(booking => {
              if (activeBookingTab === 'all') return true;
              const bId = (booking as any).branch_id || booking.branchId;
              return bId === activeBookingTab;
            })
            .length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">No bookings found for {activeBookingTab === 'abuja' ? 'Abuja' : 'Lagos'} branch</p>
            </div>
          ) : userBookings
            .filter(booking => {
              if (activeBookingTab === 'all') return true;
              const bId = (booking as any).branch_id || booking.branchId;
              return bId === activeBookingTab;
            })
            .map(booking => {
              const {
                branch,
                room
              } = getBookingDetails(booking);
              // Handle both camelCase (mock/frontend type) and snake_case (API)
              const checkIn = (booking as any).check_in || booking.checkIn;
              const checkOut = (booking as any).check_out || booking.checkOut;
              const totalPrice = (booking as any).total_price || booking.totalPrice;
              const status = booking.status;
              const guests = booking.guests || { adults: 1, children: 0 }; // Default if missing

              // Normalize booking object for modal
              const normalizedBooking = {
                ...booking,
                checkIn,
                checkOut,
                totalPrice,
                guests,
                userId: (booking as any).user_id || booking.userId,
                specialRequests: (booking as any).special_requests || booking.specialRequests
              };

              return <div key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-4">
                  {room && room.images?.length > 0 && <img src={room.images[0].startsWith('/') ? `http://${window.location.hostname}:5000${room.images[0]}` : room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" />}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-serif text-white mb-1">{room?.name || 'Unknown Room'}</h4>
                        <div className="flex items-center gap-2 text-sm text-amber-400">
                          <MapPin size={14} />
                          <span>{branch?.name || 'Unknown Branch'}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'confirmed' ? 'bg-green-500/20 text-green-400' : status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4">
                      <div>
                        <p className="text-zinc-500 mb-1">Check In</p>
                        <p className="text-white">{checkIn}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 mb-1">Check Out</p>
                        <p className="text-white">{checkOut}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 mb-1">Guests</p>
                        <p className="text-white">
                          {guests.adults} Adults, {guests.children} Children
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 mb-1">Date of Booking</p>
                        <p className="text-white">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="col-span-2 border-t border-zinc-700 pt-3 mt-1 flex justify-between items-center">
                        <p className="text-zinc-500">Total Amount</p>
                        <p className="text-amber-500 font-serif text-xl">
                          ₦{Number(totalPrice).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingBooking(normalizedBooking as Booking)}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded transition-colors"
                      >
                        View Details
                      </button>
                      {status === 'confirmed' && <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors"
                      >
                        Cancel Booking
                      </button>}
                    </div>
                  </div>
                </div>
              </div>;
            })}
        </motion.div>}

        {/* Profile Tab */}
        {activeTab === 'profile' && <motion.div key="profile" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-6">
          {/* User Info */}
          <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white">{user?.name || 'Guest'}</h3>
                <p className="text-zinc-400">{user?.email}</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  {user?.role.replace('_', ' ')}
                </p>
              </div>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updates = {
                name: formData.get('name'),
                phone: formData.get('phone')
              };

              try {
                await api.put('/users/profile', updates);
                showAlert('Profile updated successfully! Please log out and back in to see changes.', 'success');
              } catch (err) {
                console.error('Update failed', err);
                showAlert('Failed to update profile', 'error');
              }
            }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">Full Name</label>
                  <input name="name" type="text" defaultValue={user?.name} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">Phone</label>
                  <input name="phone" type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Member Since
                  </label>
                  <input type="text" value={new Date(user?.createdAt || '').toLocaleDateString()} disabled className="w-full bg-zinc-900 border border-zinc-700 text-zinc-500 px-4 py-2.5 text-sm rounded" />
                </div>
              </div>

              <button type="submit" className="mt-6 w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium">
                Update Profile
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700">
              <div className="text-3xl font-serif text-amber-500 mb-2">{userBookings.length}</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Total Bookings</div>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700">
              <div className="text-3xl font-serif text-amber-500 mb-2">
                {userBookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Confirmed</div>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700">
              <div className="text-3xl font-serif text-amber-500 mb-2">
                ₦{(userBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-zinc-400 uppercase tracking-wider">Total Spent</div>
            </div>
          </div>

          {/* Multi-Branch Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Multi-Branch Account Benefits</h4>
                <ul className="text-sm text-zinc-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-green-400 shrink-0 mt-0.5" size={16} />
                    <span>Book rooms in any branch with the same account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-400 shrink-0 mt-0.5" size={16} />
                    <span>Track all your bookings from Abuja and Lagos in one place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-400 shrink-0 mt-0.5" size={16} />
                    <span>Switch between branches without logging out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-green-400 shrink-0 mt-0.5" size={16} />
                    <span>Access loyalty rewards across all Phoenix Imperial locations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2">
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>}
      </AnimatePresence>
    </div>

    {/* Booking Details Modal */}
    <BookingDetailsModal
      isOpen={!!viewingBooking}
      onClose={() => setViewingBooking(null)}
      booking={viewingBooking}
      room={viewingBooking ? getBookingDetails(viewingBooking).room : undefined}
      onCancel={handleCancelBooking}
      readOnly={true}
    />
  </>;
};