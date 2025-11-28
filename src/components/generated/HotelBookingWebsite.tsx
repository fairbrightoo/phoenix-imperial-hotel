import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Menu, X, Star, Settings, Calendar, Search, User, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';

// --- Assets & Constants ---

const SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Where Every Stay is Extraordinary",
  description: "Discover the perfect blend of luxury, comfort, and convenience at Almaris. Nestled in the heart of Brooklyn, our hotel is your gateway to an unforgettable experience.",
  cta: "DISCOVER ROOMS",
  mpid: "c00b38f2-16b7-4f3c-8a7f-beb084e8f40f"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  title: "Experience Unrivaled Elegance",
  description: "Indulge in our world-class amenities and breathtaking views. From our spa to our rooftop lounge, every detail is curated for your relaxation.",
  cta: "BOOK YOUR STAY",
  mpid: "86376b10-a2b0-4a42-b682-bc5ff44a56f9"
}] as any[];
const MENU_ITEMS = [{
  label: "Home",
  href: "#",
  hasSubmenu: false,
  mpid: "4a63f151-3c59-40b8-bf6b-7b507b2e03fc"
}, {
  label: "Rooms",
  href: "#",
  hasSubmenu: true,
  mpid: "54ed9464-f1b5-4f96-aef2-81eb4e1c4663"
}, {
  label: "Reservation",
  href: "#",
  hasSubmenu: false,
  mpid: "d5517185-f2fb-490c-a8ba-c9a7dd1e45f5"
}, {
  label: "Pages",
  href: "#",
  hasSubmenu: true,
  mpid: "bba2845b-00c8-477b-930e-fc73e154f3ef"
}, {
  label: "News",
  href: "#",
  hasSubmenu: false,
  mpid: "e61bba84-a9a4-4e7c-b4e8-4109777196ac"
}, {
  label: "Contact",
  href: "#",
  hasSubmenu: false,
  mpid: "5cdecaf2-07d6-48f1-92a1-cc610c7b480b"
}] as any[];
const RIGHT_NAV_ICONS = [{
  icon: Settings,
  label: "Settings",
  mpid: "918972ab-4d62-4f47-bbfb-4f8b4ac2942d"
}, {
  icon: Calendar,
  label: "Booking",
  mpid: "e88b3345-085e-479a-af1e-a7f35f2deb26"
}, {
  icon: Search,
  label: "Search",
  mpid: "eddf2764-bcf2-422d-8ad6-9ad21012dcf9"
}, {
  icon: User,
  label: "Profile",
  mpid: "eda94414-f39f-494b-ba6f-3d324ba5e060"
}, {
  icon: ShoppingBag,
  label: "Cart",
  mpid: "3a5cd5c9-e9a8-47b1-8560-72ac11a27a54"
}] as any[];

// --- Components ---

const Logo = () => <SortableContainer dndKitId="92ae22ec-1700-4d86-a265-ec852b11b827" containerType="regular" prevTag="div" className="flex flex-col items-center mb-12" data-magicpath-id="0" data-magicpath-path="HotelBookingWebsite.tsx">
    <SortableContainer dndKitId="a08b3dac-abc9-4b16-ac13-9553eca7d925" containerType="regular" prevTag="div" className="w-16 h-16 mb-4 relative" data-magicpath-id="1" data-magicpath-path="HotelBookingWebsite.tsx">
      <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A265] fill-current" data-magicpath-id="2" data-magicpath-path="HotelBookingWebsite.tsx">
        {/* Abstract ornamental flower pattern */}
        <path d="M50 0 C60 20 80 20 80 40 C80 60 60 60 50 80 C40 60 20 60 20 40 C20 20 40 20 50 0 Z M50 20 C55 35 65 35 65 45 C65 55 55 55 50 65 C45 55 35 55 35 45 C35 35 45 35 50 20 Z" opacity="0.8" data-magicpath-id="3" data-magicpath-path="HotelBookingWebsite.tsx" />
        <path d="M50 100 C40 80 20 80 20 60 C20 40 40 40 50 20 C60 40 80 40 80 60 C80 80 60 80 50 100 Z" opacity="0.6" transform="rotate(45 50 50)" data-magicpath-id="4" data-magicpath-path="HotelBookingWebsite.tsx" />
        <path d="M50 0 C60 20 80 20 80 40 C80 60 60 60 50 80 C40 60 20 60 20 40 C20 20 40 20 50 0 Z" opacity="0.6" transform="rotate(90 50 50)" data-magicpath-id="5" data-magicpath-path="HotelBookingWebsite.tsx" />
        <circle cx="50" cy="50" r="5" className="fill-[#C5A265]" data-magicpath-id="6" data-magicpath-path="HotelBookingWebsite.tsx" />
      </svg>
    </SortableContainer>
    <h1 className="text-3xl font-serif tracking-[0.2em] text-white uppercase font-light" data-magicpath-id="7" data-magicpath-path="HotelBookingWebsite.tsx">Almaris</h1>
    <SortableContainer dndKitId="b125db8d-feee-49f2-bc97-dd5b0b9b0989" containerType="regular" prevTag="div" className="flex gap-1 mt-3 text-[#C5A265] text-[0.6rem] tracking-[0.3em]" data-magicpath-id="8" data-magicpath-path="HotelBookingWebsite.tsx">
      <Star size={10} fill="currentColor" data-magicpath-id="9" data-magicpath-path="HotelBookingWebsite.tsx" />
      <Star size={10} fill="currentColor" data-magicpath-id="10" data-magicpath-path="HotelBookingWebsite.tsx" />
      <Star size={10} fill="currentColor" data-magicpath-id="11" data-magicpath-path="HotelBookingWebsite.tsx" />
      <Star size={10} fill="currentColor" data-magicpath-id="12" data-magicpath-path="HotelBookingWebsite.tsx" />
      <Star size={10} fill="currentColor" data-magicpath-id="13" data-magicpath-path="HotelBookingWebsite.tsx" />
    </SortableContainer>
  </SortableContainer>;
const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };
  return <SortableContainer dndKitId="c64a0b11-720d-446c-a58f-ac0237a2f94a" containerType="regular" prevTag="div" className="hidden md:flex flex-col w-[280px] bg-[#1A1A1A] h-full text-white px-8 py-10 z-20 shadow-2xl relative border-r border-white/5" data-magicpath-id="14" data-magicpath-path="HotelBookingWebsite.tsx">
      <Logo data-magicpath-id="15" data-magicpath-path="HotelBookingWebsite.tsx" />
      
      <SortableContainer dndKitId="84605c33-1ccd-44ac-a937-085cc788589d" containerType="collection" prevTag="nav" className="flex-1 flex flex-col justify-center space-y-2" data-magicpath-id="16" data-magicpath-path="HotelBookingWebsite.tsx">
        {MENU_ITEMS.map(item => <div key={item.label} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="17" data-magicpath-path="HotelBookingWebsite.tsx">
            <button onClick={() => item.hasSubmenu && toggleSubmenu(item.label)} className={`flex items-center justify-between w-full py-3 text-sm font-light tracking-wide transition-colors hover:text-[#C5A265] ${openSubmenu === item.label ? 'text-[#C5A265]' : 'text-gray-300'}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="18" data-magicpath-path="HotelBookingWebsite.tsx">
              <span data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="19" data-magicpath-path="HotelBookingWebsite.tsx">{item.label}</span>
              {item.hasSubmenu && <ChevronDown size={14} className={`transition-transform duration-300 ${openSubmenu === item.label ? 'rotate-180' : ''}`} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="HotelBookingWebsite.tsx" />}
            </button>
            
            <AnimatePresence data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="21" data-magicpath-path="HotelBookingWebsite.tsx">
              {item.hasSubmenu && openSubmenu === item.label && <motion.div data-magicpath-motion-tag="motion.div" initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} className="overflow-hidden pl-4 border-l border-white/10 ml-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="HotelBookingWebsite.tsx">
                  <div className="py-2 space-y-2" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="HotelBookingWebsite.tsx">
                    <a href="#" className="block text-xs text-gray-400 hover:text-white py-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="24" data-magicpath-path="HotelBookingWebsite.tsx">Standard Suite</a>
                    <a href="#" className="block text-xs text-gray-400 hover:text-white py-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="25" data-magicpath-path="HotelBookingWebsite.tsx">Deluxe King</a>
                    <a href="#" className="block text-xs text-gray-400 hover:text-white py-1" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="26" data-magicpath-path="HotelBookingWebsite.tsx">Penthouse</a>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>)}
      </SortableContainer>

      <SortableContainer dndKitId="8b4d651a-5315-4004-a4c2-90443380aa67" containerType="regular" prevTag="div" className="mt-auto pt-10" data-magicpath-id="27" data-magicpath-path="HotelBookingWebsite.tsx">
        <SortableContainer dndKitId="e21c301f-fb58-4ba5-9b60-397b54503a8d" containerType="regular" prevTag="div" className="flex items-center gap-4 text-[#C5A265]" data-magicpath-id="28" data-magicpath-path="HotelBookingWebsite.tsx">
          <SortableContainer dndKitId="94361631-dbad-490f-9aea-87436b4116c0" containerType="regular" prevTag="div" className="w-10 h-10 rounded-full bg-[#C5A265]/20 flex items-center justify-center" data-magicpath-id="29" data-magicpath-path="HotelBookingWebsite.tsx">
            <Phone size={18} data-magicpath-id="30" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
          <span className="text-sm tracking-wider text-white font-light" data-magicpath-id="31" data-magicpath-path="HotelBookingWebsite.tsx">+929 333 9296</span>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <SortableContainer dndKitId="709c94df-30bd-42a1-b829-b3524e12223b" containerType="regular" prevTag="div" className="md:hidden absolute top-4 left-4 z-50" data-magicpath-id="32" data-magicpath-path="HotelBookingWebsite.tsx">
      <SortableContainer dndKitId="279b85f7-9081-4b1b-924c-7db540b7fec9" containerType="regular" prevTag="button" onClick={() => setIsOpen(true)} className="p-2 bg-[#1A1A1A] text-white rounded-md border border-[#C5A265]/30" data-magicpath-id="33" data-magicpath-path="HotelBookingWebsite.tsx">
        <Menu size={24} data-magicpath-id="34" data-magicpath-path="HotelBookingWebsite.tsx" />
      </SortableContainer>

      <AnimatePresence data-magicpath-id="35" data-magicpath-path="HotelBookingWebsite.tsx">
        {isOpen && <SortableContainer dndKitId="76d98ee6-6ebc-4d2f-9e50-415eaee0465d" containerType="regular" prevTag="motion.div" initial={{
        x: -300
      }} animate={{
        x: 0
      }} exit={{
        x: -300
      }} className="fixed inset-y-0 left-0 w-64 bg-[#1A1A1A] z-50 p-6 shadow-2xl border-r border-[#C5A265]/20" data-magicpath-id="36" data-magicpath-path="HotelBookingWebsite.tsx">
            <SortableContainer dndKitId="7d7c9129-90cc-4903-bce4-63a42c89ecfa" containerType="regular" prevTag="div" className="flex justify-between items-center mb-8" data-magicpath-id="37" data-magicpath-path="HotelBookingWebsite.tsx">
              <span className="text-xl font-serif text-white" data-magicpath-id="38" data-magicpath-path="HotelBookingWebsite.tsx">ALMARIS</span>
              <SortableContainer dndKitId="36c421a6-5c3d-4361-8959-e0251d76c518" containerType="regular" prevTag="button" onClick={() => setIsOpen(false)} className="text-white" data-magicpath-id="39" data-magicpath-path="HotelBookingWebsite.tsx">
                <X size={24} data-magicpath-id="40" data-magicpath-path="HotelBookingWebsite.tsx" />
              </SortableContainer>
            </SortableContainer>
            <SortableContainer dndKitId="d9db3eaa-a44f-4dc3-99ce-018e0124b584" containerType="collection" prevTag="nav" className="flex flex-col space-y-4" data-magicpath-id="41" data-magicpath-path="HotelBookingWebsite.tsx">
              {MENU_ITEMS.map(item => <a key={item.label} href="#" className="text-gray-300 hover:text-[#C5A265] py-2 border-b border-white/5" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="42" data-magicpath-path="HotelBookingWebsite.tsx">
                  {item.label}
                </a>)}
            </SortableContainer>
          </SortableContainer>}
      </AnimatePresence>
    </SortableContainer>;
};

// @component: HotelBookingWebsite
export const HotelBookingWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsAnimating(false), 800);
  };
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide(prev => (prev + 1) % SLIDES.length);
        setTimeout(() => setIsAnimating(false), 800);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Create extended array for seamless loop
  const getVisibleSlides = () => {
    const extendedSlides = [...SLIDES, ...SLIDES, ...SLIDES];
    return extendedSlides;
  };

  // @return
  return <SortableContainer dndKitId="2111a2ec-68fd-42da-9eb4-e7fe3159a1f1" containerType="regular" prevTag="div" className="flex h-screen w-full bg-black overflow-hidden font-sans" data-magicpath-id="43" data-magicpath-path="HotelBookingWebsite.tsx">
      <Sidebar data-magicpath-id="44" data-magicpath-path="HotelBookingWebsite.tsx" />
      <MobileNav data-magicpath-id="45" data-magicpath-path="HotelBookingWebsite.tsx" />

      <SortableContainer dndKitId="c3a31826-c87d-4d68-ab6c-70c0a543616d" containerType="regular" prevTag="div" className="flex-1 relative bg-gray-900" data-magicpath-id="46" data-magicpath-path="HotelBookingWebsite.tsx">
        {/* Background Slider with Infinite Loop */}
        <SortableContainer dndKitId="3ff57fbf-3101-48eb-9d78-3577856de0ff" containerType="regular" prevTag="div" className="absolute inset-0 overflow-hidden" data-magicpath-id="47" data-magicpath-path="HotelBookingWebsite.tsx">
          <SortableContainer dndKitId="59a85662-5449-4824-8bf9-037ce7afe728" containerType="collection" prevTag="motion.div" className="flex h-full" animate={{
          x: `-${currentSlide * 100}%`
        }} transition={{
          duration: 0.8,
          ease: "easeInOut"
        }} data-magicpath-id="48" data-magicpath-path="HotelBookingWebsite.tsx">
            {getVisibleSlides().map((slide, index) => <div key={`${slide.id}-${index}`} className="relative min-w-full h-full flex-shrink-0" data-magicpath-uuid={(slide as any)["mpid"] ?? "unsafe"} data-magicpath-id="49" data-magicpath-path="HotelBookingWebsite.tsx">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" data-magicpath-uuid={(slide as any)["mpid"] ?? "unsafe"} data-magicpath-id="50" data-magicpath-path="HotelBookingWebsite.tsx" />
                <img src={slide.image} alt="Luxury Hotel Room" className="w-full h-full object-cover" data-magicpath-uuid={(slide as any)["mpid"] ?? "unsafe"} data-magicpath-field="image:unknown" data-magicpath-id="51" data-magicpath-path="HotelBookingWebsite.tsx" />
              </div>)}
          </SortableContainer>
        </SortableContainer>

        {/* Left Navigation Button */}
        <SortableContainer dndKitId="7bf004b9-d3d8-473c-98a4-d8171ba109db" containerType="regular" prevTag="button" onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 group" data-magicpath-id="52" data-magicpath-path="HotelBookingWebsite.tsx">
          <SortableContainer dndKitId="971f25b7-5735-4819-9bf8-9e98f5994741" containerType="regular" prevTag="div" className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-[#C5A265]/40 hover:bg-[#C5A265]/30 hover:border-[#C5A265] transition-all duration-300 flex items-center justify-center shadow-lg transform -skew-y-6" data-magicpath-id="53" data-magicpath-path="HotelBookingWebsite.tsx">
            <ChevronLeft className="text-white group-hover:text-[#C5A265] transition-colors" size={24} data-magicpath-id="54" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
        </SortableContainer>

        {/* Right Navigation Button */}
        <SortableContainer dndKitId="b4bd924e-c4e3-482c-b675-aae2bf1add24" containerType="regular" prevTag="button" onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 group" data-magicpath-id="55" data-magicpath-path="HotelBookingWebsite.tsx">
          <SortableContainer dndKitId="202f523a-5936-4054-97bf-152ab998121d" containerType="regular" prevTag="div" className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-[#C5A265]/40 hover:bg-[#C5A265]/30 hover:border-[#C5A265] transition-all duration-300 flex items-center justify-center shadow-lg transform skew-y-6" data-magicpath-id="56" data-magicpath-path="HotelBookingWebsite.tsx">
            <ChevronRight className="text-white group-hover:text-[#C5A265] transition-colors" size={24} data-magicpath-id="57" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
        </SortableContainer>

        {/* Central Overlay Card */}
        <SortableContainer dndKitId="f2be77b9-f68e-48d0-b494-4e4a7f09a9b7" containerType="regular" prevTag="div" className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 pointer-events-none" data-magicpath-id="58" data-magicpath-path="HotelBookingWebsite.tsx">
          <SortableContainer dndKitId="e2edb33a-5469-4b1a-a9a6-3d8b3d934b5a" containerType="regular" prevTag="div" className="pointer-events-auto relative w-full max-w-2xl lg:max-w-3xl aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[4/3] max-h-[85vh] flex flex-col items-center text-center px-8 py-16 sm:px-16 sm:py-20 bg-gradient-to-b from-white/10 to-[#3d2c1d]/80 backdrop-blur-md border border-[#C5A265]/40 text-white rounded-t-[15rem] md:rounded-t-[20rem] shadow-2xl overflow-hidden" data-magicpath-id="59" data-magicpath-path="HotelBookingWebsite.tsx">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A265]/5 to-[#C5A265]/20 pointer-events-none" data-magicpath-id="60" data-magicpath-path="HotelBookingWebsite.tsx" />

            <SortableContainer dndKitId="c9ce00e0-ca29-45fc-a6cb-a57fc85c40b4" containerType="regular" prevTag="div" className="relative z-10 flex flex-col items-center justify-center h-full space-y-8" data-magicpath-id="61" data-magicpath-path="HotelBookingWebsite.tsx">
              {/* Stars */}
              <div className="flex gap-2 text-[#C5A265]" data-magicpath-id="62" data-magicpath-path="HotelBookingWebsite.tsx">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" data-magicpath-id="63" data-magicpath-path="HotelBookingWebsite.tsx" />)}
              </div>

              {/* Animated Content */}
              <AnimatePresence mode="wait" data-magicpath-id="64" data-magicpath-path="HotelBookingWebsite.tsx">
                <SortableContainer dndKitId="41e0790d-2905-4aa3-ba0d-e5d3772247c6" containerType="regular" prevTag="motion.div" key={currentSlide} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.6
              }} className="flex flex-col items-center space-y-8" data-magicpath-id="65" data-magicpath-path="HotelBookingWebsite.tsx">
                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight tracking-tight drop-shadow-lg" data-magicpath-id="66" data-magicpath-path="HotelBookingWebsite.tsx">
                    {SLIDES[currentSlide % SLIDES.length].title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-200 max-w-lg leading-relaxed font-light drop-shadow-md" data-magicpath-id="67" data-magicpath-path="HotelBookingWebsite.tsx">
                    {SLIDES[currentSlide % SLIDES.length].description}
                  </p>

                  {/* CTA Button */}
                  <button className="mt-8 px-10 py-4 bg-[#C5A265] hover:bg-[#b08d4e] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95" data-magicpath-id="68" data-magicpath-path="HotelBookingWebsite.tsx">
                    {SLIDES[currentSlide % SLIDES.length].cta}
                  </button>
                </SortableContainer>
              </AnimatePresence>
            </SortableContainer>
            
            {/* Decorative border line at bottom internal */}
             <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A265]/50 to-transparent" data-magicpath-id="69" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
        </SortableContainer>

        {/* Slide Counter (Bottom Right) */}
        <SortableContainer dndKitId="89f1d406-0079-4df3-ac5b-6dbdf7c2963c" containerType="regular" prevTag="div" className="absolute bottom-10 right-20 md:right-32 z-20 text-white font-mono tracking-widest text-sm md:text-lg" data-magicpath-id="70" data-magicpath-path="HotelBookingWebsite.tsx">
          <span className="font-bold" data-magicpath-id="71" data-magicpath-path="HotelBookingWebsite.tsx">{currentSlide % SLIDES.length + 1}</span>
          <span className="opacity-50 mx-2" data-magicpath-id="72" data-magicpath-path="HotelBookingWebsite.tsx">/</span>
          <span className="opacity-50" data-magicpath-id="73" data-magicpath-path="HotelBookingWebsite.tsx">{SLIDES.length}</span>
        </SortableContainer>

        {/* Right Navigation Bar - Hidden */}
        <SortableContainer dndKitId="dc5e7be2-0c9b-439b-9fce-91835f299d85" containerType="collection" prevTag="div" className="hidden lg:flex absolute right-0 top-0 bottom-0 w-16 bg-[#121212]/80 backdrop-blur-sm flex-col items-center justify-center space-y-8 z-30 border-l border-white/5" style={{
        display: "none"
      }} data-magicpath-id="74" data-magicpath-path="HotelBookingWebsite.tsx">
          {RIGHT_NAV_ICONS.map((item, idx) => <button key={idx} className="p-3 text-gray-400 hover:text-[#C5A265] hover:bg-white/5 rounded-lg transition-all duration-300 group relative" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="75" data-magicpath-path="HotelBookingWebsite.tsx">
              <item.icon strokeWidth={1.5} size={20} data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-id="76" data-magicpath-path="HotelBookingWebsite.tsx" />
              <span className="absolute right-full mr-4 bg-[#C5A265] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap" data-magicpath-uuid={(item as any)["mpid"] ?? "unsafe"} data-magicpath-field="label:unknown" data-magicpath-id="77" data-magicpath-path="HotelBookingWebsite.tsx">
                {item.label}
              </span>
            </button>)}
          
          <SortableContainer dndKitId="70961358-1496-45aa-b431-327e7064ef79" containerType="regular" prevTag="button" onClick={nextSlide} className="absolute bottom-1/4 right-0 w-full flex justify-center py-4 text-white hover:text-[#C5A265] transition-colors" data-magicpath-id="78" data-magicpath-path="HotelBookingWebsite.tsx">
            <ChevronRight size={24} data-magicpath-id="79" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
           <SortableContainer dndKitId="d1e64f63-64a1-4600-89df-9b809ae07ef7" containerType="regular" prevTag="button" onClick={prevSlide} className="absolute top-1/4 right-0 w-full flex justify-center py-4 text-white hover:text-[#C5A265] transition-colors" data-magicpath-id="80" data-magicpath-path="HotelBookingWebsite.tsx">
            <ChevronLeft size={24} data-magicpath-id="81" data-magicpath-path="HotelBookingWebsite.tsx" />
          </SortableContainer>
        </SortableContainer>

        {/* Mobile Navigation Arrows */}
        <SortableContainer dndKitId="beb47218-019a-452a-bc6d-2642c18a7ba7" containerType="regular" prevTag="div" className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-8 z-30 px-8" data-magicpath-id="82" data-magicpath-path="HotelBookingWebsite.tsx">
           <SortableContainer dndKitId="564bd1dc-9064-41ad-b150-107fec409253" containerType="regular" prevTag="button" onClick={prevSlide} className="p-3 bg-black/50 rounded-full text-white backdrop-blur-sm border border-white/10 active:scale-95 transition-transform" data-magicpath-id="83" data-magicpath-path="HotelBookingWebsite.tsx">
             <ChevronLeft data-magicpath-id="84" data-magicpath-path="HotelBookingWebsite.tsx" />
           </SortableContainer>
           <SortableContainer dndKitId="0bc1b743-5309-4292-a434-b9f00a3a9dd7" containerType="regular" prevTag="button" onClick={nextSlide} className="p-3 bg-black/50 rounded-full text-white backdrop-blur-sm border border-white/10 active:scale-95 transition-transform" data-magicpath-id="85" data-magicpath-path="HotelBookingWebsite.tsx">
             <ChevronRight data-magicpath-id="86" data-magicpath-path="HotelBookingWebsite.tsx" />
           </SortableContainer>
        </SortableContainer>
      </SortableContainer>
    </SortableContainer>;
};