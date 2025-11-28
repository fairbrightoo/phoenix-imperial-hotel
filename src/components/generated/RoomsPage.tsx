import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Maximize, Check, Star, Building2, Wifi, Wind, Tv, Coffee, Sparkles, ChevronDown } from 'lucide-react';
import { useTenant } from './TenantContext';
import { ROOMS_BY_BRANCH } from './mockData';
import { Room } from './types';
import { BranchSelector } from './BranchSelector';
interface RoomsPageProps {
  isOpen: boolean;
  onClose: () => void;
  onBook?: (room: Room) => void;
  mpid?: string;
}
export const RoomsPage: React.FC<RoomsPageProps> = ({
  isOpen,
  onClose,
  onBook
}) => {
  const {
    currentBranch,
    selectBranch,
    branches
  } = useTenant();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('price-asc');
  if (!isOpen) return null;

  // Get rooms for current branch
  const branchRooms = currentBranch ? ROOMS_BY_BRANCH[currentBranch] : [];

  // Filter rooms
  const filteredRooms = branchRooms.filter(room => {
    if (filterType === 'all') return true;
    return room.type === filterType;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // Get unique room types
  const roomTypes = Array.from(new Set(branchRooms.map(r => r.type)));
  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'AC': Wind,
    'TV': Tv,
    'Smart TV': Tv,
    'Coffee': Coffee,
    'Mini Bar': Coffee,
    'Spa': Sparkles
  };
  const getAmenityIcon = (amenity: string) => {
    for (const [key, Icon] of Object.entries(amenityIcons)) {
      if (amenity.includes(key)) return Icon;
    }
    return Check;
  };
  return <SortableContainer dndKitId="ef92011f-0132-4995-a71a-89170f9a63be" containerType="regular" prevTag="div" className="fixed inset-0 z-[100] overflow-y-auto" data-magicpath-id="0" data-magicpath-path="RoomsPage.tsx">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} data-magicpath-id="1" data-magicpath-path="RoomsPage.tsx" />

      {/* Content */}
      <SortableContainer dndKitId="0210701a-996e-4e1e-bdbb-271c3305200c" containerType="regular" prevTag="div" className="relative min-h-screen flex items-start justify-center p-4 md:p-8" data-magicpath-id="2" data-magicpath-path="RoomsPage.tsx">
        <SortableContainer dndKitId="6a950906-39eb-403d-a494-2b437cd9e9b2" containerType="regular" prevTag="motion.div" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 20
      }} className="relative w-full max-w-7xl bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800 my-8" data-magicpath-id="3" data-magicpath-path="RoomsPage.tsx">
          {/* Header */}
          <SortableContainer dndKitId="a32384f2-2adf-484a-b4f9-ec9954bc5fe6" containerType="regular" prevTag="div" className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-6 rounded-t-lg" data-magicpath-id="4" data-magicpath-path="RoomsPage.tsx">
            <SortableContainer dndKitId="09565f49-8046-46ea-b9d1-be5c63265278" containerType="regular" prevTag="div" className="flex items-center justify-between mb-4" data-magicpath-id="5" data-magicpath-path="RoomsPage.tsx">
              <SortableContainer dndKitId="7bc5f048-f35d-4f7e-97bd-bd9b9c732717" containerType="regular" prevTag="div" data-magicpath-id="6" data-magicpath-path="RoomsPage.tsx">
                <h2 className="text-3xl font-serif text-white mb-2" data-magicpath-id="7" data-magicpath-path="RoomsPage.tsx">Our Rooms</h2>
                <p className="text-zinc-400 text-sm" data-magicpath-id="8" data-magicpath-path="RoomsPage.tsx">Discover luxury and comfort in every stay</p>
              </SortableContainer>
              <SortableContainer dndKitId="91c83b34-cfe8-4141-9422-1328e9ea91e6" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors" data-magicpath-id="9" data-magicpath-path="RoomsPage.tsx">
                <X size={20} data-magicpath-id="10" data-magicpath-path="RoomsPage.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Branch Selector */}
            <SortableContainer dndKitId="8d0a2bea-bbab-4695-87f7-6b255827dc8e" containerType="regular" prevTag="div" className="mb-4" data-magicpath-id="11" data-magicpath-path="RoomsPage.tsx">
              {!currentBranch ? <SortableContainer dndKitId="3f4f0a4a-d3ab-4f26-b555-c1099b74cac3" containerType="regular" prevTag="div" className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4" data-magicpath-id="12" data-magicpath-path="RoomsPage.tsx">
                  <p className="text-amber-400 text-sm mb-3 flex items-center gap-2" data-magicpath-id="13" data-magicpath-path="RoomsPage.tsx">
                    <Building2 size={16} data-magicpath-id="14" data-magicpath-path="RoomsPage.tsx" />
                    Please select a branch to view available rooms
                  </p>
                  <BranchSelector onSelect={selectBranch} showSelected={false} data-magicpath-id="15" data-magicpath-path="RoomsPage.tsx" />
                </SortableContainer> : <SortableContainer dndKitId="fa8703be-09df-4187-8dd4-dd296c43fc0a" containerType="regular" prevTag="div" className="flex items-center gap-4" data-magicpath-id="16" data-magicpath-path="RoomsPage.tsx">
                  <SortableContainer dndKitId="5f91060a-6f69-4ee5-80f4-e616f2f3ba7d" containerType="regular" prevTag="div" className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2" data-magicpath-id="17" data-magicpath-path="RoomsPage.tsx">
                    <Building2 size={16} className="text-amber-400" data-magicpath-id="18" data-magicpath-path="RoomsPage.tsx" />
                    <span className="text-amber-400 text-sm font-medium uppercase tracking-wider" data-magicpath-id="19" data-magicpath-path="RoomsPage.tsx">
                      {branches.find(b => b.id === currentBranch)?.city} Branch
                    </span>
                  </SortableContainer>
                  <button onClick={() => selectBranch(currentBranch === 'abuja' ? 'lagos' : 'abuja')} className="text-xs text-zinc-400 hover:text-amber-400 transition-colors underline" data-magicpath-id="20" data-magicpath-path="RoomsPage.tsx">
                    Switch to {currentBranch === 'abuja' ? 'Lagos' : 'Abuja'}
                  </button>
                </SortableContainer>}
            </SortableContainer>

            {/* Filters and Sort */}
            {currentBranch && <SortableContainer dndKitId="849c72ff-2fad-4307-a1a2-35ebd5cecf40" containerType="regular" prevTag="div" className="flex flex-wrap items-center gap-4" data-magicpath-id="21" data-magicpath-path="RoomsPage.tsx">
                {/* Filter by Type */}
                <SortableContainer dndKitId="c4fe3ef4-c3be-4d89-a090-c82be15a95db" containerType="regular" prevTag="div" className="relative" data-magicpath-id="22" data-magicpath-path="RoomsPage.tsx">
                  <select value={filterType} onChange={e => setFilterType(e.target.value)} className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-10 rounded border border-zinc-700 focus:outline-none focus:border-amber-500 text-sm cursor-pointer" data-magicpath-id="23" data-magicpath-path="RoomsPage.tsx">
                    <option value="all" data-magicpath-id="24" data-magicpath-path="RoomsPage.tsx">All Room Types</option>
                    {roomTypes.map(type => <option key={type} value={type} data-magicpath-uuid={(type as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="RoomsPage.tsx">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" data-magicpath-id="26" data-magicpath-path="RoomsPage.tsx" />
                </SortableContainer>

                {/* Sort */}
                <SortableContainer dndKitId="54026453-42df-4c94-b546-36c5f0d8433e" containerType="regular" prevTag="div" className="relative" data-magicpath-id="27" data-magicpath-path="RoomsPage.tsx">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-10 rounded border border-zinc-700 focus:outline-none focus:border-amber-500 text-sm cursor-pointer" data-magicpath-id="28" data-magicpath-path="RoomsPage.tsx">
                    <option value="price-asc" data-magicpath-id="29" data-magicpath-path="RoomsPage.tsx">Price: Low to High</option>
                    <option value="price-desc" data-magicpath-id="30" data-magicpath-path="RoomsPage.tsx">Price: High to Low</option>
                    <option value="rating" data-magicpath-id="31" data-magicpath-path="RoomsPage.tsx">Highest Rated</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" data-magicpath-id="32" data-magicpath-path="RoomsPage.tsx" />
                </SortableContainer>

                {/* Results Count */}
                <div className="ml-auto text-sm text-zinc-400" data-magicpath-id="33" data-magicpath-path="RoomsPage.tsx">
                  {sortedRooms.length} room{sortedRooms.length !== 1 ? 's' : ''} available
                </div>
              </SortableContainer>}
          </SortableContainer>

          {/* Rooms Grid */}
          <SortableContainer dndKitId="a713d757-312e-4de4-90d6-036841a3ab74" containerType="regular" prevTag="div" className="p-6" data-magicpath-id="34" data-magicpath-path="RoomsPage.tsx">
            {!currentBranch ? <SortableContainer dndKitId="08c41648-27ca-464a-978b-2d4e91276b5e" containerType="regular" prevTag="div" className="text-center py-16 text-zinc-500" data-magicpath-id="35" data-magicpath-path="RoomsPage.tsx">
                <Building2 size={48} className="mx-auto mb-4 opacity-50" data-magicpath-id="36" data-magicpath-path="RoomsPage.tsx" />
                <p data-magicpath-id="37" data-magicpath-path="RoomsPage.tsx">Select a branch to view available rooms</p>
              </SortableContainer> : sortedRooms.length === 0 ? <SortableContainer dndKitId="42d251a3-2b7d-4ea1-af56-e886a09c5d5e" containerType="regular" prevTag="div" className="text-center py-16 text-zinc-500" data-magicpath-id="38" data-magicpath-path="RoomsPage.tsx">
                <p data-magicpath-id="39" data-magicpath-path="RoomsPage.tsx">No rooms found matching your criteria</p>
              </SortableContainer> : <SortableContainer dndKitId="6e9dd43c-c659-4c13-8c52-f6b854293c42" containerType="collection" prevTag="div" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-magicpath-id="40" data-magicpath-path="RoomsPage.tsx">
                {sortedRooms.map((room, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={room.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.1
            }} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 group" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="41" data-magicpath-path="RoomsPage.tsx">
                    {/* Room Image */}
                    <div className="relative aspect-[4/3] overflow-hidden" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="42" data-magicpath-path="RoomsPage.tsx">
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="43" data-magicpath-path="RoomsPage.tsx" />
                      <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="type:unknown" data-magicpath-id="44" data-magicpath-path="RoomsPage.tsx">
                        {room.type}
                      </div>
                      {room.rating && <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="45" data-magicpath-path="RoomsPage.tsx">
                          <Star size={12} fill="currentColor" className="text-amber-400" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="46" data-magicpath-path="RoomsPage.tsx" />
                          <span data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="rating:unknown" data-magicpath-id="47" data-magicpath-path="RoomsPage.tsx">{room.rating}</span>
                        </div>}
                    </div>

                    {/* Room Details */}
                    <div className="p-5" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="48" data-magicpath-path="RoomsPage.tsx">
                      <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="49" data-magicpath-path="RoomsPage.tsx">
                        {room.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="description:unknown" data-magicpath-id="50" data-magicpath-path="RoomsPage.tsx">
                        {room.description}
                      </p>

                      {/* Room Info */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 pb-4 border-b border-zinc-700" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="51" data-magicpath-path="RoomsPage.tsx">
                        <div className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="52" data-magicpath-path="RoomsPage.tsx">
                          <Users size={14} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="RoomsPage.tsx" />
                          <span data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="maxGuests:unknown" data-magicpath-id="54" data-magicpath-path="RoomsPage.tsx">{room.maxGuests} guests</span>
                        </div>
                        <div className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="55" data-magicpath-path="RoomsPage.tsx">
                          <Maximize size={14} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="56" data-magicpath-path="RoomsPage.tsx" />
                          <span data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="size:unknown" data-magicpath-id="57" data-magicpath-path="RoomsPage.tsx">{room.size}</span>
                        </div>
                      </div>

                      {/* Amenities Preview */}
                      <SortableContainer dndKitId="cb27887c-32ac-462e-974f-d84b0dfb14e6" containerType="collection" prevTag="div" className="flex flex-wrap gap-2 mb-4" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="58" data-magicpath-path="RoomsPage.tsx">
                        {room.amenities.slice(0, 4).map((amenity, i) => {
                    const Icon = getAmenityIcon(amenity);
                    return <div key={i} className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded text-xs text-zinc-400" title={amenity} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="59" data-magicpath-path="RoomsPage.tsx">
                              <Icon size={12} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="60" data-magicpath-path="RoomsPage.tsx" />
                              <span className="hidden sm:inline" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="61" data-magicpath-path="RoomsPage.tsx">{amenity}</span>
                            </div>;
                  })}
                        {room.amenities.length > 4 && <div className="flex items-center bg-zinc-900 px-2 py-1 rounded text-xs text-zinc-400" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="62" data-magicpath-path="RoomsPage.tsx">
                            +{room.amenities.length - 4} more
                          </div>}
                      </SortableContainer>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="63" data-magicpath-path="RoomsPage.tsx">
                        <div data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="64" data-magicpath-path="RoomsPage.tsx">
                          <p className="text-2xl font-bold text-amber-400" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="65" data-magicpath-path="RoomsPage.tsx">
                            ₦{room.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-zinc-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="66" data-magicpath-path="RoomsPage.tsx">per night</p>
                        </div>
                        <div className="flex gap-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="67" data-magicpath-path="RoomsPage.tsx">
                          <button onClick={() => setSelectedRoom(room)} className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded text-sm transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="68" data-magicpath-path="RoomsPage.tsx">
                            Details
                          </button>
                          <button onClick={() => onBook?.(room)} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="69" data-magicpath-path="RoomsPage.tsx">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>)}
              </SortableContainer>}
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      {/* Room Details Modal */}
      {selectedRoom && <SortableContainer dndKitId="741862ab-45f7-457f-9681-3275c21ed167" containerType="regular" prevTag="div" className="fixed inset-0 z-[110] overflow-y-auto" data-magicpath-id="70" data-magicpath-path="RoomsPage.tsx">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedRoom(null)} data-magicpath-id="71" data-magicpath-path="RoomsPage.tsx" />
          <SortableContainer dndKitId="5e081032-6630-4bff-b92e-30444cf08046" containerType="regular" prevTag="div" className="relative min-h-screen flex items-center justify-center p-4" data-magicpath-id="72" data-magicpath-path="RoomsPage.tsx">
            <SortableContainer dndKitId="064c4224-2de4-40ed-90f9-8f81bfa7532f" containerType="regular" prevTag="motion.div" initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="relative w-full max-w-4xl bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden" data-magicpath-id="73" data-magicpath-path="RoomsPage.tsx">
              {/* Close Button */}
              <SortableContainer dndKitId="a5fea407-2f0d-478f-b74e-7433d8509793" containerType="regular" prevTag="button" onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors" data-magicpath-id="74" data-magicpath-path="RoomsPage.tsx">
                <X size={20} data-magicpath-id="75" data-magicpath-path="RoomsPage.tsx" />
              </SortableContainer>

              {/* Image */}
              <SortableContainer dndKitId="0a7e9571-6c67-434d-997a-e49c4a9b3313" containerType="regular" prevTag="div" className="relative aspect-[16/9] overflow-hidden" data-magicpath-id="76" data-magicpath-path="RoomsPage.tsx">
                <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover" data-magicpath-id="77" data-magicpath-path="RoomsPage.tsx" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" data-magicpath-id="78" data-magicpath-path="RoomsPage.tsx" />
              </SortableContainer>

              {/* Content */}
              <SortableContainer dndKitId="95a59725-12f5-42e5-a4cd-995c387f4b29" containerType="regular" prevTag="div" className="p-8" data-magicpath-id="79" data-magicpath-path="RoomsPage.tsx">
                <SortableContainer dndKitId="7f5959c1-d2d7-47e4-9ce7-0764f24e1f52" containerType="regular" prevTag="div" className="flex items-start justify-between mb-6" data-magicpath-id="80" data-magicpath-path="RoomsPage.tsx">
                  <SortableContainer dndKitId="a876362b-142d-469d-ae60-6c4251bc14de" containerType="regular" prevTag="div" data-magicpath-id="81" data-magicpath-path="RoomsPage.tsx">
                    <h2 className="text-3xl font-serif text-white mb-2" data-magicpath-id="82" data-magicpath-path="RoomsPage.tsx">{selectedRoom.name}</h2>
                    <p className="text-zinc-400" data-magicpath-id="83" data-magicpath-path="RoomsPage.tsx">{selectedRoom.description}</p>
                  </SortableContainer>
                  <SortableContainer dndKitId="f20ca10d-66ec-4abd-8f2e-89953d09abe4" containerType="regular" prevTag="div" className="text-right" data-magicpath-id="84" data-magicpath-path="RoomsPage.tsx">
                    <p className="text-3xl font-bold text-amber-400" data-magicpath-id="85" data-magicpath-path="RoomsPage.tsx">
                      ₦{selectedRoom.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-500" data-magicpath-id="86" data-magicpath-path="RoomsPage.tsx">per night</p>
                  </SortableContainer>
                </SortableContainer>

                {/* Room Info */}
                <SortableContainer dndKitId="fd83c5fe-bfd4-4db4-a23b-0ad2d11492fa" containerType="regular" prevTag="div" className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-zinc-800" data-magicpath-id="87" data-magicpath-path="RoomsPage.tsx">
                  <SortableContainer dndKitId="62e6ac9a-5b2e-48e8-8450-0922af491106" containerType="regular" prevTag="div" className="text-center p-4 bg-zinc-800 rounded" data-magicpath-id="88" data-magicpath-path="RoomsPage.tsx">
                    <Users size={24} className="mx-auto mb-2 text-amber-400" data-magicpath-id="89" data-magicpath-path="RoomsPage.tsx" />
                    <p className="text-sm text-zinc-400" data-magicpath-id="90" data-magicpath-path="RoomsPage.tsx">Max Guests</p>
                    <p className="text-white font-medium" data-magicpath-id="91" data-magicpath-path="RoomsPage.tsx">{selectedRoom.maxGuests}</p>
                  </SortableContainer>
                  <SortableContainer dndKitId="f287b997-08aa-4faf-8766-e958f297ae21" containerType="regular" prevTag="div" className="text-center p-4 bg-zinc-800 rounded" data-magicpath-id="92" data-magicpath-path="RoomsPage.tsx">
                    <Maximize size={24} className="mx-auto mb-2 text-amber-400" data-magicpath-id="93" data-magicpath-path="RoomsPage.tsx" />
                    <p className="text-sm text-zinc-400" data-magicpath-id="94" data-magicpath-path="RoomsPage.tsx">Room Size</p>
                    <p className="text-white font-medium" data-magicpath-id="95" data-magicpath-path="RoomsPage.tsx">{selectedRoom.size}</p>
                  </SortableContainer>
                  {selectedRoom.rating && <SortableContainer dndKitId="2a46774a-df17-43e2-be07-afe737e7974d" containerType="regular" prevTag="div" className="text-center p-4 bg-zinc-800 rounded" data-magicpath-id="96" data-magicpath-path="RoomsPage.tsx">
                      <Star size={24} className="mx-auto mb-2 text-amber-400" fill="currentColor" data-magicpath-id="97" data-magicpath-path="RoomsPage.tsx" />
                      <p className="text-sm text-zinc-400" data-magicpath-id="98" data-magicpath-path="RoomsPage.tsx">Rating</p>
                      <p className="text-white font-medium" data-magicpath-id="99" data-magicpath-path="RoomsPage.tsx">{selectedRoom.rating} / 5</p>
                    </SortableContainer>}
                </SortableContainer>

                {/* Amenities */}
                <SortableContainer dndKitId="ebb15d03-ec9b-4a30-9327-aa4cdb5c347c" containerType="regular" prevTag="div" className="mb-6" data-magicpath-id="100" data-magicpath-path="RoomsPage.tsx">
                  <h3 className="text-xl font-serif text-white mb-4" data-magicpath-id="101" data-magicpath-path="RoomsPage.tsx">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-magicpath-id="102" data-magicpath-path="RoomsPage.tsx">
                    {selectedRoom.amenities.map((amenity, i) => {
                  const Icon = getAmenityIcon(amenity);
                  return <SortableContainer dndKitId="720ebd13-2069-4b3e-82bd-e8fbea5f3bf0" containerType="regular" prevTag="div" key={i} className="flex items-center gap-2 text-zinc-300" data-magicpath-id="103" data-magicpath-path="RoomsPage.tsx">
                          <Icon size={16} className="text-amber-400" data-magicpath-id="104" data-magicpath-path="RoomsPage.tsx" />
                          <span className="text-sm" data-magicpath-id="105" data-magicpath-path="RoomsPage.tsx">{amenity}</span>
                        </SortableContainer>;
                })}
                  </div>
                </SortableContainer>

                {/* Book Button */}
                <button onClick={() => {
              setSelectedRoom(null);
              onBook?.(selectedRoom);
            }} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded font-medium text-lg transition-colors" data-magicpath-id="106" data-magicpath-path="RoomsPage.tsx">
                  Book This Room
                </button>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>}
    </SortableContainer>;
};