import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Building2, CreditCard, Check, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import api from '../../services/api';
import { useTenant } from './TenantContext';
import { useAuth } from './AuthContext';
import { useModal } from './ModalContext';
import { useAlert } from '../ui/AlertContext';
import { BRANCHES } from './mockData';
import { Room } from './types';

interface ReservationPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  isOpen,
  onClose
}) => {
  const {
    currentBranch,
    selectBranch,
    branches
  } = useTenant();
  const {
    isAuthenticated,
    user
  } = useAuth();
  const { showAlert } = useAlert();
  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState(currentBranch || null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'hotel'>('paystack');
  const [activeCategory, setActiveCategory] = useState<'room' | 'hall'>('room');

  // Fetch available rooms when dates or branch changes
  React.useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (!selectedBranch) return;

      try {
        const params: any = { branchId: selectedBranch };
        if (checkIn && checkOut) {
          params.checkIn = checkIn;
          params.checkOut = checkOut;
        }

        const response = await api.get('/rooms', { params });
        const mappedRooms = response.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          price: Number(r.price),
          description: r.description,
          images: r.images || [],
          amenities: r.amenities || [],
          available: r.available_quantity > 0,
          availableQuantity: r.available_quantity,
          nextAvailableDate: r.next_available_date,
          rating: r.rating,
          maxGuests: r.maxGuests || 2,
          size: r.size || '30m²',
          category: r.category || 'room'
        }));
        setAvailableRooms(mappedRooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchAvailableRooms();
  }, [selectedBranch, checkIn, checkOut]);

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId as any);
    selectBranch(branchId as any);
    setStep(2);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setStep(3);
  };

  const { openAuth } = useModal();

  // Update guest details when user logs in
  React.useEffect(() => {
    if (user) {
      setGuestName(user.name || '');
      setGuestEmail(user.email || '');
      setGuestPhone(user.phone || '');
    }
  }, [user]);

  // Restore state from localStorage if pending reservation exists
  React.useEffect(() => {
    if (isOpen && user) {
      const pendingReservation = localStorage.getItem('pending_reservation');
      if (pendingReservation) {
        try {
          const savedState = JSON.parse(pendingReservation);
          setSelectedBranch(savedState.selectedBranch);
          selectBranch(savedState.selectedBranch);
          setCheckIn(savedState.checkIn);
          setCheckOut(savedState.checkOut);
          setAdults(savedState.adults);
          setChildren(savedState.children);
          setSelectedRoom(savedState.selectedRoom);
          setSpecialRequests(savedState.specialRequests);
          setStep(savedState.step);

          // Restore guest details if they were manually entered
          if (savedState.guestName) setGuestName(savedState.guestName);
          if (savedState.guestEmail) setGuestEmail(savedState.guestEmail);
          if (savedState.guestPhone) setGuestPhone(savedState.guestPhone);

          // Clear after restoring
          localStorage.removeItem('pending_reservation');
        } catch (e) {
          console.error('Failed to restore reservation state', e);
        }
      }
    }
  }, [isOpen, user]);

  const [errors, setErrors] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: ''
  });

  const calculateTotal = () => {
    if (!selectedRoom || !checkIn || !checkOut) return 0;
    const days = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * days;
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: guestEmail,
    amount: calculateTotal() * 100, // Paystack expects amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const bookingData = {
        user_id: user?.id,
        branch_id: selectedBranch,
        room_id: selectedRoom?.id,
        check_in: checkIn,
        check_out: checkOut,
        guests: {
          adults: adults,
          children: children
        },
        total_price: selectedRoom!.price * diffDays,
        special_requests: specialRequests,
        payment_status: 'paid',
        payment_reference: reference.reference,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone
      };

      if (!user?.id) {
        showAlert('Error: User ID is missing. Please logout and login again.', 'error');
        return;
      }

      await api.post('/bookings', bookingData);

      setBookingConfirmed(true);
      setTimeout(() => {
        onClose();
        setBookingConfirmed(false);
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error('Booking failed:', error);
      showAlert('Failed to create booking. Please contact support.', 'error');
    }
  };

  const onClosePayment = () => {
    showAlert('Payment cancelled', 'info');
  };

  const handleProceedToPayment = () => {
    // Validate Guest Info
    const newErrors = {
      guestName: !guestName ? 'Name is required' : '',
      guestEmail: !guestEmail ? 'Email is required' : '',
      guestPhone: !guestPhone ? 'Phone is required' : ''
    };

    if (newErrors.guestName || newErrors.guestEmail || newErrors.guestPhone) {
      setErrors(newErrors);
      return;
    }

    if (!user) {
      // Save state and redirect to login
      const stateToSave = {
        selectedBranch,
        checkIn,
        checkOut,
        adults,
        children,
        selectedRoom,
        specialRequests,
        step,
        guestName,
        guestEmail,
        guestPhone
      };
      localStorage.setItem('pending_reservation', JSON.stringify(stateToSave));
      onClose();
      openAuth();
      return;
    }

    setStep(4); // Payment Step
  };

  if (!isOpen) return null;

  return <AnimatePresence>
    <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-zinc-950 p-8 border-b border-zinc-800">
          <h2 className="text-3xl font-serif text-amber-500 mb-2">Make a Reservation</h2>
          <p className="text-zinc-400">Book your perfect stay in just a few steps</p>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3, 4].map(s => <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${step >= s ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-600'}`}>
                {s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-amber-600' : 'bg-zinc-800'}`} />}
            </div>)}
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-500">
            <span className={step >= 1 ? 'text-amber-400' : ''}>Select Branch</span>
            <span className={step >= 2 ? 'text-amber-400' : ''}>Choose Room & Dates</span>
            <span className={step >= 3 ? 'text-amber-400' : ''}>Confirm</span>
            <span className={step >= 4 ? 'text-amber-400' : ''}>Pay</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Branch Selection */}
          {step === 1 && <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
            <h3 className="text-2xl font-serif text-white mb-6">Select Your Branch</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {branches.map(branch => <motion.button key={branch.id} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleBranchSelect(branch.id)} className="bg-zinc-800 border-2 border-zinc-700 hover:border-amber-500 p-6 rounded-lg text-left transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors">
                      {branch.name}
                    </h4>
                    <p className="text-zinc-400 text-sm mt-2 flex items-center gap-2">
                      <MapPin size={14} />
                      {branch.address}
                    </p>
                    <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2">
                      <Phone size={14} />
                      {branch.phone}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-medium">
                      <span>Select Branch</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>)}
            </div>
          </motion.div>}

          {/* Step 2: Room and Date Selection */}
          {step === 2 && <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif text-white">Choose Room & Dates</h3>
              <button onClick={() => setStep(1)} className="text-zinc-400 hover:text-amber-400 text-sm">
                Change Branch
              </button>
            </div>

            {/* Date Selection */}
            <div className="bg-zinc-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-serif text-white mb-4">Your Stay</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider">Check-in</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" style={{ colorScheme: 'dark' }} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider">Check-out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" style={{ colorScheme: 'dark' }} min={checkIn || new Date().toISOString().split('T')[0]} />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider">Adults</label>
                  <select value={adults} onChange={e => setAdults(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500">
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider">Children</label>
                  <select value={children} onChange={e => setChildren(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500">
                    {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Available Rooms */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-serif text-white">Available Options</h4>
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

            <div className="grid md:grid-cols-2 gap-6">
              {availableRooms.filter(r => r.category === activeCategory).map(room => <motion.div key={room.id} whileHover={{
                y: -4
              }} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500 transition-all">
                <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-serif text-white mb-2">{room.name}</h5>
                  <p className="text-zinc-400 text-sm mb-4">{room.description}</p>
                  <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {room.maxGuests} guests
                    </span>
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">Price per night</p>
                      <p className="text-2xl font-bold text-amber-500">₦{room.price.toLocaleString()}</p>
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
                        onClick={() => handleRoomSelect(room)}
                        disabled={!checkIn || !checkOut || room.availableQuantity === 0}
                        className="bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-2 rounded transition-colors"
                        title={room.availableQuantity === 0 ? `Fully booked until ${room.nextAvailableDate ? new Date(room.nextAvailableDate).toLocaleDateString() : 'later'}` : ''}
                      >
                        {room.availableQuantity === 0 ? 'Fully Booked' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>)}
              {availableRooms.filter(r => r.category === activeCategory).length === 0 && (
                <div className="col-span-2 text-center py-12 text-zinc-500">
                  <p>No {activeCategory}s available for the selected dates.</p>
                </div>
              )}
            </div>
          </motion.div>}

          {/* Step 3: Confirmation */}
          {step === 3 && selectedRoom && <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
            <h3 className="text-2xl font-serif text-white mb-6">Confirm Your Reservation</h3>

            {bookingConfirmed ? <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-500" size={32} />
              </div>
              <h4 className="text-2xl font-serif text-white mb-2">Booking Confirmed!</h4>
              <p className="text-zinc-400">Your reservation has been successfully created.</p>
            </div> : <div className="grid md:grid-cols-2 gap-6">
              {/* Booking Summary */}
              <div className="bg-zinc-800 p-6 rounded-lg">
                <h4 className="text-lg font-serif text-white mb-4">Booking Summary</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase">Branch</p>
                    <p className="text-white">{BRANCHES.find(b => b.id === selectedBranch)?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase">Room</p>
                    <p className="text-white">{selectedRoom.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Check-in</p>
                      <p className="text-white">{checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase">Check-out</p>
                      <p className="text-white">{checkOut}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase">Guests</p>
                    <p className="text-white">{adults} Adults, {children} Children</p>
                  </div>
                  <div className="border-t border-zinc-700 pt-4">
                    <p className="text-xs text-zinc-500 uppercase mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-amber-500">₦{calculateTotal().toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-6">
                <div className="bg-zinc-800 p-6 rounded-lg">
                  <h4 className="text-lg font-serif text-white mb-4">Guest Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase text-zinc-400 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.guestName ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                        placeholder="John Doe"
                        value={guestName}
                        onChange={e => {
                          setGuestName(e.target.value);
                          if (errors.guestName) setErrors({ ...errors, guestName: '' });
                        }}
                      />
                      {errors.guestName && <p className="text-red-500 text-xs mt-1">{errors.guestName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-zinc-400 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.guestEmail ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                        placeholder="john@example.com"
                        value={guestEmail}
                        onChange={e => {
                          setGuestEmail(e.target.value);
                          if (errors.guestEmail) setErrors({ ...errors, guestEmail: '' });
                        }}
                      />
                      {errors.guestEmail && <p className="text-red-500 text-xs mt-1">{errors.guestEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-zinc-400 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        className={`w-full bg-zinc-900 border rounded px-4 py-2 text-white outline-none ${errors.guestPhone ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-amber-500'}`}
                        placeholder="+234..."
                        value={guestPhone}
                        onChange={e => {
                          setGuestPhone(e.target.value);
                          if (errors.guestPhone) setErrors({ ...errors, guestPhone: '' });
                        }}
                      />
                      {errors.guestPhone && <p className="text-red-500 text-xs mt-1">{errors.guestPhone}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800 p-6 rounded-lg">
                  <h4 className="text-lg font-serif text-white mb-4">Special Requests</h4>
                  <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Any special requirements or preferences..." className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 resize-none" rows={4} />
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors">
                    Back
                  </button>
                  <button onClick={handleProceedToPayment} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded transition-colors font-medium">
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>}
          </motion.div>}

          {/* Step 4: Payment Summary */}
          {step === 4 && selectedRoom && <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
            <h3 className="text-2xl font-serif text-white mb-6">Payment Summary</h3>
            <div className="max-w-md mx-auto">
              <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 mb-6">

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

                    <div className="flex gap-4">
                      <button onClick={() => setStep(3)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors">
                        Back
                      </button>
                      <button
                        onClick={() => {
                          initializePayment({ onSuccess, onClose: onClosePayment });
                        }}
                        className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <CreditCard size={20} />
                        Pay Now
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-4 mb-6">
                      <p className="text-sm text-amber-400 text-center">
                        You can pay when you arrive at the hotel. Your booking will be pending until confirmed by our team.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(3)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors">
                        Back
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const start = new Date(checkIn);
                            const end = new Date(checkOut);
                            const diffTime = Math.abs(end.getTime() - start.getTime());
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            const bookingData = {
                              user_id: user?.id,
                              branch_id: selectedBranch,
                              room_id: selectedRoom.id,
                              check_in: checkIn,
                              check_out: checkOut,
                              guests: {
                                adults: adults,
                                children: children
                              },
                              total_price: selectedRoom.price * diffDays,
                              special_requests: specialRequests,
                              payment_status: 'pending',
                              payment_reference: null,
                              guest_name: guestName,
                              guest_email: guestEmail,
                              guest_phone: guestPhone
                            };

                            if (!user?.id) {
                              showAlert('Error: User ID is missing. Please logout and login again.', 'error');
                              return;
                            }

                            await api.post('/bookings', bookingData);

                            setBookingConfirmed(true);
                            setTimeout(() => {
                              onClose();
                              setBookingConfirmed(false);
                              setStep(1);
                            }, 3000);
                          } catch (error) {
                            console.error('Booking failed:', error);
                            showAlert('Failed to create booking. Please contact support.', 'error');
                          }
                        }}
                        className="flex-[2] bg-amber-600 hover:bg-amber-700 text-white py-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Building2 size={20} />
                        Confirm Pay at Hotel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>}

        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>;
};