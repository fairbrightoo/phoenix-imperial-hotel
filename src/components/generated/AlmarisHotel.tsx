import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar, Users, Utensils, Waves, Dumbbell, Sparkles, Briefcase, Shirt, Instagram, Facebook, Twitter, MapPin, Mail, ArrowRight, Star, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Assets & Data ---

const HERO_SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  title: "Luxury Defined",
  subtitle: "Experience the perfect blend of comfort and style.",
  mpid: "9b812301-a0de-44a1-ab34-638cd19b59d3"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Urban Oasis",
  subtitle: "A sanctuary in the heart of the city.",
  mpid: "f9113975-5bf9-4e76-a8bf-78a0e9f9dd8f"
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Exquisite Dining",
  subtitle: "Culinary journeys that awaken your senses.",
  mpid: "213d4a19-d468-483e-965c-df75627d87bc"
}] as any[];
const FACILITIES = [{
  icon: Utensils,
  name: "Restaurant",
  desc: "Gourmet dining experiences",
  mpid: "7f81f80f-4096-41d3-bc5a-c34a1a2d8df0"
}, {
  icon: Waves,
  name: "Swimming Pool",
  desc: "Infinity pool with city views",
  mpid: "21a5e0eb-4369-48aa-826b-0e5b993e8f08"
}, {
  icon: Dumbbell,
  name: "Fitness Center",
  desc: "State-of-the-art equipment",
  mpid: "cc562a90-69d0-4c34-9ef0-ca1c81281a3c"
}, {
  icon: Sparkles,
  name: "Spa & Massage",
  desc: "Rejuvenating treatments",
  mpid: "87d4b403-6706-4faa-93da-1cba1034e7bb"
}, {
  icon: Briefcase,
  name: "Meeting Room",
  desc: "Professional business spaces",
  mpid: "ad46a9b5-0b8f-4c34-9ff2-3f22e1d6ba2e"
}, {
  icon: Shirt,
  name: "Laundry Service",
  desc: "24/7 dry cleaning & laundry",
  mpid: "36f5d803-0c2b-4204-a136-e7ed62364f59"
}] as any[];
const ROOMS = [{
  id: 1,
  name: "Deluxe Room",
  image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
  price: 250,
  guests: 2,
  size: "35m²",
  rating: 4.8,
  mpid: "b1451ae5-af4f-46a3-a676-fb859e31e9bc"
}, {
  id: 2,
  name: "Family Suite",
  image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop",
  price: 450,
  guests: 4,
  size: "65m²",
  rating: 4.9,
  mpid: "6dad8a78-00f4-4f62-a5a7-1afdc45fe697"
}, {
  id: 3,
  name: "Urban Loft",
  image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  price: 380,
  guests: 3,
  size: "50m²",
  rating: 4.7,
  mpid: "db2f5ff1-480f-41c3-b29a-a1f248d79a2e"
}] as any[];
const INSTAGRAM_FEED = ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1551632436-cbf8dd354ca8?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=500&auto=format&fit=crop"];

// --- Components ---

const NavigationSidebar = () => {
  const links = ["Home", "Rooms", "Reservation", "Pages", "News", "Contact"];
  return <SortableContainer dndKitId="13f9d427-085a-4453-bff3-ff97d7788993" containerType="regular" prevTag="aside" className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800" data-magicpath-id="0" data-magicpath-path="AlmarisHotel.tsx">
      <SortableContainer dndKitId="c8a74f29-b478-4e55-b309-0c88aac98f1d" containerType="regular" prevTag="div" className="p-8 pb-4" data-magicpath-id="1" data-magicpath-path="AlmarisHotel.tsx">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500" data-magicpath-id="2" data-magicpath-path="AlmarisHotel.tsx">ALMARIS</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1" data-magicpath-id="3" data-magicpath-path="AlmarisHotel.tsx">Luxury Hotel</p>
      </SortableContainer>

      <SortableContainer dndKitId="31d9d1fc-b68a-436e-8cce-4702b9022545" containerType="collection" prevTag="nav" className="flex-1 flex flex-col justify-center px-8 space-y-6" data-magicpath-id="4" data-magicpath-path="AlmarisHotel.tsx">
        {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="5" data-magicpath-path="AlmarisHotel.tsx">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3" data-magicpath-uuid={(link as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="AlmarisHotel.tsx"></span>
            {link}
          </a>)}
      </SortableContainer>

      <SortableContainer dndKitId="c020f8f2-9eaf-44a9-a3c2-21c2a7d6a819" containerType="regular" prevTag="div" className="p-8 pt-4 border-t border-zinc-900" data-magicpath-id="7" data-magicpath-path="AlmarisHotel.tsx">
        <SortableContainer dndKitId="3f74cbaa-2f7a-418f-a0be-6003011a1ba9" containerType="regular" prevTag="div" className="flex items-center gap-3 text-amber-500 mb-2" data-magicpath-id="8" data-magicpath-path="AlmarisHotel.tsx">
          <Phone size={18} data-magicpath-id="9" data-magicpath-path="AlmarisHotel.tsx" />
          <span className="font-serif italic text-lg" data-magicpath-id="10" data-magicpath-path="AlmarisHotel.tsx">+929-333-9296</span>
        </SortableContainer>
        <p className="text-zinc-600 text-xs mt-4" data-magicpath-id="11" data-magicpath-path="AlmarisHotel.tsx">© 2024 Almaris Hotel</p>
      </SortableContainer>
    </SortableContainer>;
};
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <SortableContainer dndKitId="dbd6ec3e-8331-4ca5-8422-4e5bbf6dd43b" containerType="regular" prevTag="div" className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center" data-magicpath-id="12" data-magicpath-path="AlmarisHotel.tsx">
      <SortableContainer dndKitId="183251a3-3cb2-4002-b85f-12e5400a38e8" containerType="regular" prevTag="div" data-magicpath-id="13" data-magicpath-path="AlmarisHotel.tsx">
        <h1 className="text-xl font-serif text-amber-500" data-magicpath-id="14" data-magicpath-path="AlmarisHotel.tsx">ALMARIS</h1>
      </SortableContainer>
      <SortableContainer dndKitId="09068508-44e0-4965-a6bc-16e74a2977e5" containerType="regular" prevTag="button" onClick={() => setIsOpen(!isOpen)} className="text-white" data-magicpath-id="15" data-magicpath-path="AlmarisHotel.tsx">
        {isOpen ? <X data-magicpath-id="16" data-magicpath-path="AlmarisHotel.tsx" /> : <Menu data-magicpath-id="17" data-magicpath-path="AlmarisHotel.tsx" />}
      </SortableContainer>

      {isOpen && <motion.div data-magicpath-motion-tag="motion.div" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl" data-magicpath-id="18" data-magicpath-path="AlmarisHotel.tsx">
          {["Home", "Rooms", "Reservation", "Pages", "News", "Contact"].map(link => <a key={link} href="#" className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0" data-magicpath-id="19" data-magicpath-path="AlmarisHotel.tsx">
              {link}
            </a>)}
        </motion.div>}
    </SortableContainer>;
};
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <SortableContainer dndKitId="3bffc6a6-744d-4558-9a77-0e122e60e299" containerType="regular" prevTag="div" className="relative h-[85vh] w-full overflow-hidden bg-zinc-900" data-magicpath-id="20" data-magicpath-path="AlmarisHotel.tsx">
      <AnimatePresence mode="wait" data-magicpath-id="21" data-magicpath-path="AlmarisHotel.tsx">
        <SortableContainer dndKitId="86695dad-e463-4b37-9110-8bd4d3d03639" containerType="regular" prevTag="motion.div" key={current} initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.5
      }} className="absolute inset-0" data-magicpath-id="22" data-magicpath-path="AlmarisHotel.tsx">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${HERO_SLIDES[current].image})`
        }} data-magicpath-id="23" data-magicpath-path="AlmarisHotel.tsx" />
          <div className="absolute inset-0 bg-black/40" data-magicpath-id="24" data-magicpath-path="AlmarisHotel.tsx" />
        </SortableContainer>
      </AnimatePresence>

      <SortableContainer dndKitId="9e72e0a1-19fa-4be2-a45d-1c158af9fac3" containerType="regular" prevTag="div" className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4" data-magicpath-id="25" data-magicpath-path="AlmarisHotel.tsx">
        <SortableContainer dndKitId="99dfbf3d-dc2f-46fa-9fcb-51a3e3b23f21" containerType="regular" prevTag="motion.div" key={`text-${current}`} initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }} data-magicpath-id="26" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="fd93062c-8c98-4a93-9467-d17b5068eb98" containerType="regular" prevTag="div" className="flex items-center justify-center gap-4 mb-4" data-magicpath-id="27" data-magicpath-path="AlmarisHotel.tsx">
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="28" data-magicpath-path="AlmarisHotel.tsx"></div>
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm" data-magicpath-id="29" data-magicpath-path="AlmarisHotel.tsx">Welcome to Almaris</span>
            <div className="h-[1px] w-12 bg-amber-400/60" data-magicpath-id="30" data-magicpath-path="AlmarisHotel.tsx"></div>
          </SortableContainer>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl leading-tight" data-magicpath-id="31" data-magicpath-path="AlmarisHotel.tsx">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto tracking-wide" data-magicpath-id="32" data-magicpath-path="AlmarisHotel.tsx">
            {HERO_SLIDES[current].subtitle}
          </p>
          <SortableContainer dndKitId="83e4acaf-9fc5-45fc-a88c-048236c1b229" containerType="regular" prevTag="button" className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group" data-magicpath-id="33" data-magicpath-path="AlmarisHotel.tsx">
            Discover Rooms
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" data-magicpath-id="34" data-magicpath-path="AlmarisHotel.tsx" />
          </SortableContainer>
        </SortableContainer>
      </SortableContainer>

      {/* Arched graphic shape overlay at bottom */}
      <SortableContainer dndKitId="121b12ad-ef46-4897-9744-8037fda21a8c" containerType="regular" prevTag="div" className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900" data-magicpath-id="35" data-magicpath-path="AlmarisHotel.tsx">
         <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" data-magicpath-id="36" data-magicpath-path="AlmarisHotel.tsx">
            <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" data-magicpath-id="37" data-magicpath-path="AlmarisHotel.tsx" />
         </svg>
      </SortableContainer>
    </SortableContainer>;
};
const ReservationForm = () => {
  return <SortableContainer dndKitId="97f419ec-4397-481d-a06e-615ecdeeda16" containerType="regular" prevTag="div" className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto" data-magicpath-id="38" data-magicpath-path="AlmarisHotel.tsx">
      <SortableContainer dndKitId="09d9ac53-19a0-4431-aee4-3cb6b1e10a2f" containerType="regular" prevTag="div" className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm" data-magicpath-id="39" data-magicpath-path="AlmarisHotel.tsx">
        <SortableContainer dndKitId="9d87f87a-7d34-42a0-b7ba-19ece0653d1b" containerType="regular" prevTag="form" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end" data-magicpath-id="40" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="ed226ff1-e6f0-4534-bcd5-f08c22ea4263" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="41" data-magicpath-path="AlmarisHotel.tsx">
            <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="42" data-magicpath-path="AlmarisHotel.tsx">Check In</label>
            <SortableContainer dndKitId="4f65efc3-9288-4145-8237-2272fad7da11" containerType="regular" prevTag="div" className="relative group" data-magicpath-id="43" data-magicpath-path="AlmarisHotel.tsx">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4 group-hover:text-amber-400 transition-colors" data-magicpath-id="44" data-magicpath-path="AlmarisHotel.tsx" />
              <input type="date" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors uppercase tracking-wider cursor-pointer" data-magicpath-id="45" data-magicpath-path="AlmarisHotel.tsx" />
            </SortableContainer>
          </SortableContainer>
          
          <SortableContainer dndKitId="fdc44b16-f3a4-4689-9b7a-4642324e574f" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="46" data-magicpath-path="AlmarisHotel.tsx">
            <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="47" data-magicpath-path="AlmarisHotel.tsx">Check Out</label>
            <SortableContainer dndKitId="c1f07be3-ce7f-4741-9803-beba3e9e49c4" containerType="regular" prevTag="div" className="relative group" data-magicpath-id="48" data-magicpath-path="AlmarisHotel.tsx">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4 group-hover:text-amber-400 transition-colors" data-magicpath-id="49" data-magicpath-path="AlmarisHotel.tsx" />
              <input type="date" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors uppercase tracking-wider cursor-pointer" data-magicpath-id="50" data-magicpath-path="AlmarisHotel.tsx" />
            </SortableContainer>
          </SortableContainer>

          <SortableContainer dndKitId="1e8587bb-3873-4636-81db-2aaf91fed15b" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="51" data-magicpath-path="AlmarisHotel.tsx">
            <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="52" data-magicpath-path="AlmarisHotel.tsx">Adults</label>
            <SortableContainer dndKitId="8125c268-2f1c-477e-9751-8176a5e747f5" containerType="regular" prevTag="div" className="relative" data-magicpath-id="53" data-magicpath-path="AlmarisHotel.tsx">
              <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-4 pr-8 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer" data-magicpath-id="54" data-magicpath-path="AlmarisHotel.tsx">
                <option data-magicpath-id="55" data-magicpath-path="AlmarisHotel.tsx">1 Adult</option>
                <option data-magicpath-id="56" data-magicpath-path="AlmarisHotel.tsx">2 Adults</option>
                <option data-magicpath-id="57" data-magicpath-path="AlmarisHotel.tsx">3 Adults</option>
                <option data-magicpath-id="58" data-magicpath-path="AlmarisHotel.tsx">4 Adults</option>
              </select>
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 pointer-events-none" data-magicpath-id="59" data-magicpath-path="AlmarisHotel.tsx" />
            </SortableContainer>
          </SortableContainer>

          <SortableContainer dndKitId="c423afb3-0260-45c1-b3c3-3d6dbe677c6d" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="60" data-magicpath-path="AlmarisHotel.tsx">
            <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="61" data-magicpath-path="AlmarisHotel.tsx">Children</label>
            <SortableContainer dndKitId="6b4d1b50-bdea-4122-bf10-3310b73eb942" containerType="regular" prevTag="div" className="relative" data-magicpath-id="62" data-magicpath-path="AlmarisHotel.tsx">
              <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-4 pr-8 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer" data-magicpath-id="63" data-magicpath-path="AlmarisHotel.tsx">
                <option data-magicpath-id="64" data-magicpath-path="AlmarisHotel.tsx">0 Children</option>
                <option data-magicpath-id="65" data-magicpath-path="AlmarisHotel.tsx">1 Child</option>
                <option data-magicpath-id="66" data-magicpath-path="AlmarisHotel.tsx">2 Children</option>
                <option data-magicpath-id="67" data-magicpath-path="AlmarisHotel.tsx">3 Children</option>
              </select>
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 pointer-events-none" data-magicpath-id="68" data-magicpath-path="AlmarisHotel.tsx" />
            </SortableContainer>
          </SortableContainer>

          <button type="button" className="bg-amber-600 text-white h-[46px] w-full uppercase text-xs font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg" data-magicpath-id="69" data-magicpath-path="AlmarisHotel.tsx">
            Check Availability
          </button>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};

// @component: AlmarisHotel
export const AlmarisHotel = () => {
  return <SortableContainer dndKitId="8a4f89ba-08ce-4892-b88f-692cacb5bef7" containerType="regular" prevTag="div" className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white" data-magicpath-id="70" data-magicpath-path="AlmarisHotel.tsx">
      <NavigationSidebar data-magicpath-id="71" data-magicpath-path="AlmarisHotel.tsx" />
      <MobileNav data-magicpath-id="72" data-magicpath-path="AlmarisHotel.tsx" />

      {/* Main Content Area */}
      <SortableContainer dndKitId="685520bf-f1c9-4f66-b10b-b4ef7b87fdcf" containerType="regular" prevTag="main" className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative" data-magicpath-id="73" data-magicpath-path="AlmarisHotel.tsx">
        
        {/* Hero Section */}
        <SortableContainer dndKitId="fedad28a-8ed9-4711-8d79-6aee15dc642a" containerType="regular" prevTag="section" id="home" data-magicpath-id="74" data-magicpath-path="AlmarisHotel.tsx">
          <HeroSlider data-magicpath-id="75" data-magicpath-path="AlmarisHotel.tsx" />
        </SortableContainer>

        {/* Reservation Form */}
        <SortableContainer dndKitId="9da33ce9-8d70-406e-8c08-28a58911eda6" containerType="regular" prevTag="section" className="pb-24" data-magicpath-id="76" data-magicpath-path="AlmarisHotel.tsx">
          <ReservationForm data-magicpath-id="77" data-magicpath-path="AlmarisHotel.tsx" />
        </SortableContainer>

        {/* Welcome Section */}
        <SortableContainer dndKitId="4b6a5f5c-9104-4048-922e-6fa30032b14e" containerType="regular" prevTag="section" className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto" data-magicpath-id="78" data-magicpath-path="AlmarisHotel.tsx">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="79" data-magicpath-path="AlmarisHotel.tsx">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white" data-magicpath-id="80" data-magicpath-path="AlmarisHotel.tsx">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed" data-magicpath-id="81" data-magicpath-path="AlmarisHotel.tsx">
            Immerse yourself in a world of luxury and convenience. Our carefully curated facilities are designed to provide you with the ultimate comfort during your stay at Almaris.
          </p>

          <SortableContainer dndKitId="5b891a0e-7abc-4a1e-9f01-c97dc515f4f5" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" data-magicpath-id="82" data-magicpath-path="AlmarisHotel.tsx">
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
          }} className="flex flex-col items-center group p-6 rounded-lg hover:bg-zinc-800/50 transition-colors duration-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="83" data-magicpath-path="AlmarisHotel.tsx">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all duration-300" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="84" data-magicpath-path="AlmarisHotel.tsx">
                  <item.icon size={28} strokeWidth={1.5} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="85" data-magicpath-path="AlmarisHotel.tsx" />
                </div>
                <h3 className="text-xl font-serif mb-2 text-zinc-200 group-hover:text-amber-500 transition-colors" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:string" data-magicpath-id="86" data-magicpath-path="AlmarisHotel.tsx">{item.name}</h3>
                <p className="text-sm text-zinc-500" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="desc:string" data-magicpath-id="87" data-magicpath-path="AlmarisHotel.tsx">{item.desc}</p>
              </motion.div>)}
          </SortableContainer>
        </SortableContainer>

        {/* Rooms Section */}
        <SortableContainer dndKitId="4231dc5a-9d08-42fd-8585-9c84e132c27c" containerType="regular" prevTag="section" id="rooms" className="py-24 bg-zinc-950 px-6 md:px-16" data-magicpath-id="88" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="a61a1a2b-e9a1-4cfd-9198-0604f8dff08d" containerType="regular" prevTag="div" className="max-w-7xl mx-auto" data-magicpath-id="89" data-magicpath-path="AlmarisHotel.tsx">
            <SortableContainer dndKitId="0d06477b-fac5-446c-a60d-c103f1eb9ecd" containerType="regular" prevTag="div" className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-magicpath-id="90" data-magicpath-path="AlmarisHotel.tsx">
              <SortableContainer dndKitId="cc7c16b9-a0ea-429e-8055-57be532fbbde" containerType="regular" prevTag="div" data-magicpath-id="91" data-magicpath-path="AlmarisHotel.tsx">
                <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium" data-magicpath-id="92" data-magicpath-path="AlmarisHotel.tsx">Accommodations</span>
                <h2 className="text-4xl md:text-5xl font-serif mt-4 text-white" data-magicpath-id="93" data-magicpath-path="AlmarisHotel.tsx">Rooms & Suites</h2>
              </SortableContainer>
              <SortableContainer dndKitId="170c866e-ad75-493f-9d8e-6a3a4478b901" containerType="regular" prevTag="button" className="text-zinc-400 hover:text-white flex items-center gap-2 uppercase text-xs tracking-widest group transition-colors" data-magicpath-id="94" data-magicpath-path="AlmarisHotel.tsx">
                View All Rooms <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" data-magicpath-id="95" data-magicpath-path="AlmarisHotel.tsx" />
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="b1f56f5a-cea9-46a0-ad95-73fb510fbefc" containerType="collection" prevTag="div" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-magicpath-id="96" data-magicpath-path="AlmarisHotel.tsx">
              {ROOMS.map(room => <div key={room.id} className="group relative overflow-hidden bg-zinc-900 rounded-sm" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="97" data-magicpath-path="AlmarisHotel.tsx">
                  <div className="relative h-[400px] overflow-hidden" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="98" data-magicpath-path="AlmarisHotel.tsx">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="image:string" data-magicpath-id="99" data-magicpath-path="AlmarisHotel.tsx" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="100" data-magicpath-path="AlmarisHotel.tsx" />
                    
                    <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="price:number" data-magicpath-id="101" data-magicpath-path="AlmarisHotel.tsx">
                      From ${room.price}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="102" data-magicpath-path="AlmarisHotel.tsx">
                      <div className="flex items-center gap-1 text-amber-400 mb-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="103" data-magicpath-path="AlmarisHotel.tsx">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className={i >= Math.floor(room.rating) ? "opacity-30" : ""} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="104" data-magicpath-path="AlmarisHotel.tsx" />)}
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-2" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:string" data-magicpath-id="105" data-magicpath-path="AlmarisHotel.tsx">{room.name}</h3>
                      <div className="flex gap-4 text-xs text-zinc-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="106" data-magicpath-path="AlmarisHotel.tsx">
                        <span className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="guests:number" data-magicpath-id="107" data-magicpath-path="AlmarisHotel.tsx"><Users size={12} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="108" data-magicpath-path="AlmarisHotel.tsx" /> {room.guests} Guests</span>
                        <span className="flex items-center gap-1" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-field="size:string" data-magicpath-id="109" data-magicpath-path="AlmarisHotel.tsx"><MapPin size={12} data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="110" data-magicpath-path="AlmarisHotel.tsx" /> {room.size}</span>
                      </div>
                      <button className="bg-white text-zinc-900 px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-500 hover:text-white transition-all w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-500 delay-200" data-magicpath-uuid={(room as any)["mpid"] ?? "unsafe"} data-magicpath-id="111" data-magicpath-path="AlmarisHotel.tsx">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>)}
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>

        {/* Facilities Showcase Parallax-ish */}
        <SortableContainer dndKitId="92ff2a09-889a-42df-bfe1-1ff811eb9611" containerType="regular" prevTag="section" className="py-24 bg-zinc-900 overflow-hidden" data-magicpath-id="112" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="91a2b3e8-e381-499b-a202-a84741c9c7f9" containerType="regular" prevTag="div" className="grid md:grid-cols-2 gap-0 min-h-[500px]" data-magicpath-id="113" data-magicpath-path="AlmarisHotel.tsx">
            <SortableContainer dndKitId="a0258498-de6b-449a-a1e9-febedbc57ffa" containerType="regular" prevTag="div" className="relative h-[400px] md:h-auto" data-magicpath-id="114" data-magicpath-path="AlmarisHotel.tsx">
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" alt="Restaurant" className="w-full h-full object-cover" data-magicpath-id="115" data-magicpath-path="AlmarisHotel.tsx" />
              <SortableContainer dndKitId="1630fc06-66ab-4d78-82b7-402e52fa0ff3" containerType="regular" prevTag="div" className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer" data-magicpath-id="116" data-magicpath-path="AlmarisHotel.tsx">
                <SortableContainer dndKitId="979e0073-ae78-4436-9def-20214936f38a" containerType="regular" prevTag="div" className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-center transform transition-transform group-hover:scale-105" data-magicpath-id="117" data-magicpath-path="AlmarisHotel.tsx">
                  <h3 className="text-3xl font-serif text-white mb-2" data-magicpath-id="118" data-magicpath-path="AlmarisHotel.tsx">The Restaurant</h3>
                  <p className="text-amber-400 uppercase tracking-widest text-xs" data-magicpath-id="119" data-magicpath-path="AlmarisHotel.tsx">Discover Menu</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
            <SortableContainer dndKitId="46e7522f-58fa-4b45-b890-cb3a289abe09" containerType="regular" prevTag="div" className="flex flex-col justify-center p-12 md:p-20 bg-zinc-800 text-center md:text-left" data-magicpath-id="120" data-magicpath-path="AlmarisHotel.tsx">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium mb-4 block" data-magicpath-id="121" data-magicpath-path="AlmarisHotel.tsx">Exclusive Offers</span>
              <h2 className="text-4xl font-serif text-white mb-6" data-magicpath-id="122" data-magicpath-path="AlmarisHotel.tsx">Enjoy a Luxury Experience</h2>
              <p className="text-zinc-400 mb-8 leading-relaxed" data-magicpath-id="123" data-magicpath-path="AlmarisHotel.tsx">
                From our world-class spa to our gourmet dining options, every detail is crafted to ensure an unforgettable stay. Indulge in our premium amenities and let us take care of the rest.
              </p>
              <SortableContainer dndKitId="4f2c476a-1bc0-49b6-b903-b37b15fea322" containerType="regular" prevTag="div" className="grid grid-cols-2 gap-8 mt-4 border-t border-zinc-700 pt-8" data-magicpath-id="124" data-magicpath-path="AlmarisHotel.tsx">
                <SortableContainer dndKitId="56ca9c66-8688-4269-b9cd-7d8f79154b9a" containerType="regular" prevTag="div" data-magicpath-id="125" data-magicpath-path="AlmarisHotel.tsx">
                   <span className="text-4xl font-serif text-white block mb-2" data-magicpath-id="126" data-magicpath-path="AlmarisHotel.tsx">150+</span>
                   <span className="text-xs text-zinc-500 uppercase tracking-widest" data-magicpath-id="127" data-magicpath-path="AlmarisHotel.tsx">Luxury Rooms</span>
                </SortableContainer>
                <SortableContainer dndKitId="057df12f-de8f-4250-b17e-36e6e3c493fe" containerType="regular" prevTag="div" data-magicpath-id="128" data-magicpath-path="AlmarisHotel.tsx">
                   <span className="text-4xl font-serif text-white block mb-2" data-magicpath-id="129" data-magicpath-path="AlmarisHotel.tsx">45</span>
                   <span className="text-xs text-zinc-500 uppercase tracking-widest" data-magicpath-id="130" data-magicpath-path="AlmarisHotel.tsx">Menu Items</span>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>

        {/* Instagram Section */}
        <SortableContainer dndKitId="bfe6cc45-fcca-4684-a4d3-a8fa9c5c544b" containerType="regular" prevTag="section" className="py-24 bg-zinc-950 text-center" data-magicpath-id="131" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="e1097069-c1d9-4cb4-8085-23bf61ee024a" containerType="regular" prevTag="div" className="mb-12" data-magicpath-id="132" data-magicpath-path="AlmarisHotel.tsx">
            <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium" data-magicpath-id="133" data-magicpath-path="AlmarisHotel.tsx">Follow Us</span>
            <h2 className="text-3xl font-serif mt-3 text-white" data-magicpath-id="134" data-magicpath-path="AlmarisHotel.tsx">Instagram</h2>
            <a href="#" className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 mt-2 text-sm transition-colors" data-magicpath-id="135" data-magicpath-path="AlmarisHotel.tsx">
              @almaris_hotel
            </a>
          </SortableContainer>
          
          <SortableContainer dndKitId="8cd8b5b4-215a-4180-bca8-4bfd5f5e13c6" containerType="collection" prevTag="div" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" data-magicpath-id="136" data-magicpath-path="AlmarisHotel.tsx">
            {INSTAGRAM_FEED.map((img, i) => <div key={i} className="relative aspect-square group overflow-hidden cursor-pointer" data-magicpath-uuid={(img as any)["mpid"] ?? "unsafe"} data-magicpath-id="137" data-magicpath-path="AlmarisHotel.tsx">
                <img src={img} alt="Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-magicpath-uuid={(img as any)["mpid"] ?? "unsafe"} data-magicpath-id="138" data-magicpath-path="AlmarisHotel.tsx" />
                <div className="absolute inset-0 bg-amber-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" data-magicpath-uuid={(img as any)["mpid"] ?? "unsafe"} data-magicpath-id="139" data-magicpath-path="AlmarisHotel.tsx">
                  <Instagram className="text-white w-8 h-8" data-magicpath-uuid={(img as any)["mpid"] ?? "unsafe"} data-magicpath-id="140" data-magicpath-path="AlmarisHotel.tsx" />
                </div>
              </div>)}
          </SortableContainer>
        </SortableContainer>

        {/* Footer */}
        <SortableContainer dndKitId="6941169f-7682-479b-b7d8-865c55ce8c07" containerType="regular" prevTag="footer" className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16" data-magicpath-id="141" data-magicpath-path="AlmarisHotel.tsx">
          <SortableContainer dndKitId="450ac52e-5985-4738-99ad-f64bad118f94" containerType="regular" prevTag="div" className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" data-magicpath-id="142" data-magicpath-path="AlmarisHotel.tsx">
            <SortableContainer dndKitId="291e1fad-2e19-48ef-b81c-96c81a901877" containerType="regular" prevTag="div" data-magicpath-id="143" data-magicpath-path="AlmarisHotel.tsx">
              <h2 className="text-3xl font-serif text-amber-500 mb-6" data-magicpath-id="144" data-magicpath-path="AlmarisHotel.tsx">ALMARIS</h2>
              <p className="text-zinc-500 leading-relaxed mb-6" data-magicpath-id="145" data-magicpath-path="AlmarisHotel.tsx">
                A sanctuary of sophistication and style, where every detail is curated for your comfort. Experience the pinnacle of hospitality.
              </p>
              <div className="flex gap-4" data-magicpath-id="146" data-magicpath-path="AlmarisHotel.tsx">
                {[Facebook, Twitter, Instagram].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-600 hover:text-white transition-all" data-magicpath-id="147" data-magicpath-path="AlmarisHotel.tsx">
                    <Icon size={18} data-magicpath-id="148" data-magicpath-path="AlmarisHotel.tsx" />
                  </a>)}
              </div>
            </SortableContainer>

            <SortableContainer dndKitId="fb59bda2-2dbd-4978-93af-6ab1ef6a99ce" containerType="regular" prevTag="div" data-magicpath-id="149" data-magicpath-path="AlmarisHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="150" data-magicpath-path="AlmarisHotel.tsx">Contact Us</h3>
              <SortableContainer dndKitId="eb019f67-f7dc-49ae-99c9-4ba7e01ee5f1" containerType="regular" prevTag="ul" className="space-y-4" data-magicpath-id="151" data-magicpath-path="AlmarisHotel.tsx">
                <li className="flex items-start gap-3 text-zinc-400" data-magicpath-id="152" data-magicpath-path="AlmarisHotel.tsx">
                  <MapPin className="text-amber-500 shrink-0 mt-1" size={18} data-magicpath-id="153" data-magicpath-path="AlmarisHotel.tsx" />
                  <span data-magicpath-id="154" data-magicpath-path="AlmarisHotel.tsx">123 Luxury Avenue, New York, NY 10012, United States</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-400" data-magicpath-id="155" data-magicpath-path="AlmarisHotel.tsx">
                  <Phone className="text-amber-500 shrink-0" size={18} data-magicpath-id="156" data-magicpath-path="AlmarisHotel.tsx" />
                  <span data-magicpath-id="157" data-magicpath-path="AlmarisHotel.tsx">+929-333-9296</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-400" data-magicpath-id="158" data-magicpath-path="AlmarisHotel.tsx">
                  <Mail className="text-amber-500 shrink-0" size={18} data-magicpath-id="159" data-magicpath-path="AlmarisHotel.tsx" />
                  <span data-magicpath-id="160" data-magicpath-path="AlmarisHotel.tsx">reservations@almaris.com</span>
                </li>
              </SortableContainer>
            </SortableContainer>

            <SortableContainer dndKitId="1b19e02e-1a92-44bb-a89c-46641502fa9b" containerType="regular" prevTag="div" data-magicpath-id="161" data-magicpath-path="AlmarisHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="162" data-magicpath-path="AlmarisHotel.tsx">Links</h3>
              <ul className="space-y-3" data-magicpath-id="163" data-magicpath-path="AlmarisHotel.tsx">
                {["About Us", "Our Rooms", "Career", "FAQs", "Privacy Policy"].map(link => <li key={link} data-magicpath-id="164" data-magicpath-path="AlmarisHotel.tsx">
                    <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 group" data-magicpath-id="165" data-magicpath-path="AlmarisHotel.tsx">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" data-magicpath-id="166" data-magicpath-path="AlmarisHotel.tsx" />
                      {link}
                    </a>
                  </li>)}
              </ul>
            </SortableContainer>

            <SortableContainer dndKitId="aedad14d-0af5-4714-9643-b861937988af" containerType="regular" prevTag="div" data-magicpath-id="167" data-magicpath-path="AlmarisHotel.tsx">
              <h3 className="text-white font-serif text-xl mb-6" data-magicpath-id="168" data-magicpath-path="AlmarisHotel.tsx">Newsletter</h3>
              <p className="text-zinc-500 mb-4" data-magicpath-id="169" data-magicpath-path="AlmarisHotel.tsx">Subscribe to our newsletter for exclusive offers.</p>
              <SortableContainer dndKitId="05b28df1-a849-4f05-80e2-9c68d7263e9b" containerType="regular" prevTag="div" className="relative" data-magicpath-id="170" data-magicpath-path="AlmarisHotel.tsx">
                <input type="email" placeholder="Email Address" className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" data-magicpath-id="171" data-magicpath-path="AlmarisHotel.tsx" />
                <SortableContainer dndKitId="1008ab78-e333-424f-bb68-f20d60108b1f" containerType="regular" prevTag="button" className="absolute right-0 top-0 bottom-0 px-4 bg-amber-600 text-white hover:bg-amber-700 transition-colors" data-magicpath-id="172" data-magicpath-path="AlmarisHotel.tsx">
                  <ArrowRight size={18} data-magicpath-id="173" data-magicpath-path="AlmarisHotel.tsx" />
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
          
          <SortableContainer dndKitId="b75bde98-7f0e-4655-bdfe-01b9653e503e" containerType="regular" prevTag="div" className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 uppercase tracking-wider" data-magicpath-id="174" data-magicpath-path="AlmarisHotel.tsx">
            <p data-magicpath-id="175" data-magicpath-path="AlmarisHotel.tsx">© 2024 Almaris Hotel. All rights reserved.</p>
            <SortableContainer dndKitId="31fbd74b-a35c-4807-9747-c689b6f3e05a" containerType="regular" prevTag="div" className="flex gap-6 mt-4 md:mt-0" data-magicpath-id="176" data-magicpath-path="AlmarisHotel.tsx">
              <a href="#" className="hover:text-amber-500" data-magicpath-id="177" data-magicpath-path="AlmarisHotel.tsx">Terms of Service</a>
              <a href="#" className="hover:text-amber-500" data-magicpath-id="178" data-magicpath-path="AlmarisHotel.tsx">Privacy Policy</a>
            </SortableContainer>
          </SortableContainer>
        </SortableContainer>

      </SortableContainer>
    </SortableContainer>;
};