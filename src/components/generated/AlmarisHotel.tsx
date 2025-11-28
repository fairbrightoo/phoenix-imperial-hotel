import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar, Users, Utensils, Waves, Dumbbell, Sparkles, Briefcase, Shirt, Instagram, Facebook, Twitter, MapPin, Mail, ArrowRight, Star, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Assets & Data ---

const HERO_SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  title: "Luxury Defined",
  subtitle: "Experience the perfect blend of comfort and style."
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Urban Oasis",
  subtitle: "A sanctuary in the heart of the city."
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Exquisite Dining",
  subtitle: "Culinary journeys that awaken your senses."
}] as any[];
const FACILITIES = [{
  icon: Utensils,
  name: "Restaurant",
  desc: "Gourmet dining experiences"
}, {
  icon: Waves,
  name: "Swimming Pool",
  desc: "Infinity pool with city views"
}, {
  icon: Dumbbell,
  name: "Fitness Center",
  desc: "State-of-the-art equipment"
}, {
  icon: Sparkles,
  name: "Spa & Massage",
  desc: "Rejuvenating treatments"
}, {
  icon: Briefcase,
  name: "Meeting Room",
  desc: "Professional business spaces"
}, {
  icon: Shirt,
  name: "Laundry Service",
  desc: "24/7 dry cleaning & laundry"
}] as any[];
const ROOMS = [{
  id: 1,
  name: "Deluxe Room",
  image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
  price: 250,
  guests: 2,
  size: "35m²",
  rating: 4.8
}, {
  id: 2,
  name: "Family Suite",
  image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop",
  price: 450,
  guests: 4,
  size: "65m²",
  rating: 4.9
}, {
  id: 3,
  name: "Urban Loft",
  image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
  price: 380,
  guests: 3,
  size: "50m²",
  rating: 4.7
}] as any[];
const INSTAGRAM_FEED = ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1551632436-cbf8dd354ca8?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=500&auto=format&fit=crop", "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=500&auto=format&fit=crop"];

// --- Components ---

const NavigationSidebar = () => {
  const links = ["Home", "Rooms", "Reservation", "Pages", "News", "Contact"];
  return <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500">ALMARIS</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1">Luxury Hotel</p>
      </div>

      <nav className="flex-1 flex flex-col justify-center px-8 space-y-6">
        {links.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3"></span>
            {link}
          </a>)}
      </nav>

      <div className="p-8 pt-4 border-t border-zinc-900">
        <div className="flex items-center gap-3 text-amber-500 mb-2">
          <Phone size={18} />
          <span className="font-serif italic text-lg">+929-333-9296</span>
        </div>
        <p className="text-zinc-600 text-xs mt-4">© 2024 Almaris Hotel</p>
      </div>
    </aside>;
};
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-serif text-amber-500">ALMARIS</h1>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="text-white">
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl">
          {["Home", "Rooms", "Reservation", "Pages", "News", "Contact"].map(link => <a key={link} href="#" className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0">
              {link}
            </a>)}
        </motion.div>}
    </div>;
};
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <div className="relative h-[85vh] w-full overflow-hidden bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.5
      }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${HERO_SLIDES[current].image})`
        }} />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.div key={`text-${current}`} initial={{
        y: 30,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.8
      }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-400/60"></div>
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm">Welcome to Almaris</span>
            <div className="h-[1px] w-12 bg-amber-400/60"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl leading-tight">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto tracking-wide">
            {HERO_SLIDES[current].subtitle}
          </p>
          <button className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group">
            Discover Rooms
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Arched graphic shape overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900">
         <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" />
         </svg>
      </div>
    </div>;
};
const ReservationForm = () => {
  return <div className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto">
      <div className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400">Check In</label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4 group-hover:text-amber-400 transition-colors" />
              <input type="date" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors uppercase tracking-wider cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400">Check Out</label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4 group-hover:text-amber-400 transition-colors" />
              <input type="date" className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors uppercase tracking-wider cursor-pointer" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400">Adults</label>
            <div className="relative">
              <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-4 pr-8 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>3 Adults</option>
                <option>4 Adults</option>
              </select>
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-400">Children</label>
            <div className="relative">
              <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-4 pr-8 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer">
                <option>0 Children</option>
                <option>1 Child</option>
                <option>2 Children</option>
                <option>3 Children</option>
              </select>
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <button type="button" className="bg-amber-600 text-white h-[46px] w-full uppercase text-xs font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg">
            Check Availability
          </button>
        </form>
      </div>
    </div>;
};

// @component: AlmarisHotel
export const AlmarisHotel = () => {
  return <div className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white">
      <NavigationSidebar />
      <MobileNav />

      {/* Main Content Area */}
      <main className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative">
        
        {/* Hero Section */}
        <section id="home">
          <HeroSlider />
        </section>

        {/* Reservation Form */}
        <section className="pb-24">
          <ReservationForm />
        </section>

        {/* Welcome Section */}
        <section className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Immerse yourself in a world of luxury and convenience. Our carefully curated facilities are designed to provide you with the ultimate comfort during your stay at Almaris.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {FACILITIES.map((item, idx) => <motion.div key={idx} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.1
          }} className="flex flex-col items-center group p-6 rounded-lg hover:bg-zinc-800/50 transition-colors duration-500">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all duration-300">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-2 text-zinc-200 group-hover:text-amber-500 transition-colors">{item.name}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </motion.div>)}
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="py-24 bg-zinc-950 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">Accommodations</span>
                <h2 className="text-4xl md:text-5xl font-serif mt-4 text-white">Rooms & Suites</h2>
              </div>
              <button className="text-zinc-400 hover:text-white flex items-center gap-2 uppercase text-xs tracking-widest group transition-colors">
                View All Rooms <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROOMS.map(room => <div key={room.id} className="group relative overflow-hidden bg-zinc-900 rounded-sm">
                  <div className="relative h-[400px] overflow-hidden">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                    
                    <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      From ${room.price}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className={i >= Math.floor(room.rating) ? "opacity-30" : ""} />)}
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-2">{room.name}</h3>
                      <div className="flex gap-4 text-xs text-zinc-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="flex items-center gap-1"><Users size={12} /> {room.guests} Guests</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {room.size}</span>
                      </div>
                      <button className="bg-white text-zinc-900 px-6 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-500 hover:text-white transition-all w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-500 delay-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>

        {/* Facilities Showcase Parallax-ish */}
        <section className="py-24 bg-zinc-900 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
            <div className="relative h-[400px] md:h-auto">
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" alt="Restaurant" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 text-center transform transition-transform group-hover:scale-105">
                  <h3 className="text-3xl font-serif text-white mb-2">The Restaurant</h3>
                  <p className="text-amber-400 uppercase tracking-widest text-xs">Discover Menu</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-12 md:p-20 bg-zinc-800 text-center md:text-left">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium mb-4 block">Exclusive Offers</span>
              <h2 className="text-4xl font-serif text-white mb-6">Enjoy a Luxury Experience</h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                From our world-class spa to our gourmet dining options, every detail is crafted to ensure an unforgettable stay. Indulge in our premium amenities and let us take care of the rest.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-4 border-t border-zinc-700 pt-8">
                <div>
                   <span className="text-4xl font-serif text-white block mb-2">150+</span>
                   <span className="text-xs text-zinc-500 uppercase tracking-widest">Luxury Rooms</span>
                </div>
                <div>
                   <span className="text-4xl font-serif text-white block mb-2">45</span>
                   <span className="text-xs text-zinc-500 uppercase tracking-widest">Menu Items</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-24 bg-zinc-950 text-center">
          <div className="mb-12">
            <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium">Follow Us</span>
            <h2 className="text-3xl font-serif mt-3 text-white">Instagram</h2>
            <a href="#" className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 mt-2 text-sm transition-colors">
              @almaris_hotel
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {INSTAGRAM_FEED.map((img, i) => <div key={i} className="relative aspect-square group overflow-hidden cursor-pointer">
                <img src={img} alt="Instagram" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-amber-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </div>)}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-serif text-amber-500 mb-6">ALMARIS</h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                A sanctuary of sophistication and style, where every detail is curated for your comfort. Experience the pinnacle of hospitality.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-600 hover:text-white transition-all">
                    <Icon size={18} />
                  </a>)}
              </div>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-zinc-400">
                  <MapPin className="text-amber-500 shrink-0 mt-1" size={18} />
                  <span>123 Luxury Avenue, New York, NY 10012, United States</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <Phone className="text-amber-500 shrink-0" size={18} />
                  <span>+929-333-9296</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <Mail className="text-amber-500 shrink-0" size={18} />
                  <span>reservations@almaris.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Links</h3>
              <ul className="space-y-3">
                {["About Us", "Our Rooms", "Career", "FAQs", "Privacy Policy"].map(link => <li key={link}>
                    <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>)}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Newsletter</h3>
              <p className="text-zinc-500 mb-4">Subscribe to our newsletter for exclusive offers.</p>
              <div className="relative">
                <input type="email" placeholder="Email Address" className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors" />
                <button className="absolute right-0 top-0 bottom-0 px-4 bg-amber-600 text-white hover:bg-amber-700 transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 uppercase tracking-wider">
            <p>© 2024 Almaris Hotel. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-500">Terms of Service</a>
              <a href="#" className="hover:text-amber-500">Privacy Policy</a>
            </div>
          </div>
        </footer>

      </main>
    </div>;
};