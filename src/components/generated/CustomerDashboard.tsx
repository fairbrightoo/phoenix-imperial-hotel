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
      <SortableContainer dndKitId="7f43c97d-55eb-4183-a70d-06c3dbb2614f" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950" data-magicpath-id="0" data-magicpath-path="CustomerDashboard.tsx">
        <SortableContainer dndKitId="845344e5-f4c6-4922-8c51-9120da060b3b" containerType="regular" prevTag="div" data-magicpath-id="1" data-magicpath-path="CustomerDashboard.tsx">
          <h2 className="text-2xl font-serif text-white" data-magicpath-id="2" data-magicpath-path="CustomerDashboard.tsx">My Account</h2>
          <p className="text-zinc-400 text-sm mt-1" data-magicpath-id="3" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
        </SortableContainer>
        <SortableContainer dndKitId="35a23696-81bd-4370-8727-dca54ecec289" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="4" data-magicpath-path="CustomerDashboard.tsx">
          <X size={20} data-magicpath-id="5" data-magicpath-path="CustomerDashboard.tsx" />
        </SortableContainer>
      </SortableContainer>

      {/* Tabs */}
      <SortableContainer dndKitId="c34fd26e-023c-44c8-99c4-06c8c20d2a2b" containerType="regular" prevTag="div" className="flex border-b border-zinc-800 bg-zinc-950" data-magicpath-id="6" data-magicpath-path="CustomerDashboard.tsx">
        <button onClick={() => setActiveTab('bookings')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'bookings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="CustomerDashboard.tsx">
          My Bookings
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex-1 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === 'profile' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-400 hover:text-white'}`} data-magicpath-id="8" data-magicpath-path="CustomerDashboard.tsx">
          Profile
        </button>
      </SortableContainer>

      {/* Content */}
      <SortableContainer dndKitId="3867e5e6-4d29-4293-836f-84c539187798" containerType="regular" prevTag="div" className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]" data-magicpath-id="9" data-magicpath-path="CustomerDashboard.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="10" data-magicpath-path="CustomerDashboard.tsx">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && <SortableContainer dndKitId="64bbaf97-16df-4f4b-b62e-ed560b19302a" containerType="regular" prevTag="motion.div" key="bookings" initial={{
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
              {currentBranch && <SortableContainer dndKitId="7ad2937a-9fe4-468c-9a9f-8b01f6cbbd73" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center gap-3" data-magicpath-id="12" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-amber-400" size={20} data-magicpath-id="13" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="aa44ab5f-8926-40c1-a3ec-7c03c7b9295c" containerType="regular" prevTag="div" data-magicpath-id="14" data-magicpath-path="CustomerDashboard.tsx">
                    <p className="text-amber-400 text-sm font-medium" data-magicpath-id="15" data-magicpath-path="CustomerDashboard.tsx">
                      Currently viewing {BRANCHES.find(b => b.id === currentBranch)?.city} branch
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5" data-magicpath-id="16" data-magicpath-path="CustomerDashboard.tsx">
                      You can switch branches anytime when booking. Your bookings from all branches appear below.
                    </p>
                  </SortableContainer>
                </SortableContainer>}

              {userBookings.length === 0 ? <SortableContainer dndKitId="28fd167d-c451-443b-9712-3c9ea45ba903" containerType="regular" prevTag="div" className="text-center py-12" data-magicpath-id="17" data-magicpath-path="CustomerDashboard.tsx">
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
            return <SortableContainer dndKitId="d16c0d6c-b0bc-471b-a5ae-25f3140eb0d5" containerType="regular" prevTag="div" key={booking.id} className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="CustomerDashboard.tsx">
                      <SortableContainer dndKitId="4fd6ab4f-38e1-482e-b9c3-87ff8dae428a" containerType="regular" prevTag="div" className="flex flex-col md:flex-row gap-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="CustomerDashboard.tsx">
                        {room && <img src={room.images[0]} alt={room.name} className="w-full md:w-48 h-48 object-cover" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="CustomerDashboard.tsx" />}
                        <SortableContainer dndKitId="74eb79dd-cba9-4e1e-bdd4-084848d9cf72" containerType="regular" prevTag="div" className="flex-1 p-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="CustomerDashboard.tsx">
                          <SortableContainer dndKitId="8ecd0217-fd1d-478f-b549-1e80ff8d6ba7" containerType="regular" prevTag="div" className="flex items-start justify-between mb-3" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="471d3f1e-3ac3-4d3d-9a96-8f432c2e0e53" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="CustomerDashboard.tsx">
                              <h4 className="text-lg font-serif text-white mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="27" data-magicpath-path="CustomerDashboard.tsx">{room?.name}</h4>
                              <SortableContainer dndKitId="eb6678ff-c6df-4fad-8381-3cc91dbf0c92" containerType="regular" prevTag="div" className="flex items-center gap-2 text-sm text-amber-400" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="28" data-magicpath-path="CustomerDashboard.tsx">
                                <MapPin size={14} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="29" data-magicpath-path="CustomerDashboard.tsx" />
                                <span data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="30" data-magicpath-path="CustomerDashboard.tsx">{branch?.name}</span>
                              </SortableContainer>
                            </SortableContainer>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`} data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="status:unknown" data-magicpath-id="31" data-magicpath-path="CustomerDashboard.tsx">
                              {booking.status}
                            </span>
                          </SortableContainer>

                          <SortableContainer dndKitId="a118b106-e323-4be4-973f-f939a0ced54c" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-4 text-sm text-zinc-400 mb-4" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="32" data-magicpath-path="CustomerDashboard.tsx">
                            <SortableContainer dndKitId="45db37b5-f57e-43c9-9553-ec7d85e0cd5d" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="33" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="34" data-magicpath-path="CustomerDashboard.tsx">Check In</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkIn:unknown" data-magicpath-id="35" data-magicpath-path="CustomerDashboard.tsx">{booking.checkIn}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="4a385873-3efb-4d0c-ac04-915718f32973" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="36" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="37" data-magicpath-path="CustomerDashboard.tsx">Check Out</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-field="checkOut:unknown" data-magicpath-id="38" data-magicpath-path="CustomerDashboard.tsx">{booking.checkOut}</p>
                            </SortableContainer>
                            <SortableContainer dndKitId="af1271cc-f434-4a99-b64f-bef7e8744c85" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="39" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="40" data-magicpath-path="CustomerDashboard.tsx">Guests</p>
                              <p className="text-white" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="CustomerDashboard.tsx">
                                {booking.guests.adults} Adults, {booking.guests.children} Children
                              </p>
                            </SortableContainer>
                            <SortableContainer dndKitId="622b8166-0662-4753-a6d2-22bd27845ee1" containerType="regular" prevTag="div" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="CustomerDashboard.tsx">
                              <p className="text-zinc-500 mb-1" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="CustomerDashboard.tsx">Total</p>
                              <p className="text-amber-500 font-serif text-lg" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="44" data-magicpath-path="CustomerDashboard.tsx">
                                ₦{booking.totalPrice.toLocaleString()}
                              </p>
                            </SortableContainer>
                          </SortableContainer>

                          <SortableContainer dndKitId="bea24a07-8db1-4777-8cd3-54daa0effeb9" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-uuid={(booking as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="CustomerDashboard.tsx">
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
          {activeTab === 'profile' && <SortableContainer dndKitId="25ae9ba2-b0d4-438e-a9db-03ea829ef25a" containerType="regular" prevTag="motion.div" key="profile" initial={{
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
              <SortableContainer dndKitId="78571a18-0007-4cc3-b1db-85b484e3411c" containerType="regular" prevTag="div" className="bg-zinc-800 rounded-lg border border-zinc-700 p-6" data-magicpath-id="49" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="406450bd-ee0f-4a03-a538-c10a0f0732e1" containerType="regular" prevTag="div" className="flex items-center gap-4 mb-6" data-magicpath-id="50" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="123ae6ea-78d7-45f9-94da-aff7452b0a16" containerType="regular" prevTag="div" className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CustomerDashboard.tsx">
                    <UserIcon className="w-10 h-10 text-amber-500" data-magicpath-id="52" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="eab9186f-ab88-48bb-b074-e89bac2f465d" containerType="regular" prevTag="div" data-magicpath-id="53" data-magicpath-path="CustomerDashboard.tsx">
                    <h3 className="text-xl font-serif text-white" data-magicpath-id="54" data-magicpath-path="CustomerDashboard.tsx">{user?.name}</h3>
                    <p className="text-zinc-400" data-magicpath-id="55" data-magicpath-path="CustomerDashboard.tsx">{user?.email}</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider" data-magicpath-id="56" data-magicpath-path="CustomerDashboard.tsx">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </SortableContainer>
                </SortableContainer>

                <SortableContainer dndKitId="2ca40f68-0def-4b4d-b8cf-a6d72238aae9" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-4" data-magicpath-id="57" data-magicpath-path="CustomerDashboard.tsx">
                  <SortableContainer dndKitId="ff74074f-ba2d-40d2-b4bf-3fb886524255" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="58" data-magicpath-path="CustomerDashboard.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="59" data-magicpath-path="CustomerDashboard.tsx">Phone</label>
                    <input type="tel" defaultValue={user?.phone} className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" data-magicpath-id="60" data-magicpath-path="CustomerDashboard.tsx" />
                  </SortableContainer>
                  <SortableContainer dndKitId="43b254da-2e2d-4024-a526-eeedf0969f91" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="61" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="52ec7ad2-2704-4a5b-a85c-83d1af44795e" containerType="regular" prevTag="div" className="grid md:grid-cols-3 gap-4" data-magicpath-id="65" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="5091b0d5-0c81-46c0-b9d0-5c69b476c720" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="66" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="67" data-magicpath-path="CustomerDashboard.tsx">{userBookings.length}</div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="68" data-magicpath-path="CustomerDashboard.tsx">Total Bookings</div>
                </SortableContainer>
                <SortableContainer dndKitId="202c58e1-545a-4ac6-8a7f-68195f5d73ec" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="69" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="70" data-magicpath-path="CustomerDashboard.tsx">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="71" data-magicpath-path="CustomerDashboard.tsx">Confirmed</div>
                </SortableContainer>
                <SortableContainer dndKitId="a0d4bb23-470e-40af-8413-f135e0b7cb3f" containerType="regular" prevTag="div" className="bg-zinc-800 p-6 rounded-lg text-center border border-zinc-700" data-magicpath-id="72" data-magicpath-path="CustomerDashboard.tsx">
                  <div className="text-3xl font-serif text-amber-500 mb-2" data-magicpath-id="73" data-magicpath-path="CustomerDashboard.tsx">
                    ₦{(userBookings.reduce((sum, b) => sum + b.totalPrice, 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-zinc-400 uppercase tracking-wider" data-magicpath-id="74" data-magicpath-path="CustomerDashboard.tsx">Total Spent</div>
                </SortableContainer>
              </SortableContainer>

              {/* Multi-Branch Info */}
              <SortableContainer dndKitId="50850f61-66ed-4f72-b9bd-25f9f34f8320" containerType="regular" prevTag="div" className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6" data-magicpath-id="75" data-magicpath-path="CustomerDashboard.tsx">
                <SortableContainer dndKitId="4a15fd70-6e29-467c-975a-2ecb9ca373c2" containerType="regular" prevTag="div" className="flex items-start gap-3" data-magicpath-id="76" data-magicpath-path="CustomerDashboard.tsx">
                  <Building2 className="text-blue-400 shrink-0 mt-0.5" size={20} data-magicpath-id="77" data-magicpath-path="CustomerDashboard.tsx" />
                  <SortableContainer dndKitId="f20b3a37-e50f-4e35-b373-263a4bf9cc08" containerType="regular" prevTag="div" data-magicpath-id="78" data-magicpath-path="CustomerDashboard.tsx">
                    <h4 className="text-blue-400 font-medium mb-2" data-magicpath-id="79" data-magicpath-path="CustomerDashboard.tsx">Multi-Branch Account Benefits</h4>
                    <SortableContainer dndKitId="63424703-9cd4-4a8a-8967-90b6b275e2b8" containerType="regular" prevTag="ul" className="text-sm text-zinc-400 space-y-2" data-magicpath-id="80" data-magicpath-path="CustomerDashboard.tsx">
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
              <SortableContainer dndKitId="f69038cb-8b2a-45c0-8cbd-70e0f7cc22b1" containerType="regular" prevTag="button" onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded transition-colors font-medium flex items-center justify-center gap-2" data-magicpath-id="93" data-magicpath-path="CustomerDashboard.tsx">
                <LogOut size={18} data-magicpath-id="94" data-magicpath-path="CustomerDashboard.tsx" />
                Logout
              </SortableContainer>
            </SortableContainer>}
        </AnimatePresence>
      </SortableContainer>
    </>;
};