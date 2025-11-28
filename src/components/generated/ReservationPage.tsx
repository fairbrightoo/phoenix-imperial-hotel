import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Building2, CreditCard, Check, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { useTenant } from './TenantContext';
import { useAuth } from './AuthContext';
import { ROOMS_BY_BRANCH, BRANCHES } from './mockData';
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
  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState(currentBranch || null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const availableRooms = selectedBranch ? ROOMS_BY_BRANCH[selectedBranch] : [];
  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId as any);
    selectBranch(branchId as any);
    setStep(2);
  };
  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setStep(3);
  };
  const handleConfirmBooking = () => {
    // In a real app, this would make an API call
    setBookingConfirmed(true);
    setTimeout(() => {
      onClose();
      setBookingConfirmed(false);
      setStep(1);
    }, 3000);
  };
  const calculateTotal = () => {
    if (!selectedRoom || !checkIn || !checkOut) return 0;
    const days = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * days;
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
              {[1, 2, 3].map(s => <div key={s} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${step >= s ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-600'}`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-amber-600' : 'bg-zinc-800'}`} />}
                </div>)}
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-500">
              <span className={step >= 1 ? 'text-amber-400' : ''}>Select Branch</span>
              <span className={step >= 2 ? 'text-amber-400' : ''}>Choose Room & Dates</span>
              <span className={step >= 3 ? 'text-amber-400' : ''}>Confirm & Pay</span>
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
                      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider">Check-out</label>
                      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" min={checkIn || new Date().toISOString().split('T')[0]} />
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
                <h4 className="text-lg font-serif text-white mb-4">Available Rooms</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {availableRooms.map(room => <motion.div key={room.id} whileHover={{
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
                          <button onClick={() => handleRoomSelect(room)} disabled={!checkIn || !checkOut} className="bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-2 rounded transition-colors">
                            Select
                          </button>
                        </div>
                      </div>
                    </motion.div>)}
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
                        {isAuthenticated ? <div className="space-y-2">
                            <p className="text-white">{user?.name}</p>
                            <p className="text-zinc-400 text-sm">{user?.email}</p>
                          </div> : <p className="text-zinc-400 text-sm">Please sign in to complete your booking</p>}
                      </div>

                      <div className="bg-zinc-800 p-6 rounded-lg">
                        <h4 className="text-lg font-serif text-white mb-4">Special Requests</h4>
                        <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Any special requirements or preferences..." className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 resize-none" rows={4} />
                      </div>

                      <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors">
                          Back
                        </button>
                        <button onClick={handleConfirmBooking} disabled={!isAuthenticated} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors font-medium">
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </div>}
              </motion.div>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};