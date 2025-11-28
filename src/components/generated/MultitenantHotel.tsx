import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar, Users, Utensils, Waves, Dumbbell, Sparkles, Briefcase, Shirt, Instagram, Facebook, Twitter, MapPin, Mail, ArrowRight, Star, Check, User as UserIcon, LogIn, Building2 } from 'lucide-react';
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
  mpid: "dc2dc8f7-3b6b-40e9-8ceb-4b53f83c9e34"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Your Home Away From Home",
  subtitle: "Book seamlessly across all our branches with one account.",
  mpid: "780d0483-f439-4eac-9730-63ad9516ce54"
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Unmatched Excellence",
  subtitle: "Where comfort meets sophistication in every detail.",
  mpid: "4ba34b49-9eb7-4254-9bb3-fdea98f779a8"
}] as any[];
const FACILITIES = [{
  icon: Utensils,
  name: "Restaurant",
  desc: "Gourmet dining experiences",
  mpid: "47073411-6923-4683-92f5-ff52e7008033"
}, {
  icon: Waves,
  name: "Swimming Pool",
  desc: "Infinity pool with city views",
  mpid: "3dab5ed1-d989-47d8-9891-3a0f81a13c43"
}, {
  icon: Dumbbell,
  name: "Fitness Center",
  desc: "State-of-the-art equipment",
  mpid: "4a767db1-c3fa-43f1-8cbe-5abc7fc8f28a"
}, {
  icon: Sparkles,
  name: "Spa & Massage",
  desc: "Rejuvenating treatments",
  mpid: "7c7fb46a-7ce3-40b0-91a9-97ce4334351d"
}, {
  icon: Briefcase,
  name: "Meeting Room",
  desc: "Professional business spaces",
  mpid: "c3bdf5bf-c072-4247-8b0a-def644162606"
}, {
  icon: Shirt,
  name: "Laundry Service",
  desc: "24/7 dry cleaning & laundry",
  mpid: "a951c8bd-e9eb-4e37-aeca-efe7e10a1507"
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
    user
  } = useAuth();
  const {
    branches,
    currentBranch
  } = useTenant();
  const links = ["Home", "Rooms", "Reservation", "About", "Contact"];
  return <SortableContainer dndKitId="9bd221cf-d838-44c7-b4d6-1dd76a3a6ac8" containerType="regular" prevTag="aside" className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800" data-magicpath-id="0" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="8cb5ef2a-4b75-44f5-852b-dbdc0b3f0341" containerType="regular" prevTag="div" className="p-8 pb-4" data-magicpath-id="1" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500" data-magicpath-id="2" data-magicpath-path="MultitenantHotel.tsx">ALMARIS</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1" data-magicpath-id="3" data-magicpath-path="MultitenantHotel.tsx">Multi-Branch Hotels</p>
      </SortableContainer>

      {/* Branch Indicator */}
      {currentBranch && <SortableContainer dndKitId="5a565865-0958-45ed-a256-55c7d7042459" containerType="regular" prevTag="div" className="mx-8 mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded" data-magicpath-id="4" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="8f0388ea-1601-4a7a-8e25-fbdc532a0e38" containerType="regular" prevTag="div" className="flex items-center gap-2 text-amber-400 text-xs" data-magicpath-id="5" data-magicpath-path="MultitenantHotel.tsx">
            <Building2 size={14} data-magicpath-id="6" data-magicpath-path="MultitenantHotel.tsx" />
            <span className="uppercase tracking-wider" data-magicpath-id="7" data-magicpath-path="MultitenantHotel.tsx">
              {branches.find(b => b.id === currentBranch)?.city} Branch
            </span>
          </SortableContainer>
        </SortableContainer>}

      <SortableContainer dndKitId="dd7b9307-c3d9-4977-98d1-e797acacec02" containerType="collection" prevTag="nav" className="flex-1 flex flex-col justify-center px-8 space-y-6" data-magicpath-id="8" data-magicpath-path="MultitenantHotel.tsx">
        {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="MultitenantHotel.tsx">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="10" data-magicpath-path="MultitenantHotel.tsx"></span>
            {link}
          </a>)}
      </SortableContainer>

      <SortableContainer dndKitId="1f6a0646-ca3c-4267-a5cd-11e2c0428765" containerType="regular" prevTag="div" className="p-8 pt-4 border-t border-zinc-900 space-y-4" data-magicpath-id="11" data-magicpath-path="MultitenantHotel.tsx">
        {/* Auth Button */}
        {isAuthenticated ? <SortableContainer dndKitId="77afb774-13db-4038-8c99-7d25bb57dacf" containerType="regular" prevTag="button" onClick={onOpenDashboard} className="w-full flex items-center gap-3 text-amber-500 hover:text-amber-400 transition-colors" data-magicpath-id="12" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="bde870d9-a5a0-4e67-8cbe-292f68411e46" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="13" data-magicpath-path="MultitenantHotel.tsx">
              <UserIcon size={18} data-magicpath-id="14" data-magicpath-path="MultitenantHotel.tsx" />
            </SortableContainer>
            <SortableContainer dndKitId="f541cdff-cf5e-4723-8ee8-f9ccae591bb9" containerType="regular" prevTag="div" className="text-left" data-magicpath-id="15" data-magicpath-path="MultitenantHotel.tsx">
              <p className="text-sm font-medium" data-magicpath-id="16" data-magicpath-path="MultitenantHotel.tsx">{user?.name}</p>
              <p className="text-xs text-zinc-500" data-magicpath-id="17" data-magicpath-path="MultitenantHotel.tsx">View Dashboard</p>
            </SortableContainer>
          </SortableContainer> : <SortableContainer dndKitId="4102e4df-8fc3-4c7f-bbd8-9697a7b4edda" containerType="regular" prevTag="button" onClick={onOpenAuth} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded transition-colors flex items-center justify-center gap-2 text-sm font-medium" data-magicpath-id="18" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={16} data-magicpath-id="19" data-magicpath-path="MultitenantHotel.tsx" />
            Sign In / Sign Up
          </SortableContainer>}

        <SortableContainer dndKitId="828a5fe5-93e8-49da-8690-aae65b14eb50" containerType="regular" prevTag="div" className="flex items-center gap-3 text-amber-500" data-magicpath-id="20" data-magicpath-path="MultitenantHotel.tsx">
          <Phone size={18} data-magicpath-id="21" data-magicpath-path="MultitenantHotel.tsx" />
          <span className="font-serif italic text-sm" data-magicpath-id="22" data-magicpath-path="MultitenantHotel.tsx">+234 809 000 0000</span>
        </SortableContainer>
        <p className="text-zinc-600 text-xs" data-magicpath-id="23" data-magicpath-path="MultitenantHotel.tsx">© 2024 Almaris Hotel</p>
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
    user
  } = useAuth();
  return <SortableContainer dndKitId="e4ff3e36-a3aa-481e-a573-f2c8f21fa385" containerType="regular" prevTag="div" className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center" data-magicpath-id="24" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="e7562e8a-79dc-48ac-99d4-2bbf0f04cd28" containerType="regular" prevTag="div" data-magicpath-id="25" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-xl font-serif text-amber-500" data-magicpath-id="26" data-magicpath-path="MultitenantHotel.tsx">ALMARIS</h1>
      </SortableContainer>
      <SortableContainer dndKitId="aa41cbf5-9196-48c5-a3f2-6a6a80e2a339" containerType="regular" prevTag="div" className="flex items-center gap-3" data-magicpath-id="27" data-magicpath-path="MultitenantHotel.tsx">
        {isAuthenticated ? <SortableContainer dndKitId="f6244f2d-4e90-4ebd-a440-826a2c078aec" containerType="regular" prevTag="button" onClick={onOpenDashboard} className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500" data-magicpath-id="28" data-magicpath-path="MultitenantHotel.tsx">
            <UserIcon size={18} data-magicpath-id="29" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer> : <SortableContainer dndKitId="8ed699f3-2eb4-4d10-a265-b188508e7eb9" containerType="regular" prevTag="button" onClick={onOpenAuth} className="text-amber-500 hover:text-amber-400 transition-colors" data-magicpath-id="30" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={20} data-magicpath-id="31" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>}
        <SortableContainer dndKitId="93f2da6d-a541-4d32-877c-79b52fd7d072" containerType="regular" prevTag="button" onClick={() => setIsOpen(!isOpen)} className="text-white" data-magicpath-id="32" data-magicpath-path="MultitenantHotel.tsx">
          {isOpen ? <X data-magicpath-id="33" data-magicpath-path="MultitenantHotel.tsx" /> : <Menu data-magicpath-id="34" data-magicpath-path="MultitenantHotel.tsx" />}
        </SortableContainer>
      </SortableContainer>

      {isOpen && <motion.div data-magicpath-motion-tag="motion.div" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl" data-magicpath-id="35" data-magicpath-path="MultitenantHotel.tsx">
          {["Home", "Rooms", "Reservation", "About", "Contact"].map(link => <a key={link} href="#" className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0" onClick={() => setIsOpen(false)} data-magicpath-id="36" data-magicpath-path="MultitenantHotel.tsx">
              {link}
            </a>)}
        </motion.div>}
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
  return <SortableContainer dndKitId="2cceffc6-c4d5-46aa-bb3e-330cdf53003d" containerType="regular" prevTag="div" className="relative h-[85vh] w-full overflow-hidden bg-zinc-900" data-magicpath-id="37" data-magicpath-path="MultitenantHotel.tsx">
      <AnimatePresence mode="wait" data-magicpath-id="38" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="50975dd4-67e0-434b-8900-5285eed17aea" containerType="regular" prevTag="motion.div" key={current} initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.5
      }} className="absolute inset-0" data-magicpath-id="39" data-magicpath-path="MultitenantHotel.tsx">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${HERO_SLIDES[current].image})`
        }} data-magicpath-id="40" data-magicpath-path="MultitenantHotel.tsx" />
          <div className="absolute inset-0 bg-black/40" data-magicpath-id="41" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>
      </AnimatePresence>

      <SortableContainer dndKitId="04d0837e-8c3c-41d7-9f97-3e798c02ce7a" containerType="regular" prevTag="div" className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4" data-magicpath-id="42" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="9bc80a4a-4e82-4f85-bec5-3006dab17636" containerType="regular" prevTag="motion.div" key={`text-${current}`} initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }} data-magicpath-id="43" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="d9171a44-0939-400f-b75d-ee6d82bb3590" containerType="regular" prevTag="div" className="flex items-center justify-center gap-4 mb-4" data-magicpath-id="44" data-magicpath-path="MultitenantHotel.tsx">
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="45" data-magicpath-path="MultitenantHotel.tsx"></div>
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm" data-magicpath-id="46" data-magicpath-path="MultitenantHotel.tsx">Welcome to Almaris</span>
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="47" data-magicpath-path="MultitenantHotel.tsx"></div>
          </SortableContainer>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl leading-tight" data-magicpath-id="48" data-magicpath-path="MultitenantHotel.tsx">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto tracking-wide" data-magicpath-id="49" data-magicpath-path="MultitenantHotel.tsx">
            {HERO_SLIDES[current].subtitle}
          </p>
          <SortableContainer dndKitId="94375054-b913-4333-bd91-0e0e11d30fdf" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group" data-magicpath-id="50" data-magicpath-path="MultitenantHotel.tsx">
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" data-magicpath-id="51" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      <SortableContainer dndKitId="7337fd65-2403-4ef5-bb34-c5acd053cf42" containerType="regular" prevTag="div" className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900" data-magicpath-id="52" data-magicpath-path="MultitenantHotel.tsx">
        <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" data-magicpath-id="53" data-magicpath-path="MultitenantHotel.tsx">
          <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" data-magicpath-id="54" data-magicpath-path="MultitenantHotel.tsx" />
        </svg>
      </SortableContainer>
    </SortableContainer>;
};
const ReservationCTA: React.FC<{
  onOpenBooking: () => void;
}> = ({
  onOpenBooking
}) => {
  return <SortableContainer dndKitId="10dc78ac-f2f0-4e56-9183-f51053eceae4" containerType="regular" prevTag="div" className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto" data-magicpath-id="55" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="6c61eb4f-3e96-4a35-a836-c9e8d14ea205" containerType="regular" prevTag="div" className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm text-center" data-magicpath-id="56" data-magicpath-path="MultitenantHotel.tsx">
        <h3 className="text-2xl font-serif text-white mb-4" data-magicpath-id="57" data-magicpath-path="MultitenantHotel.tsx">Ready to Book Your Stay?</h3>
        <p className="text-zinc-400 mb-6" data-magicpath-id="58" data-magicpath-path="MultitenantHotel.tsx">Select your preferred branch and check available rooms</p>
        <SortableContainer dndKitId="a9e3ba8f-2ca0-4a5f-a69d-fd5b21ee76c9" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center gap-3" data-magicpath-id="59" data-magicpath-path="MultitenantHotel.tsx">
          <Building2 size={18} data-magicpath-id="60" data-magicpath-path="MultitenantHotel.tsx" />
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
  return <SortableContainer dndKitId="d35b200c-7618-4b3f-8691-f2586ca7d52f" containerType="regular" prevTag="div" className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white" data-magicpath-id="61" data-magicpath-path="MultitenantHotel.tsx">
      <NavigationSidebar onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} data-magicpath-id="62" data-magicpath-path="MultitenantHotel.tsx" />
      <MobileNav onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} data-magicpath-id="63" data-magicpath-path="MultitenantHotel.tsx" />

      {/* Main Content Area */}
      <SortableContainer dndKitId="d199d067-c3a4-4d49-8961-e3e726ef139f" containerType="regular" prevTag="main" className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative" data-magicpath-id="64" data-magicpath-path="MultitenantHotel.tsx">
        
        {/* Hero Section */}
        <SortableContainer dndKitId="08a9eda4-4eff-4ece-b579-95e9e4f71e1f" containerType="regular" prevTag="section" id="home" data-magicpath-id="65" data-magicpath-path="MultitenantHotel.tsx">
          <HeroSlider onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="66" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Reservation CTA */}
        <SortableContainer dndKitId="668f7a1a-2553-41fe-b3e8-d22992f7cfd9" containerType="regular" prevTag="section" className="pb-24" data-magicpath-id="67" data-magicpath-path="MultitenantHotel.tsx">
          <ReservationCTA onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="68" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Facilities Section */}
        <SortableContainer dndKitId="acd96a18-7778-4f6f-b77d-49cca42175bc" containerType="regular" prevTag="section" className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto" data-magicpath-id="69" data-magicpath-path="MultitenantHotel.tsx">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="70" data-magicpath-path="MultitenantHotel.tsx">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white" data-magicpath-id="71" data-magicpath-path="MultitenantHotel.tsx">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed" data-magicpath-id="72" data-magicpath-path="MultitenantHotel.tsx">
            Immerse yourself in a world of luxury and convenience across all our branches.
          </p>

          <SortableContainer dndKitId="dbfaaf8c-738c-461b-a897-05bb850a590d" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" data-magicpath-id="73" data-magicpath-path="MultitenantHotel.tsx">
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
          }} className="flex flex-col items-center group p-6 rounded-lg hover:bg-zinc-800/50 transition-colors duration-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="74" data-magicpath-path="MultitenantHotel.tsx">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all duration-300" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="75" data-magicpath-path="MultitenantHotel.tsx">
                  <item.icon size={28} strokeWidth={1.5} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="76" data-magicpath-path="MultitenantHotel.tsx" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-zinc-200 group-hover:text-amber-500 transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:string" data-magicpath-id="77" data-magicpath-path="MultitenantHotel.tsx">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="desc:string" data-magicpath-id="78" data-magicpath-path="MultitenantHotel.tsx">{item.desc}</p>
              </motion.div>)}
          </SortableContainer>
        </SortableContainer>

        {/* Branch-Tagged Content Notice */}
        {currentBranch && <SortableContainer dndKitId="1d0181ad-74ab-41b1-8a54-ef117a6c314c" containerType="regular" prevTag="section" className="px-6 md:px-16 py-8 bg-zinc-950" data-magicpath-id="79" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="c938802c-0313-47a2-a98a-c0176cf2d94a" containerType="regular" prevTag="div" className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-400" data-magicpath-id="80" data-magicpath-path="MultitenantHotel.tsx">
              <Building2 size={20} data-magicpath-id="81" data-magicpath-path="MultitenantHotel.tsx" />
              <p className="text-sm" data-magicpath-id="82" data-magicpath-path="MultitenantHotel.tsx">
                Viewing content from <span className="font-semibold uppercase tracking-wider" data-magicpath-id="83" data-magicpath-path="MultitenantHotel.tsx">
                  {currentBranch.toUpperCase()}
                </span> branch
              </p>
            </SortableContainer>
          </SortableContainer>}

        {/* Testimonials Section (Branch-Specific) */}
        {testimonials.length > 0 && <SortableContainer dndKitId="437ee931-2349-49df-800c-7ca06f7ee424" containerType="regular" prevTag="section" className="py-24 bg-zinc-900 px-6 md:px-16" data-magicpath-id="84" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="b2304693-3048-4e74-a4ed-75c2465881a8" containerType="regular" prevTag="div" className="max-w-7xl mx-auto text-center" data-magicpath-id="85" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="86" data-magicpath-path="MultitenantHotel.tsx">
                What Guests Say
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-16 text-white" data-magicpath-id="87" data-magicpath-path="MultitenantHotel.tsx">Testimonials</h2>

              <SortableContainer dndKitId="f5cff752-d311-49f7-8e18-f7b67fefa7c2" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-8" data-magicpath-id="88" data-magicpath-path="MultitenantHotel.tsx">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-zinc-800 p-8 rounded-lg" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="89" data-magicpath-path="MultitenantHotel.tsx">
                    <div className="flex items-center gap-1 text-amber-400 mb-4 justify-center" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="90" data-magicpath-path="MultitenantHotel.tsx">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className={i >= testimonial.rating ? "opacity-30" : ""} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="91" data-magicpath-path="MultitenantHotel.tsx" />)}
                    </div>
                    <p className="text-zinc-300 italic mb-6 leading-relaxed" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="comment:unknown" data-magicpath-id="92" data-magicpath-path="MultitenantHotel.tsx">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-center gap-3" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="93" data-magicpath-path="MultitenantHotel.tsx">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="94" data-magicpath-path="MultitenantHotel.tsx">
                        <UserIcon size={20} className="text-amber-500" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="95" data-magicpath-path="MultitenantHotel.tsx" />
                      </div>
                      <div className="text-left" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="96" data-magicpath-path="MultitenantHotel.tsx">
                        <p className="text-white font-medium" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-field="userName:unknown" data-magicpath-id="97" data-magicpath-path="MultitenantHotel.tsx">{testimonial.userName}</p>
                        {testimonial.verified && <p className="text-xs text-amber-400 flex items-center gap-1" data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="98" data-magicpath-path="MultitenantHotel.tsx">
                            <Check size={12} data-magicpath-uuid={(testimonial as any)["mpid"] ?? "unsafe"} data-magicpath-id="99" data-magicpath-path="MultitenantHotel.tsx" /> Verified Guest
                          </p>}
                      </div>
                    </div>
                  </div>)}
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>}

        {/* Gallery Section (Branch-Specific) */}
        {gallery.length > 0 && <SortableContainer dndKitId="79d81533-6fae-4a7a-8331-8f413aa3664f" containerType="regular" prevTag="section" className="py-24 bg-zinc-950" data-magicpath-id="100" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="c1650da4-da8d-48a3-9e3f-063f4a1aa617" containerType="regular" prevTag="div" className="text-center mb-12" data-magicpath-id="101" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium" data-magicpath-id="102" data-magicpath-path="MultitenantHotel.tsx">Gallery</span>
              <h2 className="text-3xl font-serif mt-3 text-white" data-magicpath-id="103" data-magicpath-path="MultitenantHotel.tsx">Explore Our Spaces</h2>
            </SortableContainer>
            
            <SortableContainer dndKitId="ad7a2be4-afb4-4c36-ad18-7b5ab6ac5c61" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3" data-magicpath-id="104" data-magicpath-path="MultitenantHotel.tsx">
              {gallery.map(item => <div key={item.id} className="relative aspect-square group overflow-hidden cursor-pointer" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="105" data-magicpath-path="MultitenantHotel.tsx">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="imageUrl:unknown" data-magicpath-id="106" data-magicpath-path="MultitenantHotel.tsx" />
                  <div className="absolute inset-0 bg-amber-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="107" data-magicpath-path="MultitenantHotel.tsx">
                    <div className="text-white text-center" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="108" data-magicpath-path="MultitenantHotel.tsx">
                      <p className="font-serif text-lg" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="title:unknown" data-magicpath-id="109" data-magicpath-path="MultitenantHotel.tsx">{item.title}</p>
                      <p className="text-xs uppercase tracking-wider mt-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="category:unknown" data-magicpath-id="110" data-magicpath-path="MultitenantHotel.tsx">{item.category}</p>
                    </div>
                  </div>
                </div>)}
            </SortableContainer>
          </SortableContainer>}

        {/* Footer */}
        <SortableContainer dndKitId="91f6c9bf-942a-497c-9578-ce5d1cf375b6" containerType="regular" prevTag="footer" className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16" data-magicpath-id="111" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="4df828bc-73f6-4467-a382-1a34c2e98855" containerType="regular" prevTag="div" className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" data-magicpath-id="112" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="1f2dc3dc-d2aa-494e-9e43-d043d46ee732" containerType="regular" prevTag="div" data-magicpath-id="113" data-magicpath-path="MultitenantHotel.tsx">
              <h2 className="text-3xl font-serif text-amber-500 mb-6" data-magicpath-id="114" data-magicpath-path="MultitenantHotel.tsx">ALMARIS</h2>
              <p className="text-zinc-500 leading-relaxed mb-6" data-magicpath-id="115" data-magicpath-path="MultitenantHotel.tsx">
                A sanctuary of sophistication across Nigeria. Experience the pinnacle of hospitality.
              </p>
              <div className="flex gap-4" data-magicpath-id="116" data-magicpath-path="MultitenantHotel.tsx">
                {[Facebook, Twitter, Instagram].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-600 hover:text-white transition-all" data-magicpath-id="117" data-magicpath-path="MultitenantHotel.tsx">
                    <Icon size={18} data-magicpath-id="118" data-magicpath-path="MultitenantHotel.tsx" />
                  </a>)}
              </div>
            </SortableContainer>

            <SortableContainer dndKitId="2b70e6fe-bbe2-4966-b2dd-806e8d74fc79" containerType="regular" prevTag="div" data-magicpath-id="119" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="120" data-magicpath-path="MultitenantHotel.tsx">Abuja Branch</h3>
              <SortableContainer dndKitId="fbfc64a5-0a9d-40cb-9689-c222fb6b01ae" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="121" data-magicpath-path="MultitenantHotel.tsx">
                <li className="flex items-start gap-2" data-magicpath-id="122" data-magicpath-path="MultitenantHotel.tsx">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" data-magicpath-id="123" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="124" data-magicpath-path="MultitenantHotel.tsx">CBD, Abuja, Nigeria</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="125" data-magicpath-path="MultitenantHotel.tsx">
                  <Phone size={16} className="shrink-0 text-zinc-500" data-magicpath-id="126" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="127" data-magicpath-path="MultitenantHotel.tsx">+234 809 123 4567</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="128" data-magicpath-path="MultitenantHotel.tsx">
                  <Mail size={16} className="shrink-0 text-zinc-500" data-magicpath-id="129" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="130" data-magicpath-path="MultitenantHotel.tsx">abuja@almaris.com</span>
                </li>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="1c667785-49c3-47cc-aa80-2d25eb2a3356" containerType="regular" prevTag="div" data-magicpath-id="131" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="132" data-magicpath-path="MultitenantHotel.tsx">Lagos Branch</h3>
              <SortableContainer dndKitId="5bb09973-c390-487b-94b5-e0a9d5b865ab" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="133" data-magicpath-path="MultitenantHotel.tsx">
                <li className="flex items-start gap-2" data-magicpath-id="134" data-magicpath-path="MultitenantHotel.tsx">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" data-magicpath-id="135" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="136" data-magicpath-path="MultitenantHotel.tsx">Victoria Island, Lagos</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="137" data-magicpath-path="MultitenantHotel.tsx">
                  <Phone size={16} className="shrink-0 text-zinc-500" data-magicpath-id="138" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="139" data-magicpath-path="MultitenantHotel.tsx">+234 809 765 4321</span>
                </li>
                <li className="flex items-center gap-2" data-magicpath-id="140" data-magicpath-path="MultitenantHotel.tsx">
                  <Mail size={16} className="shrink-0 text-zinc-500" data-magicpath-id="141" data-magicpath-path="MultitenantHotel.tsx" />
                  <span data-magicpath-id="142" data-magicpath-path="MultitenantHotel.tsx">lagos@almaris.com</span>
                </li>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="2407efd3-5157-4223-a9a6-d9ea39f9efa5" containerType="regular" prevTag="div" data-magicpath-id="143" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="144" data-magicpath-path="MultitenantHotel.tsx">Quick Links</h3>
              <ul className="space-y-3" data-magicpath-id="145" data-magicpath-path="MultitenantHotel.tsx">
                {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map(link => <li key={link} data-magicpath-id="146" data-magicpath-path="MultitenantHotel.tsx">
                    <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 group text-sm" data-magicpath-id="147" data-magicpath-path="MultitenantHotel.tsx">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" data-magicpath-id="148" data-magicpath-path="MultitenantHotel.tsx" />
                      {link}
                    </a>
                  </li>)}
              </ul>
            </SortableContainer>
          </SortableContainer>
          
          <SortableContainer dndKitId="a0d74dda-b93b-4e7b-b01d-8f6bb2664042" containerType="regular" prevTag="div" className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600 uppercase tracking-wider" data-magicpath-id="149" data-magicpath-path="MultitenantHotel.tsx">
            <p data-magicpath-id="150" data-magicpath-path="MultitenantHotel.tsx">© 2024 Almaris Multi-Branch Hotels. All rights reserved.</p>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} data-magicpath-id="151" data-magicpath-path="MultitenantHotel.tsx" />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} data-magicpath-id="152" data-magicpath-path="MultitenantHotel.tsx" />
      <UserDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} data-magicpath-id="153" data-magicpath-path="MultitenantHotel.tsx" />
    </SortableContainer>;
};

// Main Component with Providers
export const MultitenantHotel: React.FC = () => {
  return <AuthProvider data-magicpath-id="154" data-magicpath-path="MultitenantHotel.tsx">
      <TenantProvider data-magicpath-id="155" data-magicpath-path="MultitenantHotel.tsx">
        <MultitenantHotelContent data-magicpath-id="156" data-magicpath-path="MultitenantHotel.tsx" />
      </TenantProvider>
    </AuthProvider>;
};