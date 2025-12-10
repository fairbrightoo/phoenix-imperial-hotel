import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Role, Permission } from './types';
import { MOCK_USERS } from './mockData';
import api from '../../services/api';

const AVAILABLE_PERMISSIONS: Permission[] = [
  { id: 'manage_rooms', name: 'Manage Rooms', description: 'Create, edit, and delete rooms', category: 'Operations' },
  { id: 'view_bookings', name: 'View Bookings', description: 'View all bookings', category: 'Operations' },
  { id: 'manage_bookings', name: 'Manage Bookings', description: 'Edit and cancel bookings', category: 'Operations' },
  { id: 'manage_testimonials', name: 'Manage Testimonials', description: 'Approve and delete testimonials', category: 'Content' },
  { id: 'manage_gallery', name: 'Manage Gallery', description: 'Upload and delete images', category: 'Content' },
  { id: 'branch_settings', name: 'Branch Settings', description: 'Update branch details', category: 'Settings' },
  { id: 'global_settings', name: 'Global Settings', description: 'Manage system-wide settings', category: 'Settings' },
  { id: 'user_management', name: 'User Management', description: 'Manage admins and users', category: 'Settings' },
  { id: 'roles_permissions', name: 'Roles & Permissions', description: 'Manage roles and permissions', category: 'Settings' },
];

const DEFAULT_ROLES: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full system control',
    permissions: AVAILABLE_PERMISSIONS.map(p => p.id),
    isSystem: true
  },
  {
    id: 'branch_admin',
    name: 'Branch Admin',
    description: 'Branch-specific management',
    permissions: ['manage_rooms', 'view_bookings', 'manage_bookings', 'manage_testimonials', 'manage_gallery', 'branch_settings'],
    isSystem: true
  }
];
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
      const storedUser = localStorage.getItem('phoenix_imperial_user');
      if (storedUser && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (e) {
          console.warn('Corrupt user data found in AuthContext', e);
          localStorage.removeItem('phoenix_imperial_user');
        }
      } else if (storedUser === 'undefined') {
        localStorage.removeItem('phoenix_imperial_user');
      }
    }, []);

    // ... imports

    const login = async (email: string, password: string) => {
      try {
        const response = await api.post('/auth/login', { email, password });
        const { user, token } = response.data;

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('phoenix_imperial_user', JSON.stringify(user));
        localStorage.setItem('phoenix_imperial_token', token);
        localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
        return user;
      } catch (error: any) {
        console.error('Login failed:', error);
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    };

    const register = async (email: string, password: string, name: string) => {
      try {
        const response = await api.post('/auth/register', { email, password, name });
        const { user, token } = response.data;

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('phoenix_imperial_user', JSON.stringify(user));
        localStorage.setItem('phoenix_imperial_token', token);
        localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
        return user;
      } catch (error: any) {
        console.error('Registration failed:', error);
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
    };
    const loginWithGoogle = async (credential: string) => {
      try {
        const response = await api.post('/auth/google', { token: credential });
        const { user, token } = response.data;

        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('phoenix_imperial_user', JSON.stringify(user));
        localStorage.setItem('phoenix_imperial_token', token);
        localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
        return user;
      } catch (error: any) {
        console.error('Google login failed:', error);
        throw new Error(error.response?.data?.message || 'Google login failed');
      }
    };

    const forgotPassword = async (email: string) => {
      try {
        await api.post('/auth/forgot-password', { email });
      } catch (error: any) {
        console.error('Forgot password failed:', error);
        throw new Error(error.response?.data?.message || 'Forgot password failed');
      }
    };

    const resetPassword = async (token: string, email: string, password: string) => {
      try {
        await api.post('/auth/reset-password', { token, email, password });
      } catch (error: any) {
        console.error('Reset password failed:', error);
        throw new Error(error.response?.data?.message || 'Reset password failed');
      }
    };

    const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('phoenix_imperial_user');
      localStorage.removeItem('phoenix_imperial_login_time');
      // Clear any branch-specific session data
      localStorage.removeItem('phoenix_imperial_selected_branch');
      localStorage.removeItem('phoenix_imperial_selected_branch');
    };

    const addUser = (newUser: User) => {
      setUsers(prev => [...prev, newUser]);
    };

    const updateUser = (userId: string, data: Partial<User>) => {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
      // If updating current user, update session as well
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('phoenix_imperial_user', JSON.stringify(updatedUser));
      }
    };

    const deleteUser = (userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    };

    const addRole = (role: Role) => {
      setRoles(prev => [...prev, role]);
    };

    const updateRole = (roleId: string, data: Partial<Role>) => {
      setRoles(prev => prev.map(r => r.id === roleId ? { ...r, ...data } : r));
    };

    const deleteRole = (roleId: string) => {
      setRoles(prev => prev.filter(r => r.id !== roleId));
    };

    return <AuthContext.Provider value={{
      user,
      users,
      roles,
      permissions: AVAILABLE_PERMISSIONS,
      isAuthenticated,
      login,
      logout,
      register,
      loginWithGoogle,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole,
      deleteRole,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>;
  };
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};