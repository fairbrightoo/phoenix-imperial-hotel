import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Menu, X, Star, Settings, Calendar, Search, User, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';

// --- Assets & Constants ---

const SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Where Every Stay is Extraordinary",
  description: "Discover the perfect blend of luxury, comfort, and convenience at Phoenix Imperial. Nestled in the heart of Brooklyn, our hotel is your gateway to an unforgettable experience.",
  cta: "DISCOVER ROOMS"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  title: "Experience Unrivaled Elegance",
  description: "Indulge in our world-class amenities and breathtaking views. From our spa to our rooftop lounge, every detail is curated for your relaxation.",
  cta: "BOOK YOUR STAY"
}] as any[];
const MENU_ITEMS = [{
  label: "Home",
  href: "#",
  hasSubmenu: false
}, {
  label: "Rooms",
  href: "#",
  hasSubmenu: true
}, {
  label: "Reservation",
  href: "#",
  hasSubmenu: false
}, {
  label: "Pages",
  href: "#",
  hasSubmenu: true
}, {
  label: "News",
  href: "#",
  hasSubmenu: false
}, {
  label: "Contact",
  href: "#",
  hasSubmenu: false
}] as any[];
const RIGHT_NAV_ICONS = [{
  icon: Settings,
  label: "Settings"
}, {
  icon: Calendar,
  label: "Booking"
}, {
  icon: Search,
  label: "Search"
}, {
  icon: User,
  label: "Profile"
}, {
  icon: ShoppingBag,
  label: "Cart"
}] as any[];

// --- Components ---

const Logo = () => <div className="flex flex-col items-center mb-12">
  <div className="w-16 h-16 mb-4 relative">
    <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-full h-full object-contain" />
  </div>
  <h1 className="text-3xl font-serif tracking-[0.2em] text-white uppercase font-light">Phoenix Imperial</h1>
  <div className="flex gap-1 mt-3 text-[#C5A265] text-[0.6rem] tracking-[0.3em]">
    <Star size={10} fill="currentColor" />
    <Star size={10} fill="currentColor" />
    <Star size={10} fill="currentColor" />
    <Star size={10} fill="currentColor" />
    <Star size={10} fill="currentColor" />
  </div>
</div>;
const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };
  return <div className="hidden md:flex flex-col w-[280px] bg-sidebar h-full text-sidebar-foreground px-8 py-10 z-20 shadow-2xl relative border-r border-sidebar-border">
    <Logo />

    <nav className="flex-1 flex flex-col justify-center space-y-2">
      {MENU_ITEMS.map(item => <div key={item.label}>
        <button onClick={() => item.hasSubmenu && toggleSubmenu(item.label)} className={`flex items-center justify-between w-full py-3 text-sm font-light tracking-wide transition-colors hover:text-[#C5A265] ${openSubmenu === item.label ? 'text-[#C5A265]' : 'text-[#FEFCF9]'}`}>
          <span>{item.label}</span>
          {item.hasSubmenu && <ChevronDown size={14} className={`transition-transform duration-300 ${openSubmenu === item.label ? 'rotate-180' : ''}`} />}
        </button>

        <AnimatePresence>
          {item.hasSubmenu && openSubmenu === item.label && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} className="overflow-hidden pl-4 border-l border-white/10 ml-1">
            <div className="py-2 space-y-2">
              <a href="#" className="block text-xs text-gray-400 hover:text-white py-1">Standard Suite</a>
              <a href="#" className="block text-xs text-gray-400 hover:text-white py-1">Deluxe King</a>
              <a href="#" className="block text-xs text-gray-400 hover:text-white py-1">Penthouse</a>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>)}
    </nav>

    <div className="mt-auto pt-10">
      <div className="flex items-center gap-4 text-[#C5A265]">
        <div className="w-10 h-10 rounded-full bg-[#C5A265]/20 flex items-center justify-center">
          <Phone size={18} />
        </div>
        <span className="text-sm tracking-wider text-white font-light">+929 333 9296</span>
      </div>
    </div>
  </div>;
};
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="md:hidden absolute top-4 left-4 z-50">
    <button onClick={() => setIsOpen(true)} className="p-2 bg-[#1A1A1A] text-white rounded-md border border-[#C5A265]/30">
      <Menu size={24} />
    </button>

    <AnimatePresence>
      {isOpen && <motion.div initial={{
        x: -300
      }} animate={{
        x: 0
      }} exit={{
        x: -300
      }} className="fixed inset-y-0 left-0 w-64 bg-[#1A1A1A] z-50 p-6 shadow-2xl border-r border-[#C5A265]/20">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-serif text-white">PHOENIX IMPERIAL</span>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          {MENU_ITEMS.map(item => <a key={item.label} href="#" className="text-gray-300 hover:text-[#C5A265] py-2 border-b border-white/5">
            {item.label}
          </a>)}
        </nav>
      </motion.div>}
    </AnimatePresence>
  </div>;
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
  return <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
    <Sidebar />
    <MobileNav />

    <div className="flex-1 relative bg-gray-900">
      {/* Background Slider with Infinite Loop */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="flex h-full" animate={{
          x: `-${currentSlide * 100}%`
        }} transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}>
          {getVisibleSlides().map((slide, index) => <div key={`${slide.id}-${index}`} className="relative min-w-full h-full flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
            <img src={slide.image} alt="Luxury Hotel Room" className="w-full h-full object-cover" />
          </div>)}
        </motion.div>
      </div>

      {/* Left Navigation Button */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 group">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-[#C5A265]/40 hover:bg-[#C5A265]/30 hover:border-[#C5A265] transition-all duration-300 flex items-center justify-center shadow-lg transform -skew-y-6">
          <ChevronLeft className="text-white group-hover:text-[#C5A265] transition-colors" size={24} />
        </div>
      </button>

      {/* Right Navigation Button */}
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 group">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-[#C5A265]/40 hover:bg-[#C5A265]/30 hover:border-[#C5A265] transition-all duration-300 flex items-center justify-center shadow-lg transform skew-y-6">
          <ChevronRight className="text-white group-hover:text-[#C5A265] transition-colors" size={24} />
        </div>
      </button>

      {/* Central Overlay Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <div className="pointer-events-auto relative w-full max-w-2xl lg:max-w-3xl aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[4/3] max-h-[85vh] flex flex-col items-center text-center px-8 py-16 sm:px-16 sm:py-20 bg-gradient-to-b from-white/10 to-[#3d2c1d]/80 backdrop-blur-md border border-[#C5A265]/40 text-white rounded-t-[15rem] md:rounded-t-[20rem] shadow-2xl overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A265]/5 to-[#C5A265]/20 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
            {/* Stars */}
            <div className="flex gap-2 text-[#C5A265]">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>

            {/* Animated Content */}
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{
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
              }} className="flex flex-col items-center space-y-8">
                {/* Title */}
                <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight tracking-tight drop-shadow-lg">
                  {SLIDES[currentSlide % SLIDES.length].title}
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-200 max-w-lg leading-relaxed font-light drop-shadow-md">
                  {SLIDES[currentSlide % SLIDES.length].description}
                </p>

                {/* CTA Button */}
                <button className="mt-8 px-10 py-4 bg-[#C5A265] hover:bg-[#b08d4e] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95">
                  {SLIDES[currentSlide % SLIDES.length].cta}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative border line at bottom internal */}
          <div className="absolute bottom-6 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A265]/50 to-transparent" />
        </div>
      </div>

      {/* Slide Counter (Bottom Right) */}
      <div className="absolute bottom-10 right-20 md:right-32 z-20 text-white font-mono tracking-widest text-sm md:text-lg">
        <span className="font-bold">{currentSlide % SLIDES.length + 1}</span>
        <span className="opacity-50 mx-2">/</span>
        <span className="opacity-50">{SLIDES.length}</span>
      </div>

      {/* Right Navigation Bar - Hidden */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-16 bg-[#121212]/80 backdrop-blur-sm flex-col items-center justify-center space-y-8 z-30 border-l border-white/5" style={{
        display: "none"
      }}>
        {RIGHT_NAV_ICONS.map((item, idx) => <button key={idx} className="p-3 text-gray-400 hover:text-[#C5A265] hover:bg-white/5 rounded-lg transition-all duration-300 group relative">
          <item.icon strokeWidth={1.5} size={20} />
          <span className="absolute right-full mr-4 bg-[#C5A265] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </button>)}

        <button onClick={nextSlide} className="absolute bottom-1/4 right-0 w-full flex justify-center py-4 text-white hover:text-[#C5A265] transition-colors">
          <ChevronRight size={24} />
        </button>
        <button onClick={prevSlide} className="absolute top-1/4 right-0 w-full flex justify-center py-4 text-white hover:text-[#C5A265] transition-colors">
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-8 z-30 px-8">
        <button onClick={prevSlide} className="p-3 bg-black/50 rounded-full text-white backdrop-blur-sm border border-white/10 active:scale-95 transition-transform">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="p-3 bg-black/50 rounded-full text-white backdrop-blur-sm border border-white/10 active:scale-95 transition-transform">
          <ChevronRight />
        </button>
      </div>
    </div>
  </div>;
};