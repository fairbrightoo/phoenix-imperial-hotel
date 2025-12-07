import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Calendar, Users, Utensils, Waves, Dumbbell, Sparkles, Briefcase, Shirt, Instagram, Facebook, Twitter, MapPin, Mail, ArrowRight, Star, Check, User as UserIcon, LogIn, Building2, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AuthProvider, useAuth } from './AuthContext';
import { TenantProvider, useTenant } from './TenantContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ModalProvider, useModal } from './ModalContext';
import { AuthModal } from './AuthModal';
import { BookingModal } from './BookingModal';
import { UserDashboard } from './UserDashboard';
import { RoomsPage } from './RoomsPage';
import { ReservationPage } from './ReservationPage';
import { AboutPage } from './AboutPage';
import { ContactPage } from './ContactPage';
import { TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';

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

const NavigationSidebar: React.FC = () => {
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const {
    branches,
    currentBranch
  } = useTenant();
  const { theme } = useTheme();
  const {
    openAuth,
    openDashboard,
    openRooms,
    openReservation,
    openAbout,
    openContact
  } = useModal();

  const navigate = useNavigate();

  const links = [{
    name: "Home",
    href: "/",
    onClick: () => {
      navigate('/');
    }
  }, {
    name: "Rooms",
    href: "/rooms",
    onClick: (e: any) => {
      e.preventDefault();
      navigate('/rooms');
    }
  }, {
    name: "Reservation",
    href: "/reservation",
    onClick: (e: any) => {
      e.preventDefault();
      navigate('/reservation');
    }
  }, {
    name: "About",
    href: "/about",
    onClick: (e: any) => {
      e.preventDefault();
      navigate('/about');
    }
  }, {
    name: "Contact",
    href: "/contact",
    onClick: (e: any) => {
      e.preventDefault();
      navigate('/contact');
    }
  }] as any[];
  return <div className="hidden md:flex h-full flex-col bg-sidebar border-r border-sidebar-border w-64 fixed left-0 top-0 z-40">
    <div className="p-6 border-b border-sidebar-border">
      <div className="flex items-center gap-3 mb-2">
        <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-12 h-auto" />
        <div className="flex flex-col">
          <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">PHOENIX</h1>
          <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">IMPERIAL</h1>
        </div>
      </div>
      <p className="text-xs text-[#FEFCF9] uppercase tracking-wider">Luxury Hotel & Suites</p>
    </div>

    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {links.map(link => <a key={link.name} href={link.href} onClick={link.onClick} className="block px-4 py-4 text-[#FEFCF9] hover:bg-sidebar-accent hover:text-amber-500 rounded transition-colors text-xl font-medium">
        {link.name}
      </a>)}
    </nav>

    <div className="p-4 border-t border-sidebar-border space-y-2">
      {/* Theme Toggle */}


      {isAuthenticated ? <div className="space-y-2">
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-[#FEFCF9]">{user?.name}</p>
          <p className="text-xs text-[#FEFCF9] truncate">{user?.email}</p>
        </div>
        <button onClick={openDashboard} className="w-full flex items-center gap-2 px-4 py-2 text-amber-500 hover:bg-amber-500/10 rounded transition-colors text-sm font-medium">
          <Briefcase size={16} />
          Dashboard
        </button>
        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors text-sm font-medium">
          <LogOut size={16} />
          Logout
        </button>
      </div> : <button onClick={openAuth} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded transition-colors text-sm font-medium flex items-center justify-center gap-2">
        <LogIn size={16} />
        Sign In
      </button>}
    </div>
  </div>;
};
const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  const {
    openAuth,
    openDashboard,
    openRooms,
    openReservation,
    openAbout,
    openContact
  } = useModal();

  const navigate = useNavigate();

  const links = [{
    name: "Home",
    href: "/",
    onClick: () => {
      setIsOpen(false);
      navigate('/');
    }
  }, {
    name: "Rooms",
    href: "/rooms",
    onClick: (e: any) => {
      e.preventDefault();
      setIsOpen(false);
      navigate('/rooms');
    }
  }, {
    name: "Reservation",
    href: "/reservation",
    onClick: (e: any) => {
      e.preventDefault();
      setIsOpen(false);
      navigate('/reservation');
    }
  }, {
    name: "About",
    href: "/about",
    onClick: (e: any) => {
      e.preventDefault();
      setIsOpen(false);
      navigate('/about');
    }
  }, {
    name: "Contact",
    href: "/contact",
    onClick: (e: any) => {
      e.preventDefault();
      setIsOpen(false);
      navigate('/contact');
    }
  }] as any[];
  return <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-8 h-auto" />
      <h1 className="text-xl font-serif text-amber-500">PHOENIX IMPERIAL</h1>
    </div>
    <div className="flex items-center gap-3">
      {isAuthenticated ? <>
        <button onClick={openDashboard} className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/30 transition-colors">
          <UserIcon size={18} />
        </button>
        <button onClick={logout} className="w-9 h-9 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors">
          <LogOut size={18} />
        </button>
      </> : <button onClick={openAuth} className="text-amber-500 hover:text-amber-400 transition-colors">
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
          openDashboard();
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
const HeroSlider: React.FC = () => {
  const { openBooking } = useModal();
  const [current, setCurrent] = useState(0);

  // Preload images
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return <div className="relative h-[85vh] w-full overflow-hidden bg-zinc-900">
    <AnimatePresence initial={false}>
      <motion.div key={current} className="absolute inset-0" initial={{
        opacity: 0,
        scale: 1.1
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1.5,
        ease: "easeInOut"
      }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${HERO_SLIDES[current].image})`
        }} />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
    </AnimatePresence>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
      <AnimatePresence mode="wait">
        <motion.div key={`text-${current}`} initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} exit={{
          y: -30,
          opacity: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
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
          <button onClick={() => openBooking()} className="bg-amber-600 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-700 transition-all duration-300 flex items-center gap-3 mx-auto group">
            Check Availability
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none text-zinc-900">
      <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z" />
      </svg>
    </div>
  </div>;
};
const ReservationCTA: React.FC = () => {
  const { openBooking } = useModal();
  return <div className="relative z-30 -mt-20 md:-mt-24 px-4 md:px-12 max-w-6xl mx-auto">
    <div className="bg-zinc-800 p-8 shadow-2xl border-t-4 border-amber-600 rounded-sm text-center">
      <h3 className="text-2xl font-serif text-white mb-4">Ready to Book Your Stay?</h3>
      <p className="text-zinc-400 mb-6">Select your preferred branch and check available rooms</p>
      <button onClick={() => openBooking()} className="bg-amber-600 text-white px-8 py-4 uppercase text-sm font-bold tracking-widest hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center gap-3">
        <Building2 size={18} />
        Check Availability by Branch
      </button>
    </div>
  </div>;
};

// Main Component Content
const MultitenantHotelContent: React.FC = () => {
  const {
    authModalOpen, closeAuth,
    bookingModalOpen, closeBooking, openBooking,
    dashboardOpen, closeDashboard,
    roomsPageOpen, closeRooms, openRooms,
    reservationPageOpen, closeReservation, openReservation,
    aboutPageOpen, closeAbout, openAbout,
    contactPageOpen, closeContact, openContact
  } = useModal();

  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    currentBranch,
    getBranchTestimonials,
    getBranchGallery,
    branches // Access branches to iterate if needed
  } = useTenant();

  // Sync URL with Modals
  useEffect(() => {
    const path = location.pathname;
    if (path === '/rooms' && !roomsPageOpen) openRooms();
    if (path === '/reservation' && !reservationPageOpen) openReservation();
    if (path === '/about' && !aboutPageOpen) openAbout();
    if (path === '/contact' && !contactPageOpen) openContact();
    // If path is '/', we might want to ensure all modals are closed? 
    // Maybe not strictly necessary if we handle onClose.
  }, [location.pathname]);

  // Check for pending bookings on login
  useEffect(() => {
    if (isAuthenticated) {
      const pendingBooking = localStorage.getItem('pending_booking');
      const pendingReservation = localStorage.getItem('pending_reservation');

      if (pendingBooking) {
        openBooking();
      } else if (pendingReservation) {
        openReservation();
      }
    }
  }, [isAuthenticated]);

  // Aggregate testimonials if no branch selected, otherwise get branch specific
  const testimonials = currentBranch
    ? getBranchTestimonials(currentBranch)
    : branches.reduce((acc, branch) => [...acc, ...getBranchTestimonials(branch.id)], [] as any[]);

  // Aggregate gallery if no branch selected
  const gallery = currentBranch
    ? getBranchGallery(currentBranch)
    : branches.reduce((acc, branch) => [...acc, ...getBranchGallery(branch.id)], [] as any[]);
  return <div className="min-h-screen bg-background text-foreground font-sans selection:bg-amber-500 selection:text-white transition-colors duration-300">
    <NavigationSidebar />
    <MobileNav />

    {/* Main Content Area */}
    <main className="md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen relative">

      {/* Hero Section */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* Reservation CTA */}
      <section className="pb-24">
        <ReservationCTA />
      </section>

      {/* Facilities Section */}
      <section className="px-6 md:px-16 py-16 text-center max-w-7xl mx-auto">
        <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">Our Services</span>
        <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-foreground">Hotel Facilities</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed">
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
          }} className="flex flex-col items-center group p-6 rounded-lg hover:bg-[#5C5651] transition-colors duration-500">
            <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all duration-300">
              <item.icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif mb-2 text-foreground group-hover:text-amber-500 transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-[#FEFCF9] transition-colors">{item.desc}</p>
          </motion.div>)}
        </div>
      </section>

      {/* Branch-Tagged Content Notice */}
      <section className="px-6 md:px-16 py-8 bg-sidebar border-y border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-amber-500">
          <Building2 size={20} />
          <p className="text-sm font-medium">
            {currentBranch ? (
              <>
                Viewing content from <span className="font-semibold uppercase tracking-wider">
                  {currentBranch.toUpperCase()}
                </span> branch
              </>
            ) : (
              <>
                Viewing highlights from <span className="font-semibold uppercase tracking-wider">
                  ALL BRANCHES
                </span>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Testimonials Section (Branch-Specific) */}
      {testimonials.length > 0 && <section className="py-24 bg-background px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">
            What Guests Say
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-16 text-foreground">Testimonials</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => <div key={testimonial.id} className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-4 justify-center">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className={i >= testimonial.rating ? "opacity-30" : ""} />)}
              </div>
              <p className="text-muted-foreground italic mb-6 leading-relaxed">"{testimonial.comment}"</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <UserIcon size={20} className="text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="text-foreground font-medium">{testimonial.userName}</p>
                  {testimonial.verified && <p className="text-xs text-amber-500 flex items-center gap-1">
                    <Check size={12} /> Verified Guest
                  </p>}
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </section>}

      {/* Gallery Section (Branch-Specific) */}
      {gallery.length > 0 && <section className="py-24 bg-muted/30 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 uppercase tracking-[0.2em] text-sm font-medium">
              Visual Tour
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-foreground">Our Gallery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map(item => {
              const imageUrl = item.imageUrl?.startsWith('/')
                ? `http://${window.location.hostname}:5000${item.imageUrl}`
                : item.imageUrl;

              return <motion.div key={item.id} whileHover={{
                y: -10
              }} className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
                <img src={imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-sm text-amber-400 uppercase tracking-wider">{item.category}</p>
                </div>
              </motion.div>
            })}
          </div>
        </div>
      </section>}

      {/* Footer */}
      <footer className="bg-sidebar border-t border-border py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/phoenix-logo.svg" alt="Phoenix Imperial Logo" className="w-12 h-auto" />
              <div className="flex flex-col">
                <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">PHOENIX</h1>
                <h1 className="text-xl font-serif tracking-widest text-amber-500 leading-none">IMPERIAL</h1>
              </div>
            </div>
            <p className="text-[#FEFCF9] leading-relaxed max-w-sm">
              Redefining luxury hospitality across Nigeria. Experience the perfect blend of comfort, elegance, and exceptional service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif text-amber-500 mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Rooms & Suites', 'Dining', 'Wellness', 'Events', 'Contact'].map(item => <li key={item}>
                <a href="#" className="text-[#FEFCF9] hover:text-amber-500 transition-colors">
                  {item}
                </a>
              </li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif text-amber-500 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#FEFCF9]">
                <MapPin className="shrink-0 text-amber-500" size={20} />
                <span>123 Luxury Avenue, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-[#FEFCF9]">
                <Phone className="shrink-0 text-amber-500" size={20} />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-[#FEFCF9]">
                <Mail className="shrink-0 text-amber-500" size={20} />
                <span>reservations@phoeniximperial.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-sidebar-border/50 flex flex-col items-center gap-4 text-center">
          <p className="text-[#FEFCF9] text-sm">
            © {new Date().getFullYear()} Phoenix Imperial Hotel. All rights reserved.
          </p>
          <p className="text-amber-500 text-sm opacity-80">
            Developed by Engr Bright Osisiogu | 07045763306
          </p>
        </div>
      </footer>
    </main>

    {/* Modals */}
    <AuthModal isOpen={authModalOpen} onClose={closeAuth} />
    <BookingModal isOpen={bookingModalOpen} onClose={closeBooking} />
    <UserDashboard isOpen={dashboardOpen} onClose={closeDashboard} />
    <RoomsPage
      isOpen={roomsPageOpen}
      onClose={() => { closeRooms(); navigate('/'); }}
      onBook={(room) => {
        closeRooms();
        openBooking(room);
      }}
    />
    <ReservationPage isOpen={reservationPageOpen} onClose={() => { closeReservation(); navigate('/'); }} />
    <AboutPage isOpen={aboutPageOpen} onClose={() => { closeAbout(); navigate('/'); }} />
    <ContactPage isOpen={contactPageOpen} onClose={() => { closeContact(); navigate('/'); }} />
  </div>;
};

// Main Component with Providers
import { AlertProvider } from '../ui/AlertContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const MultitenantHotel = () => {
  return <MultitenantHotelContent />;
};