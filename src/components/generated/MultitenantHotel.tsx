import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar, Users, Utensils, Waves, Dumbbell, Sparkles, Briefcase, Shirt, Instagram, Facebook, Twitter, MapPin, Mail, ArrowRight, Star, Check, User as UserIcon, LogIn, Building2, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AuthProvider, useAuth } from './AuthContext';
import { TenantProvider, useTenant } from './TenantContext';
import { AuthModal } from './AuthModal';
import { BookingModal } from './BookingModal';
import { UserDashboard } from './UserDashboard';
import { ROOMS_BY_BRANCH, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';

// --- Hero Slides Data ---
const HERO_SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  title: "Luxury Across Nigeria",
  subtitle: "Experience world-class hospitality in Abuja and Lagos.",
  mpid: "45c2551a-df1e-4d46-8bd3-d60d0e80269c"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Your Home Away From Home",
  subtitle: "Book seamlessly across all our branches with one account.",
  mpid: "f8c97aec-3b45-4ce8-a565-e43e564d94ec"
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Unmatched Excellence",
  subtitle: "Where comfort meets sophistication in every detail.",
  mpid: "de2d1c65-9304-4f2f-a3da-6fcf9382857f"
}] as any[];
const FACILITIES = [{
  icon: Utensils,
  name: "Restaurant",
  desc: "Gourmet dining experiences",
  mpid: "8dfaa63e-bb46-46c0-94a9-dc14cc339a40"
}, {
  icon: Waves,
  name: "Swimming Pool",
  desc: "Infinity pool with city views",
  mpid: "98931145-e0ca-430c-9960-94183f5d65c4"
}, {
  icon: Dumbbell,
  name: "Fitness Center",
  desc: "State-of-the-art equipment",
  mpid: "b96d973f-4a7c-4666-ba3a-809861e05e72"
}, {
  icon: Sparkles,
  name: "Spa & Massage",
  desc: "Rejuvenating treatments",
  mpid: "a90407b8-79bd-45d1-b51f-aefed943d2e7"
}, {
  icon: Briefcase,
  name: "Meeting Room",
  desc: "Professional business spaces",
  mpid: "d9e225bc-b7dc-4e91-b97f-b4c12e419e1b"
}, {
  icon: Shirt,
  name: "Laundry Service",
  desc: "24/7 dry cleaning & laundry",
  mpid: "56853aa4-6206-49f1-bbfc-f493fe8d3d1d"
}] as any[];

// --- Components ---

const NavigationSidebar: React.FC<{
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard
}) => {
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const {
    branches,
    currentBranch
  } = useTenant();
  const links = ["Home", "Rooms", "Reservation", "About", "Contact"];
  return <SortableContainer dndKitId="4b3b616a-39b0-48b5-8310-88b1c2d83531" containerType="regular" prevTag="aside" className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800" data-magicpath-id="0" data-magicpath-path="MultitenantHotel.tsx">
      {/* Logo & User Section Combined */}
      <SortableContainer dndKitId="20565867-05ad-4e27-8377-7d5ab1e549c1" containerType="regular" prevTag="div" className="p-8 pb-4 border-b border-zinc-800" data-magicpath-id="1" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500" data-magicpath-id="2" data-magicpath-path="MultitenantHotel.tsx">PHOENIX IMPERIAL</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1" data-magicpath-id="3" data-magicpath-path="MultitenantHotel.tsx">Multi-Branch Hotels</p>
        
        {/* User Actions - Prominent Position */}
        {isAuthenticated && <SortableContainer dndKitId="45b736b2-d266-47f6-aa0b-ad548adb5831" containerType="regular" prevTag="div" className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800" data-magicpath-id="4" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="f4eec34f-7194-445b-b3c9-11af5821c875" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-3" data-magicpath-id="5" data-magicpath-path="MultitenantHotel.tsx">
              <SortableContainer dndKitId="b0e8cdda-6d10-4c69-a2b9-0113402f855c" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0" data-magicpath-id="6" data-magicpath-path="MultitenantHotel.tsx">
                <UserIcon size={18} className="text-amber-500" data-magicpath-id="7" data-magicpath-path="MultitenantHotel.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="1e6d826c-8867-4aea-bf3e-dc636514f0c9" containerType="regular" prevTag="div" className="min-w-0 flex-1" data-magicpath-id="8" data-magicpath-path="MultitenantHotel.tsx">
                <p className="text-sm font-medium text-white truncate" data-magicpath-id="9" data-magicpath-path="MultitenantHotel.tsx">{user?.name}</p>
                <p className="text-xs text-zinc-500 truncate" data-magicpath-id="10" data-magicpath-path="MultitenantHotel.tsx">
                  {user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'branch_admin' ? 'Branch Admin' : 'Customer'}
                </p>
              </SortableContainer>
            </SortableContainer>
            <SortableContainer dndKitId="82f32143-398a-44ca-9e35-defed65f66b1" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-id="11" data-magicpath-path="MultitenantHotel.tsx">
              <button onClick={onOpenDashboard} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded transition-colors text-xs font-medium" data-magicpath-id="12" data-magicpath-path="MultitenantHotel.tsx">
                Dashboard
              </button>
              <SortableContainer dndKitId="d8d36529-5aa1-4bd8-94f6-0bde04dc53fb" containerType="regular" prevTag="button" onClick={logout} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors" title="Logout" data-magicpath-id="13" data-magicpath-path="MultitenantHotel.tsx">
                <LogOut size={16} data-magicpath-id="14" data-magicpath-path="MultitenantHotel.tsx" />
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>}
      </SortableContainer>

      {/* Branch Indicator */}
      {currentBranch && <SortableContainer dndKitId="1db41113-e58a-47af-bb55-ced252960d21" containerType="regular" prevTag="div" className="mx-8 mb-4 mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded" data-magicpath-id="15" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="56c0ae66-a1fe-4c6a-ba6e-6cffb8abadcc" containerType="regular" prevTag="div" className="flex items-center gap-2 text-amber-400 text-xs" data-magicpath-id="16" data-magicpath-path="MultitenantHotel.tsx">
            <Building2 size={14} data-magicpath-id="17" data-magicpath-path="MultitenantHotel.tsx" />
            <span className="uppercase tracking-wider" data-magicpath-id="18" data-magicpath-path="MultitenantHotel.tsx">
              {branches.find(b => b.id === currentBranch)?.city} Branch
            </span>
          </SortableContainer>
        </SortableContainer>}

      <SortableContainer dndKitId="20a268ae-c6b9-4e8c-8f10-00b4d4283dc4" containerType="collection" prevTag="nav" className="flex-1 flex flex-col justify-center px-8 space-y-6" data-magicpath-id="19" data-magicpath-path="MultitenantHotel.tsx">
        {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="MultitenantHotel.tsx">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="MultitenantHotel.tsx"></span>
            {link}
          </a>)}
      </SortableContainer>

      <SortableContainer dndKitId="3e730787-cf79-4118-9906-d3258290f321" containerType="regular" prevTag="div" className="p-8 pt-4 border-t border-zinc-900 space-y-4" data-magicpath-id="22" data-magicpath-path="MultitenantHotel.tsx">
        {/* Auth Button - Only show if not authenticated */}
        {!isAuthenticated && <SortableContainer dndKitId="b13196c7-3244-4e38-80f3-a00cad74a24f" containerType="regular" prevTag="button" onClick={onOpenAuth} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded transition-colors flex items-center justify-center gap-2 text-sm font-medium" data-magicpath-id="23" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={16} data-magicpath-id="24" data-magicpath-path="MultitenantHotel.tsx" />
            Sign In / Sign Up
          </SortableContainer>}

        <SortableContainer dndKitId="b75715c3-aa74-4b75-b5b2-01435d322aae" containerType="regular" prevTag="div" className="flex items-center gap-3 text-amber-500" data-magicpath-id="25" data-magicpath-path="MultitenantHotel.tsx">
          <Phone size={18} data-magicpath-id="26" data-magicpath-path="MultitenantHotel.tsx" />
          <span className="font-serif italic text-sm" data-magicpath-id="27" data-magicpath-path="MultitenantHotel.tsx">+234 809 000 0000</span>
        </SortableContainer>
        <p className="text-zinc-600 text-xs" data-magicpath-id="28" data-magicpath-path="MultitenantHotel.tsx">© 2024 Phoenix Imperial Hotel</p>
      </SortableContainer>
    </SortableContainer>;
};
const MobileNav: React.FC<{
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  return <SortableContainer dndKitId="0fca8bd8-7069-486a-ba81-3613c03ec352" containerType="regular" prevTag="div" className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center" data-magicpath-id="29" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="8d0decf3-d8e0-4d26-b96f-9e410ea464b0" containerType="regular" prevTag="div" data-magicpath-id="30" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-xl font-serif text-amber-500" data-magicpath-id="31" data-magicpath-path="MultitenantHotel.tsx">PHOENIX IMPERIAL</h1>
      </SortableContainer>
      <SortableContainer dndKitId="858dff98-e160-4df3-a68d-459f0f2935b9" containerType="regular" prevTag="div" className="flex items-center gap-3" data-magicpath-id="32" data-magicpath-path="MultitenantHotel.tsx">
        {isAuthenticated ? <>
            <SortableContainer dndKitId="71dd3ea8-0488-44e1-b9eb-b7e9343e6cff" containerType="regular" prevTag="button" onClick={onOpenDashboard} className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/30 transition-colors" data-magicpath-id="33" data-magicpath-path="MultitenantHotel.tsx">
              <UserIcon size={18} data-magicpath-id="34" data-magicpath-path="MultitenantHotel.tsx" />
            </SortableContainer>
            <SortableContainer dndKitId="111f415a-9f8b-4e5b-8db6-5dfc238a63bb" containerType="regular" prevTag="button" onClick={logout} className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors" data-magicpath-id="35" data-magicpath-path="MultitenantHotel.tsx">
              <LogOut size={18} data-magicpath-id="36" data-magicpath-path="MultitenantHotel.tsx" />
            </SortableContainer>
          </> : <SortableContainer dndKitId="202cf913-0eb7-471b-a904-c8d8b4eae496" containerType="regular" prevTag="button" onClick={onOpenAuth} className="text-amber-500 hover:text-amber-400 transition-colors" data-magicpath-id="37" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={20} data-magicpath-id="38" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>}
        <SortableContainer dndKitId="97fad1a4-75a2-44f8-9345-d45a08cef3ca" containerType="regular" prevTag="button" onClick={() => setIsOpen(!isOpen)} className="text-white" data-magicpath-id="39" data-magicpath-path="MultitenantHotel.tsx">
          {isOpen ? <X data-magicpath-id="40" data-magicpath-path="MultitenantHotel.tsx" /> : <Menu data-magicpath-id="41" data-magicpath-path="MultitenantHotel.tsx" />}
        </SortableContainer>
      </SortableContainer>

      {isOpen && <SortableContainer dndKitId="f16efa35-e536-48f2-8fb9-c8fbc4e92b3c" containerType="regular" prevTag="motion.div" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl" data-magicpath-id="42" data-magicpath-path="MultitenantHotel.tsx">
          {isAuthenticated && <SortableContainer dndKitId="fc403826-71b9-4807-b708-90b14895cab0" containerType="regular" prevTag="div" className="pb-4 border-b border-zinc-800" data-magicpath-id="43" data-magicpath-path="MultitenantHotel.tsx">
              <SortableContainer dndKitId="781d795e-3e99-401c-89f4-c877ccf71534" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-3" data-magicpath-id="44" data-magicpath-path="MultitenantHotel.tsx">
                <SortableContainer dndKitId="739b58b5-6041-48e1-9427-86817c61cc4e" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="45" data-magicpath-path="MultitenantHotel.tsx">
                  <UserIcon size={18} className="text-amber-500" data-magicpath-id="46" data-magicpath-path="MultitenantHotel.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="147f02c0-706a-4813-a082-bb75157b28d2" containerType="regular" prevTag="div" data-magicpath-id="47" data-magicpath-path="MultitenantHotel.tsx">
                  <p className="text-white font-medium text-sm" data-magicpath-id="48" data-magicpath-path="MultitenantHotel.tsx">{user?.name}</p>
                  <p className="text-xs text-zinc-500" data-magicpath-id="49" data-magicpath-path="MultitenantHotel.tsx">
                    {user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'branch_admin' ? 'Branch Admin' : 'Customer'}
                  </p>
                </SortableContainer>
              </SortableContainer>
              <button onClick={() => {
          onOpenDashboard();
          setIsOpen(false);
        }} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors text-sm font-medium" data-magicpath-id="50" data-magicpath-path="MultitenantHotel.tsx">
                View Dashboard
              </button>
            </SortableContainer>}
          
          {["Home", "Rooms", "Reservation", "About", "Contact"].map(link => <a key={link} href="#" className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0" onClick={() => setIsOpen(false)} data-magicpath-id="51" data-magicpath-path="MultitenantHotel.tsx">
              {link}
            </a>)}
        </SortableContainer>}
    </SortableContainer>;
};
const HeroSlider: React.FC<{
  onOpenBooking: () => void;
}> = ({
  onOpenBooking
}) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <SortableContainer dndKitId="f846105b-aadc-4740-ac94-0657f28841a1" containerType="regular" prevTag="div" className="relative h-[85vh] w-full overflow-hidden bg-zinc-900" data-magicpath-id="52" data-magicpath-path="MultitenantHotel.tsx">
      <AnimatePresence mode="wait" data-magicpath-id="53" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="8397af0a-c092-4dc3-baad-e9edefb9a7d9" containerType="regular" prevTag="motion.div" key={current} initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.5
      }} className="absolute inset-0" data-magicpath-id="54" data-magicpath-path="MultitenantHotel.tsx">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${HERO_SLIDES[current].image})`
        }} data-magicpath-id="55" data-magicpath-path="MultitenantHotel.tsx" />
          <div className="absolute inset-0 bg-black/40" data-magicpath-id="56" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>
      </AnimatePresence>

      <SortableContainer dndKitId="7d31e480-4128-47f5-9ed1-02f15c881349" containerType="regular" prevTag="div" className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4" data-magicpath-id="57" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="d7a3b233-3f15-474c-8778-44c12b4891af" containerType="regular" prevTag="motion.div" key={`text-${current}`} initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }} data-magicpath-id="58" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="70b48e56-8ec1-4899-91a0-410d1196ca03" containerType="regular" prevTag="div" className="flex items-center justify-center gap-4 mb-4" data-magicpath-id="59" data-magicpath-path="MultitenantHotel.tsx">
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="60" data-magicpath-path="MultitenantHotel.tsx"></div>
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm" data-magicpath-id="61" data-magicpath-path="MultitenantHotel.tsx">Welcome to Phoenix Imperial</span>
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="62" data-magicpath-path="MultitenantHotel.tsx"></div>
          </SortableContainer>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl leading-tight" data-magicpath-id="63" data-magicpath-path="MultitenantHotel.tsx">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto tracking-wide" data-magicpath-id="64" data-magicpath-path="MultitenantHotel.tsx">
            {HERO_SLIDES[current].subtitle}
          </p>
          <SortableContainer dndKitId="660d3bf8-8b1c-4368-9a12-2915c6797738" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group" data-magicpath-id="65" data-magicpath-path="MultitenantHotel.tsx">
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" data-magicpath-id="66" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      <SortableContainer dndKitId="9ee51a4f-6fcd-4469-8f7b-6c7b670ea8dd" containerType="regular" prevTag="div" className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900" data-magicpath-id="67" data-magicpath-path="MultitenantHotel.tsx">
        <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" data-magicpath-id="68" data-magicpath-path="MultitenantHotel.tsx">
          <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" data-magicpath-id="69" data-magicpath-path="MultitenantHotel.tsx" />
        </svg>
      </SortableContainer>
    </SortableContainer>;
};
const ReservationCTA: React.FC<{
  onOpenBooking: () => void;
}> = ({
  onOpenBooking
}) => {
  return <SortableContainer dndKitId="5ba61967-e3a9-4f5c-a56a-dc5c0c1c2b4e" containerType="regular" prevTag="div" className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto" data-magicpath-id="70" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="0c38931d-6066-4439-9f1c-d2251ed93609" containerType="regular" prevTag="div" className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm text-center" data-magicpath-id="71" data-magicpath-path="MultitenantHotel.tsx">
        <h3 className="text-2xl font-serif text-white mb-4" data-magicpath-id="72" data-magicpath-path="MultitenantHotel.tsx">Ready to Book Your Stay?</h3>
        <p className="text-zinc-400 mb-6" data-magicpath-id="73" data-magicpath-path="MultitenantHotel.tsx">Select your preferred branch and check available rooms</p>
        <SortableContainer dndKitId="1c23ed51-38fd-40d9-8c9e-adc78811560d" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center gap-3" data-magicpath-id="74" data-magicpath-path="MultitenantHotel.tsx">
          <Building2 size={18} data-magicpath-id="75" data-magicpath-path="MultitenantHotel.tsx" />
          Check Availability by Branch
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};

// Main Component Content
const MultitenantHotelContent: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const {
    currentBranch
  } = useTenant();

  // Get branch-specific content
  const rooms = currentBranch ? ROOMS_BY_BRANCH[currentBranch] : [];
  const testimonials = currentBranch ? TESTIMONIALS_BY_BRANCH[currentBranch] : [];
  const gallery = currentBranch ? GALLERY_BY_BRANCH[currentBranch] : [];
  return <SortableContainer dndKitId="f2223a24-8eee-4a71-8580-2db14fe00ca6" containerType="regular" prevTag="div" className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white" data-magicpath-id="76" data-magicpath-path="MultitenantHotel.tsx">
      <NavigationSidebar onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} data-magicpath-id="77" data-magicpath-path="MultitenantHotel.tsx" />
      <MobileNav onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} data-magicpath-id="78" data-magicpath-path="MultitenantHotel.tsx" />

      {/* Main Content Area */}
      <SortableContainer dndKitId="76a86a34-9c3a-4abe-8b26-1a28a580a9cb" containerType="regular" prevTag="main" className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative" data-magicpath-id="79" data-magicpath-path="MultitenantHotel.tsx">
        
        {/* Hero Section */}
        <SortableContainer dndKitId="bf052848-32ab-44a4-a87c-6eab7f6ba747" containerType="regular" prevTag="section" id="home" data-magicpath-id="80" data-magicpath-path="MultitenantHotel.tsx">
          <HeroSlider onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="81" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Reservation CTA */}
        <SortableContainer dndKitId="808aae16-a07e-4224-a8bc-a80210cffc53" containerType="regular" prevTag="section" className="pb-24" data-magicpath-id="82" data-magicpath-path="MultitenantHotel.tsx">
          <ReservationCTA onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="83" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Facilities Section */}
        <SortableContainer dndKitId="c6c323d6-4497-41d8-8f13-c73452812952" containerType="regular" prevTag="section" className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto" data-magicpath-id="84" data-magicpath-path="MultitenantHotel.tsx">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="85" data-magicpath-path="MultitenantHotel.tsx">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white" data-magicpath-id="86" data-magicpath-path="MultitenantHotel.tsx">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed" data-magicpath-id="87" data-magicpath-path="MultitenantHotel.tsx">
            Immerse yourself in a world of luxury and convenience across all our branches.
          </p>

          <SortableContainer dndKitId="633611f2-3121-41cb-8e46-e7c1b6128b3f" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" data-magicpath-id="88" data-magicpath-path="MultitenantHotel.tsx">
            {FACILITIES.map((item, idx) => <motion.div data-magicpath-motion-tag="motion.div" key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} className="flex flex-col items-center group p-6 rounded-lg hover:bg-zinc-800/50 transition-colors duration-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="89" data-magicpath-path="MultitenantHotel.tsx">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all duration-300" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="90" data-magicpath-path="MultitenantHotel.tsx">
                  <item.icon size={28} strokeWidth={1.5} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="91" data-magicpath-path="MultitenantHotel.tsx" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-zinc-200 group-hover:text-amber-500 transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="92" data-magicpath-path="MultitenantHotel.tsx">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="desc:unknown" data-magicpath-id="93" data-magicpath-path="MultitenantHotel.tsx">{item.desc}</p>
              </motion.div>)}
          </SortableContainer>
        </SortableContainer>

        {/* Branch-Tagged Content Notice */}
        {currentBranch && <SortableContainer dndKitId="c90fc950-c1ea-4fd4-af7e-7aca2d7862d6" containerType="regular" prevTag="section" className="px-6 md:px-16 py-8 bg-zinc-950" data-magicpath-id="94" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="72cb2b18-70d3-4b3f-976f-1241f517f70b" containerType="regular" prevTag="div" className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-400" data-magicpath-id="95" data-magicpath-path="MultitenantHotel.tsx">
              <Building2 size={20} data-magicpath-id="96" data-magicpath-path="MultitenantHotel.tsx" />
              <p className="text-sm" data-magicpath-id="97" data-magicpath-path="MultitenantHotel.tsx">
                Viewing content from <span className="font-semibold uppercase tracking-wider" data-magicpath-id="98" data-magicpath-path="MultitenantHotel.tsx">
                  {currentBranch.toUpperCase()}
                </span> branch
              </p>
            </SortableContainer>
          </SortableContainer>}

        {/* Testimonials Section (Branch-Specific) */}
        {testimonials.length > 0 && <SortableContainer dndKitId="8792f4cd-3683-4320-8b12-d60630ed8c20" containerType="regular" prevTag="section" className="py-24 bg-zinc-900 px-6 md:px-16" data-magicpath-id="99" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="e6aaa402-dc80-4978-986c-cc86cbaaa655" containerType="regular" prevTag="div" className="max-w-7xl mx-auto text-center" data-magicpath-id="100" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="101" data-magicpath-path="MultitenantHotel.tsx">
                What Guests Say
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-16 text-white" data-magicpath-id="102" data-magicpath-path="MultitenantHotel.tsx">Testimonials</h2>

              <SortableContainer dndKitId="2ac48482-669a-4230-ba9a-fd02c5a72a32" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-8" data-magicpath-id="103" data-magicpath-path="MultitenantHotel.tsx">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-zinc-800 p-8 rounded-lg" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="104" data-magicpath-path="MultitenantHotel.tsx">
                    <div className="flex items-center gap-1 text-amber-400 mb-4 justify-center" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="105" data-magicpath-path="MultitenantHotel.tsx">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className={i >= testimonial.rating ? "opacity-30" : ""} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="106" data-magicpath-path="MultitenantHotel.tsx" />)}
                    </div>
                    <p className="text-zinc-300 italic mb-6 leading-relaxed" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="comment:unknown" data-magicpath-id="107" data-magicpath-path="MultitenantHotel.tsx">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-center gap-3" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="108" data-magicpath-path="MultitenantHotel.tsx">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="109" data-magicpath-path="MultitenantHotel.tsx">
                        <UserIcon size={20} className="text-amber-500" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="110" data-magicpath-path="MultitenantHotel.tsx" />
                      </div>
                      <div className="text-left" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="111" data-magicpath-path="MultitenantHotel.tsx">
                        <p className="text-white font-medium" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="userName:unknown" data-magicpath-id="112" data-magicpath-path="MultitenantHotel.tsx">{testimonial.userName}</p>
                        {testimonial.verified && <p className="text-xs text-amber-400 flex items-center gap-1" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="113" data-magicpath-path="MultitenantHotel.tsx">
                            <Check size={12} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="114" data-magicpath-path="MultitenantHotel.tsx" /> Verified Guest
                          </p>}
                      </div>
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>}

        {/* Gallery Section (Branch-Specific) */}
        {gallery.length > 0 && <SortableContainer dndKitId="c8c2b571-5510-43f7-9a20-1aa98733c0e1" containerType="regular" prevTag="section" className="py-24 bg-zinc-950" data-magicpath-id="115" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="ce6deae5-ca9c-48f8-8d84-e9005ecb436a" containerType="regular" prevTag="div" className="text-center mb-12" data-magicpath-id="116" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium" data-magicpath-id="117" data-magicpath-path="MultitenantHotel.tsx">Gallery</span>
              <h2 className="text-3xl font-serif mt-3 text-white" data-magicpath-id="118" data-magicpath-path="MultitenantHotel.tsx">Explore Our Spaces</h2>
            </SortableContainer>
            
            <SortableContainer dndKitId="4a6cddc8-9d0e-4209-9d48-62f5e85f74bf" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3" data-magicpath-id="119" data-magicpath-path="MultitenantHotel.tsx">
              {gallery.map(item => <div key={item.id} className="relative aspect-square group overflow-hidden cursor-pointer" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="120" data-magicpath-path="MultitenantHotel.tsx">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="imageUrl:unknown" data-magicpath-id="121" data-magicpath-path="MultitenantHotel.tsx" />
                  <div className="absolute inset-0 bg-amber-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="122" data-magicpath-path="MultitenantHotel.tsx">
                    <div className="text-white text-center" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="123" data-magicpath-path="MultitenantHotel.tsx">
                      <p className="font-serif text-lg" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:unknown" data-magicpath-id="124" data-magicpath-path="MultitenantHotel.tsx">{item.title}</p>
                      <p className="text-xs uppercase tracking-wider mt-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="category:unknown" data-magicpath-id="125" data-magicpath-path="MultitenantHotel.tsx">{item.category}</p>
                    </div>
                  </div>
                </div>)}
            </SortableContainer>
          </SortableContainer>}

        {/* Footer */}
        <SortableContainer dndKitId="5a449a3b-59bd-418a-ad5e-e099770f819b" containerType="regular" prevTag="footer" className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16" data-magicpath-id="126" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="667741f3-17bb-4324-8025-4912f8bd69e1" containerType="regular" prevTag="div" className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" data-magicpath-id="127" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="0264c0c3-9bbd-4d6b-a72f-bfedf5c81f5e" containerType="regular" prevTag="div" data-magicpath-id="128" data-magicpath-path="MultitenantHotel.tsx">
              <h2 className="text-3xl font-serif text-amber-500 mb-6" data-magicpath-id="129" data-magicpath-path="MultitenantHotel.tsx">PHOENIX IMPERIAL</h2>
              <p className="text-zinc-500 leading-relaxed mb-6" data-magicpath-id="130" data-magicpath-path="MultitenantHotel.tsx">
                A sanctuary of sophistication across Nigeria. Experience the pinnacle of hospitality.
              </p>
              <div className="flex gap-4" data-magicpath-id="131" data-magicpath-path="MultitenantHotel.tsx">
                {[Facebook, Twitter, Instagram].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-600 hover:text-white transition-all" data-magicpath-id="132" data-magicpath-path="MultitenantHotel.tsx">
                    <Icon size={18} data-magicpath-id="133" data-magicpath-path="MultitenantHotel.tsx" />
                  </a>)}
              </div>
            </SortableContainer>

            <SortableContainer dndKitId="bb0c1d2c-fe8b-42e9-a2fd-c804249a569f" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="135" data-magicpath-path="MultitenantHotel.tsx">Abuja Branch</h3>
              <SortableContainer dndKitId="624f627c-8af3-4e19-8e8a-1029cec106e4" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="MultitenantHotel.tsx">
                <li className="flex items-start gap-2" data-magicpath-id="137" data-magicpath-path="MultitenantHotel.tsx">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" data-magicpath-id="138" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="139" data-magicpath-path="MultitenantHotel.tsx">CBD, Abuja, Nigeria</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="140" data-magicpath-path="MultitenantHotel.tsx">
                  <Phone size={16} className="shrink-0 text-zinc-500" data-magicpath-id="141" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="142" data-magicpath-path="MultitenantHotel.tsx">+234 809 123 4567</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="143" data-magicpath-path="MultitenantHotel.tsx">
                  <Mail size={16} className="shrink-0 text-zinc-500" data-magicpath-id="144" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="145" data-magicpath-path="MultitenantHotel.tsx">abuja@phoeniximperial.com</span>
                </li>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="6900b9e7-2ed3-4083-a379-9df1b8d466ce" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="147" data-magicpath-path="MultitenantHotel.tsx">Lagos Branch</h3>
              <SortableContainer dndKitId="61c948a8-10f0-4cd1-9e88-d8a863a8df56" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="MultitenantHotel.tsx">
                <li className="flex items-start gap-2" data-magicpath-id="149" data-magicpath-path="MultitenantHotel.tsx">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" data-magicpath-id="150" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="151" data-magicpath-path="MultitenantHotel.tsx">Victoria Island, Lagos</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="152" data-magicpath-path="MultitenantHotel.tsx">
                  <Phone size={16} className="shrink-0 text-zinc-500" data-magicpath-id="153" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="154" data-magicpath-path="MultitenantHotel.tsx">+234 809 765 4321</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="155" data-magicpath-path="MultitenantHotel.tsx">
                  <Mail size={16} className="shrink-0 text-zinc-500" data-magicpath-id="156" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="157" data-magicpath-path="MultitenantHotel.tsx">lagos@phoeniximperial.com</span>
                </li>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="bcda3552-1472-4410-aa14-952733f44779" containerType="regular" prevTag="div" data-magicpath-id="158" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="159" data-magicpath-path="MultitenantHotel.tsx">Quick Links</h3>
              <ul className="space-y-3" data-magicpath-id="160" data-magicpath-path="MultitenantHotel.tsx">
                {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map(link => <li key={link} data-magicpath-id="161" data-magicpath-path="MultitenantHotel.tsx">
                    <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 group text-sm" data-magicpath-id="162" data-magicpath-path="MultitenantHotel.tsx">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" data-magicpath-id="163" data-magicpath-path="MultitenantHotel.tsx" />
                      {link}
                    </a>
                  </li>)}
              </ul>
            </SortableContainer>
          </SortableContainer>
          
          <SortableContainer dndKitId="e11e180e-f28f-40d4-9ef0-7e4cd19c506c" containerType="regular" prevTag="div" className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600 uppercase tracking-wider" data-magicpath-id="164" data-magicpath-path="MultitenantHotel.tsx">
            <p data-magicpath-id="165" data-magicpath-path="MultitenantHotel.tsx">© 2024 Phoenix Imperial Multi-Branch Hotels. All rights reserved.</p>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} data-magicpath-id="166" data-magicpath-path="MultitenantHotel.tsx" />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} data-magicpath-id="167" data-magicpath-path="MultitenantHotel.tsx" />
      <UserDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} data-magicpath-id="168" data-magicpath-path="MultitenantHotel.tsx" />
    </SortableContainer>;
};

// Main Component with Providers
export const MultitenantHotel: React.FC = () => {
  return <AuthProvider data-magicpath-id="169" data-magicpath-path="MultitenantHotel.tsx">
      <TenantProvider data-magicpath-id="170" data-magicpath-path="MultitenantHotel.tsx">
        <MultitenantHotelContent data-magicpath-id="171" data-magicpath-path="MultitenantHotel.tsx" />
      </TenantProvider>
    </AuthProvider>;
};