// Multitenancy Type Definitions

export type BranchId = 'abuja' | 'lagos';

export interface Branch {
  id: BranchId;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  currency: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  role: 'customer' | 'branch_admin' | 'super_admin';
  branchId?: BranchId; // Only for branch_admin
}

export interface Room {
  id: string;
  branchId: BranchId;
  name: string;
  description: string;
  type: string;
  price: number;
  maxGuests: number;
  size: string;
  amenities: string[];
  images: string[];
  available: boolean;
  rating?: number;
}

export interface Booking {
  id: string;
  branchId: BranchId;
  userId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  specialRequests?: string;
}

export interface Testimonial {
  id: string;
  branchId: BranchId;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface Gallery {
  id: string;
  branchId: BranchId;
  imageUrl: string;
  title: string;
  category: string;
  uploadedAt: string;
}

export interface Announcement {
  id: string;
  branchId: BranchId;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  active: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface GlobalContent {
  hero: {
    slides: Array<{
      id: string;
      image: string;
      title: string;
      subtitle: string;
    }>;
  };
  navigation: {
    menuItems: Array<{
      label: string;
      href: string;
      submenu?: Array<{ label: string; href: string }>;
    }>;
  };
  footer: {
    about: string;
    socialLinks: Array<{
      platform: string;
      url: string;
    }>;
    copyright: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export interface TenantContextType {
  currentBranch: BranchId | null;
  branches: Branch[];
  selectBranch: (branchId: BranchId) => void;
  getBranchData: (branchId: BranchId) => Branch | undefined;
}
