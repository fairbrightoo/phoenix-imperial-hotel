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
      <SortableContainer dndKitId="74a9350a-f1a0-4c92-8650-1d0904bb634c" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="0" data-magicpath-path="CustomerDashboard.tsx">
        <SortableContainer dndKitId="763d5d4b-9dce-4a5d-b0be-7fea00e6ae49" containerType="regular" prevTag="div" data-magicpath-id="1" data-magicpath-path="CustomerDashboard.tsx">
          <h2 className="text-2xl font-serif text-white" data-magicpath-id="2" data-magicpath-path="CustomerDashboard.tsx">My Account</h2>
          <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="3" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
        </SortableContainer>
        <SortableContainer dndKitId="473b1e7a-9a76-4abc-af2c-cb53a7b60450" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="4" data-magicpath-path="CustomerDashboard.tsx">
          <X size={20} data-magicpath-id="5" data-magicpath-path="CustomerDashboard.tsx" />
        </SortableContainer>
      </SortableContainer>

      {/* Tabs */}
      <SortableContainer dndKitId="321ad14e-dc3f-4904-a011-121daf3b6a7a" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="6" data-magicpath-path="CustomerDashboard.tsx">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="CustomerDashboard.tsx">
          My Bookings
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="8" data-magicpath-path="CustomerDashboard.tsx">
          Profile
        </button>
      </SortableContainer>

      {/* Content */}
      <SortableContainer dndKitId="db1f56e6-1383-42e9-869d-894a1cff6c40" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="9" data-magicpath-path="CustomerDashboard.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="CustomerDashboard.tsx">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && <SortableContainer dndKitId="ce3370e5-d1be-494e-928d-1b7efca4d02e" containerType="regular" prevTag="motion.div" key="bookings" initial={{
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
              {currentBranch && <SortableContainer dndKitId="a1400eab-cb57-4c48-9b6f-96f18586fdae" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3" data-magicpath-id="12" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-amber-400" size={20} data-magicpath-id="13" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="731b456d-0b8f-428a-ac0e-02b7a52322bd" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="CustomerDashboard.tsx">
                    <p className="text-amber-400 text-sm font-medium" data-magicpath-id="15" data-magicpath-path="CustomerDashboard.tsx">
                      Currently viewing {BRANCHES.find(b => b.id === currentBranch)?.city} branch
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5" data-magicpath-id="16" data-magicpath-path="CustomerDashboard.tsx">
                      You can switch branches anytime when booking. Your bookings from all branches appear below.
                    </p>
                  </SortableContainer>
                </SortableContainer>}

              {userBookings.length === 0 ? <SortableContainer dndKitId="bbb5f4b2-e7c1-4e4b-bf8d-28d99facce91" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="17" data-magicpath-path="CustomerDashboard.tsx">
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
            return <SortableContainer dndKitId="9bad1728-32a6-4b82-a9f8-54771b0ba0cf" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="CustomerDashboard.tsx">
                      <SortableContainer dndKitId="9503e134-5ab5-4e51-ae25-0b0a968c0953" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="CustomerDashboard.tsx">
                        {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="CustomerDashboard.tsx" />}
                        <SortableContainer dndKitId="e0785752-4b43-4f46-8ff0-3ff78b4a79a4" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="CustomerDashboard.tsx">
                          <SortableContainer dndKitId="b643a332-05dd-4e66-994f-57de5b808897" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="56fdf6ad-ac95-4372-84dd-68ae0d03659f" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="CustomerDashboard.tsx">
                              <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="CustomerDashboard.tsx">{room?.name}</h4>
                              <SortableContainer dndKitId="fcb3a04f-ab27-4356-aa0e-97ce81e609aa" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="CustomerDashboard.tsx">
                                <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="CustomerDashboard.tsx" />
                                <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="CustomerDashboard.tsx">{branch?.name}</span>
                              </SortableContainer>
                            </SortableContainer>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="31" data-magicpath-path="CustomerDashboard.tsx">
                              {booking.status}
                            </span>
                          </SortableContainer>

                          <SortableContainer dndKitId="c4b04496-448e-44c6-b567-d45b79485fab" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="a8b856e1-178f-4bd2-8f7c-366589da3ff5" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="CustomerDashboard.tsx">Check In</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="35" data-magicpath-path="CustomerDashboard.tsx">{booking.checkIn}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="af59d1ee-24f3-4c94-953b-69af06aa4772" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="CustomerDashboard.tsx">Check Out</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="38" data-magicpath-path="CustomerDashboard.tsx">{booking.checkOut}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="53854bc2-d45b-4fe0-8b08-f503d9e6a976" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="CustomerDashboard.tsx">Guests</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="CustomerDashboard.tsx">
                                {booking.guests.adults} Adults, {booking.guests.children} Children
                              </p>
                            </SortableContainer>
                            <SortableContainer dndKitId="6df211b2-6512-4233-bfe0-09dad6e887b8" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="CustomerDashboard.tsx">Total</p>
                              <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="CustomerDashboard.tsx">
                                ₦{booking.totalPrice.toLocaleString()}
                              </p>
                            </SortableContainer>
                          </SortableContainer>

                          <SortableContainer dndKitId="f770218f-8c5e-4f6b-a600-7283b698df52" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="CustomerDashboard.tsx">
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
          {activeTab === 'profile' && <SortableContainer dndKitId="be64bc9d-ad46-4e3e-867f-51e2cf422931" containerType="regular" prevTag="motion.div" key="profile" initial={{
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
              <SortableContainer dndKitId="22193291-e103-4f35-9d0b-2f84f0b033fe" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="49" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="dd7e7b5d-4065-4469-9578-1a09291367e4" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="50" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="ed1c83a9-eaf8-4395-83c3-3ba3e9823fc6" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CustomerDashboard.tsx">
                    <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="52" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="a6c21694-bca4-43b5-83b0-df59e083f60f" containerType="regular" prevTag="div" data-magicpath-id="53" data-magicpath-path="CustomerDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="54" data-magicpath-path="CustomerDashboard.tsx">{user?.name}</h3>
                    <p className="text-zinc-400" data-magicpath-id="55" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="56" data-magicpath-path="CustomerDashboard.tsx">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="6c6d47d1-9385-4362-9480-4afaf2773e91" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="57" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="986e3d5d-4abd-4c12-b656-7ce47ce7300b" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="58" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="59" data-magicpath-path="CustomerDashboard.tsx">Phone</label>
                    <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="60" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="676a2fb9-9268-4406-8a7a-812a9d0fd545" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="61" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="001f9bcf-3b0c-455f-a4ac-45cb9554eea2" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="65" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="5fa6e7fa-d42a-4d3a-84e8-8b6b6c0fb655" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="66" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="67" data-magicpath-path="CustomerDashboard.tsx">{userBookings.length}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="68" data-magicpath-path="CustomerDashboard.tsx">Total Bookings</div>
                </SortableContainer>
                <SortableContainer dndKitId="2ca7808c-3936-4107-86c9-cd9b7dd1d657" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="69" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="70" data-magicpath-path="CustomerDashboard.tsx">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="71" data-magicpath-path="CustomerDashboard.tsx">Confirmed</div>
                </SortableContainer>
                <SortableContainer dndKitId="72d5a66f-1acb-448b-922b-346f6d792407" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="72" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="73" data-magicpath-path="CustomerDashboard.tsx">
                    ₦{(userBookings.reduce((sum, b) => sum + b.totalPrice, 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="74" data-magicpath-path="CustomerDashboard.tsx">Total Spent</div>
                </SortableContainer>
              </SortableContainer>

              {/* Multi-Branch Info */}
              <SortableContainer dndKitId="dd227c9d-a2e8-4045-9c19-9bb523b9fb11" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6" data-magicpath-id="75" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="3f5f2a35-33c4-4c0c-86f2-901333a8de14" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="76" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} data-magicpath-id="77" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="d785057c-ea74-488c-9b08-3010f91f03fc" containerType="regular" prevTag="div" data-magicpath-id="78" data-magicpath-path="CustomerDashboard.tsx">
                    <h4 className="text-blue-400 font-medium mb-2" data-magicpath-id="79" data-magicpath-path="CustomerDashboard.tsx">Multi-Branch Account Benefits</h4>
                    <SortableContainer dndKitId="fd350822-54a0-4292-a699-26dbfef2446e" containerType="regular" prevTag="ul" className="text-sm text-zinc-400 space-y-2" data-magicpath-id="80" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="e03e38f5-16bd-46ab-9c76-e7f616d79b6f" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="93" data-magicpath-path="CustomerDashboard.tsx">
                <LogOut size={18} data-magicpath-id="94" data-magicpath-path="CustomerDashboard.tsx" />
                Logout
              </SortableContainer>
            </SortableContainer>}
        </AnimatePresence>
      </SortableContainer>
    </>;
};