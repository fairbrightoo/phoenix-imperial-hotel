import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, ChevronRight } from 'lucide-react';
import { BranchSelector } from './BranchSelector';
import { useTenant } from './TenantContext';
import { useAuth } from './AuthContext';
import { BranchId } from './types';
import { ROOMS_BY_BRANCH } from './mockData';
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
    isAuthenticated
  } = useAuth();
  const [step, setStep] = useState<'branch' | 'rooms' | 'details'>('branch');
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });
  const handleBranchSelect = (branchId: BranchId) => {
    selectBranch(branchId);
    setStep('rooms');
  };
  const handleBack = () => {
    if (step === 'rooms') setStep('branch');
    if (step === 'details') setStep('rooms');
  };
  const rooms = currentBranch ? ROOMS_BY_BRANCH[currentBranch] : [];
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
                  {step === 'rooms' && `Available Rooms - ${branchData?.city}`}
                  {step === 'details' && 'Booking Details'}
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
                            <input type="date" value={formData.checkIn} onChange={e => setFormData({
                        ...formData,
                        checkIn: e.target.value
                      })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider text-zinc-400">Check Out</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                            <input type="date" value={formData.checkOut} onChange={e => setFormData({
                        ...formData,
                        checkOut: e.target.value
                      })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" />
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
                      <h3 className="text-lg font-serif text-white">Available Rooms</h3>
                      {rooms.map(room => <div key={room.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-colors">
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
                                <button className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm font-medium">
                                  Book Now <ChevronRight size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};