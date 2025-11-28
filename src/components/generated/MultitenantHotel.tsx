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
import { ReservationPage } from './ReservationPage';
import { AboutPage } from './AboutPage';
import { ContactPage } from './ContactPage';
import { ROOMS_BY_BRANCH, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';

// --- Hero Slides Data ---
const HERO_SLIDES = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  title: "Luxury Across Nigeria",
  subtitle: "Experience world-class hospitality in Abuja and Lagos."
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  title: "Your Home Away From Home",
  subtitle: "Book seamlessly across all our branches with one account."
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
  title: "Unmatched Excellence",
  subtitle: "Where comfort meets sophistication in every detail."
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

// --- Components ---

const NavigationSidebar: React.FC<{
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenRooms: () => void;
  onOpenReservation: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenRooms,
  onOpenReservation,
  onOpenAbout,
  onOpenContact
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
    href: "#home"
  }, {
    name: "Rooms",
    href: "#rooms",
    onClick: onOpenRooms
  }, {
    name: "Reservation",
    href: "#reservation",
    onClick: onOpenReservation
  }, {
    name: "About",
    href: "#about",
    onClick: onOpenAbout
  }, {
    name: "Contact",
    href: "#contact",
    onClick: onOpenContact
  }] as any[];
  return <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-zinc-950 text-white flex-col z-50 border-r border-zinc-800">
      {/* Logo & User Section Combined */}
      <div className="p-8 pb-4 border-b border-zinc-800">
        <h1 className="text-3xl font-serif tracking-widest text-amber-500">PHOENIX IMPERIAL</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mt-1">Multi-Branch Hotels</p>
        
        {/* User Actions - Prominent Position */}
        {isAuthenticated && <div className="mt-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <UserIcon size={18} className="text-amber-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-zinc-500 truncate">
                  {user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'branch_admin' ? 'Branch Admin' : 'Customer'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={onOpenDashboard} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded transition-colors text-xs font-medium">
                Dashboard
              </button>
              <button onClick={logout} className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          </div>}
      </div>

      {/* Branch Indicator */}
      {currentBranch && <div className="mx-8 mb-4 mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded">
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <Building2 size={14} />
            <span className="uppercase tracking-wider">
              {branches.find(b => b.id === currentBranch)?.city} Branch
            </span>
          </div>
        </div>}

      <nav className="flex-1 flex flex-col justify-center px-8 space-y-6">
        {links.map(link => <a key={link.name} href={link.href} onClick={e => {
        if (link.onClick) {
          e.preventDefault();
          link.onClick();
        }
      }} className="text-zinc-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest font-light flex items-center group cursor-pointer">
            <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-amber-400 mr-0 group-hover:mr-3"></span>
            {link.name}
          </a>)}
      </nav>

      <div className="p-8 pt-4 border-t border-zinc-900 space-y-4">
        {/* Auth Button - Only show if not authenticated */}
        {!isAuthenticated && <button onClick={onOpenAuth} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <LogIn size={16} />
            Sign In / Sign Up
          </button>}

        <div className="flex items-center gap-3 text-amber-500">
          <Phone size={18} />
          <span className="font-serif italic text-sm">+234 809 000 0000</span>
        </div>
        <p className="text-zinc-600 text-xs">© 2024 Phoenix Imperial Hotel</p>
      </div>
    </aside>;
};
const MobileNav: React.FC<{
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenRooms: () => void;
  onOpenReservation: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenRooms,
  onOpenReservation,
  onOpenAbout,
  onOpenContact
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const links = [{
    name: "Home",
    href: "#home"
  }, {
    name: "Rooms",
    href: "#rooms",
    onClick: () => {
      setIsOpen(false);
      onOpenRooms();
    }
  }, {
    name: "Reservation",
    href: "#reservation",
    onClick: () => {
      setIsOpen(false);
      onOpenReservation();
    }
  }, {
    name: "About",
    href: "#about",
    onClick: () => {
      setIsOpen(false);
      onOpenAbout();
    }
  }, {
    name: "Contact",
    href: "#contact",
    onClick: () => {
      setIsOpen(false);
      onOpenContact();
    }
  }] as any[];
  return <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-serif text-amber-500">PHOENIX IMPERIAL</h1>
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated ? <>
            <button onClick={onOpenDashboard} className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/30 transition-colors">
              <UserIcon size={18} />
            </button>
            <button onClick={logout} className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors">
              <LogOut size={18} />
            </button>
          </> : <button onClick={onOpenAuth} className="text-amber-500 hover:text-amber-400 transition-colors">
            <LogIn size={20} />
          </button>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-2xl">
          {isAuthenticated && <div className="pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <UserIcon size={18} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{user?.name}</p>
                  <p className="text-xs text-zinc-500">
                    {user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'branch_admin' ? 'Branch Admin' : 'Customer'}
                  </p>
                </div>
              </div>
              <button onClick={() => {
          onOpenDashboard();
          setIsOpen(false);
        }} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors text-sm font-medium">
                View Dashboard
              </button>
            </div>}
          
          {links.map(link => <a key={link.name} href={link.href} className="text-zinc-300 hover:text-amber-500 py-2 border-b border-zinc-900 last:border-0" onClick={e => {
        if (link.onClick) {
          e.preventDefault();
          link.onClick();
        } else {
          setIsOpen(false);
        }
      }}>
              {link.name}
            </a>)}
        </motion.div>}
    </div>;
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
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm">Welcome to Phoenix Imperial</span>
            <div className="h-[1px] w-12 bg-amber-400/60"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg max-w-4xl leading-tight">
            {HERO_SLIDES[current].title}
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto tracking-wide">
            {HERO_SLIDES[current].subtitle}
          </p>
          <button onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group">
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900">
        <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </div>;
};
const ReservationCTA: React.FC<{
  onOpenBooking: () => void;
}> = ({
  onOpenBooking
}) => {
  return <div className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto">
      <div className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm text-center">
        <h3 className="text-2xl font-serif text-white mb-4">Ready to Book Your Stay?</h3>
        <p className="text-zinc-400 mb-6">Select your preferred branch and check available rooms</p>
        <button onClick={onOpenBooking} className="bg-amber-600 text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center gap-3">
          <Building2 size={18} />
          Check Availability by Branch
        </button>
      </div>
    </div>;
};

// Main Component Content
const MultitenantHotelContent: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [roomsPageOpen, setRoomsPageOpen] = useState(false);
  const [reservationPageOpen, setReservationPageOpen] = useState(false);
  const [aboutPageOpen, setAboutPageOpen] = useState(false);
  const [contactPageOpen, setContactPageOpen] = useState(false);
  const {
    currentBranch
  } = useTenant();

  // Get branch-specific content
  const rooms = currentBranch ? ROOMS_BY_BRANCH[currentBranch] : [];
  const testimonials = currentBranch ? TESTIMONIALS_BY_BRANCH[currentBranch] : [];
  const gallery = currentBranch ? GALLERY_BY_BRANCH[currentBranch] : [];
  return <div className="min-h-screen bg-zinc-900 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white">
      <NavigationSidebar onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} onOpenRooms={() => setRoomsPageOpen(true)} onOpenReservation={() => setReservationPageOpen(true)} onOpenAbout={() => setAboutPageOpen(true)} onOpenContact={() => setContactPageOpen(true)} />
      <MobileNav onOpenAuth={() => setAuthModalOpen(true)} onOpenDashboard={() => setDashboardOpen(true)} onOpenRooms={() => setRoomsPageOpen(true)} onOpenReservation={() => setReservationPageOpen(true)} onOpenAbout={() => setAboutPageOpen(true)} onOpenContact={() => setContactPageOpen(true)} />

      {/* Main Content Area */}
      <main className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative">
        
        {/* Hero Section */}
        <section id="home">
          <HeroSlider onOpenBooking={() => setBookingModalOpen(true)} />
        </section>

        {/* Reservation CTA */}
        <section className="pb-24">
          <ReservationCTA onOpenBooking={() => setBookingModalOpen(true)} />
        </section>

        {/* Facilities Section */}
        <section className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white">Hotel Facilities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Immerse yourself in a world of luxury and convenience across all our branches.
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
                <h3 className="text-xl font-serif mb-2 text-zinc-200 group-hover:text-amber-500 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </motion.div>)}
          </div>
        </section>

        {/* Branch-Tagged Content Notice */}
        {currentBranch && <section className="px-6 md:px-16 py-8 bg-zinc-950">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-400">
              <Building2 size={20} />
              <p className="text-sm">
                Viewing content from <span className="font-semibold uppercase tracking-wider">
                  {currentBranch.toUpperCase()}
                </span> branch
              </p>
            </div>
          </section>}

        {/* Testimonials Section (Branch-Specific) */}
        {testimonials.length > 0 && <section className="py-24 bg-zinc-900 px-6 md:px-16">
            <div className="max-w-7xl mx-auto text-center">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">
                What Guests Say
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-16 text-white">Testimonials</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map(testimonial => <div key={testimonial.id} className="bg-zinc-800 p-8 rounded-lg">
                    <div className="flex items-center gap-1 text-amber-400 mb-4 justify-center">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className={i >= testimonial.rating ? "opacity-30" : ""} />)}
                    </div>
                    <p className="text-zinc-300 italic mb-6 leading-relaxed">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <UserIcon size={20} className="text-amber-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">{testimonial.userName}</p>
                        {testimonial.verified && <p className="text-xs text-amber-400 flex items-center gap-1">
                            <Check size={12} /> Verified Guest
                          </p>}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* Gallery Section (Branch-Specific) */}
        {gallery.length > 0 && <section className="py-24 bg-zinc-950">
            <div className="text-center mb-12">
              <span className="text-amber-500 uppercase tracking-[0.2em] text-xs font-medium">Gallery</span>
              <h2 className="text-3xl font-serif mt-3 text-white">Explore Our Spaces</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3">
              {gallery.map(item => <div key={item.id} className="relative aspect-square group overflow-hidden cursor-pointer">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-amber-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="font-serif text-lg">{item.title}</p>
                      <p className="text-xs uppercase tracking-wider mt-1">{item.category}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </section>}

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-800 pt-20 pb-10 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-serif text-amber-500 mb-6">PHOENIX IMPERIAL</h2>
              <p className="text-zinc-500 leading-relaxed mb-6">
                A sanctuary of sophistication across Nigeria. Experience the pinnacle of hospitality.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-amber-600 hover:text-white transition-all">
                    <Icon size={18} />
                  </a>)}
              </div>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Abuja Branch</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" />
                  <span>CBD, Abuja, Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-zinc-500" />
                  <span>+234 809 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-zinc-500" />
                  <span>abuja@phoeniximperial.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Lagos Branch</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" />
                  <span>Victoria Island, Lagos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-zinc-500" />
                  <span>+234 809 765 4321</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-zinc-500" />
                  <span>lagos@phoeniximperial.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-serif text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map(link => <li key={link}>
                    <a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 group text-sm">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600 uppercase tracking-wider">
            <p>© 2024 Phoenix Imperial Multi-Branch Hotels. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <UserDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      <RoomsPage isOpen={roomsPageOpen} onClose={() => setRoomsPageOpen(false)} onBook={room => {
      setRoomsPageOpen(false);
      setBookingModalOpen(true);
    }} />
      <ReservationPage isOpen={reservationPageOpen} onClose={() => setReservationPageOpen(false)} />
      <AboutPage isOpen={aboutPageOpen} onClose={() => setAboutPageOpen(false)} />
      <ContactPage isOpen={contactPageOpen} onClose={() => setContactPageOpen(false)} />
    </div>;
};

// Main Component with Providers
export const MultitenantHotel: React.FC = () => {
  return <AuthProvider>
      <TenantProvider>
        <MultitenantHotelContent />
      </TenantProvider>
    </AuthProvider>;
};