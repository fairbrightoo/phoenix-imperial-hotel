import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User as UserIcon, LogOut, Check, Star, Building2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useTenant } from './TenantContext';
import { MOCK_BOOKINGS, ROOMS_BY_BRANCH, BRANCHES } from './mockData';
interface CustomerDashboardProps {
  onClose: () => void;
  mpid?: string;
}
export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const {
    currentBranch
  } = useTenant();
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
  return <>
      {/* Header */}
      <SortableContainer dndKitId="032b77af-868d-4a6b-8bf8-905b571e8eca" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="0" data-magicpath-path="CustomerDashboard.tsx">
        <SortableContainer dndKitId="27cc3675-8947-499a-8db5-89c5e977d4a3" containerType="regular" prevTag="div" data-magicpath-id="1" data-magicpath-path="CustomerDashboard.tsx">
          <h2 className="text-2xl font-serif text-white" data-magicpath-id="2" data-magicpath-path="CustomerDashboard.tsx">My Account</h2>
          <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="3" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
        </SortableContainer>
        <SortableContainer dndKitId="0d7ed652-c1ce-4e10-8113-c5cbd3e3786e" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="4" data-magicpath-path="CustomerDashboard.tsx">
          <X size={20} data-magicpath-id="5" data-magicpath-path="CustomerDashboard.tsx" />
        </SortableContainer>
      </SortableContainer>

      {/* Tabs */}
      <SortableContainer dndKitId="8e863ca8-0b23-4523-ad6f-2dc86152c353" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="6" data-magicpath-path="CustomerDashboard.tsx">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="CustomerDashboard.tsx">
          My Bookings
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="8" data-magicpath-path="CustomerDashboard.tsx">
          Profile
        </button>
      </SortableContainer>

      {/* Content */}
      <SortableContainer dndKitId="76ec1e84-ba26-4039-9f84-593f62138666" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="9" data-magicpath-path="CustomerDashboard.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="CustomerDashboard.tsx">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && <SortableContainer dndKitId="77e745bb-10dd-48cf-a8ff-fae7da8b98d7" containerType="regular" prevTag="motion.div" key="bookings" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-4" data-magicpath-id="11" data-magicpath-path="CustomerDashboard.tsx">
              {/* Current Branch Notice */}
              {currentBranch && <SortableContainer dndKitId="08b3ab81-67fd-4975-8fbb-51fb7e16f332" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3" data-magicpath-id="12" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-amber-400" size={20} data-magicpath-id="13" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="05f7afce-8142-41a0-b3fb-6043faa59a10" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="CustomerDashboard.tsx">
                    <p className="text-amber-400 text-sm font-medium" data-magicpath-id="15" data-magicpath-path="CustomerDashboard.tsx">
                      Currently viewing {BRANCHES.find(b => b.id === currentBranch)?.city} branch
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5" data-magicpath-id="16" data-magicpath-path="CustomerDashboard.tsx">
                      You can switch branches anytime when booking. Your bookings from all branches appear below.
                    </p>
                  </SortableContainer>
                </SortableContainer>}

              {userBookings.length === 0 ? <SortableContainer dndKitId="11624abe-7e09-4e4c-b324-b3619bab4667" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="17" data-magicpath-path="CustomerDashboard.tsx">
                  <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" data-magicpath-id="18" data-magicpath-path="CustomerDashboard.tsx" />
                  <p className="text-zinc-400" data-magicpath-id="19" data-magicpath-path="CustomerDashboard.tsx">No bookings yet</p>
                  <p className="text-zinc-600 text-sm mt-2" data-magicpath-id="20" data-magicpath-path="CustomerDashboard.tsx">
                    Start exploring our branches and book your stay!
                  </p>
                </SortableContainer> : userBookings.map(booking => {
            const {
              branch,
              room
            } = getBookingDetails(booking);
            return <SortableContainer dndKitId="a59e9ab9-c15b-4e2f-b695-67e09fb9382b" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="CustomerDashboard.tsx">
                      <SortableContainer dndKitId="4cc39314-b2fc-4f56-a0ec-5ee4ea2d82e0" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="CustomerDashboard.tsx">
                        {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="CustomerDashboard.tsx" />}
                        <SortableContainer dndKitId="708d4693-bcf8-4597-b9bc-3f80addb4d49" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="CustomerDashboard.tsx">
                          <SortableContainer dndKitId="81a2d1c7-5eb3-4d78-b8f9-680c766c88f0" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="6761a398-b9f7-4154-aff6-72d128c7e5dd" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="CustomerDashboard.tsx">
                              <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="CustomerDashboard.tsx">{room?.name}</h4>
                              <SortableContainer dndKitId="882a28f7-64b8-4568-abd3-35852fd16730" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="CustomerDashboard.tsx">
                                <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="CustomerDashboard.tsx" />
                                <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="CustomerDashboard.tsx">{branch?.name}</span>
                              </SortableContainer>
                            </SortableContainer>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="31" data-magicpath-path="CustomerDashboard.tsx">
                              {booking.status}
                            </span>
                          </SortableContainer>

                          <SortableContainer dndKitId="a838d51d-12c7-43e9-9d19-a5beff618ed2" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="8153c7d4-ae84-491d-bbfd-1317093bba9c" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="CustomerDashboard.tsx">Check In</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="35" data-magicpath-path="CustomerDashboard.tsx">{booking.checkIn}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="c6de5039-3a80-44a8-8474-b241f3ce5616" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="CustomerDashboard.tsx">Check Out</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="38" data-magicpath-path="CustomerDashboard.tsx">{booking.checkOut}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="3486d366-e4b5-4226-99b5-245cb622b1fe" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="CustomerDashboard.tsx">Guests</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="CustomerDashboard.tsx">
                                {booking.guests.adults} Adults, {booking.guests.children} Children
                              </p>
                            </SortableContainer>
                            <SortableContainer dndKitId="697450e0-e8c9-4ad7-919d-93e9e23c22b3" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="CustomerDashboard.tsx">Total</p>
                              <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="CustomerDashboard.tsx">
                                ₦{booking.totalPrice.toLocaleString()}
                              </p>
                            </SortableContainer>
                          </SortableContainer>

                          <SortableContainer dndKitId="540ae8fd-0a92-4214-8163-36ddd63c19fe" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="CustomerDashboard.tsx">
                            <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded transition-colors" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="46" data-magicpath-path="CustomerDashboard.tsx">
                              View Details
                            </button>
                            {booking.status === 'confirmed' && <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded transition-colors" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="47" data-magicpath-path="CustomerDashboard.tsx">
                                Cancel Booking
                              </button>}
                          </SortableContainer>
                        </SortableContainer>
                      </SortableContainer>
                    </SortableContainer>;
          })}
            </SortableContainer>}

          {/* Profile Tab */}
          {activeTab === 'profile' && <SortableContainer dndKitId="396b21c5-53f3-4e1a-98fb-78210cee1d73" containerType="regular" prevTag="motion.div" key="profile" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-6" data-magicpath-id="48" data-magicpath-path="CustomerDashboard.tsx">
              {/* User Info */}
              <SortableContainer dndKitId="58cb4833-4517-4bf9-9354-aba5baed2df5" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="49" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="4b5c6677-1c80-4132-9d5e-7a4c5b3ed990" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="50" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="19911f58-1b01-4aaf-a127-add01cfb6eac" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CustomerDashboard.tsx">
                    <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="52" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="24217adb-70d5-4a6f-afca-3761bc0955ad" containerType="regular" prevTag="div" data-magicpath-id="53" data-magicpath-path="CustomerDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="54" data-magicpath-path="CustomerDashboard.tsx">{user?.name}</h3>
                    <p className="text-zinc-400" data-magicpath-id="55" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="56" data-magicpath-path="CustomerDashboard.tsx">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="58a896d9-9992-4433-ba2c-dd3708fc1857" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="57" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="3eeb8205-7899-4fe4-8c8b-bf8eabbbd221" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="58" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="59" data-magicpath-path="CustomerDashboard.tsx">Phone</label>
                    <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="60" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="b07b03fd-7e36-4c2a-a6ab-4802dfdade2b" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="61" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="62" data-magicpath-path="CustomerDashboard.tsx">
                      Member Since
                    </label>
                    <input type="text" value={new Date(user?.createdAt || '').toLocaleDateString()} disabled className="w-full bg-zinc-900 border border-zinc-700 text-zinc-500 px-4 py-2.5 text-sm rounded" data-magicpath-id="63" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                </SortableContainer>

                <button className="mt-6 w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium" data-magicpath-id="64" data-magicpath-path="CustomerDashboard.tsx">
                  Update Profile
                </button>
              </SortableContainer>

              {/* Stats */}
              <SortableContainer dndKitId="46981947-abf7-4d94-b22e-093796f4be3f" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="65" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="25e1d397-d141-44c0-8e1e-d841543aa36a" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="66" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="67" data-magicpath-path="CustomerDashboard.tsx">{userBookings.length}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="68" data-magicpath-path="CustomerDashboard.tsx">Total Bookings</div>
                </SortableContainer>
                <SortableContainer dndKitId="7e1bd46e-a052-4dc5-9092-558d37e54d76" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="69" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="70" data-magicpath-path="CustomerDashboard.tsx">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="71" data-magicpath-path="CustomerDashboard.tsx">Confirmed</div>
                </SortableContainer>
                <SortableContainer dndKitId="be017f30-dea2-4dce-8e96-8b24319fe6d3" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="72" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="73" data-magicpath-path="CustomerDashboard.tsx">
                    ₦{(userBookings.reduce((sum, b) => sum + b.totalPrice, 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="74" data-magicpath-path="CustomerDashboard.tsx">Total Spent</div>
                </SortableContainer>
              </SortableContainer>

              {/* Multi-Branch Info */}
              <SortableContainer dndKitId="d763ec7d-e078-4b2d-8ea8-17354f3aa884" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6" data-magicpath-id="75" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="249ca26d-fea8-49f1-b11e-55eeb75a1802" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="76" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} data-magicpath-id="77" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="a0e85610-a380-45ea-b61b-4c6ea4920259" containerType="regular" prevTag="div" data-magicpath-id="78" data-magicpath-path="CustomerDashboard.tsx">
                    <h4 className="text-blue-400 font-medium mb-2" data-magicpath-id="79" data-magicpath-path="CustomerDashboard.tsx">Multi-Branch Account Benefits</h4>
                    <SortableContainer dndKitId="2e3ad9dc-044d-4f71-b849-a14b07c64f67" containerType="regular" prevTag="ul" className="text-sm text-zinc-400 space-y-2" data-magicpath-id="80" data-magicpath-path="CustomerDashboard.tsx">
                      <li className="flex items-start gap-2" data-magicpath-id="81" data-magicpath-path="CustomerDashboard.tsx">
                        <Check className="text-green-400 shrink-0 mt-0.5" size={16} data-magicpath-id="82" data-magicpath-path="CustomerDashboard.tsx" />
                        <span data-magicpath-id="83" data-magicpath-path="CustomerDashboard.tsx">Book rooms in any branch with the same account</span>
                      </li>
                      <li className="flex items-start gap-2" data-magicpath-id="84" data-magicpath-path="CustomerDashboard.tsx">
                        <Check className="text-green-400 shrink-0 mt-0.5" size={16} data-magicpath-id="85" data-magicpath-path="CustomerDashboard.tsx" />
                        <span data-magicpath-id="86" data-magicpath-path="CustomerDashboard.tsx">Track all your bookings from Abuja and Lagos in one place</span>
                      </li>
                      <li className="flex items-start gap-2" data-magicpath-id="87" data-magicpath-path="CustomerDashboard.tsx">
                        <Check className="text-green-400 shrink-0 mt-0.5" size={16} data-magicpath-id="88" data-magicpath-path="CustomerDashboard.tsx" />
                        <span data-magicpath-id="89" data-magicpath-path="CustomerDashboard.tsx">Switch between branches without logging out</span>
                      </li>
                      <li className="flex items-start gap-2" data-magicpath-id="90" data-magicpath-path="CustomerDashboard.tsx">
                        <Check className="text-green-400 shrink-0 mt-0.5" size={16} data-magicpath-id="91" data-magicpath-path="CustomerDashboard.tsx" />
                        <span data-magicpath-id="92" data-magicpath-path="CustomerDashboard.tsx">Access loyalty rewards across all Phoenix Imperial locations</span>
                      </li>
                    </SortableContainer>
                  </SortableContainer>
                </SortableContainer>
              </SortableContainer>

              {/* Logout */}
              <SortableContainer dndKitId="4e55e3c2-142e-42ce-aed7-7794ea714196" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="93" data-magicpath-path="CustomerDashboard.tsx">
                <LogOut size={18} data-magicpath-id="94" data-magicpath-path="CustomerDashboard.tsx" />
                Logout
              </SortableContainer>
            </SortableContainer>}
        </AnimatePresence>
      </SortableContainer>
    </>;
};