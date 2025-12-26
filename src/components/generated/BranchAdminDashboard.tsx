import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api, { getImageUrl } from '../../services/api';
import { useAlert } from '../ui/AlertContext';
import { Home, Hotel, Calendar, Users, MessageSquare, Image, BarChart3, Settings, Star, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTenant } from './TenantContext';

import { BranchId } from './types';
import { RoomFormModal, RoomFormData } from './RoomFormModal';
import { BookingDetailsModal } from './BookingDetailsModal';
import { BookingFormModal, BookingFormData } from './BookingFormModal';
import { TestimonialFormModal, TestimonialFormData } from './TestimonialFormModal';
import { GalleryFormModal, GalleryFormData } from './GalleryFormModal';
interface BranchAdminDashboardProps {
  branchId: BranchId; // Added branchId to props
  onClose: () => void;
}
export const BranchAdminDashboard: React.FC<BranchAdminDashboardProps> = ({
  branchId, // Destructured branchId from props
  onClose
}) => {
  const { user, logout } = useAuth();
  const { getBranchData, updateBranch, getBranchTestimonials, updateBranchTestimonials, getBranchGallery, updateBranchGallery } = useTenant(); // Destructured from useTenant
  const { showAlert } = useAlert();
  const branchData = getBranchData(branchId);
  const branchName = branchData?.name.replace('Phoenix Imperial ', '') || branchId; // Derived branchName from branchData

  const [activeSection, setActiveSection] = useState<'overview' | 'rooms' | 'bookings' | 'testimonials' | 'gallery' | 'settings'>('overview');
  // Removed redundant branchId and branchName declarations

  // Branch-specific data
  // Branch-specific data
  // Branch-specific data
  const testimonials = getBranchTestimonials(branchId);
  const gallery = getBranchGallery(branchId);

  // Local state for rooms management
  const [localRooms, setLocalRooms] = useState<any[]>([]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<'room' | 'hall'>('room');

  // Local state for bookings
  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [viewingBooking, setViewingBooking] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Local state for testimonials
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);

  // Local state for gallery
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any | null>(null);

  // Fetch bookings from API
  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/bookings?branchId=${branchId}`);
        const mappedBookings = response.data.map((b: any) => ({
          id: b.id,
          branchId: b.branch_id,
          roomId: b.room_id,
          userId: b.user_id,
          checkIn: b.check_in,
          checkOut: b.check_out,
          guests: b.guests,
          totalPrice: Number(b.total_price),
          status: b.status,
          createdAt: b.created_at,
          specialRequests: b.special_requests,
          guestName: b.guest_name || (b.User ? b.User.name : 'Unknown'),
          guestEmail: b.guest_email || (b.User ? b.User.email : ''),
          guestPhone: b.guest_phone || (b.User ? b.User.phone : '')
        }));
        setLocalBookings(mappedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        showAlert('Failed to load bookings', 'error');
      }
    };

    fetchBookings();
  }, [branchId]);

  const handleUpdateBooking = async (bookingId: string, data: any) => {
    try {
      // Optimistic update
      setLocalBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ...data } : b));
      setViewingBooking((prev: any) => prev ? { ...prev, ...data } : null);

      // API call
      await api.put(`/bookings/${bookingId}`, {
        ...data,
        status: data.status,
        special_requests: data.specialRequests,
        check_in: data.checkIn,
        check_out: data.checkOut
      });

      showAlert('Booking updated successfully', 'success');
    } catch (error) {
      console.error('Failed to update booking:', error);
      showAlert('Failed to update booking', 'error');
      // Revert optimistic update if needed
      const fetchBookings = async () => {
        try {
          const response = await api.get(`/bookings?branchId=${branchId}`);
          const mappedBookings = response.data.map((b: any) => ({
            id: b.id,
            branchId: b.branch_id,
            roomId: b.room_id,
            userId: b.user_id,
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            totalPrice: Number(b.total_price),
            status: b.status,
            createdAt: b.created_at,
            specialRequests: b.special_requests
          }));
          setLocalBookings(mappedBookings);
        } catch (e) {
          console.error('Refetch failed', e);
        }
      };
      fetchBookings();
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      handleUpdateBooking(bookingId, { status: 'cancelled' });
    }
  };

  const handleCreateBooking = (data: BookingFormData) => {
    const selectedRoom = localRooms.find(r => r.id === data.roomId);
    if (!selectedRoom) return;

    const start = new Date(data.checkIn);
    const end = new Date(data.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * selectedRoom.price;

    const newBooking = {
      id: Date.now().toString(),
      branchId,
      roomId: data.roomId,
      userId: `guest-${Date.now()}`, // Mock user ID for guest
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: {
        adults: data.adults,
        children: data.children
      },
      totalPrice,
      status: data.status,
      createdAt: new Date().toISOString().split('T')[0],
      specialRequests: ''
    };

    setLocalBookings(prev => [newBooking, ...prev]);
    setIsBookingModalOpen(false);
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setIsTestimonialModalOpen(true);
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setIsTestimonialModalOpen(true);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      updateBranchTestimonials(branchId, testimonials.filter(t => t.id !== id));
    }
  };

  const handleSaveTestimonial = (data: TestimonialFormData) => {
    if (editingTestimonial) {
      updateBranchTestimonials(branchId, testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...data } : t));
    } else {
      const newTestimonial = {
        id: Date.now().toString(),
        branchId,
        ...data,
        createdAt: new Date().toISOString().split('T')[0]
      };
      updateBranchTestimonials(branchId, [newTestimonial, ...testimonials]);
    }
    setIsTestimonialModalOpen(false);
  };

  const handleAddImage = () => {
    setEditingImage(null);
    setIsGalleryModalOpen(true);
  };

  const handleEditImage = (image: any) => {
    setEditingImage(image);
    setIsGalleryModalOpen(true);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      updateBranchGallery(branchId, gallery.filter(g => g.id !== id));
    }
  };

  const handleSaveImage = (data: GalleryFormData) => {
    if (editingImage) {
      updateBranchGallery(branchId, gallery.map(g => g.id === editingImage.id ? { ...g, ...data } : g));
    } else {
      const newImage = {
        id: Date.now().toString(),
        branchId,
        ...data,
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      updateBranchGallery(branchId, [newImage, ...gallery]);
    }
    setIsGalleryModalOpen(false);
  };

  // Helper to safely parse JSON fields
  const parseJSON = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn('Failed to parse JSON:', data);
        return [];
      }
    }
    return [];
  };

  // Fetch rooms from API
  const fetchRooms = async () => {
    try {
      const response = await api.get(`/rooms?branchId=${branchId}`);
      // Map backend response to frontend format if needed
      // Backend returns: snake_case keys like total_quantity, is_available
      // Frontend expects: camelCase or direct usage. 
      // Let's map it to be safe and consistent with current usage.
      const mappedRooms = response.data.map((r: any) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        price: Number(r.price),
        description: r.description,
        images: parseJSON(r.images),
        amenities: parseJSON(r.amenities),
        status: (r.is_available && r.available_quantity > 0) ? 'Available' : 'Booked', // Simplified status mapping
        available: r.is_available && r.available_quantity > 0,
        totalQuantity: r.total_quantity,
        availableQuantity: r.available_quantity,
        rating: r.rating,
        category: r.category || 'room'
      }));
      setLocalRooms(mappedRooms);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      showAlert('Failed to load rooms', 'error');
    }
  };

  React.useEffect(() => {
    fetchRooms();
  }, [branchId]);



  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    updateBranch(branchId, {
      name: formData.get('branchName') as string,
      email: formData.get('branchEmail') as string,
      address: formData.get('branchAddress') as string,
      phone: formData.get('branchPhone') as string,
    });

    showAlert('Settings saved successfully!', 'success');
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setIsRoomModalOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setEditingRoom({
      ...room,
      imageUrl: room.images[0] // Map first image to imageUrl for form
    });
    setIsRoomModalOpen(true);
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/rooms/${roomId}`);
        showAlert('Room deleted successfully', 'success');
        fetchRooms(); // Refresh list
      } catch (error) {
        console.error('Failed to delete room:', error);
        showAlert('Failed to delete room', 'error');
      }
    }
  };

  const handleSaveRoom = async (data: RoomFormData) => {
    try {
      const roomData = {
        ...data,
        branch_id: branchId,
        images: [data.imageUrl], // Currently handling single image from form
        is_available: data.status === 'Available',
        total_quantity: data.totalQuantity,
        category: activeCategory
      };

      if (editingRoom) {
        // Edit existing
        await api.put(`/rooms/${editingRoom.id}`, roomData);
        showAlert('Room updated successfully', 'success');
      } else {
        // Add new
        await api.post('/rooms', roomData);
        showAlert('Room created successfully', 'success');
      }

      setIsRoomModalOpen(false);
      fetchRooms(); // Refresh list
    } catch (error) {
      console.error('Failed to save room:', error);
      showAlert('Failed to save room', 'error');
    }
  };

  // Statistics
  const stats = {
    totalBookings: localBookings.length,
    confirmedBookings: localBookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: localBookings.filter(b => b.status === 'pending').length,
    totalRevenue: localBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0),
    totalRooms: localRooms.length,
    availableRooms: localRooms.filter(r => r.available).length,
    occupancyRate: Math.round(localBookings.filter(b => b.status === 'confirmed').length / localRooms.length * 100)
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
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-12 h-auto" />
          <div className="flex flex-col">
            <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">PHOENIX</h1>
            <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">IMPERIAL</h1>
          </div>
        </div>
        <p className="text-xs text-[#FEFCF9] uppercase tracking-wider mt-1">{branchName} Branch Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(item => <button key={item.id} onClick={() => setActiveSection(item.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeSection === item.id ? 'bg-amber-500/10 text-amber-500' : 'text-[#FEFCF9] hover:bg-sidebar-accent hover:text-amber-500'}`}>
          <item.icon size={18} />
          <span className="text-sm font-medium">{item.label}</span>
        </button>)}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
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
              <div className="text-3xl font-serif text-white mb-1">₦{stats.totalRevenue.toLocaleString()}</div>
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
              {localBookings.slice(0, 5).map(booking => {
                const room = localRooms.find(r => r.id === booking.roomId);
                return <div key={booking.id} className="flex items-center justify-between p-4 bg-zinc-900 rounded">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400' : booking.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    <div>
                      <p className="text-white font-medium">{room?.name}</p>
                      <div className="text-sm text-zinc-400">
                        <span className="text-white font-medium">{room?.availableQuantity ?? '-'}</span> / {room?.totalQuantity ?? '-'} Available
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-serif">₦{booking.totalPrice.toLocaleString()}</p>
                      <p className="text-xs text-zinc-500 capitalize">{booking.status}</p>
                    </div>
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
            <h1 className="text-3xl font-serif text-white">Inventory Management</h1>
            <button
              onClick={handleAddRoom}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add {activeCategory === 'room' ? 'Room' : 'Hall'}
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-4 border-b border-zinc-800 pb-4">
            <button
              onClick={() => setActiveCategory('room')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'room' ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
            >
              Rooms
            </button>
            <button
              onClick={() => setActiveCategory('hall')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'hall' ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
            >
              Halls
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {localRooms.filter(r => r.category === activeCategory).map(room => {
              const imageUrl = getImageUrl(room.images[0]);

              return <div key={room.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
                <img src={imageUrl} alt={room.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-serif text-white mb-1">{room.name}</h3>
                      <p className="text-sm text-zinc-400 capitalize">{room.type} • {room.totalQuantity} Units</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {room.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif text-amber-500">₦{room.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors text-zinc-300 hover:text-white"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>;
            })}
          </div>

          <RoomFormModal
            isOpen={isRoomModalOpen}
            onClose={() => setIsRoomModalOpen(false)}
            onSubmit={handleSaveRoom}
            initialData={editingRoom}
            title={editingRoom ? `Edit ${activeCategory === 'room' ? 'Room' : 'Hall'}` : `Add New ${activeCategory === 'room' ? 'Room' : 'Hall'}`}
            category={activeCategory}
          />
        </motion.div>}

        {/* Bookings Management */}
        {activeSection === 'bookings' && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif text-white">Bookings Management</h1>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add Booking
            </button>
          </div>

          <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Date Booked</th>
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
                {localBookings.map(booking => {
                  const room = localRooms.find(r => r.id === booking.roomId);
                  return <tr key={booking.id} className="hover:bg-zinc-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                      #{booking.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      {new Date(booking.createdAt).toLocaleDateString()}
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
                      <button
                        onClick={() => setViewingBooking(booking)}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        View
                      </button>
                    </td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>

          <BookingDetailsModal
            isOpen={!!viewingBooking}
            onClose={() => setViewingBooking(null)}
            booking={viewingBooking}
            room={localRooms.find(r => r.id === viewingBooking?.roomId)}
            onUpdate={handleUpdateBooking}
            onCancel={handleCancelBooking}
          />

          <BookingFormModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            onSubmit={handleCreateBooking}
            rooms={localRooms}
          />
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
            <button
              onClick={handleAddTestimonial}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
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
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
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

          <TestimonialFormModal
            isOpen={isTestimonialModalOpen}
            onClose={() => setIsTestimonialModalOpen(false)}
            onSubmit={handleSaveTestimonial}
            initialData={editingTestimonial}
            title={editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          />
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
            <button
              onClick={handleAddImage}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Upload Image
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map(item => {
              const imageUrl = getImageUrl(item.imageUrl);

              return <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                <img src={imageUrl} alt={item.title} className="w-full h-full object-contain p-1" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEditImage(item)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(item.id)}
                    className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium text-sm truncate">{item.title}</p>
                  <p className="text-zinc-400 text-xs">{item.category}</p>
                </div>
              </div>;
            })}
          </div>

          <GalleryFormModal
            isOpen={isGalleryModalOpen}
            onClose={() => setIsGalleryModalOpen(false)}
            onSubmit={handleSaveImage}
            initialData={editingImage}
            title={editingImage ? 'Edit Image' : 'Upload New Image'}
          />
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
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                  Branch Name
                </label>
                <input
                  name="branchName"
                  type="text"
                  defaultValue={branchData?.name}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                  Branch Address
                </label>
                <input
                  name="branchAddress"
                  type="text"
                  defaultValue={branchData?.address}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                  Contact Email
                </label>
                <input
                  name="branchEmail"
                  type="email"
                  defaultValue={branchData?.email}
                  className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
                />
              </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-zinc-400 block mb-2">
              Contact Phone
            </label>
            <input
              name="branchPhone"
              type="text"
              defaultValue={branchData?.phone}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium"
          >
            Save Changes
          </button>
        </form>
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
    </main >
  </div >;
};