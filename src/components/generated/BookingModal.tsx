import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { X, Calendar, Users, CreditCard, ChevronRight, Hotel } from 'lucide-react';
import { BranchSelector } from './BranchSelector';
import { useTenant } from './TenantContext';
import { useAuth } from '../generated/AuthContext';
import { useAlert } from '../ui/AlertContext';
import { useModal } from './ModalContext';
import { BranchId } from './types';

import { usePaystackPayment } from 'react-paystack';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    currentBranch,
    selectBranch,
    getBranchData
  } = useTenant();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const { showAlert } = useAlert();
  const [step, setStep] = useState<'branch' | 'rooms' | 'details' | 'payment'>('branch');
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'hotel'>('paystack');
  const [activeCategory, setActiveCategory] = useState<'room' | 'hall'>('room');
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  // Pre-fill form data if user is logged in
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

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

  // Fetch available rooms when dates or branch changes
  React.useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (!currentBranch) return;

      try {
        const params: any = { branchId: currentBranch };
        if (formData.checkIn && formData.checkOut) {
          params.checkIn = formData.checkIn;
          params.checkOut = formData.checkOut;
        }

        const response = await api.get('/rooms', { params });
        const mappedRooms = response.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          price: Number(r.price),
          description: r.description,
          images: parseJSON(r.images).map((img: string) =>
            img.startsWith('/') ? `http://${window.location.hostname}:5000${img}` : img
          ),
          amenities: parseJSON(r.amenities),
          available: r.available_quantity > 0,
          availableQuantity: r.available_quantity,
          nextAvailableDate: r.next_available_date,
          rating: r.rating,
          category: r.category || 'room'
        }));
        setAvailableRooms(mappedRooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchAvailableRooms();
  }, [currentBranch, formData.checkIn, formData.checkOut]);

  const { openAuth, bookingInitialRoom } = useModal();

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      // If we have an initial room, skip branch selection and go to rooms
      if (bookingInitialRoom) {
        setStep('rooms');
        // Ensure we are on the right branch if room has branch info
        // (Assuming RoomsPage only shows rooms for currentBranch, so this is safe)
      } else {
        // If no initial room, default to branch selection only if no branch selected?
        // Or always allow branch selection?
        // User complaint: "still takes you to the modal that has Check Availability... where you still have to Select Your Branch again"
        // This implies if they are already in a branch context, they expect to see rooms for that branch.
        // But if they click "Check Availability" on home (no branch), they need to pick.
        // Let's stick to: if bookingInitialRoom is set, skip branch.
        setStep('branch');
      }

      setFormData({
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      });
      setSelectedRoom(null);
    }
  }, [isOpen, bookingInitialRoom]);

  // Restore state from localStorage if pending booking exists
  React.useEffect(() => {
    if (isOpen && user) {
      const pendingBooking = localStorage.getItem('pending_booking');
      if (pendingBooking) {
        try {
          const savedState = JSON.parse(pendingBooking);
          setFormData(savedState.formData);
          setSelectedRoom(savedState.selectedRoom);
          setStep(savedState.step);
          // Clear after restoring
          localStorage.removeItem('pending_booking');
        } catch (e) {
          console.error('Failed to restore booking state', e);
        }
      }
    }
  }, [isOpen, user]);

  const handleBranchSelect = (branchId: BranchId) => {
    selectBranch(branchId);
    setStep('rooms');
  };
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedRoom || !formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return selectedRoom.price * diffDays;
  };

  /* New State for processing */
  const [isProcessing, setIsProcessing] = useState(false);

  // useMemo for config to prevent re-initialization loops
  const config = React.useMemo(() => ({
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: calculateTotal() * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  }), [formData.email, selectedRoom, formData.checkIn, formData.checkOut]);

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    setIsProcessing(true); // Start loading
    try {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const bookingData = {
        user_id: user?.id,
        branch_id: currentBranch,
        room_id: selectedRoom.id,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: {
          adults: formData.adults,
          children: formData.children
        },
        total_price: selectedRoom.price * diffDays,
        special_requests: formData.specialRequests,
        payment_status: 'paid',
        payment_reference: reference.reference,
        guest_name: formData.name,
        guest_email: formData.email,
        guest_phone: formData.phone
      };

      if (!user?.id) {
        showAlert('Error: User ID is missing. Please logout and login again.', 'error');
        setIsProcessing(false);
        return;
      }

      await api.post('/bookings', bookingData);

      showAlert('Booking confirmed successfully!', 'success');
      onClose(); // Close modal
    } catch (error) {
      console.error('Booking failed:', error);
      showAlert('Failed to create booking. Please contact support.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const onClosePayment = () => {
    showAlert('Payment cancelled', 'info');
  };

  const handleProceedToPayment = () => {
    if (!selectedRoom || !currentBranch) return;

    // Validate Guest Info
    const newErrors = {
      name: !formData.name ? 'Name is required' : '',
      email: !formData.email ? 'Email is required' : '',
      phone: !formData.phone ? 'Phone is required' : ''
    };

    if (newErrors.name || newErrors.email || newErrors.phone) {
      setErrors(newErrors);
      return;
    }

    if (!user) {
      // Save state and redirect to login
      const stateToSave = {
        formData,
        selectedRoom,
        step
      };
      localStorage.setItem('pending_booking', JSON.stringify(stateToSave));
      showAlert('Please login to complete your booking.', 'info');
      onClose();
      openAuth();
      return;
    }

    setStep('payment');
  };

  const handleBack = () => {
    if (step === 'rooms') setStep('branch');
    if (step === 'details') setStep('rooms');
    if (step === 'payment') setStep('details');
  };

  const handleBookRoom = (room: any) => {
    setSelectedRoom(room);
    setStep('details');
  };
  const rooms = availableRooms;
  const branchData = currentBranch ? getBranchData(currentBranch) : null;
  return <AnimatePresence>
    {isOpen && <>
      {/* Backdrop */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />

      {/* Modal */}
      <motion.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950">
          <div>
            <h2 className="text-2xl font-serif text-white">
              {step === 'branch' && 'Check Availability'}
              {step === 'rooms' && `Available Rooms - ${branchData?.city} `}
              {step === 'details' && 'Booking Details'}
              {step === 'payment' && 'Payment'}
            </h2>
            {step !== 'branch' && <button onClick={handleBack} className="text-amber-500 text-sm hover:text-amber-400 mt-1 flex items-center gap-1">
              ← Back
            </button>}
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Branch Selection */}
            {step === 'branch' && <motion.div key="branch" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }}>
              {/* Multi-tenant session info */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-blue-400 text-sm font-medium mb-2">Multi-Branch Booking</p>
                <p className="text-xs text-zinc-400">
                  You can book rooms in different branches during the same session. Each booking
                  is tracked separately, so feel free to check availability in Abuja and Lagos
                  without any conflicts!
                </p>
              </div>

              <BranchSelector onSelect={handleBranchSelect} showSelected={false} />
            </motion.div>}

            {/* Step 2: Room Selection */}
            {step === 'rooms' && currentBranch && <motion.div key="rooms" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }}>
              {/* Date and Guest Inputs */}
              <div className="bg-zinc-800 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">Check In</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                      <input
                        type="date"
                        value={formData.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        style={{ colorScheme: 'dark' }}
                        onChange={e => {
                          const newCheckIn = e.target.value;
                          let newCheckOut = formData.checkOut;

                          // If check-out is selected and is not after new check-in, reset it
                          if (newCheckOut && newCheckOut <= newCheckIn) {
                            newCheckOut = '';
                          }

                          setFormData({
                            ...formData,
                            checkIn: newCheckIn,
                            checkOut: newCheckOut
                          });
                        }}
                        className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">Check Out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                      <input
                        type="date"
                        value={formData.checkOut}
                        min={formData.checkIn ? (() => {
                          const date = new Date(formData.checkIn);
                          date.setDate(date.getDate() + 1);
                          return date.toISOString().split('T')[0];
                        })() : new Date().toISOString().split('T')[0]}
                        style={{ colorScheme: 'dark' }}
                        onChange={e => setFormData({
                          ...formData,
                          checkOut: e.target.value
                        })}
                        className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">Adults</label>
                    <select value={formData.adults} onChange={e => setFormData({
                      ...formData,
                      adults: parseInt(e.target.value)
                    })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded appearance-none">
                      {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">Children</label>
                    <select value={formData.children} onChange={e => setFormData({
                      ...formData,
                      children: parseInt(e.target.value)
                    })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded appearance-none">
                      {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Room List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif text-white">Available Options</h3>
                  <div className="flex bg-zinc-800 rounded-lg p-1">
                    <button
                      onClick={() => setActiveCategory('room')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeCategory === 'room' ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Rooms
                    </button>
                    <button
                      onClick={() => setActiveCategory('hall')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeCategory === 'hall' ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Halls
                    </button>
                  </div>
                </div>

                {rooms.filter(r => r.category === activeCategory).map(room => <div key={room.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" />
                    <div className="flex-1 p-4">
                      <h4 className="text-xl font-serif text-white mb-2">{room.name}</h4>
                      <p className="text-zinc-400 text-sm mb-3">{room.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Users size={14} /> Up to {room.maxGuests} guests
                        </span>
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-serif text-amber-500">₦{room.price.toLocaleString()}</span>
                          <span className="text-zinc-500 text-sm ml-2">/ night</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {room.availableQuantity === 0 && (
                            <div className="text-right">
                              <span className="text-red-500 text-sm font-medium block">Fully Booked</span>
                              {room.nextAvailableDate && (
                                <span className="text-zinc-500 text-xs">
                                  Available from {new Date(room.nextAvailableDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          )}
                          <button
                            onClick={() => handleBookRoom(room)}
                            disabled={!formData.checkIn || !formData.checkOut || room.availableQuantity === 0}
                            className={`px-6 py-2 rounded transition-colors flex items-center gap-2 text-sm font-medium ${!formData.checkIn || !formData.checkOut || room.availableQuantity === 0
                              ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                              : 'bg-amber-600 text-white hover:bg-amber-700'
                              }`}
                            title={
                              !formData.checkIn || !formData.checkOut
                                ? "Please select check-in and check-out dates first"
                                : room.availableQuantity === 0
                                  ? `Fully booked until ${room.nextAvailableDate ? new Date(room.nextAvailableDate).toLocaleDateString() : 'later'}`
                                  : "Book this room"
                            }
                          >
                            {room.availableQuantity === 0 ? 'Fully Booked' : 'Book Now'} <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
                {rooms.filter(r => r.category === activeCategory).length === 0 && (
                  <div className="text-center py-12 text-zinc-500">
                    <p>No {activeCategory}s available for the selected dates.</p>
                  </div>
                )}
              </div>
            </motion.div>}

            {/* Step 3: Booking Details */}
            {step === 'details' && selectedRoom && <motion.div key="details" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Room Summary */}
                <div className="space-y-6">
                  <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                    <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-serif text-white mb-2">{selectedRoom.name}</h3>
                      <p className="text-zinc-400 text-sm mb-4">{selectedRoom.description}</p>
                      <div className="flex justify-between items-center py-2 border-t border-zinc-700">
                        <span className="text-zinc-400">Price per night</span>
                        <span className="text-amber-500 font-medium">₦{selectedRoom.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-white font-medium mb-4">Booking Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Branch</span>
                        <span className="text-white">{branchData?.city || 'Selected Branch'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Check In</span>
                        <span className="text-white">{formData.checkIn || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Check Out</span>
                        <span className="text-white">{formData.checkOut || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Duration</span>
                        <span className="text-white">
                          {formData.checkIn && formData.checkOut ? (
                            (() => {
                              const start = new Date(formData.checkIn);
                              const end = new Date(formData.checkOut);
                              const diffTime = Math.abs(end.getTime() - start.getTime());
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              return `${diffDays} Night${diffDays !== 1 ? 's' : ''} `;
                            })()
                          ) : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Guests</span>
                        <span className="text-white">{formData.adults} Adults, {formData.children} Children</span>
                      </div>
                      <div className="pt-3 border-t border-zinc-700 flex justify-between items-center">

                        <span className="text-amber-500 text-lg font-bold">
                          {formData.checkIn && formData.checkOut ? (
                            (() => {
                              const start = new Date(formData.checkIn);
                              const end = new Date(formData.checkOut);
                              const diffTime = Math.abs(end.getTime() - start.getTime());
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              return `₦${(selectedRoom.price * diffDays).toLocaleString()} `;
                            })()
                          ) : '₦0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Details Form */}
                <div className="space-y-6">
                  <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                    <h4 className="text-white font-medium mb-4">Guest Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase text-zinc-400 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={e => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-zinc-400 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={e => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-zinc-400 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                          placeholder="+234..."
                          value={formData.phone}
                          onChange={e => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: '' });
                          }}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase text-zinc-400 mb-1.5">Special Requests</label>
                        <textarea
                          className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:border-amber-500 outline-none h-24 resize-none"
                          placeholder="Any special requirements..."
                          value={formData.specialRequests}
                          onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded font-medium transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </motion.div>}

            {/* Step 4: Payment Summary */}
            {step === 'payment' && selectedRoom && <motion.div key="payment" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }}>
              <div className="max-w-md mx-auto">
                <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-6">
                  <h3 className="text-xl font-serif text-white mb-4 text-center">Payment Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-zinc-400">
                      <span>Room Charge ({calculateTotal() / selectedRoom.price} nights)</span>
                      <span className="text-white">₦{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Taxes & Fees</span>
                      <span className="text-white">₦0</span>
                    </div>
                    <div className="border-t border-zinc-700 pt-4 flex justify-between items-center">
                      <span className="text-lg font-medium text-white">Total Amount</span>
                      <span className="text-2xl font-serif text-amber-500">₦{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Payment Method Toggle */}
                  <div className="bg-zinc-900 rounded-lg p-1 mb-6 flex">
                    <button
                      onClick={() => setPaymentMethod('paystack')}
                      className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${paymentMethod === 'paystack' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Pay Now (Paystack)
                    </button>
                    <button
                      onClick={() => setPaymentMethod('hotel')}
                      className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${paymentMethod === 'hotel' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Pay at Hotel
                    </button>
                  </div>

                  {paymentMethod === 'paystack' ? (
                    <>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4 mb-6">
                        <p className="text-sm text-blue-400 text-center">
                          You will be redirected to Paystack to complete your secure payment.
                        </p>
                      </div>

                      <button
                        disabled={isProcessing}
                        onClick={() => {
                          if (!config.publicKey) {
                            showAlert('Paystack Public Key is missing!', 'error');
                            return;
                          }
                          initializePayment({ onSuccess, onClose: onClosePayment });
                        }}
                        className={`w-full py-4 rounded font-medium transition-colors flex items-center justify-center gap-2 ${isProcessing
                            ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Confirming Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard size={20} />
                            Pay Now with Paystack
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4 mb-6">
                        <p className="text-sm text-amber-400 text-center">
                          You can pay when you arrive at the hotel. Your booking will be pending until confirmed by our team.
                        </p>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            const start = new Date(formData.checkIn);
                            const end = new Date(formData.checkOut);
                            const diffTime = Math.abs(end.getTime() - start.getTime());
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            const bookingData = {
                              user_id: user?.id,
                              branch_id: currentBranch,
                              room_id: selectedRoom.id,
                              check_in: formData.checkIn,
                              check_out: formData.checkOut,
                              guests: {
                                adults: formData.adults,
                                children: formData.children
                              },
                              total_price: selectedRoom.price * diffDays,
                              special_requests: formData.specialRequests,
                              payment_status: 'pending',
                              payment_reference: null,
                              guest_name: formData.name,
                              guest_email: formData.email,
                              guest_phone: formData.phone
                            };

                            if (!user?.id) {
                              showAlert('Error: User ID is missing. Please logout and login again.', 'error');
                              return;
                            }

                            await api.post('/bookings', bookingData);

                            showAlert('Booking request received! Check your email.', 'success');
                            onClose();
                          } catch (error) {
                            console.error('Booking failed:', error);
                            showAlert('Failed to create booking. Please contact support.', 'error');
                          }
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Hotel size={20} />
                        Confirm Pay at Hotel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </motion.div>
    </>}
  </AnimatePresence>;


};