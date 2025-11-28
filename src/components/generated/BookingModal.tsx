import { SortableContainer } from "@/dnd-kit/SortableContainer";
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
  mpid?: string;
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
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="BookingModal.tsx">
      {isOpen && <>
          {/* Backdrop */}
          <motion.div data-magicpath-motion-tag="motion.div" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" data-magicpath-id="1" data-magicpath-path="BookingModal.tsx" />

          {/* Modal */}
          <SortableContainer dndKitId="28b2628d-f8df-47b3-8293-b3ac26e9a544" containerType="regular" prevTag="motion.div" initial={{
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
      }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800" data-magicpath-id="2" data-magicpath-path="BookingModal.tsx">
            {/* Header */}
            <SortableContainer dndKitId="b8a38294-e238-4c0e-81d2-0431eb1c03ff" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="3" data-magicpath-path="BookingModal.tsx">
              <SortableContainer dndKitId="37e15aeb-22b7-4fe6-ab21-81636a0f82a3" containerType="regular" prevTag="div" data-magicpath-id="4" data-magicpath-path="BookingModal.tsx">
                <h2 className="text-2xl font-serif text-white" data-magicpath-id="5" data-magicpath-path="BookingModal.tsx">
                  {step === 'branch' && 'Check Availability'}
                  {step === 'rooms' && `Available Rooms - ${branchData?.city}`}
                  {step === 'details' && 'Booking Details'}
                </h2>
                {step !== 'branch' && <button onClick={handleBack} className="text-amber-500 text-sm hover:text-amber-400 mt-1 flex items-center gap-1" data-magicpath-id="6" data-magicpath-path="BookingModal.tsx">
                    ← Back
                  </button>}
              </SortableContainer>
              <SortableContainer dndKitId="329ccf35-109c-43ce-b783-0c2094dbcfc1" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="7" data-magicpath-path="BookingModal.tsx">
                <X size={20} data-magicpath-id="8" data-magicpath-path="BookingModal.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Content */}
            <SortableContainer dndKitId="0ae19b09-b78d-40f2-a61c-37d54bf51a78" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]" data-magicpath-id="9" data-magicpath-path="BookingModal.tsx">
              <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="BookingModal.tsx">
                {/* Step 1: Branch Selection */}
                {step === 'branch' && <SortableContainer dndKitId="b8b2108c-4493-4d55-a112-d59eac2d8e4c" containerType="regular" prevTag="motion.div" key="branch" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} data-magicpath-id="11" data-magicpath-path="BookingModal.tsx">
                    {/* Multi-tenant session info */}
                    <SortableContainer dndKitId="0936d709-525f-43ef-a1eb-319e7a83524e" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6" data-magicpath-id="12" data-magicpath-path="BookingModal.tsx">
                      <p className="text-blue-400 text-sm font-medium mb-2" data-magicpath-id="13" data-magicpath-path="BookingModal.tsx">Multi-Branch Booking</p>
                      <p className="text-xs text-zinc-400" data-magicpath-id="14" data-magicpath-path="BookingModal.tsx">
                        You can book rooms in different branches during the same session. Each booking
                        is tracked separately, so feel free to check availability in Abuja and Lagos
                        without any conflicts!
                      </p>
                    </SortableContainer>
                    
                    <BranchSelector onSelect={handleBranchSelect} showSelected={false} data-magicpath-id="15" data-magicpath-path="BookingModal.tsx" />
                  </SortableContainer>}

                {/* Step 2: Room Selection */}
                {step === 'rooms' && currentBranch && <SortableContainer dndKitId="0083a7a4-6def-4a0a-8adc-74504e2c9852" containerType="regular" prevTag="motion.div" key="rooms" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} data-magicpath-id="16" data-magicpath-path="BookingModal.tsx">
                    {/* Date and Guest Inputs */}
                    <SortableContainer dndKitId="7b0a7b6b-aa7b-4206-8337-759165b1615d" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg mb-6" data-magicpath-id="17" data-magicpath-path="BookingModal.tsx">
                      <SortableContainer dndKitId="42a593ef-ac8b-46ee-87f5-3e736ad37afb" containerType="regular" prevTag="div" className="grid md:grid-cols-4 gap-4" data-magicpath-id="18" data-magicpath-path="BookingModal.tsx">
                        <SortableContainer dndKitId="c81fc095-3465-4162-9e86-dbdbacc36f3a" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="19" data-magicpath-path="BookingModal.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="20" data-magicpath-path="BookingModal.tsx">Check In</label>
                          <SortableContainer dndKitId="9d21cfbf-e774-4420-8b1d-b59062d995d7" containerType="regular" prevTag="div" className="relative" data-magicpath-id="21" data-magicpath-path="BookingModal.tsx">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="22" data-magicpath-path="BookingModal.tsx" />
                            <input type="date" value={formData.checkIn} onChange={e => setFormData({
                        ...formData,
                        checkIn: e.target.value
                      })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="23" data-magicpath-path="BookingModal.tsx" />
                          </SortableContainer>
                        </SortableContainer>
                        
                        <SortableContainer dndKitId="0e51ccb4-0a4d-426d-b50e-7632d8735284" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="24" data-magicpath-path="BookingModal.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="25" data-magicpath-path="BookingModal.tsx">Check Out</label>
                          <SortableContainer dndKitId="c6280f2f-74e1-4371-b3fc-325a53da78c3" containerType="regular" prevTag="div" className="relative" data-magicpath-id="26" data-magicpath-path="BookingModal.tsx">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="27" data-magicpath-path="BookingModal.tsx" />
                            <input type="date" value={formData.checkOut} onChange={e => setFormData({
                        ...formData,
                        checkOut: e.target.value
                      })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="28" data-magicpath-path="BookingModal.tsx" />
                          </SortableContainer>
                        </SortableContainer>

                        <SortableContainer dndKitId="99188d4a-1660-4994-abe6-255a5e4c11b9" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="29" data-magicpath-path="BookingModal.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="30" data-magicpath-path="BookingModal.tsx">Adults</label>
                          <select value={formData.adults} onChange={e => setFormData({
                      ...formData,
                      adults: parseInt(e.target.value)
                    })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded appearance-none" data-magicpath-id="31" data-magicpath-path="BookingModal.tsx">
                            {[1, 2, 3, 4].map(n => <option key={n} value={n} data-magicpath-id="32" data-magicpath-path="BookingModal.tsx">{n} Adult{n > 1 ? 's' : ''}</option>)}
                          </select>
                        </SortableContainer>

                        <SortableContainer dndKitId="2cc20faa-ad36-4cd6-a92b-496ade7614fe" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="33" data-magicpath-path="BookingModal.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="34" data-magicpath-path="BookingModal.tsx">Children</label>
                          <select value={formData.children} onChange={e => setFormData({
                      ...formData,
                      children: parseInt(e.target.value)
                    })} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded appearance-none" data-magicpath-id="35" data-magicpath-path="BookingModal.tsx">
                            {[0, 1, 2, 3].map(n => <option key={n} value={n} data-magicpath-id="36" data-magicpath-path="BookingModal.tsx">{n} Child{n !== 1 ? 'ren' : ''}</option>)}
                          </select>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>

                    {/* Room List */}
                    <SortableContainer dndKitId="d12156fd-7880-4e96-9edd-463c26b69965" containerType="collection" prevTag="div" className="space-y-4" data-magicpath-id="37" data-magicpath-path="BookingModal.tsx">
                      <h3 className="text-lg font-serif text-white" data-magicpath-id="38" data-magicpath-path="BookingModal.tsx">Available Rooms</h3>
                      {rooms.map(room => <div key={room.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="BookingModal.tsx">
                          <div className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="BookingModal.tsx">
                            <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="BookingModal.tsx" />
                            <div className="flex-1 p-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="BookingModal.tsx">
                              <h4 className="text-xl font-serif text-white mb-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="43" data-magicpath-path="BookingModal.tsx">{room.name}</h4>
                              <p className="text-zinc-400 text-sm mb-3" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:unknown" data-magicpath-id="44" data-magicpath-path="BookingModal.tsx">{room.description}</p>
                              <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mb-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="BookingModal.tsx">
                                <span className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="maxGuests:unknown" data-magicpath-id="46" data-magicpath-path="BookingModal.tsx">
                                  <Users size={14} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="47" data-magicpath-path="BookingModal.tsx" /> Up to {room.maxGuests} guests
                                </span>
                                <span data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="size:unknown" data-magicpath-id="48" data-magicpath-path="BookingModal.tsx">{room.size}</span>
                              </div>
                              <div className="flex items-center justify-between" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="BookingModal.tsx">
                                <div data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="BookingModal.tsx">
                                  <span className="text-2xl font-serif text-amber-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="BookingModal.tsx">₦{room.price.toLocaleString()}</span>
                                  <span className="text-zinc-500 text-sm ml-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="BookingModal.tsx">/ night</span>
                                </div>
                                <button className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm font-medium" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="BookingModal.tsx">
                                  Book Now <ChevronRight size={16} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="54" data-magicpath-path="BookingModal.tsx" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </SortableContainer>
                  </SortableContainer>}
              </AnimatePresence>
            </SortableContainer>
          </SortableContainer>
        </>}
    </AnimatePresence>;
};