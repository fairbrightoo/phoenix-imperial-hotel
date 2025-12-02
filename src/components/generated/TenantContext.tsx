import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Branch, TenantContextType, Testimonial, Gallery, GlobalContent, SystemSettings } from './types';
import { BRANCHES, TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';
import api from '../../services/api';



// ... existing useEffect for session storage



const DEFAULT_GLOBAL_CONTENT: GlobalContent = {
  hero: {
    slides: [
      {
        id: 'slide-1',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
        title: 'Experience Luxury Redefined',
        subtitle: 'Discover the perfect blend of comfort and elegance at Phoenix Imperial.'
      },
      {
        id: 'slide-2',
        image: 'https://images.unsplash.com/photo-1571896349842-68c894913dbb?q=80&w=2070&auto=format&fit=crop',
        title: 'Unforgettable Moments',
        subtitle: 'Create lasting memories in our world-class facilities.'
      },
      {
        id: 'slide-3',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        title: 'Exquisite Dining',
        subtitle: 'Savor culinary masterpieces crafted by our expert chefs.'
      }
    ]
  },
  navigation: {
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'Rooms', href: '#rooms' },
      { label: 'Dining', href: '#dining' },
      { label: 'Facilities', href: '#facilities' },
      { label: 'Contact', href: '#contact' }
    ]
  },
  footer: {
    about: 'Redefining luxury hospitality across Nigeria. Experience the perfect blend of comfort, elegance, and exceptional service.',
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com' },
      { platform: 'Twitter', url: 'https://twitter.com' },
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' }
    ],
    copyright: '© 2024 Phoenix Imperial Multi-Branch Hotels. All rights reserved.'
  }
};

const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  hotelName: 'Phoenix Imperial Hotels',
  defaultCurrency: 'NGN - Nigerian Naira'
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);
export const TenantProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [currentBranch, setCurrentBranch] = useState<BranchId | null>(null);
    const [branchSessionTimestamp, setBranchSessionTimestamp] = useState<number | null>(null);
    const [branches, setBranches] = useState<Branch[]>(BRANCHES);
    const [testimonials, setTestimonials] = useState<Record<BranchId, Testimonial[]>>(TESTIMONIALS_BY_BRANCH);
    const [gallery, setGallery] = useState<Record<BranchId, Gallery[]>>(GALLERY_BY_BRANCH);
    const [globalContent, setGlobalContent] = useState<GlobalContent>(DEFAULT_GLOBAL_CONTENT);
    const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);

    // Load branches from API
    useEffect(() => {
      const fetchBranches = async () => {
        try {
          const response = await api.get('/branches');
          // Only update if we got data, otherwise keep mock data for safety during dev
          if (response.data && response.data.length > 0) {
            setBranches(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch branches:', error);
        }
      };
      fetchBranches();
    }, []);

    // Load saved branch from session storage (not localStorage to prevent cross-session conflicts)
    useEffect(() => {
      const savedBranch = sessionStorage.getItem('phoenix_imperial_selected_branch');
      const savedTimestamp = sessionStorage.getItem('phoenix_imperial_branch_session_timestamp');
      if (savedBranch && savedTimestamp) {
        setCurrentBranch(savedBranch as BranchId);
        setBranchSessionTimestamp(parseInt(savedTimestamp));
      }
    }, []);
    const selectBranch = (branchId: BranchId) => {
      const timestamp = Date.now();

      // Update state
      setCurrentBranch(branchId);
      setBranchSessionTimestamp(timestamp);

      // Store in sessionStorage to prevent conflicts across tabs/windows
      // Each tab/window will have its own independent branch selection
      sessionStorage.setItem('phoenix_imperial_selected_branch', branchId);
      sessionStorage.setItem('phoenix_imperial_branch_session_timestamp', timestamp.toString());

      // Log branch switch for debugging (can be removed in production)
      console.log(`[Multi-tenant Session] Switched to ${branchId} branch at ${new Date(timestamp).toLocaleTimeString()}`);
    };
    const getBranchData = (branchId: BranchId): Branch | undefined => {
      return branches.find(b => b.id === branchId);
    };

    const updateBranch = (branchId: BranchId, data: Partial<Branch>) => {
      setBranches(prev => prev.map(b => b.id === branchId ? { ...b, ...data } : b));
    };

    const addBranch = (branch: Branch) => {
      setBranches(prev => [...prev, branch]);
    };

    const getBranchTestimonials = (branchId: BranchId) => {
      return testimonials[branchId] || [];
    };

    const updateBranchTestimonials = (branchId: BranchId, data: Testimonial[]) => {
      setTestimonials(prev => ({ ...prev, [branchId]: data }));
    };

    const getBranchGallery = (branchId: BranchId) => {
      return gallery[branchId] || [];
    };

    const updateBranchGallery = (branchId: BranchId, data: Gallery[]) => {
      setGallery(prev => ({ ...prev, [branchId]: data }));
    };

    const updateGlobalContent = (section: keyof GlobalContent, data: any) => {
      setGlobalContent(prev => ({
        ...prev,
        [section]: data
      }));
    };

    const updateSystemSettings = (data: SystemSettings) => {
      setSystemSettings(data);
    };

    const clearBranchSelection = () => {
      setCurrentBranch(null);
      setBranchSessionTimestamp(null);
      sessionStorage.removeItem('phoenix_imperial_selected_branch');
      sessionStorage.removeItem('phoenix_imperial_branch_session_timestamp');
    };
    return <TenantContext.Provider value={{
      currentBranch,
      branches,
      selectBranch,
      getBranchData,
      clearBranchSelection,
      branchSessionTimestamp,
      updateBranch,
      addBranch,
      getBranchTestimonials,
      updateBranchTestimonials,
      getBranchGallery,
      updateBranchGallery,
      globalContent,
      updateGlobalContent,
      systemSettings,
      updateSystemSettings
    }}>
      {children}
    </TenantContext.Provider >;
  };
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};