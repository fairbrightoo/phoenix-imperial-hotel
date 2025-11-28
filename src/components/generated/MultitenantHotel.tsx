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
import { RoomsPage } from './RoomsPage';
import { ROOMS_BY_BRANCH, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';

// --- Hero Slides Data ---
const HERO_SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  title: "Luxury Across Nigeria",
  subtitle: "Experience world-class hospitality in Abuja and Lagos.",
  mpid: "f085af3b-d322-468f-b591-a103161095d9"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Your Home Away From Home",
  subtitle: "Book seamlessly across all our branches with one account.",
  mpid: "a06cee09-2477-4b29-91dc-c166ca90aa0e"
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Unmatched Excellence",
  subtitle: "Where comfort meets sophistication in every detail.",
  mpid: "59d1c70f-f4e1-47c9-acaf-d99a9fa50a05"
}] as any[];
const FACILITIES = [{
  icon: Utensils,
  name: "Restaurant",
  desc: "Gourmet dining experiences",
  mpid: "9af1aeab-35f8-487c-a1b3-a5168bfd0174"
}, {
  icon: Waves,
  name: "Swimming Pool",
  desc: "Infinity pool with city views",
  mpid: "7eea018e-5f05-440d-bc46-20887839b443"
}, {
  icon: Dumbbell,
  name: "Fitness Center",
  desc: "State-of-the-art equipment",
  mpid: "2c3f8529-d9d2-40b1-b5aa-29ab4e7b9bb1"
}, {
  icon: Sparkles,
  name: "Spa & Massage",
  desc: "Rejuvenating treatments",
  mpid: "0f13b3a6-7cd5-4994-931c-666a13fda781"
}, {
  icon: Briefcase,
  name: "Meeting Room",
  desc: "Professional business spaces",
  mpid: "c0680f22-d611-4be7-b877-4c3aa60b91ee"
}, {
  icon: Shirt,
  name: "Laundry Service",
  desc: "24/7 dry cleaning & laundry",
  mpid: "f1616d9e-f8e6-4029-b9b2-ac305e8fe722"
}] as any[];

// --- Components ---

const NavigationSidebar: React.FC<{
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenRooms: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenRooms
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
  const links = [{
    name: "Home",
    href: "#home",
    mpid: "de2a6df3-bf49-4f14-a955-c09c8e272714"
  }, {
    name: "Rooms",
    href: "#rooms",
    onClick: onOpenRooms,
    mpid: "f8e15c69-87da-4566-9f5c-74f7fb77aba4"
  }, {
    name: "Reservation",
    href: "#reservation",
    mpid: "1339f5f6-ee44-4411-801a-6a9779e60c8b"
  }, {
    name: "About",
    href: "#about",
    mpid: "7f53aabc-bff6-406e-9e22-c9fd59192f11"
  }, {
    name: "Contact",
    href: "#contact",
    mpid: "53277faa-9265-421e-898b-a011997dfea9"
  }] as any[];
  return <SortableContainer dndKitId="57a96cee-e1ad-4d4a-9522-1322b2218c97" containerType="regular" prevTag="aside" className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800" data-magicpath-id="0" data-magicpath-path="MultitenantHotel.tsx">
      {/* Logo & User Section Combined */}
      <SortableContainer dndKitId="aaae651e-78f3-4b38-bd4d-e32c2b6c1a5a" containerType="regular" prevTag="div" className="p-8 pb-4 border-b border-zinc-800" data-magicpath-id="1" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500" data-magicpath-id="2" data-magicpath-path="MultitenantHotel.tsx">PHOENIX IMPERIAL</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1" data-magicpath-id="3" data-magicpath-path="MultitenantHotel.tsx">Multi-Branch Hotels</p>
        
        {/* User Actions - Prominent Position */}
        {isAuthenticated && <SortableContainer dndKitId="b546d06c-0ea6-41e1-b278-ea6fbf1ab45f" containerType="regular" prevTag="div" className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800" data-magicpath-id="4" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="4eb1695e-8a7a-4e10-bebb-9c1b359689ef" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-3" data-magicpath-id="5" data-magicpath-path="MultitenantHotel.tsx">
              <SortableContainer dndKitId="06a336e9-6daa-4ab7-8a12-aede8d1f72a0" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0" data-magicpath-id="6" data-magicpath-path="MultitenantHotel.tsx">
                <UserIcon size={18} className="text-amber-500" data-magicpath-id="7" data-magicpath-path="MultitenantHotel.tsx" />
              </SortableContainer>
              <SortableContainer dndKitId="04c59a25-454a-468a-a913-7ce6ba0b8017" containerType="regular" prevTag="div" className="min-w-0 flex-1" data-magicpath-id="8" data-magicpath-path="MultitenantHotel.tsx">
                <p className="text-sm font-medium text-white truncate" data-magicpath-id="9" data-magicpath-path="MultitenantHotel.tsx">{user?.name}</p>
                <p className="text-xs text-zinc-500 truncate" data-magicpath-id="10" data-magicpath-path="MultitenantHotel.tsx">
                  {user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'branch_admin' ? 'Branch Admin' : 'Customer'}
                </p>
              </SortableContainer>
            </SortableContainer>
            <SortableContainer dndKitId="6e94f548-6cf2-43aa-be60-4cb1e8efe600" containerType="regular" prevTag="div" className="flex gap-2" data-magicpath-id="11" data-magicpath-path="MultitenantHotel.tsx">
              <button onClick={onOpenDashboard} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded transition-colors text-xs font-medium" data-magicpath-id="12" data-magicpath-path="MultitenantHotel.tsx">
                Dashboard
              </button>
              <SortableContainer dndKitId="f84a87e3-c879-4174-9c60-83da8bb191e9" containerType="regular" prevTag="button" onClick={logout} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors" title="Logout" data-magicpath-id="13" data-magicpath-path="MultitenantHotel.tsx">
                <LogOut size={16} data-magicpath-id="14" data-magicpath-path="MultitenantHotel.tsx" />
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>}
      </SortableContainer>

      {/* Branch Indicator */}
      {currentBranch && <SortableContainer dndKitId="8aba8d0a-483d-4311-acf9-9c163c8d25a6" containerType="regular" prevTag="div" className="mx-8 mb-4 mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded" data-magicpath-id="15" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="1caab7f9-039c-4abe-b51d-291d506d499d" containerType="regular" prevTag="div" className="flex items-center gap-2 text-amber-400 text-xs" data-magicpath-id="16" data-magicpath-path="MultitenantHotel.tsx">
            <Building2 size={14} data-magicpath-id="17" data-magicpath-path="MultitenantHotel.tsx" />
            <span className="uppercase tracking-wider" data-magicpath-id="18" data-magicpath-path="MultitenantHotel.tsx">
              {branches.find(b => b.id === currentBranch)?.city} Branch
            </span>
          </SortableContainer>
        </SortableContainer>}

      <SortableContainer dndKitId="63b70307-e10c-478f-a26d-3d724bc8da41" containerType="collection" prevTag="nav" className="flex-1 flex flex-col justify-center px-8 space-y-6" data-magicpath-id="19" data-magicpath-path="MultitenantHotel.tsx">
        {links.map(link => <a key={link.name} href={link.href} onClick={e => {
        if (link.onClick) {
          e.preventDefault();
          link.onClick();
        }
      }} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group cursor-pointer" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:string" data-magicpath-id="20" data-magicpath-path="MultitenantHotel.tsx">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="MultitenantHotel.tsx"></span>
            {link.name}
          </a>)}
      </SortableContainer>

      <SortableContainer dndKitId="946545bf-2b50-4d7f-b1a4-770ecaf83393" containerType="regular" prevTag="div" className="p-8 pt-4 border-t border-zinc-900 space-y-4" data-magicpath-id="22" data-magicpath-path="MultitenantHotel.tsx">
        {/* Auth Button - Only show if not authenticated */}
        {!isAuthenticated && <SortableContainer dndKitId="17a17cec-ac0e-446f-b674-96b7166e6647" containerType="regular" prevTag="button" onClick={onOpenAuth} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded transition-colors flex items-center justify-center gap-2 text-sm font-medium" data-magicpath-id="23" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={16} data-magicpath-id="24" data-magicpath-path="MultitenantHotel.tsx" />
            Sign In / Sign Up
          </SortableContainer>}

        <SortableContainer dndKitId="9a1de260-6fcf-4fc4-a14e-85250afdd487" containerType="regular" prevTag="div" className="flex items-center gap-3 text-amber-500" data-magicpath-id="25" data-magicpath-path="MultitenantHotel.tsx">
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
  onOpenRooms: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenRooms
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const links = [{
    name: "Home",
    href: "#home",
    mpid: "1a14b2a8-0a78-404d-8dcd-b1df60370fe4"
  }, {
    name: "Rooms",
    href: "#rooms",
    onClick: () => {
      setIsOpen(false);
      onOpenRooms();
    },
    mpid: "1d8850a0-324e-4320-bb02-98bf4479e311"
  }, {
    name: "Reservation",
    href: "#reservation",
    mpid: "bb03f79d-e725-4bd1-b5f0-f3b956a407e4"
  }, {
    name: "About",
    href: "#about",
    mpid: "14599068-ea08-4c17-b1db-3592f6215105"
  }, {
    name: "Contact",
    href: "#contact",
    mpid: "8bd7ab9c-b352-47c9-a99e-d80f4fc1e75b"
  }] as any[];
  return <SortableContainer dndKitId="20e68b3f-bd20-46c4-8fbf-d0439031dfd7" containerType="regular" prevTag="div" className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center" data-magicpath-id="29" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="3ca884c5-1b19-4332-a217-00e47b86af27" containerType="regular" prevTag="div" data-magicpath-id="30" data-magicpath-path="MultitenantHotel.tsx">
        <h1 className="text-xl font-serif text-amber-500" data-magicpath-id="31" data-magicpath-path="MultitenantHotel.tsx">PHOENIX IMPERIAL</h1>
      </SortableContainer>
      <SortableContainer dndKitId="6fa39fb7-a79a-4faa-a146-a93267da0d10" containerType="regular" prevTag="div" className="flex items-center gap-3" data-magicpath-id="32" data-magicpath-path="MultitenantHotel.tsx">
        {isAuthenticated ? <>
            <SortableContainer dndKitId="cdcc6869-32d3-4933-b4ba-5e3d2b20f4c1" containerType="regular" prevTag="button" onClick={onOpenDashboard} className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/30 transition-colors" data-magicpath-id="33" data-magicpath-path="MultitenantHotel.tsx">
              <UserIcon size={18} data-magicpath-id="34" data-magicpath-path="MultitenantHotel.tsx" />
            </SortableContainer>
            <SortableContainer dndKitId="cc436aba-3d93-405c-aba8-aa2b3b281a62" containerType="regular" prevTag="button" onClick={logout} className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors" data-magicpath-id="35" data-magicpath-path="MultitenantHotel.tsx">
              <LogOut size={18} data-magicpath-id="36" data-magicpath-path="MultitenantHotel.tsx" />
            </SortableContainer>
          </> : <SortableContainer dndKitId="9643aec7-50e0-4d13-aa63-f9e9ae2acdfd" containerType="regular" prevTag="button" onClick={onOpenAuth} className="text-amber-500 hover:text-amber-400 transition-colors" data-magicpath-id="37" data-magicpath-path="MultitenantHotel.tsx">
            <LogIn size={20} data-magicpath-id="38" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>}
        <SortableContainer dndKitId="55fc1742-c8ec-4655-a578-4878db4cb186" containerType="regular" prevTag="button" onClick={() => setIsOpen(!isOpen)} className="text-white" data-magicpath-id="39" data-magicpath-path="MultitenantHotel.tsx">
          {isOpen ? <X data-magicpath-id="40" data-magicpath-path="MultitenantHotel.tsx" /> : <Menu data-magicpath-id="41" data-magicpath-path="MultitenantHotel.tsx" />}
        </SortableContainer>
      </SortableContainer>

      {isOpen && <SortableContainer dndKitId="13406999-794b-4fb6-b53f-0ca4ce06295e" containerType="collection" prevTag="motion.div" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl" data-magicpath-id="42" data-magicpath-path="MultitenantHotel.tsx">
          {isAuthenticated && <SortableContainer dndKitId="340279aa-365e-4564-a776-6539f6ee5da1" containerType="regular" prevTag="div" className="pb-4 border-b border-zinc-800" data-magicpath-id="43" data-magicpath-path="MultitenantHotel.tsx">
              <SortableContainer dndKitId="ac9656c0-fe8c-4266-820a-844cb80c4f0d" containerType="regular" prevTag="div" className="flex items-center gap-3 mb-3" data-magicpath-id="44" data-magicpath-path="MultitenantHotel.tsx">
                <SortableContainer dndKitId="62064257-b086-4611-9052-9da09df00b18" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center" data-magicpath-id="45" data-magicpath-path="MultitenantHotel.tsx">
                  <UserIcon size={18} className="text-amber-500" data-magicpath-id="46" data-magicpath-path="MultitenantHotel.tsx" />
                </SortableContainer>
                <SortableContainer dndKitId="e2c1559c-8625-4d77-85fe-c3de2868d2e8" containerType="regular" prevTag="div" data-magicpath-id="47" data-magicpath-path="MultitenantHotel.tsx">
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
          
          {links.map(link => <a key={link.name} href={link.href} className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0" onClick={e => {
        if (link.onClick) {
          e.preventDefault();
          link.onClick();
        } else {
          setIsOpen(false);
        }
      }} data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:string" data-magicpath-id="51" data-magicpath-path="MultitenantHotel.tsx">
              {link.name}
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
  return <SortableContainer dndKitId="b533d713-8d82-4a04-9b40-e262b8dfacdc" containerType="regular" prevTag="div" className="relative h-[85vh] w-full overflow-hidden bg-zinc-900" data-magicpath-id="52" data-magicpath-path="MultitenantHotel.tsx">
      <AnimatePresence mode="wait" data-magicpath-id="53" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="9dad2db8-a1cc-4507-8495-beead618fcf4" containerType="regular" prevTag="motion.div" key={current} initial={{
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

      <SortableContainer dndKitId="2a252999-6abd-44cc-b6cc-7f2d03dfdf1b" containerType="regular" prevTag="div" className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4" data-magicpath-id="57" data-magicpath-path="MultitenantHotel.tsx">
        <SortableContainer dndKitId="da917b81-3ed9-4b98-8fca-d185f9f6a0e3" containerType="regular" prevTag="motion.div" key={`text-${current}`} initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }} data-magicpath-id="58" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="5c2a4f0c-105b-40b3-a573-9a19d0250236" containerType="regular" prevTag="div" className="flex items-center justify-center gap-4 mb-4" data-magicpath-id="59" data-magicpath-path="MultitenantHotel.tsx">
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
          <SortableContainer dndKitId="e0cb4e81-80b7-4921-b104-09edceeb8802" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group" data-magicpath-id="65" data-magicpath-path="MultitenantHotel.tsx">
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" data-magicpath-id="66" data-magicpath-path="MultitenantHotel.tsx" />
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      <SortableContainer dndKitId="5d087cb1-75e6-440e-b909-261cd7abef3b" containerType="regular" prevTag="div" className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900" data-magicpath-id="67" data-magicpath-path="MultitenantHotel.tsx">
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
  return <SortableContainer dndKitId="3353388c-9f44-405b-922c-b6de45633d73" containerType="regular" prevTag="div" className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto" data-magicpath-id="70" data-magicpath-path="MultitenantHotel.tsx">
      <SortableContainer dndKitId="d562dac8-06ef-4829-ba2e-e50be9116abc" containerType="regular" prevTag="div" className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm text-center" data-magicpath-id="71" data-magicpath-path="MultitenantHotel.tsx">
        <h3 className="text-2xl font-serif text-white mb-4" data-magicpath-id="72" data-magicpath-path="MultitenantHotel.tsx">Ready to Book Your Stay?</h3>
        <p className="text-zinc-400 mb-6" data-magicpath-id="73" data-magicpath-path="MultitenantHotel.tsx">Select your preferred branch and check available rooms</p>
        <SortableContainer dndKitId="29a6114f-9ebb-4456-96ce-970bd11785fa" containerType="regular" prevTag="button" onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center gap-3" data-magicpath-id="74" data-magicpath-path="MultitenantHotel.tsx">
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
  const [roomsPageOpen, setRoomsPageOpen] = useState(false);
  const {
    currentBranch
  } = useTenant();

  // Get branch-specific content
  const rooms = currentBranch ? ROOMS_BY_BRANCH[currentBranch] : [];
  const testimonials = currentBranch ? TESTIMONIALS_BY_BRANCH[currentBranch] : [];
  const gallery = currentBranch ? GALLERY_BY_BRANCH[currentBranch] : [];
  return <SortableContainer dndKitId="6d1bcfd9-8c96-4fe2-8420-3e7d41408286" containerType="regular" prevTag="div" className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white" data-magicpath-id="76" data-magicpath-path="MultitenantHotel.tsx">
      <NavigationSidebar onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} onOpenRooms={() => setRoomsPageOpen(true)} data-magicpath-id="77" data-magicpath-path="MultitenantHotel.tsx" />
      <MobileNav onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} onOpenRooms={() => setRoomsPageOpen(true)} data-magicpath-id="78" data-magicpath-path="MultitenantHotel.tsx" />

      {/* Main Content Area */}
      <SortableContainer dndKitId="d96ef5c4-a69a-4877-81de-5577b76ebf2c" containerType="regular" prevTag="main" className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative" data-magicpath-id="79" data-magicpath-path="MultitenantHotel.tsx">
        
        {/* Hero Section */}
        <SortableContainer dndKitId="46f5c377-a4b5-49bb-b890-75485f812aad" containerType="regular" prevTag="section" id="home" data-magicpath-id="80" data-magicpath-path="MultitenantHotel.tsx">
          <HeroSlider onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="81" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Reservation CTA */}
        <SortableContainer dndKitId="afbd2f6c-ea33-4b6d-9d6a-1df5c2222fe3" containerType="regular" prevTag="section" className="pb-24" data-magicpath-id="82" data-magicpath-path="MultitenantHotel.tsx">
          <ReservationCTA onOpenBooking={() => setBookingModalOpen(true)} data-magicpath-id="83" data-magicpath-path="MultitenantHotel.tsx" />
        </SortableContainer>

        {/* Facilities Section */}
        <SortableContainer dndKitId="d06543ad-d4a9-45a5-ae6d-4b827681824a" containerType="regular" prevTag="section" className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto" data-magicpath-id="84" data-magicpath-path="MultitenantHotel.tsx">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="85" data-magicpath-path="MultitenantHotel.tsx">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white" data-magicpath-id="86" data-magicpath-path="MultitenantHotel.tsx">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed" data-magicpath-id="87" data-magicpath-path="MultitenantHotel.tsx">
            Immerse yourself in a world of luxury and convenience across all our branches.
          </p>

          <SortableContainer dndKitId="e63e2483-cb70-4926-a9f7-10f57cfa03fc" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" data-magicpath-id="88" data-magicpath-path="MultitenantHotel.tsx">
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
        {currentBranch && <SortableContainer dndKitId="d76d0aa7-dd4d-4638-ba34-c202face66fe" containerType="regular" prevTag="section" className="px-6 md:px-16 py-8 bg-zinc-950" data-magicpath-id="94" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="0680dcc3-d298-421e-a51a-a3994dc07b66" containerType="regular" prevTag="div" className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-400" data-magicpath-id="95" data-magicpath-path="MultitenantHotel.tsx">
              <Building2 size={20} data-magicpath-id="96" data-magicpath-path="MultitenantHotel.tsx" />
              <p className="text-sm" data-magicpath-id="97" data-magicpath-path="MultitenantHotel.tsx">
                Viewing content from <span className="font-semibold uppercase tracking-wider" data-magicpath-id="98" data-magicpath-path="MultitenantHotel.tsx">
                  {currentBranch.toUpperCase()}
                </span> branch
              </p>
            </SortableContainer>
          </SortableContainer>}

        {/* Testimonials Section (Branch-Specific) */}
        {testimonials.length > 0 && <SortableContainer dndKitId="f7c338c7-1c4d-45fa-b503-a136f774c885" containerType="regular" prevTag="section" className="py-24 bg-zinc-900 px-6 md:px-16" data-magicpath-id="99" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="7b5e9fcd-959e-4733-b5a2-5f30bb6168fd" containerType="regular" prevTag="div" className="max-w-7xl mx-auto text-center" data-magicpath-id="100" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="101" data-magicpath-path="MultitenantHotel.tsx">
                What Guests Say
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-16 text-white" data-magicpath-id="102" data-magicpath-path="MultitenantHotel.tsx">Testimonials</h2>

              <SortableContainer dndKitId="ecbfec3b-cc2b-4ad0-8270-fd26bc5ceb9a" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-8" data-magicpath-id="103" data-magicpath-path="MultitenantHotel.tsx">
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
        {gallery.length > 0 && <SortableContainer dndKitId="f03e0615-2a77-4599-8853-661f9dfb8390" containerType="regular" prevTag="section" className="py-24 bg-zinc-950" data-magicpath-id="115" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="e63fcdbb-c444-484a-9055-af505711de72" containerType="regular" prevTag="div" className="text-center mb-12" data-magicpath-id="116" data-magicpath-path="MultitenantHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium" data-magicpath-id="117" data-magicpath-path="MultitenantHotel.tsx">Gallery</span>
              <h2 className="text-3xl font-serif mt-3 text-white" data-magicpath-id="118" data-magicpath-path="MultitenantHotel.tsx">Explore Our Spaces</h2>
            </SortableContainer>
            
            <SortableContainer dndKitId="3e779268-7d2c-4ef7-b62f-8f53b0e6b1cd" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3" data-magicpath-id="119" data-magicpath-path="MultitenantHotel.tsx">
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
        <SortableContainer dndKitId="9638c8b4-a410-4e65-b65a-8f6d35696c15" containerType="regular" prevTag="footer" className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16" data-magicpath-id="126" data-magicpath-path="MultitenantHotel.tsx">
          <SortableContainer dndKitId="e4bd1ebf-0be3-4485-99e4-1db22bdbb20b" containerType="regular" prevTag="div" className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" data-magicpath-id="127" data-magicpath-path="MultitenantHotel.tsx">
            <SortableContainer dndKitId="91e6d06e-461f-4877-8a48-1513a4ff1d60" containerType="regular" prevTag="div" data-magicpath-id="128" data-magicpath-path="MultitenantHotel.tsx">
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

            <SortableContainer dndKitId="9ee6e79b-aaab-47bf-874d-587b26e5a5d5" containerType="regular" prevTag="div" data-magicpath-id="134" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="135" data-magicpath-path="MultitenantHotel.tsx">Abuja Branch</h3>
              <SortableContainer dndKitId="4cf34181-5184-4cd7-a9e1-13a3bc1d7561" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="136" data-magicpath-path="MultitenantHotel.tsx">
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

            <SortableContainer dndKitId="9675463e-aba3-4ec0-b62e-30f3538bb479" containerType="regular" prevTag="div" data-magicpath-id="146" data-magicpath-path="MultitenantHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="147" data-magicpath-path="MultitenantHotel.tsx">Lagos Branch</h3>
              <SortableContainer dndKitId="cb498392-82fd-4515-8635-d2be0f9d29d1" containerType="regular" prevTag="ul" className="space-y-3 text-sm text-zinc-400" data-magicpath-id="148" data-magicpath-path="MultitenantHotel.tsx">
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

            <SortableContainer dndKitId="40ff6fc0-fb71-4188-899b-d183de106caa" containerType="regular" prevTag="div" data-magicpath-id="158" data-magicpath-path="MultitenantHotel.tsx">
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
          
          <SortableContainer dndKitId="48f939b4-8902-4ce1-a81f-5e72c4efc8e2" containerType="regular" prevTag="div" className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600 uppercase tracking-wider" data-magicpath-id="164" data-magicpath-path="MultitenantHotel.tsx">
            <p data-magicpath-id="165" data-magicpath-path="MultitenantHotel.tsx">© 2024 Phoenix Imperial Multi-Branch Hotels. All rights reserved.</p>
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} data-magicpath-id="166" data-magicpath-path="MultitenantHotel.tsx" />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} data-magicpath-id="167" data-magicpath-path="MultitenantHotel.tsx" />
      <UserDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} data-magicpath-id="168" data-magicpath-path="MultitenantHotel.tsx" />
      <RoomsPage isOpen={roomsPageOpen} onClose={() => setRoomsPageOpen(false)} onBook={room => {
      setRoomsPageOpen(false);
      setBookingModalOpen(true);
    }} data-magicpath-id="169" data-magicpath-path="MultitenantHotel.tsx" />
    </SortableContainer>;
};

// Main Component with Providers
export const MultitenantHotel: React.FC = () => {
  return <AuthProvider data-magicpath-id="170" data-magicpath-path="MultitenantHotel.tsx">
      <TenantProvider data-magicpath-id="171" data-magicpath-path="MultitenantHotel.tsx">
        <MultitenantHotelContent data-magicpath-id="172" data-magicpath-path="MultitenantHotel.tsx" />
      </TenantProvider>
    </AuthProvider>;
};