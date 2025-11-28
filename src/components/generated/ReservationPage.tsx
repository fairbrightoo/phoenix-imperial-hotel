import { SortableContainer } from "@/dnd-kit/SortableContainer";
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
  mpid?: string;
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
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="ReservationPage.tsx">
      <SortableContainer dndKitId="c8de0ce1-27e9-4e5f-994e-8988328850bb" containerType="regular" prevTag="motion.div" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose} data-magicpath-id="1" data-magicpath-path="ReservationPage.tsx">
        <SortableContainer dndKitId="c2cb1a22-54aa-4e1c-8ba1-03ae9f66c3ba" containerType="regular" prevTag="motion.div" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative" data-magicpath-id="2" data-magicpath-path="ReservationPage.tsx">
          <SortableContainer dndKitId="1477181e-26e6-4364-bd5b-76aadfce12b9" containerType="regular" prevTag="button" onClick={onClose} className="absolute top-4 right-4 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full transition-colors" data-magicpath-id="3" data-magicpath-path="ReservationPage.tsx">
            <X size={20} data-magicpath-id="4" data-magicpath-path="ReservationPage.tsx" />
          </SortableContainer>

          {/* Header */}
          <SortableContainer dndKitId="ddc8c1d9-b297-4534-8f78-b9a0ac6dda04" containerType="regular" prevTag="div" className="bg-zinc-950 p-8 border-b border-zinc-800" data-magicpath-id="5" data-magicpath-path="ReservationPage.tsx">
            <h2 className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="6" data-magicpath-path="ReservationPage.tsx">Make a Reservation</h2>
            <p className="text-zinc-400" data-magicpath-id="7" data-magicpath-path="ReservationPage.tsx">Book your perfect stay in just a few steps</p>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-6" data-magicpath-id="8" data-magicpath-path="ReservationPage.tsx">
              {[1, 2, 3].map(s => <SortableContainer dndKitId="81d072ab-7c11-48d6-b001-bf1d9ef8e033" containerType="regular" prevTag="div" key={s} className="flex items-center flex-1" data-magicpath-id="9" data-magicpath-path="ReservationPage.tsx">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${step >= s ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-600'}`} data-magicpath-id="10" data-magicpath-path="ReservationPage.tsx">
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-amber-600' : 'bg-zinc-800'}`} data-magicpath-id="11" data-magicpath-path="ReservationPage.tsx" />}
                </SortableContainer>)}
            </div>
            <SortableContainer dndKitId="b80eb1f1-80d1-433a-b087-34efb79dc766" containerType="regular" prevTag="div" className="flex justify-between mt-2 text-xs text-zinc-500" data-magicpath-id="12" data-magicpath-path="ReservationPage.tsx">
              <span className={step >= 1 ? 'text-amber-400' : ''} data-magicpath-id="13" data-magicpath-path="ReservationPage.tsx">Select Branch</span>
              <span className={step >= 2 ? 'text-amber-400' : ''} data-magicpath-id="14" data-magicpath-path="ReservationPage.tsx">Choose Room & Dates</span>
              <span className={step >= 3 ? 'text-amber-400' : ''} data-magicpath-id="15" data-magicpath-path="ReservationPage.tsx">Confirm & Pay</span>
            </SortableContainer>
          </SortableContainer>

          {/* Content */}
          <SortableContainer dndKitId="952893b7-50d0-4c44-8693-589342073f7f" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="16" data-magicpath-path="ReservationPage.tsx">
            {/* Step 1: Branch Selection */}
            {step === 1 && <SortableContainer dndKitId="be3ce337-cc1b-4b09-9617-c3b6f218fe39" containerType="regular" prevTag="motion.div" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} data-magicpath-id="17" data-magicpath-path="ReservationPage.tsx">
                <h3 className="text-2xl font-serif text-white mb-6" data-magicpath-id="18" data-magicpath-path="ReservationPage.tsx">Select Your Branch</h3>
                <SortableContainer dndKitId="232832ad-55be-4f99-bde6-1c65347aabb0" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="19" data-magicpath-path="ReservationPage.tsx">
                  {branches.map(branch => <motion.button data-magicpath-motion-tag="motion.button" key={branch.id} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleBranchSelect(branch.id)} className="bg-zinc-800 border-2 border-zinc-700 hover:border-amber-500 p-6 rounded-lg text-left transition-all group" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="ReservationPage.tsx">
                      <div className="flex items-start gap-4" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="ReservationPage.tsx">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="ReservationPage.tsx">
                          <Building2 className="text-amber-500" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="ReservationPage.tsx" />
                        </div>
                        <div className="flex-1" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="ReservationPage.tsx">
                          <h4 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="25" data-magicpath-path="ReservationPage.tsx">
                            {branch.name}
                          </h4>
                          <p className="text-zinc-400 text-sm mt-2 flex items-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="address:unknown" data-magicpath-id="26" data-magicpath-path="ReservationPage.tsx">
                            <MapPin size={14} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="ReservationPage.tsx" />
                            {branch.address}
                          </p>
                          <p className="text-zinc-400 text-sm mt-1 flex items-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="phone:unknown" data-magicpath-id="28" data-magicpath-path="ReservationPage.tsx">
                            <Phone size={14} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="ReservationPage.tsx" />
                            {branch.phone}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-medium" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="ReservationPage.tsx">
                            <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="31" data-magicpath-path="ReservationPage.tsx">Select Branch</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="ReservationPage.tsx" />
                          </div>
                        </div>
                      </div>
                    </motion.button>)}
                </SortableContainer>
              </SortableContainer>}

            {/* Step 2: Room and Date Selection */}
            {step === 2 && <SortableContainer dndKitId="5698c375-d708-4a9b-8e94-9901d5f93631" containerType="regular" prevTag="motion.div" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} data-magicpath-id="33" data-magicpath-path="ReservationPage.tsx">
                <SortableContainer dndKitId="c8f168ad-e2c4-4090-b7a2-c589c58ef67b" containerType="regular" prevTag="div" className="flex items-center justify-between mb-6" data-magicpath-id="34" data-magicpath-path="ReservationPage.tsx">
                  <h3 className="text-2xl font-serif text-white" data-magicpath-id="35" data-magicpath-path="ReservationPage.tsx">Choose Room & Dates</h3>
                  <button onClick={() => setStep(1)} className="text-zinc-400 hover:text-amber-400 text-sm" data-magicpath-id="36" data-magicpath-path="ReservationPage.tsx">
                    Change Branch
                  </button>
                </SortableContainer>

                {/* Date Selection */}
                <SortableContainer dndKitId="087a5283-be08-4037-89e2-b84fbe0e77ab" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg mb-6" data-magicpath-id="37" data-magicpath-path="ReservationPage.tsx">
                  <h4 className="text-lg font-serif text-white mb-4" data-magicpath-id="38" data-magicpath-path="ReservationPage.tsx">Your Stay</h4>
                  <SortableContainer dndKitId="d1d56c38-281c-4ae7-af6c-077c1cbc3976" containerType="regular" prevTag="div" className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" data-magicpath-id="39" data-magicpath-path="ReservationPage.tsx">
                    <SortableContainer dndKitId="7d90ad99-4d9b-4c64-a0ea-680d7579bde0" containerType="regular" prevTag="div" data-magicpath-id="40" data-magicpath-path="ReservationPage.tsx">
                      <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider" data-magicpath-id="41" data-magicpath-path="ReservationPage.tsx">Check-in</label>
                      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" min={new Date().toISOString().split('T')[0]} data-magicpath-id="42" data-magicpath-path="ReservationPage.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="690d1d3a-501a-4a29-a2a9-3b2a734c198f" containerType="regular" prevTag="div" data-magicpath-id="43" data-magicpath-path="ReservationPage.tsx">
                      <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider" data-magicpath-id="44" data-magicpath-path="ReservationPage.tsx">Check-out</label>
                      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" min={checkIn || new Date().toISOString().split('T')[0]} data-magicpath-id="45" data-magicpath-path="ReservationPage.tsx" />
                    </SortableContainer>
                    <SortableContainer dndKitId="c83cc463-a7e1-4b4a-84e2-88e95f932599" containerType="regular" prevTag="div" data-magicpath-id="46" data-magicpath-path="ReservationPage.tsx">
                      <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider" data-magicpath-id="47" data-magicpath-path="ReservationPage.tsx">Adults</label>
                      <select value={adults} onChange={e => setAdults(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="48" data-magicpath-path="ReservationPage.tsx">
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} data-magicpath-id="49" data-magicpath-path="ReservationPage.tsx">{n}</option>)}
                      </select>
                    </SortableContainer>
                    <SortableContainer dndKitId="01b17581-cbac-4f84-b271-d5f0ddd58986" containerType="regular" prevTag="div" data-magicpath-id="50" data-magicpath-path="ReservationPage.tsx">
                      <label className="text-xs text-zinc-400 mb-2 block uppercase tracking-wider" data-magicpath-id="51" data-magicpath-path="ReservationPage.tsx">Children</label>
                      <select value={children} onChange={e => setChildren(Number(e.target.value))} className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:border-amber-500" data-magicpath-id="52" data-magicpath-path="ReservationPage.tsx">
                        {[0, 1, 2, 3, 4].map(n => <option key={n} value={n} data-magicpath-id="53" data-magicpath-path="ReservationPage.tsx">{n}</option>)}
                      </select>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>

                {/* Available Rooms */}
                <h4 className="text-lg font-serif text-white mb-4" data-magicpath-id="54" data-magicpath-path="ReservationPage.tsx">Available Rooms</h4>
                <SortableContainer dndKitId="6ae6cc5e-d425-4c12-aeea-a33ac40122ab" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="55" data-magicpath-path="ReservationPage.tsx">
                  {availableRooms.map(room => <motion.div data-magicpath-motion-tag="motion.div" key={room.id} whileHover={{
                y: -4
              }} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500 transition-all" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="ReservationPage.tsx">
                      <div className="aspect-video bg-zinc-900 relative overflow-hidden" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="57" data-magicpath-path="ReservationPage.tsx">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="58" data-magicpath-path="ReservationPage.tsx" />
                      </div>
                      <div className="p-6" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="59" data-magicpath-path="ReservationPage.tsx">
                        <h5 className="text-xl font-serif text-white mb-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="60" data-magicpath-path="ReservationPage.tsx">{room.name}</h5>
                        <p className="text-zinc-400 text-sm mb-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:unknown" data-magicpath-id="61" data-magicpath-path="ReservationPage.tsx">{room.description}</p>
                        <div className="flex items-center justify-between text-sm text-zinc-400 mb-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="ReservationPage.tsx">
                          <span className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="maxGuests:unknown" data-magicpath-id="63" data-magicpath-path="ReservationPage.tsx">
                            <Users size={14} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="64" data-magicpath-path="ReservationPage.tsx" />
                            {room.maxGuests} guests
                          </span>
                          <span data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="size:unknown" data-magicpath-id="65" data-magicpath-path="ReservationPage.tsx">{room.size}</span>
                        </div>
                        <div className="flex items-end justify-between" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="66" data-magicpath-path="ReservationPage.tsx">
                          <div data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="67" data-magicpath-path="ReservationPage.tsx">
                            <p className="text-xs text-zinc-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="68" data-magicpath-path="ReservationPage.tsx">Price per night</p>
                            <p className="text-2xl font-bold text-amber-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="69" data-magicpath-path="ReservationPage.tsx">₦{room.price.toLocaleString()}</p>
                          </div>
                          <button onClick={() => handleRoomSelect(room)} disabled={!checkIn || !checkOut} className="bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-2 rounded transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="70" data-magicpath-path="ReservationPage.tsx">
                            Select
                          </button>
                        </div>
                      </div>
                    </motion.div>)}
                </SortableContainer>
              </SortableContainer>}

            {/* Step 3: Confirmation */}
            {step === 3 && selectedRoom && <SortableContainer dndKitId="66f779e2-0c2e-4312-9aa6-1ea67fa6262e" containerType="regular" prevTag="motion.div" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} data-magicpath-id="71" data-magicpath-path="ReservationPage.tsx">
                <h3 className="text-2xl font-serif text-white mb-6" data-magicpath-id="72" data-magicpath-path="ReservationPage.tsx">Confirm Your Reservation</h3>

                {bookingConfirmed ? <SortableContainer dndKitId="983c9ba9-8249-4805-bd82-56c02147ac2d" containerType="regular" prevTag="div" className="bg-green-500/10 border border-green-500/30 p-8 rounded-lg text-center" data-magicpath-id="73" data-magicpath-path="ReservationPage.tsx">
                    <SortableContainer dndKitId="e24bcc23-537f-4591-9e0a-67dec3572878" containerType="regular" prevTag="div" className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4" data-magicpath-id="74" data-magicpath-path="ReservationPage.tsx">
                      <Check className="text-green-500" size={32} data-magicpath-id="75" data-magicpath-path="ReservationPage.tsx" />
                    </SortableContainer>
                    <h4 className="text-2xl font-serif text-white mb-2" data-magicpath-id="76" data-magicpath-path="ReservationPage.tsx">Booking Confirmed!</h4>
                    <p className="text-zinc-400" data-magicpath-id="77" data-magicpath-path="ReservationPage.tsx">Your reservation has been successfully created.</p>
                  </SortableContainer> : <SortableContainer dndKitId="d22a9054-ca75-4634-b0eb-028829e1a796" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="78" data-magicpath-path="ReservationPage.tsx">
                    {/* Booking Summary */}
                    <SortableContainer dndKitId="27eab3ba-3ea8-4acd-baf7-554353985a28" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg" data-magicpath-id="79" data-magicpath-path="ReservationPage.tsx">
                      <h4 className="text-lg font-serif text-white mb-4" data-magicpath-id="80" data-magicpath-path="ReservationPage.tsx">Booking Summary</h4>
                      <SortableContainer dndKitId="ed7e2dd9-2fd4-40e6-b7d0-0ea458b6e63d" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="81" data-magicpath-path="ReservationPage.tsx">
                        <SortableContainer dndKitId="c3044d31-0e75-4306-b50c-6091372efdfb" containerType="regular" prevTag="div" data-magicpath-id="82" data-magicpath-path="ReservationPage.tsx">
                          <p className="text-xs text-zinc-500 uppercase" data-magicpath-id="83" data-magicpath-path="ReservationPage.tsx">Branch</p>
                          <p className="text-white" data-magicpath-id="84" data-magicpath-path="ReservationPage.tsx">{BRANCHES.find(b => b.id === selectedBranch)?.name}</p>
                        </SortableContainer>
                        <SortableContainer dndKitId="d4e012d7-58ac-4b9d-9478-11392c17e90a" containerType="regular" prevTag="div" data-magicpath-id="85" data-magicpath-path="ReservationPage.tsx">
                          <p className="text-xs text-zinc-500 uppercase" data-magicpath-id="86" data-magicpath-path="ReservationPage.tsx">Room</p>
                          <p className="text-white" data-magicpath-id="87" data-magicpath-path="ReservationPage.tsx">{selectedRoom.name}</p>
                        </SortableContainer>
                        <SortableContainer dndKitId="c9c35b15-8bc9-4c80-aae2-4e3f6d6572b5" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4" data-magicpath-id="88" data-magicpath-path="ReservationPage.tsx">
                          <SortableContainer dndKitId="61f3a740-ac95-4b4f-8252-b90f8de94721" containerType="regular" prevTag="div" data-magicpath-id="89" data-magicpath-path="ReservationPage.tsx">
                            <p className="text-xs text-zinc-500 uppercase" data-magicpath-id="90" data-magicpath-path="ReservationPage.tsx">Check-in</p>
                            <p className="text-white" data-magicpath-id="91" data-magicpath-path="ReservationPage.tsx">{checkIn}</p>
                          </SortableContainer>
                          <SortableContainer dndKitId="193a1b9e-6b49-4002-850e-3b1c2277df9c" containerType="regular" prevTag="div" data-magicpath-id="92" data-magicpath-path="ReservationPage.tsx">
                            <p className="text-xs text-zinc-500 uppercase" data-magicpath-id="93" data-magicpath-path="ReservationPage.tsx">Check-out</p>
                            <p className="text-white" data-magicpath-id="94" data-magicpath-path="ReservationPage.tsx">{checkOut}</p>
                          </SortableContainer>
                        </SortableContainer>
                        <SortableContainer dndKitId="0172b916-9fc1-492e-a63f-a21c7393b237" containerType="regular" prevTag="div" data-magicpath-id="95" data-magicpath-path="ReservationPage.tsx">
                          <p className="text-xs text-zinc-500 uppercase" data-magicpath-id="96" data-magicpath-path="ReservationPage.tsx">Guests</p>
                          <p className="text-white" data-magicpath-id="97" data-magicpath-path="ReservationPage.tsx">{adults} Adults, {children} Children</p>
                        </SortableContainer>
                        <SortableContainer dndKitId="d488f8f5-6c9c-4fbb-8bb3-b237f6cae051" containerType="regular" prevTag="div" className="border-t border-zinc-700 pt-4" data-magicpath-id="98" data-magicpath-path="ReservationPage.tsx">
                          <p className="text-xs text-zinc-500 uppercase mb-1" data-magicpath-id="99" data-magicpath-path="ReservationPage.tsx">Total Price</p>
                          <p className="text-3xl font-bold text-amber-500" data-magicpath-id="100" data-magicpath-path="ReservationPage.tsx">₦{calculateTotal().toLocaleString()}</p>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>

                    {/* Guest Details */}
                    <SortableContainer dndKitId="ab7da3d2-1371-4816-85a1-a9168dd79a1f" containerType="regular" prevTag="div" className="space-y-6" data-magicpath-id="101" data-magicpath-path="ReservationPage.tsx">
                      <SortableContainer dndKitId="a1f85bbd-07c8-42f8-bdb5-14ceee338eeb" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg" data-magicpath-id="102" data-magicpath-path="ReservationPage.tsx">
                        <h4 className="text-lg font-serif text-white mb-4" data-magicpath-id="103" data-magicpath-path="ReservationPage.tsx">Guest Information</h4>
                        {isAuthenticated ? <SortableContainer dndKitId="4ecb7c95-56f4-4397-b1ab-c1c398162697" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="104" data-magicpath-path="ReservationPage.tsx">
                            <p className="text-white" data-magicpath-id="105" data-magicpath-path="ReservationPage.tsx">{user?.name}</p>
                            <p className="text-zinc-400 text-sm" data-magicpath-id="106" data-magicpath-path="ReservationPage.tsx">{user?.email}</p>
                          </SortableContainer> : <p className="text-zinc-400 text-sm" data-magicpath-id="107" data-magicpath-path="ReservationPage.tsx">Please sign in to complete your booking</p>}
                      </SortableContainer>

                      <SortableContainer dndKitId="81219c40-8d6a-46fa-b4c0-341e714eb268" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg" data-magicpath-id="108" data-magicpath-path="ReservationPage.tsx">
                        <h4 className="text-lg font-serif text-white mb-4" data-magicpath-id="109" data-magicpath-path="ReservationPage.tsx">Special Requests</h4>
                        <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Any special requirements or preferences..." className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 resize-none" rows={4} data-magicpath-id="110" data-magicpath-path="ReservationPage.tsx" />
                      </SortableContainer>

                      <SortableContainer dndKitId="78b72074-f466-44c1-902e-77179627c3ac" containerType="regular" prevTag="div" className="flex gap-4" data-magicpath-id="111" data-magicpath-path="ReservationPage.tsx">
                        <button onClick={() => setStep(2)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded transition-colors" data-magicpath-id="112" data-magicpath-path="ReservationPage.tsx">
                          Back
                        </button>
                        <button onClick={handleConfirmBooking} disabled={!isAuthenticated} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors font-medium" data-magicpath-id="113" data-magicpath-path="ReservationPage.tsx">
                          Confirm Booking
                        </button>
                      </SortableContainer>
                    </SortableContainer>
                  </SortableContainer>}
              </SortableContainer>}
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </AnimatePresence>;
};