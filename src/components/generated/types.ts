// Multitenancy Type Definitions

export type BranchId = string;

export interface Branch {
  id: BranchId;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  currency: string;
  status?: 'active' | 'inactive';
  images?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  role: 'customer' | 'branch_admin' | 'super_admin';
  branchId?: BranchId; // Only for branch_admin
  status?: 'active' | 'inactive';
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
  totalQuantity?: number;
  category?: 'room' | 'hall';
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
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentReference?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
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

export interface SystemSettings {
  hotelName: string;
  defaultCurrency: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem?: boolean;
}

export interface AuthContextType {
  user: User | null;
  users: User[];
  roles: Role[];
  permissions: Permission[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<User>;
  loginWithGoogle: (credential: string) => Promise<User>;
  addUser: (user: User) => void;
  updateUser: (userId: string, data: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  addRole: (role: Role) => void;
  updateRole: (roleId: string, data: Partial<Role>) => void;
  deleteRole: (roleId: string) => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string, password: string) => Promise<void>;
}

export interface TenantContextType {
  currentBranch: BranchId | null;
  branches: Branch[]; // Filtered (Active only)
  allBranches: Branch[]; // All branches (including inactive)
  selectBranch: (branchId: BranchId) => void;
  getBranchData: (branchId: BranchId) => Branch | undefined;
  clearBranchSelection: () => void;
  branchSessionTimestamp: number | null;
  updateBranch: (branchId: BranchId, data: Partial<Branch>) => void;
  addBranch: (branch: Branch) => void;
  getBranchTestimonials: (branchId: BranchId) => Testimonial[];
  updateBranchTestimonials: (branchId: BranchId, data: Testimonial[]) => void;
  getBranchGallery: (branchId: BranchId) => Gallery[];
  updateBranchGallery: (branchId: BranchId, data: Gallery[]) => void;
  globalContent: GlobalContent;
  updateGlobalContent: (section: keyof GlobalContent, data: any) => void;
  systemSettings: SystemSettings;
  updateSystemSettings: (data: SystemSettings) => void;
}
