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
          <SortableContainer dndKitId="28ae99d3-388a-4215-81c4-ba835b0d6ea5" containerType="regular" prevTag="motion.div" initial={{
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
            <SortableContainer dndKitId="d9073e54-e8e6-4a02-b8a2-6afcc8855afd" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="3" data-magicpath-path="UserDashboard.tsx">
              <SortableContainer dndKitId="9ba29c00-c382-4cb0-8236-a78ebf20102a" containerType="regular" prevTag="div" data-magicpath-id="4" data-magicpath-path="UserDashboard.tsx">
                <h2 className="text-2xl font-serif text-white" data-magicpath-id="5" data-magicpath-path="UserDashboard.tsx">My Account</h2>
                <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="6" data-magicpath-path="UserDashboard.tsx">{user?.email}</p>
              </SortableContainer>
              <SortableContainer dndKitId="527b2444-3ecd-44c5-99af-3fb54893a2e5" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="7" data-magicpath-path="UserDashboard.tsx">
                <X size={20} data-magicpath-id="8" data-magicpath-path="UserDashboard.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Tabs */}
            <SortableContainer dndKitId="cbe76c50-596e-4338-a2ad-a66753de3618" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="9" data-magicpath-path="UserDashboard.tsx">
              <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="10" data-magicpath-path="UserDashboard.tsx">
                My Bookings
              </button>
              <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="11" data-magicpath-path="UserDashboard.tsx">
                Profile
              </button>
            </SortableContainer>

            {/* Content */}
            <SortableContainer dndKitId="847ee1c4-76ca-4c12-b057-6128fbd09fe0" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="12" data-magicpath-path="UserDashboard.tsx">
              <AnimatePresence mode="wait" data-magicpath-id="13" data-magicpath-path="UserDashboard.tsx">
                {/* Bookings Tab */}
                {activeTab === 'bookings' && <SortableContainer dndKitId="327cdbfe-8aaa-4d9e-a403-63f06ecbfbbb" containerType="regular" prevTag="motion.div" key="bookings" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} className="space-y-4" data-magicpath-id="14" data-magicpath-path="UserDashboard.tsx">
                    {userBookings.length === 0 ? <SortableContainer dndKitId="1630e123-2a1f-436e-885c-a70a36d45b61" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="15" data-magicpath-path="UserDashboard.tsx">
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
                return <SortableContainer dndKitId="74fb007b-2888-45e2-a8eb-e9c62e835189" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="19" data-magicpath-path="UserDashboard.tsx">
                            <SortableContainer dndKitId="41d04084-5475-45a5-abd3-749be6acd2bb" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="UserDashboard.tsx">
                              {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="UserDashboard.tsx" />}
                              <SortableContainer dndKitId="a387137b-bf21-421b-b574-dd71d56bc559" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="UserDashboard.tsx">
                                <SortableContainer dndKitId="9e0f5937-0451-42ed-bee5-14fef03e791e" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="UserDashboard.tsx">
                                  <SortableContainer dndKitId="3688dc7f-babd-4e92-ad9c-17acb8e1c32a" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="UserDashboard.tsx">
                                    <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="UserDashboard.tsx">
                                      {room?.name}
                                    </h4>
                                    <SortableContainer dndKitId="17b331f8-9f00-432f-8212-438d244c4ee6" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="UserDashboard.tsx">
                                      <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="UserDashboard.tsx" />
                                      <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="UserDashboard.tsx">{branch?.name}</span>
                                    </SortableContainer>
                                  </SortableContainer>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="29" data-magicpath-path="UserDashboard.tsx">
                                    {booking.status}
                                  </span>
                                </SortableContainer>

                                <SortableContainer dndKitId="07f28746-2b86-4207-a10d-5cdc6d5e5c2a" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="UserDashboard.tsx">
                                  <SortableContainer dndKitId="b8621833-7991-4e4a-82d1-114da456769e" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="31" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="UserDashboard.tsx">Check In</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="33" data-magicpath-path="UserDashboard.tsx">{booking.checkIn}</p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="f0e4dbea-962d-48cf-bac9-d07ee9a0b187" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="35" data-magicpath-path="UserDashboard.tsx">Check Out</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="36" data-magicpath-path="UserDashboard.tsx">{booking.checkOut}</p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="aa661fa1-c1ab-4b8d-b63a-4798e9707972" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="38" data-magicpath-path="UserDashboard.tsx">Guests</p>
                                    <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="UserDashboard.tsx">
                                      {booking.guests.adults} Adults, {booking.guests.children} Children
                                    </p>
                                  </SortableContainer>
                                  <SortableContainer dndKitId="252d9981-badf-4935-8a7e-b3241b907303" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="UserDashboard.tsx">
                                    <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="UserDashboard.tsx">Total</p>
                                    <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="UserDashboard.tsx">
                                      ₦{booking.totalPrice.toLocaleString()}
                                    </p>
                                  </SortableContainer>
                                </SortableContainer>

                                <SortableContainer dndKitId="d917cf8d-7e0d-4b3d-906b-8b288660fd4f" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="UserDashboard.tsx">
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
                {activeTab === 'profile' && <SortableContainer dndKitId="0ca3c3f1-b716-4221-9ffd-4f2719e77f7e" containerType="regular" prevTag="motion.div" key="profile" initial={{
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
                    <SortableContainer dndKitId="eb108f63-4e5e-4d2f-909c-d2f2bfe052f6" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg p-6" data-magicpath-id="47" data-magicpath-path="UserDashboard.tsx">
                      <SortableContainer dndKitId="e3f13a76-8cd0-477e-a0e5-9e86821e32c4" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="48" data-magicpath-path="UserDashboard.tsx">
                        <SortableContainer dndKitId="eceed7f9-96b1-4cf4-9908-83647d07b777" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="49" data-magicpath-path="UserDashboard.tsx">
                          <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="50" data-magicpath-path="UserDashboard.tsx" />
                        </SortableContainer>
                        <SortableContainer dndKitId="8d2fd657-667a-449b-9962-13e71ca4b251" containerType="regular" prevTag="div" data-magicpath-id="51" data-magicpath-path="UserDashboard.tsx">
                          <h3 className="text-xl font-serif text-white" data-magicpath-id="52" data-magicpath-path="UserDashboard.tsx">{user?.name}</h3>
                          <p className="text-zinc-400" data-magicpath-id="53" data-magicpath-path="UserDashboard.tsx">{user?.email}</p>
                          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="54" data-magicpath-path="UserDashboard.tsx">
                            {user?.role.replace('_', ' ')}
                          </p>
                        </SortableContainer>
                      </SortableContainer>

                      <SortableContainer dndKitId="fab6ccc8-32d0-4474-bc9d-6e59b2ac4717" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="55" data-magicpath-path="UserDashboard.tsx">
                        <SortableContainer dndKitId="03a2e80f-c691-4f3f-a6c5-522724c5c436" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="56" data-magicpath-path="UserDashboard.tsx">
                          <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="57" data-magicpath-path="UserDashboard.tsx">Phone</label>
                          <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="58" data-magicpath-path="UserDashboard.tsx" />
                        </SortableContainer>
                        <SortableContainer dndKitId="c05a1117-c1ec-42d5-bad6-8ba047b1d5d1" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="59" data-magicpath-path="UserDashboard.tsx">
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
                    <SortableContainer dndKitId="0f96ea9f-fd37-4752-a2dc-2f5cce76405b" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="63" data-magicpath-path="UserDashboard.tsx">
                      <SortableContainer dndKitId="653a9bf1-60ad-48df-8ce4-b469d0a1d29a" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="64" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="65" data-magicpath-path="UserDashboard.tsx">
                          {userBookings.length}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="66" data-magicpath-path="UserDashboard.tsx">
                          Total Bookings
                        </div>
                      </SortableContainer>
                      <SortableContainer dndKitId="ebeb993a-82f8-4de5-89ac-1df064343bb3" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="67" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="68" data-magicpath-path="UserDashboard.tsx">
                          {userBookings.filter(b => b.status === 'confirmed').length}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="69" data-magicpath-path="UserDashboard.tsx">
                          Confirmed
                        </div>
                      </SortableContainer>
                      <SortableContainer dndKitId="983e006d-738d-455e-9c23-da23e91a02bb" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center" data-magicpath-id="70" data-magicpath-path="UserDashboard.tsx">
                        <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="71" data-magicpath-path="UserDashboard.tsx">
                          ₦{userBookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="72" data-magicpath-path="UserDashboard.tsx">
                          Total Spent
                        </div>
                      </SortableContainer>
                    </SortableContainer>

                    {/* Logout */}
                    <SortableContainer dndKitId="f0c64f9a-89d2-43eb-acc7-351c02cd146f" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="73" data-magicpath-path="UserDashboard.tsx">
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