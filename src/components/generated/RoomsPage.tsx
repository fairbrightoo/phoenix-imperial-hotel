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
  return <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Content */}
      <div className="relative min-h-screen flex items-start justify-center p-4 md:p-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 20
      }} className="relative w-full max-w-7xl bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800 my-8">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-6 rounded-t-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-serif text-white mb-2">Our Rooms</h2>
                <p className="text-zinc-400 text-sm">Discover luxury and comfort in every stay</p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Branch Selector */}
            <div className="mb-4">
              {!currentBranch ? <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-400 text-sm mb-3 flex items-center gap-2">
                    <Building2 size={16} />
                    Please select a branch to view available rooms
                  </p>
                  <BranchSelector onSelect={selectBranch} showSelected={false} />
                </div> : <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2">
                    <Building2 size={16} className="text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">
                      {branches.find(b => b.id === currentBranch)?.city} Branch
                    </span>
                  </div>
                  <button onClick={() => selectBranch(currentBranch === 'abuja' ? 'lagos' : 'abuja')} className="text-xs text-zinc-400 hover:text-amber-400 transition-colors underline">
                    Switch to {currentBranch === 'abuja' ? 'Lagos' : 'Abuja'}
                  </button>
                </div>}
            </div>

            {/* Filters and Sort */}
            {currentBranch && <div className="flex flex-wrap items-center gap-4">
                {/* Filter by Type */}
                <div className="relative">
                  <select value={filterType} onChange={e => setFilterType(e.target.value)} className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-10 rounded border border-zinc-700 focus:outline-none focus:border-amber-500 text-sm cursor-pointer">
                    <option value="all">All Room Types</option>
                    {roomTypes.map(type => <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="appearance-none bg-zinc-800 text-white px-4 py-2 pr-10 rounded border border-zinc-700 focus:outline-none focus:border-amber-500 text-sm cursor-pointer">
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>

                {/* Results Count */}
                <div className="ml-auto text-sm text-zinc-400">
                  {sortedRooms.length} room{sortedRooms.length !== 1 ? 's' : ''} available
                </div>
              </div>}
          </div>

          {/* Rooms Grid */}
          <div className="p-6">
            {!currentBranch ? <div className="text-center py-16 text-zinc-500">
                <Building2 size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a branch to view available rooms</p>
              </div> : sortedRooms.length === 0 ? <div className="text-center py-16 text-zinc-500">
                <p>No rooms found matching your criteria</p>
              </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRooms.map((room, idx) => <motion.div key={room.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: idx * 0.1
            }} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-amber-500/50 transition-all duration-300 group">
                    {/* Room Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {room.type}
                      </div>
                      {room.rating && <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Star size={12} fill="currentColor" className="text-amber-400" />
                          <span>{room.rating}</span>
                        </div>}
                    </div>

                    {/* Room Details */}
                    <div className="p-5">
                      <h3 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                        {room.description}
                      </p>

                      {/* Room Info */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 pb-4 border-b border-zinc-700">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{room.maxGuests} guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize size={14} />
                          <span>{room.size}</span>
                        </div>
                      </div>

                      {/* Amenities Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 4).map((amenity, i) => {
                    const Icon = getAmenityIcon(amenity);
                    return <div key={i} className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded text-xs text-zinc-400" title={amenity}>
                              <Icon size={12} />
                              <span className="hidden sm:inline">{amenity}</span>
                            </div>;
                  })}
                        {room.amenities.length > 4 && <div className="flex items-center bg-zinc-900 px-2 py-1 rounded text-xs text-zinc-400">
                            +{room.amenities.length - 4} more
                          </div>}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-amber-400">
                            ₦{room.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-zinc-500">per night</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedRoom(room)} className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded text-sm transition-colors">
                            Details
                          </button>
                          <button onClick={() => onBook?.(room)} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>)}
              </div>}
          </div>
        </motion.div>
      </div>

      {/* Room Details Modal */}
      {selectedRoom && <div className="fixed inset-0 z-[110] overflow-y-auto">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedRoom(null)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="relative w-full max-w-4xl bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
              {/* Close Button */}
              <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-serif text-white mb-2">{selectedRoom.name}</h2>
                    <p className="text-zinc-400">{selectedRoom.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-amber-400">
                      ₦{selectedRoom.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-zinc-500">per night</p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-zinc-800">
                  <div className="text-center p-4 bg-zinc-800 rounded">
                    <Users size={24} className="mx-auto mb-2 text-amber-400" />
                    <p className="text-sm text-zinc-400">Max Guests</p>
                    <p className="text-white font-medium">{selectedRoom.maxGuests}</p>
                  </div>
                  <div className="text-center p-4 bg-zinc-800 rounded">
                    <Maximize size={24} className="mx-auto mb-2 text-amber-400" />
                    <p className="text-sm text-zinc-400">Room Size</p>
                    <p className="text-white font-medium">{selectedRoom.size}</p>
                  </div>
                  {selectedRoom.rating && <div className="text-center p-4 bg-zinc-800 rounded">
                      <Star size={24} className="mx-auto mb-2 text-amber-400" fill="currentColor" />
                      <p className="text-sm text-zinc-400">Rating</p>
                      <p className="text-white font-medium">{selectedRoom.rating} / 5</p>
                    </div>}
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-xl font-serif text-white mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedRoom.amenities.map((amenity, i) => {
                  const Icon = getAmenityIcon(amenity);
                  return <div key={i} className="flex items-center gap-2 text-zinc-300">
                          <Icon size={16} className="text-amber-400" />
                          <span className="text-sm">{amenity}</span>
                        </div>;
                })}
                  </div>
                </div>

                {/* Book Button */}
                <button onClick={() => {
              setSelectedRoom(null);
              onBook?.(selectedRoom);
            }} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded font-medium text-lg transition-colors">
                  Book This Room
                </button>
              </div>
            </motion.div>
          </div>
        </div>}
    </div>;
};