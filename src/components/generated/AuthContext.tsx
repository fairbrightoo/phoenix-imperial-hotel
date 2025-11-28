import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from './types';
import { MOCK_USERS } from './mockData';
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('phoenix_imperial_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Validate empty fields
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    // Trim whitespace
    email = email.trim();
    password = password.trim();

    // Mock authentication - in production, this would call your API
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('User not found. Please check your email.');
    }

    // Check password - for demo purposes, all test accounts use 'password'
    if (password !== 'password') {
      throw new Error('Incorrect password. Please try again.');
    }
    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('phoenix_imperial_user', JSON.stringify(foundUser));

    // Store login timestamp for session management
    localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
  };
  const register = async (email: string, password: string, name: string) => {
    // Validate empty fields
    if (!email || !password || !name) {
      throw new Error('Please fill in all fields.');
    }

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    // Mock registration - in production, this would call your API
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      phone: '',
      createdAt: new Date().toISOString(),
      role: 'customer'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('phoenix_imperial_user', JSON.stringify(newUser));
    localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
  };
  const loginWithGoogle = async () => {
    // Mock Google OAuth - in production, this would use Firebase Auth or similar
    await new Promise(resolve => setTimeout(resolve, 1000));
    const googleUser: User = {
      id: `google-user-${Date.now()}`,
      email: 'google.user@example.com',
      name: 'Google User',
      phone: '',
      createdAt: new Date().toISOString(),
      role: 'customer'
    };
    setUser(googleUser);
    setIsAuthenticated(true);
    localStorage.setItem('phoenix_imperial_user', JSON.stringify(googleUser));
    localStorage.setItem('phoenix_imperial_login_time', Date.now().toString());
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('phoenix_imperial_user');
    localStorage.removeItem('phoenix_imperial_login_time');
    // Clear any branch-specific session data
    localStorage.removeItem('phoenix_imperial_selected_branch');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    logout,
    register,
    loginWithGoogle
  }} data-magicpath-id="0" data-magicpath-path="AuthContext.tsx">
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