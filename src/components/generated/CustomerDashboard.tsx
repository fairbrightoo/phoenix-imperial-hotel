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
      <SortableContainer dndKitId="31104a0f-9396-4764-a833-867cb59b6311" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="0" data-magicpath-path="CustomerDashboard.tsx">
        <SortableContainer dndKitId="a676e675-3a0d-49e7-a2ce-a793da75a680" containerType="regular" prevTag="div" data-magicpath-id="1" data-magicpath-path="CustomerDashboard.tsx">
          <h2 className="text-2xl font-serif text-white" data-magicpath-id="2" data-magicpath-path="CustomerDashboard.tsx">My Account</h2>
          <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="3" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
        </SortableContainer>
        <SortableContainer dndKitId="9417144e-90b2-4e76-9e24-9c22762831f0" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="4" data-magicpath-path="CustomerDashboard.tsx">
          <X size={20} data-magicpath-id="5" data-magicpath-path="CustomerDashboard.tsx" />
        </SortableContainer>
      </SortableContainer>

      {/* Tabs */}
      <SortableContainer dndKitId="a1ba1615-bd00-4acc-86dc-2391aff5cf48" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="6" data-magicpath-path="CustomerDashboard.tsx">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="CustomerDashboard.tsx">
          My Bookings
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="8" data-magicpath-path="CustomerDashboard.tsx">
          Profile
        </button>
      </SortableContainer>

      {/* Content */}
      <SortableContainer dndKitId="1ca07374-b691-421d-ab8a-82cf945d5411" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="9" data-magicpath-path="CustomerDashboard.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="CustomerDashboard.tsx">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && <SortableContainer dndKitId="34d4cdab-dd47-4835-854f-4b353872d065" containerType="regular" prevTag="motion.div" key="bookings" initial={{
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
              {currentBranch && <SortableContainer dndKitId="1e339854-1c83-403d-bc25-13f06238edd6" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3" data-magicpath-id="12" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-amber-400" size={20} data-magicpath-id="13" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="f5090af4-1782-48d2-ad00-8801f974d7a4" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="CustomerDashboard.tsx">
                    <p className="text-amber-400 text-sm font-medium" data-magicpath-id="15" data-magicpath-path="CustomerDashboard.tsx">
                      Currently viewing {BRANCHES.find(b => b.id === currentBranch)?.city} branch
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5" data-magicpath-id="16" data-magicpath-path="CustomerDashboard.tsx">
                      You can switch branches anytime when booking. Your bookings from all branches appear below.
                    </p>
                  </SortableContainer>
                </SortableContainer>}

              {userBookings.length === 0 ? <SortableContainer dndKitId="95c28690-2ac7-40e0-abe8-8dbdc5c1cfb7" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="17" data-magicpath-path="CustomerDashboard.tsx">
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
            return <SortableContainer dndKitId="8678ee85-a86b-4e36-bbb5-505de7adcbe2" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="CustomerDashboard.tsx">
                      <SortableContainer dndKitId="6298dea4-bfbf-48b3-9ca1-547162f54298" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="CustomerDashboard.tsx">
                        {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="CustomerDashboard.tsx" />}
                        <SortableContainer dndKitId="7c404568-30fd-4d41-81d6-54fc45908b55" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="CustomerDashboard.tsx">
                          <SortableContainer dndKitId="022edcff-7ca7-494b-9c07-3eca651b4705" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="c5193bd4-2351-4659-9c7f-ea017a9dea47" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="CustomerDashboard.tsx">
                              <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="CustomerDashboard.tsx">{room?.name}</h4>
                              <SortableContainer dndKitId="9c3dbf45-7416-4bf9-9eab-ec6235ec68e6" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="CustomerDashboard.tsx">
                                <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="CustomerDashboard.tsx" />
                                <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="CustomerDashboard.tsx">{branch?.name}</span>
                              </SortableContainer>
                            </SortableContainer>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="31" data-magicpath-path="CustomerDashboard.tsx">
                              {booking.status}
                            </span>
                          </SortableContainer>

                          <SortableContainer dndKitId="d438c401-6fb3-436e-ae2f-7ace7fd38065" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="d8b94a85-31b7-4268-a80b-9b49b88b9251" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="CustomerDashboard.tsx">Check In</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="35" data-magicpath-path="CustomerDashboard.tsx">{booking.checkIn}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="331a3f71-8810-4c6a-9463-90b113ab4e18" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="CustomerDashboard.tsx">Check Out</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="38" data-magicpath-path="CustomerDashboard.tsx">{booking.checkOut}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="887a0f6d-bd28-4931-a2cd-a8109c4b5d84" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="CustomerDashboard.tsx">Guests</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="CustomerDashboard.tsx">
                                {booking.guests.adults} Adults, {booking.guests.children} Children
                              </p>
                            </SortableContainer>
                            <SortableContainer dndKitId="722ea0f2-9657-4d09-9504-101ad5e9d8ff" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="CustomerDashboard.tsx">Total</p>
                              <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="CustomerDashboard.tsx">
                                ₦{booking.totalPrice.toLocaleString()}
                              </p>
                            </SortableContainer>
                          </SortableContainer>

                          <SortableContainer dndKitId="129b521b-43de-4c99-98f8-b4047d2d69fe" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="CustomerDashboard.tsx">
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
          {activeTab === 'profile' && <SortableContainer dndKitId="990f59d2-7117-4f9e-b8c9-3dfb768ed861" containerType="regular" prevTag="motion.div" key="profile" initial={{
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
              <SortableContainer dndKitId="76c753db-3784-480e-aaf5-157f61cb088c" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="49" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="2e36f7f1-f5d7-4e87-816d-ede57790df40" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="50" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="ca18cd1a-d463-47a4-8f2e-d19a93a8666a" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CustomerDashboard.tsx">
                    <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="52" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="8c999b1a-81ed-4913-a2c7-02564f8c5aca" containerType="regular" prevTag="div" data-magicpath-id="53" data-magicpath-path="CustomerDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="54" data-magicpath-path="CustomerDashboard.tsx">{user?.name}</h3>
                    <p className="text-zinc-400" data-magicpath-id="55" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="56" data-magicpath-path="CustomerDashboard.tsx">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="61e1c9b2-e278-468a-84bf-529d8fe2cbdc" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="57" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="6a7f0c1d-287e-4c8c-bab5-d4c40132ed92" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="58" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="59" data-magicpath-path="CustomerDashboard.tsx">Phone</label>
                    <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="60" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="b883ba6c-5c6b-4b1d-ab86-3e156b3d9ce1" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="61" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="ebf553da-e4a0-4e5e-a34a-845aca01bf6a" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="65" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="5f6b13d1-00d7-495a-a5cb-009e9ea50e82" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="66" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="67" data-magicpath-path="CustomerDashboard.tsx">{userBookings.length}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="68" data-magicpath-path="CustomerDashboard.tsx">Total Bookings</div>
                </SortableContainer>
                <SortableContainer dndKitId="2f936a35-cf71-452d-96ea-9d497b092e72" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="69" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="70" data-magicpath-path="CustomerDashboard.tsx">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="71" data-magicpath-path="CustomerDashboard.tsx">Confirmed</div>
                </SortableContainer>
                <SortableContainer dndKitId="67070462-b814-4371-b274-22c6824080ec" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="72" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="73" data-magicpath-path="CustomerDashboard.tsx">
                    ₦{(userBookings.reduce((sum, b) => sum + b.totalPrice, 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="74" data-magicpath-path="CustomerDashboard.tsx">Total Spent</div>
                </SortableContainer>
              </SortableContainer>

              {/* Multi-Branch Info */}
              <SortableContainer dndKitId="b66b8c0f-19d6-406a-a2cf-449bb90db6a9" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6" data-magicpath-id="75" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="ffc0eccc-c1f2-41ea-98c0-b85362658d05" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="76" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} data-magicpath-id="77" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="b2ec514a-5679-42f7-8454-e9509fb2d53c" containerType="regular" prevTag="div" data-magicpath-id="78" data-magicpath-path="CustomerDashboard.tsx">
                    <h4 className="text-blue-400 font-medium mb-2" data-magicpath-id="79" data-magicpath-path="CustomerDashboard.tsx">Multi-Branch Account Benefits</h4>
                    <SortableContainer dndKitId="b09f5b1c-4bdf-4ff3-b8db-958904b19344" containerType="regular" prevTag="ul" className="text-sm text-zinc-400 space-y-2" data-magicpath-id="80" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="18b3d1f4-8206-4530-bcb8-5d5d33be298b" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="93" data-magicpath-path="CustomerDashboard.tsx">
                <LogOut size={18} data-magicpath-id="94" data-magicpath-path="CustomerDashboard.tsx" />
                Logout
              </SortableContainer>
            </SortableContainer>}
        </AnimatePresence>
      </SortableContainer>
    </>;
};