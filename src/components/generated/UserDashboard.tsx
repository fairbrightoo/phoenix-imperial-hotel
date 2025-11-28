import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User as UserIcon, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from './AuthContext';
import { MOCK_BOOKINGS, ROOMS_BY_BRANCH, BRANCHES } from './mockData';
interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  mpid?: string;
}
export const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');

  // Filter bookings for current user
  const userBookings = MOCK_BOOKINGS.filter(b => b.userId === user?.id);
  const handleLogout = () => {
    logout();
    onClose();
  };
  const getBookingDetails = (booking: typeof MOCK_BOOKINGS[0]) => {
    const branch = BRANCHES.find(b => b.id === booking.branchId);
    const room = ROOMS_BY_BRANCH[booking.branchId]?.find(r => r.id === booking.roomId);
    return {
      branch,
      room
    };
  };
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="UserDashboard.tsx">
      {isOpen && <>
          {/* Backdrop */}
          <motion.div data-magicpath-motion-tag="motion.div" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" data-magicpath-id="1" data-magicpath-path="UserDashboard.tsx" />

          {/* Modal */}
          <SortableContainer dndKitId="be201996-1e21-4b45-8f64-f262ae7449d5" containerType="regular" prevTag="motion.div" initial={{
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
      }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800" data-magicpath-id="2" data-magicpath-path="UserDashboard.tsx">
            {/* Header */}
            <SortableContainer dndKitId="fa506fd3-f5e0-4264-bd10-f88dd96bba6d" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="3" data-magicpath-path="UserDashboard.tsx">
              <SortableContainer dndKitId="ce76f821-0854-46a4-82f9-9ec31d9f9110" containerType="regular" prevTag="div" data-magicpath-id="4" data-magicpath-path="UserDashboard.tsx">
                <h2 className="text-2xl font-serif text-white" data-magicpath-id="5" data-magicpath-path="UserDashboard.tsx">My Account</h2>
                <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="6" data-magicpath-path="UserDashboard.tsx">{user?.email}</p>
              </SortableContainer>
              <SortableContainer dndKitId="a553ce68-e3b2-4012-bbce-5e242c279d26" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="7" data-magicpath-path="UserDashboard.tsx">
                <X size={20} data-magicpath-id="8" data-magicpath-path="UserDashboard.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Tabs */}
            <SortableContainer dndKitId="56eb9e40-4cd6-4691-acd3-6411881663b0" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="9" data-magicpath-path="UserDashboard.tsx">
              <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="10" data-magicpath-path="UserDashboard.tsx">
                My Bookings
              </button>
              <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="11" data-magicpath-path="UserDashboard.tsx">
                Profile
              </button>
            </SortableContainer>

            {/* Content */}
            <SortableContainer dndKitId="82243366-a63c-49e0-b177-694ffca7eb2e" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="12" data-magicpath-path="UserDashboard.tsx">
              <AnimatePresence mode="wait" data-magicpath-id="13" data-magicpath-path="UserDashboard.tsx">
                {/* Bookings Tab */}
                {activeTab === 'bookings' && <SortableContainer dndKitId="7ab09420-e299-48e5-a5bd-a720c6273b4a" containerType="regular" prevTag="motion.div" key="bookings" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} className="space-y-4" data-magicpath-id="14" data-magicpath-path="UserDashboard.tsx">
                    {userBookings.length === 0 ? <SortableContainer dndKitId="b831c7dd-692e-4c73-a837-1099d67ee2a2" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="15" data-magicpath-path="UserDashboard.tsx">
                        <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" data-magicpath-id="16" data-magicpath-path="UserDashboard.tsx" />
                        <p className="text-zinc-400" data-magicpath-id="17" data-magicpath-path="UserDashboard.tsx">No bookings yet</p>
                        <p className="text-zinc-600 text-sm mt-2" data-magicpath-id="18" data-magicpath-path="UserDashboard.tsx">
                          Start exploring our branches and book your stay!
                        </p>
                      </SortableContainer> : userBookings.map(booking => {
                const {
                  branch,
                  room
                } = getBookingDetails(booking);
                return <SortableContainer dndKitId="ed34c05f-77f9-4cc6-b6c3-d3b9309a68d2" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="19" data-magicpath-path="UserDashboard.tsx">
                            <SortableContainer dndKitId="c4b0e1c6-257e-4c5b-aeb3-2be76f01eac6" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="UserDashboard.tsx">
                              {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="UserDashboard.tsx" />}
                              <SortableContainer dndKitId="a84c9c20-0165-45e6-a45e-b7d6bb73baf2" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="UserDashboard.tsx">
                                <SortableContainer dndKitId="f36efa32-068a-415c-92f8-515a78b016d5" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="UserDashboard.tsx">
                                  <SortableContainer dndKitId="d9362d63-2fc5-4652-aa26-8d4050cc2a29" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="UserDashboard.tsx">
                                    <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="UserDashboard.tsx">
                                      {room?.name}
                                    </h4>
                                    <SortableContainer dndKitId="0199e779-1bc9-4afc-9060-787c59f3026e" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="UserDashboard.tsx">
                                      <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="UserDashboard.tsx" />
                                      <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="UserDashboard.tsx">{branch?.name}</span>
                                    </SortableContainer>
                                  </SortableContainer>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="29" data-magicpath-path="UserDashboard.tsx">
                                    {booking.status}
                                  </span>
                                </SortableContainer>

                                <SortableContainer dndKitId="8c2bc7c9-6109-446c-aff6-1756df236f89" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="UserDashboard.tsx">
                                  <SortableContainer dndKitId="93c4f1f3-1bbf-4bf0-ada6-b7c7ac7f5803" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="31" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="UserDashboard.tsx">Check In</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="33" data-magicpath-path="UserDashboard.tsx">{booking.checkIn}</p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="80fd591c-ff44-4201-9c4b-c0afb6402028" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="35" data-magicpath-path="UserDashboard.tsx">Check Out</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="36" data-magicpath-path="UserDashboard.tsx">{booking.checkOut}</p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="ed8aa69e-dcd5-46cc-aa6e-6286087bc2ed" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="UserDashboard.tsx">Guests</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="UserDashboard.tsx">
                                      {booking.guests.adults} Adults, {booking.guests.children} Children
                                    </p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="45519e56-7da0-4385-8dd8-4e365e7224d3" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="UserDashboard.tsx">Total</p>
                                    <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="UserDashboard.tsx">
                                      ₦{booking.totalPrice.toLocaleString()}
                                    </p>
                                  </SortableContainer>
                                </SortableContainer>

                                <SortableContainer dndKitId="4faf71ca-55f0-41bb-ab98-4019425dba74" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="UserDashboard.tsx">
                                  <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded transition-colors" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="UserDashboard.tsx">
                                    View Details
                                  </button>
                                  {booking.status === 'confirmed' && <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="UserDashboard.tsx">
                                      Cancel Booking
                                    </button>}
                                </SortableContainer>
                              </SortableContainer>
                            </SortableContainer>
                          </SortableContainer>;
              })}
                  </SortableContainer>}

                {/* Profile Tab */}
                {activeTab === 'profile' && <SortableContainer dndKitId="380e0b80-a30a-483e-afec-8735c0fd121c" containerType="regular" prevTag="motion.div" key="profile" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} className="space-y-6" data-magicpath-id="46" data-magicpath-path="UserDashboard.tsx">
                    {/* User Info */}
                    <SortableContainer dndKitId="78556414-fe77-4edc-9883-3933ecf067c1" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg p-6" data-magicpath-id="47" data-magicpath-path="UserDashboard.tsx">
                      <SortableContainer dndKitId="ad132016-f67a-4c6a-8dac-6d4c9d9b44b7" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="48" data-magicpath-path="UserDashboard.tsx">
                        <SortableContainer dndKitId="8154514e-e36a-4b6c-bfa4-b0d3f5cee307" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="49" data-magicpath-path="UserDashboard.tsx">
                          <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="50" data-magicpath-path="UserDashboard.tsx" />
                        </SortableContainer>
                        <SortableContainer dndKitId="79f63f97-1181-4236-a581-bfa3b7873ddb" containerType="regular" prevTag="div" data-magicpath-id="51" data-magicpath-path="UserDashboard.tsx">
                          <h3 className="text-xl font-serif text-white" data-magicpath-id="52" data-magicpath-path="UserDashboard.tsx">{user?.name}</h3>
                          <p className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="UserDashboard.tsx">{user?.email}</p>
                          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="54" data-magicpath-path="UserDashboard.tsx">
                            {user?.role.replace('_', ' ')}
                          </p>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="a9162c43-8d4c-4beb-986a-79ee5b7c4855" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="55" data-magicpath-path="UserDashboard.tsx">
                        <SortableContainer dndKitId="ee4e2cac-be57-444a-9f2e-33092a8f5a0b" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="56" data-magicpath-path="UserDashboard.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="57" data-magicpath-path="UserDashboard.tsx">Phone</label>
                          <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="58" data-magicpath-path="UserDashboard.tsx" />
                        </SortableContainer>
                        <SortableContainer dndKitId="3663444e-6e25-4e7f-8970-ef3d280a8948" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="59" data-magicpath-path="UserDashboard.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="60" data-magicpath-path="UserDashboard.tsx">
                            Member Since
                          </label>
                          <input type="text" value={user?.createdAt} disabled className="w-full bg-zinc-900 border border-zinc-700 text-zinc-500 px-4 py-2.5 text-sm rounded" data-magicpath-id="61" data-magicpath-path="UserDashboard.tsx" />
                        </SortableContainer>
                      </SortableContainer>

                      <button className="mt-6 w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium" data-magicpath-id="62" data-magicpath-path="UserDashboard.tsx">
                        Update Profile
                      </button>
                    </SortableContainer>

                    {/* Stats */}
                    <SortableContainer dndKitId="208ccc9b-3f0c-4e57-a8ec-17da88f11d84" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="63" data-magicpath-path="UserDashboard.tsx">
                      <SortableContainer dndKitId="01299bb3-11f7-46af-9cd3-fb17bdf75c6a" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="64" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="65" data-magicpath-path="UserDashboard.tsx">
                          {userBookings.length}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="66" data-magicpath-path="UserDashboard.tsx">
                          Total Bookings
                        </div>
                      </SortableContainer>
                      <SortableContainer dndKitId="89786d9e-d937-4a8e-9738-3868b9a0984b" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="67" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="68" data-magicpath-path="UserDashboard.tsx">
                          {userBookings.filter(b => b.status === 'confirmed').length}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="69" data-magicpath-path="UserDashboard.tsx">
                          Confirmed
                        </div>
                      </SortableContainer>
                      <SortableContainer dndKitId="7a306d77-cf4a-41dd-96bb-6a45a8a3b242" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="70" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="71" data-magicpath-path="UserDashboard.tsx">
                          ₦{userBookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="72" data-magicpath-path="UserDashboard.tsx">
                          Total Spent
                        </div>
                      </SortableContainer>
                    </SortableContainer>

                    {/* Logout */}
                    <SortableContainer dndKitId="6fe65cf8-3534-4956-8cda-674e9f4b96fe" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="73" data-magicpath-path="UserDashboard.tsx">
                      <LogOut size={18} data-magicpath-id="74" data-magicpath-path="UserDashboard.tsx" />
                      Logout
                    </SortableContainer>
                  </SortableContainer>}
              </AnimatePresence>
            </SortableContainer>
          </SortableContainer>
        </>}
    </AnimatePresence>;
};