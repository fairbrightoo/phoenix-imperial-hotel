// Mock Data for Development (simulating multitenant database)

import { Branch, Room, Booking, Testimonial, Gallery, User, BranchId } from './types';

export const BRANCHES: Branch[] = [
  {
    id: 'abuja',
    name: 'Phoenix Imperial Abuja',
    city: 'Abuja',
    address: '123 Central Business District, Abuja, Nigeria',
    phone: '+234 809 123 4567',
    email: 'abuja@phoeniximperial.com',
    timezone: 'Africa/Lagos',
    currency: 'NGN'
  },
  {
    id: 'lagos',
    name: 'Phoenix Imperial Lagos',
    city: 'Lagos',
    address: '456 Victoria Island, Lagos, Nigeria',
    phone: '+234 809 765 4321',
    email: 'lagos@phoeniximperial.com',
    timezone: 'Africa/Lagos',
    currency: 'NGN'
  }
];

// Mock Rooms per Branch
export const ROOMS_BY_BRANCH: Record<BranchId, Room[]> = {
  abuja: [
    {
      id: 'abuja-room-1',
      branchId: 'abuja',
      name: 'Deluxe King Suite',
      description: 'Spacious suite with king bed and city views',
      type: 'deluxe',
      price: 45000,
      maxGuests: 2,
      size: '45m²',
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Safe'],
      images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'],
      available: true,
      rating: 4.8
    },
    {
      id: 'abuja-room-2',
      branchId: 'abuja',
      name: 'Executive Suite',
      description: 'Perfect for business travelers with work desk',
      type: 'executive',
      price: 65000,
      maxGuests: 2,
      size: '55m²',
      amenities: ['WiFi', 'AC', 'TV', 'Work Desk', 'Meeting Space'],
      images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop'],
      available: true,
      rating: 4.9
    },
    {
      id: 'abuja-room-3',
      branchId: 'abuja',
      name: 'Family Suite',
      description: 'Two bedrooms perfect for families',
      type: 'family',
      price: 85000,
      maxGuests: 5,
      size: '75m²',
      amenities: ['WiFi', 'AC', '2 TVs', 'Kitchen', 'Balcony'],
      images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop'],
      available: true,
      rating: 4.7
    }
  ],
  lagos: [
    {
      id: 'lagos-room-1',
      branchId: 'lagos',
      name: 'Ocean View Deluxe',
      description: 'Stunning ocean views from your private balcony',
      type: 'deluxe',
      price: 55000,
      maxGuests: 2,
      size: '50m²',
      amenities: ['WiFi', 'AC', 'TV', 'Ocean View', 'Balcony'],
      images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop'],
      available: true,
      rating: 4.9
    },
    {
      id: 'lagos-room-2',
      branchId: 'lagos',
      name: 'Premium Business Suite',
      description: 'High-end suite for executives',
      type: 'premium',
      price: 75000,
      maxGuests: 2,
      size: '60m²',
      amenities: ['WiFi', 'AC', 'Smart TV', 'Office Setup', 'Butler Service'],
      images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'],
      available: true,
      rating: 5.0
    },
    {
      id: 'lagos-room-3',
      branchId: 'lagos',
      name: 'Presidential Suite',
      description: 'Ultimate luxury with panoramic views',
      type: 'presidential',
      price: 150000,
      maxGuests: 4,
      size: '120m²',
      amenities: ['WiFi', 'AC', 'Smart Home', 'Private Pool', 'Butler', 'Chef'],
      images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop'],
      available: true,
      rating: 5.0
    }
  ]
};

// Mock Testimonials per Branch
export const TESTIMONIALS_BY_BRANCH: Record<BranchId, Testimonial[]> = {
  abuja: [
    {
      id: 'test-abuja-1',
      branchId: 'abuja',
      userName: 'Chidi Okonkwo',
      rating: 5,
      comment: 'Exceptional service and beautiful rooms. The staff at Phoenix Imperial Abuja made our stay memorable!',
      createdAt: '2024-01-15',
      verified: true
    },
    {
      id: 'test-abuja-2',
      branchId: 'abuja',
      userName: 'Amina Hassan',
      rating: 4,
      comment: 'Great location in the heart of Abuja. Perfect for business trips.',
      createdAt: '2024-01-20',
      verified: true
    }
  ],
  lagos: [
    {
      id: 'test-lagos-1',
      branchId: 'lagos',
      userName: 'Tunde Adeyemi',
      rating: 5,
      comment: 'The ocean view from my room was breathtaking! Will definitely come back to Lagos branch.',
      createdAt: '2024-01-18',
      verified: true
    },
    {
      id: 'test-lagos-2',
      branchId: 'lagos',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Best hotel experience in Lagos. The attention to detail is remarkable.',
      createdAt: '2024-01-22',
      verified: true
    }
  ]
};

// Mock Gallery per Branch
export const GALLERY_BY_BRANCH: Record<BranchId, Gallery[]> = {
  abuja: [
    {
      id: 'gal-abuja-1',
      branchId: 'abuja',
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop',
      title: 'Lobby - Abuja',
      category: 'interior',
      uploadedAt: '2024-01-01'
    },
    {
      id: 'gal-abuja-2',
      branchId: 'abuja',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format&fit=crop',
      title: 'Pool Area - Abuja',
      category: 'facilities',
      uploadedAt: '2024-01-02'
    },
    {
      id: 'gal-abuja-3',
      branchId: 'abuja',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop',
      title: 'Restaurant - Abuja',
      category: 'dining',
      uploadedAt: '2024-01-03'
    }
  ],
  lagos: [
    {
      id: 'gal-lagos-1',
      branchId: 'lagos',
      imageUrl: 'https://images.unsplash.com/photo-1551632436-cbf8dd354ca8?q=80&w=500&auto=format&fit=crop',
      title: 'Beachfront - Lagos',
      category: 'exterior',
      uploadedAt: '2024-01-01'
    },
    {
      id: 'gal-lagos-2',
      branchId: 'lagos',
      imageUrl: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=500&auto=format&fit=crop',
      title: 'Sky Lounge - Lagos',
      category: 'facilities',
      uploadedAt: '2024-01-02'
    },
    {
      id: 'gal-lagos-3',
      branchId: 'lagos',
      imageUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=500&auto=format&fit=crop',
      title: 'Spa - Lagos',
      category: 'wellness',
      uploadedAt: '2024-01-03'
    }
  ]
};

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'customer@example.com',
    name: 'John Doe',
    phone: '+234 800 000 0000',
    createdAt: '2024-01-01',
    role: 'customer'
  },
  {
    id: 'admin-abuja',
    email: 'admin.abuja@phoeniximperial.com',
    name: 'Abuja Admin',
    phone: '+234 809 123 4567',
    createdAt: '2024-01-01',
    role: 'branch_admin',
    branchId: 'abuja'
  },
  {
    id: 'admin-lagos',
    email: 'admin.lagos@phoeniximperial.com',
    name: 'Lagos Admin',
    phone: '+234 809 765 4321',
    createdAt: '2024-01-01',
    role: 'branch_admin',
    branchId: 'lagos'
  },
  {
    id: 'super-admin',
    email: 'superadmin@phoeniximperial.com',
    name: 'Super Admin',
    phone: '+234 800 999 8888',
    createdAt: '2024-01-01',
    role: 'super_admin'
  }
];

// Mock Bookings
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    branchId: 'abuja',
    userId: 'user-1',
    roomId: 'abuja-room-1',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    guests: { adults: 2, children: 0 },
    totalPrice: 135000,
    status: 'confirmed',
    createdAt: '2024-01-20'
  },
  {
    id: 'booking-2',
    branchId: 'lagos',
    userId: 'user-1',
    roomId: 'lagos-room-1',
    checkIn: '2024-04-10',
    checkOut: '2024-04-12',
    guests: { adults: 2, children: 1 },
    totalPrice: 110000,
    status: 'confirmed',
    createdAt: '2024-01-25'
  }
];
