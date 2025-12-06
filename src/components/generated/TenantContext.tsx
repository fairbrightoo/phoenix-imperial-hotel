import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Branch, TenantContextType, Testimonial, Gallery, GlobalContent, SystemSettings } from './types';
import { TESTIMONIALS_BY_BRANCH, GALLERY_BY_BRANCH } from './mockData';
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
    const [allBranches, setAllBranches] = useState<Branch[]>([]);
    const [testimonials, setTestimonials] = useState<Record<BranchId, Testimonial[]>>(TESTIMONIALS_BY_BRANCH);
    const [gallery, setGallery] = useState<Record<BranchId, Gallery[]>>(GALLERY_BY_BRANCH);
    const [globalContent, setGlobalContent] = useState<GlobalContent>(DEFAULT_GLOBAL_CONTENT);
    const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);

    // Derived state for active branches
    const branches = allBranches.filter(b => b.status !== 'inactive');

    // Load branches from API
    // Load branches from API
    useEffect(() => {
      const fetchBranches = async () => {
        try {
          const response = await api.get('/branches');
          console.log('Fetch Branches Response:', response);
          if (response.data && Array.isArray(response.data)) {
            if (response.data.length === 0) {
              console.warn('API returned 0 branches');
              // Mock data fallback if needed?
            }
            setAllBranches(response.data);

            // Extract gallery data from branches and update gallery state
            const galleryData: Record<BranchId, Gallery[]> = {};
            response.data.forEach((branch: any) => {
              if (branch.images && Array.isArray(branch.images)) {
                // Check if images are strings (old format) or Gallery objects
                const images = branch.images.map((img: any, index: number) => {
                  if (typeof img === 'string') {
                    return {
                      id: `legacy-${index}`,
                      branchId: branch.id,
                      imageUrl: img,
                      title: 'Gallery Image',
                      category: 'Rooms',
                      uploadedAt: new Date().toISOString()
                    } as Gallery;
                  }
                  return img as Gallery;
                });
                galleryData[branch.id] = images;
              }
            });

            // Merge with existing gallery state
            setGallery(prev => ({ ...prev, ...galleryData }));
          } else {
            console.error('Invalid branches response format:', response.data);
          }
        } catch (error) {
          console.error('Failed to fetch branches:', error);
          alert('System Error: Failed to load branches. Check console for details.');
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
      return allBranches.find(b => b.id === branchId);
    };

    const updateBranch = (branchId: BranchId, data: Partial<Branch>) => {
      setAllBranches(prev => prev.map(b => b.id === branchId ? { ...b, ...data } : b));
    };

    const addBranch = (branch: Branch) => {
      setAllBranches(prev => [...prev, branch]);
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

    const updateBranchGallery = async (branchId: BranchId, data: Gallery[]) => {
      try {
        // Optimistic update
        setGallery(prev => ({ ...prev, [branchId]: data }));

        // Persist to backend
        // We utilize the 'images' field on Branch model to store the gallery JSON
        await api.put(`/branches/${branchId}`, { images: data });

        // Also update local branch data to reflect the change
        setAllBranches(prev => prev.map(b =>
          b.id === branchId ? { ...b, images: data as any } : b
        ));
      } catch (error) {
        console.error('Failed to update branch gallery:', error);
      }
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
      allBranches,
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