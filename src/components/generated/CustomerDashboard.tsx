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
      <SortableContainer dndKitId="26b79e8a-1ec0-4f2b-9ec5-a6fd3b4014bc" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="0" data-magicpath-path="CustomerDashboard.tsx">
        <SortableContainer dndKitId="e22e2f58-3bbf-40ba-9ef4-b8acab45437e" containerType="regular" prevTag="div" data-magicpath-id="1" data-magicpath-path="CustomerDashboard.tsx">
          <h2 className="text-2xl font-serif text-white" data-magicpath-id="2" data-magicpath-path="CustomerDashboard.tsx">My Account</h2>
          <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="3" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
        </SortableContainer>
        <SortableContainer dndKitId="57562d75-945a-4c18-9e6e-f76905699044" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="4" data-magicpath-path="CustomerDashboard.tsx">
          <X size={20} data-magicpath-id="5" data-magicpath-path="CustomerDashboard.tsx" />
        </SortableContainer>
      </SortableContainer>

      {/* Tabs */}
      <SortableContainer dndKitId="1b53eb91-1405-4d37-bb80-213da4b34252" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="6" data-magicpath-path="CustomerDashboard.tsx">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="CustomerDashboard.tsx">
          My Bookings
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="8" data-magicpath-path="CustomerDashboard.tsx">
          Profile
        </button>
      </SortableContainer>

      {/* Content */}
      <SortableContainer dndKitId="aeb8b917-b1a6-401f-860e-fe47c11de32b" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="9" data-magicpath-path="CustomerDashboard.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="CustomerDashboard.tsx">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && <SortableContainer dndKitId="ad438a24-595d-4cd7-9c7a-8857806ccfa8" containerType="regular" prevTag="motion.div" key="bookings" initial={{
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
              {currentBranch && <SortableContainer dndKitId="66684527-a7e3-462d-9eb4-457af6ce01d2" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3" data-magicpath-id="12" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-amber-400" size={20} data-magicpath-id="13" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="8c387ae7-32d7-4639-b648-5c8bf62e1c2c" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="CustomerDashboard.tsx">
                    <p className="text-amber-400 text-sm font-medium" data-magicpath-id="15" data-magicpath-path="CustomerDashboard.tsx">
                      Currently viewing {BRANCHES.find(b => b.id === currentBranch)?.city} branch
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5" data-magicpath-id="16" data-magicpath-path="CustomerDashboard.tsx">
                      You can switch branches anytime when booking. Your bookings from all branches appear below.
                    </p>
                  </SortableContainer>
                </SortableContainer>}

              {userBookings.length === 0 ? <SortableContainer dndKitId="f7fb4e12-e893-4434-9112-f7cceed0f67d" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="17" data-magicpath-path="CustomerDashboard.tsx">
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
            return <SortableContainer dndKitId="fa5df31a-9fdf-427c-afe5-5aeaf45c3ccf" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="CustomerDashboard.tsx">
                      <SortableContainer dndKitId="1fbafe38-1e0c-4265-a0a4-0f062a21d0b3" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="CustomerDashboard.tsx">
                        {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="CustomerDashboard.tsx" />}
                        <SortableContainer dndKitId="dd121e08-d208-4a86-95cd-747e6c9e13f9" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="CustomerDashboard.tsx">
                          <SortableContainer dndKitId="8cfe730d-c534-420e-8639-136094a595c9" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="8c63c060-ff2e-4252-8255-29e28b8c94f3" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="CustomerDashboard.tsx">
                              <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="CustomerDashboard.tsx">{room?.name}</h4>
                              <SortableContainer dndKitId="673e05f8-eda0-4803-9908-3e708582ac20" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="CustomerDashboard.tsx">
                                <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="CustomerDashboard.tsx" />
                                <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="CustomerDashboard.tsx">{branch?.name}</span>
                              </SortableContainer>
                            </SortableContainer>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="31" data-magicpath-path="CustomerDashboard.tsx">
                              {booking.status}
                            </span>
                          </SortableContainer>

                          <SortableContainer dndKitId="c6ab88ac-cf60-451f-9de3-566063ea5820" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="fb3fefe0-a5f8-4b0e-ba36-a7d3d73e5e2b" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="CustomerDashboard.tsx">Check In</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="35" data-magicpath-path="CustomerDashboard.tsx">{booking.checkIn}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="d9258dd4-4f84-4db8-8782-efa84049e551" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="CustomerDashboard.tsx">Check Out</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="38" data-magicpath-path="CustomerDashboard.tsx">{booking.checkOut}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="048be441-50b6-48b5-8036-d0965adccc59" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="CustomerDashboard.tsx">Guests</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="CustomerDashboard.tsx">
                                {booking.guests.adults} Adults, {booking.guests.children} Children
                              </p>
                            </SortableContainer>
                            <SortableContainer dndKitId="e4049220-cc49-432e-b6f8-4c7cec7413dc" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="CustomerDashboard.tsx">Total</p>
                              <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="CustomerDashboard.tsx">
                                ₦{booking.totalPrice.toLocaleString()}
                              </p>
                            </SortableContainer>
                          </SortableContainer>

                          <SortableContainer dndKitId="828a0c0a-589f-41d5-8bec-b4e3ac87600e" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="CustomerDashboard.tsx">
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
          {activeTab === 'profile' && <SortableContainer dndKitId="860499d8-cace-4e01-84ef-3b4ddbcc4e27" containerType="regular" prevTag="motion.div" key="profile" initial={{
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
              <SortableContainer dndKitId="dd45838f-ee3f-4f6b-bf6e-2da195ff32b7" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="49" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="d857230c-00af-469c-acba-06fba72cfb95" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="50" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="7e43f90a-079c-4ea4-9d2c-6d70044c60ee" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CustomerDashboard.tsx">
                    <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="52" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="ae50a429-5484-4a7f-8fa9-78f8b0541304" containerType="regular" prevTag="div" data-magicpath-id="53" data-magicpath-path="CustomerDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="54" data-magicpath-path="CustomerDashboard.tsx">{user?.name}</h3>
                    <p className="text-zinc-400" data-magicpath-id="55" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="56" data-magicpath-path="CustomerDashboard.tsx">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="0ef0d609-fb7d-48b9-96df-12268212c4b8" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="57" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="a5955eb7-d70f-4f0c-beb0-ed3a58ab8bff" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="58" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="59" data-magicpath-path="CustomerDashboard.tsx">Phone</label>
                    <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="60" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="214a7cd5-57d7-4190-bd55-e930d4bc8671" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="61" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="66478003-ecbc-4515-97c2-ff1a59386118" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="65" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="b1a8dc1a-3dd8-44a7-80e0-30b079b551c1" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="66" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="67" data-magicpath-path="CustomerDashboard.tsx">{userBookings.length}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="68" data-magicpath-path="CustomerDashboard.tsx">Total Bookings</div>
                </SortableContainer>
                <SortableContainer dndKitId="0c8f6760-d6fd-48ef-90a2-872eddff6066" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="69" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="70" data-magicpath-path="CustomerDashboard.tsx">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="71" data-magicpath-path="CustomerDashboard.tsx">Confirmed</div>
                </SortableContainer>
                <SortableContainer dndKitId="9f644916-ae4d-4650-b24a-3cff31912c9c" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="72" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="73" data-magicpath-path="CustomerDashboard.tsx">
                    ₦{(userBookings.reduce((sum, b) => sum + b.totalPrice, 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="74" data-magicpath-path="CustomerDashboard.tsx">Total Spent</div>
                </SortableContainer>
              </SortableContainer>

              {/* Multi-Branch Info */}
              <SortableContainer dndKitId="2a138ee9-7824-43ca-b146-4f79748c05f7" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6" data-magicpath-id="75" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="12dc6ddf-6fce-4acf-a912-cf8c4a7fe1a0" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="76" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} data-magicpath-id="77" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="c0716c93-d26a-4ad4-a15c-9eec4f6dfe63" containerType="regular" prevTag="div" data-magicpath-id="78" data-magicpath-path="CustomerDashboard.tsx">
                    <h4 className="text-blue-400 font-medium mb-2" data-magicpath-id="79" data-magicpath-path="CustomerDashboard.tsx">Multi-Branch Account Benefits</h4>
                    <SortableContainer dndKitId="259d54ad-cd53-43ac-b466-21dda7cc1442" containerType="regular" prevTag="ul" className="text-sm text-zinc-400 space-y-2" data-magicpath-id="80" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="47f0f4b2-4436-4a5e-a9c6-1a8315aad30a" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="93" data-magicpath-path="CustomerDashboard.tsx">
                <LogOut size={18} data-magicpath-id="94" data-magicpath-path="CustomerDashboard.tsx" />
                Logout
              </SortableContainer>
            </SortableContainer>}
        </AnimatePresence>
      </SortableContainer>
    </>;
};