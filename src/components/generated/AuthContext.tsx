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
    const storedUser = localStorage.getItem('almaris_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call your API
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('almaris_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };
  const register = async (email: string, password: string, name: string) => {
    // Mock registration - in production, this would call your API
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
    localStorage.setItem('almaris_user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('almaris_user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    logout,
    register
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