import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and user data
    const storedUser = localStorage.getItem('collabx_user');
    const token = localStorage.getItem('collabx_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, this would be an API call
      const mockUser: User = {
        id: email,
        email,
        name: email.includes('brand') ? 'Brand User' : email.includes('admin') ? 'Admin User' : 'Creator User',
        role: email.includes('brand') ? 'brand' : email.includes('admin') ? 'admin' : 'creator',
        isVerified: true,
        createdAt: new Date().toISOString(),
        companyName: email.includes('brand') ? 'Sample Brand Co.' : undefined,
        creatorProfile: email.includes('creator') ? 'https://instagram.com/creator' : undefined,
        rating: email.includes('creator') ? 4.8 : undefined,
        completedCollaborations: email.includes('creator') ? 45 : undefined,
      };

      localStorage.setItem('collabx_user', JSON.stringify(mockUser));
      localStorage.setItem('collabx_token', 'mock-jwt-token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Mock signup - in real app, this would be an API call
      const mockUser: User = {
        id: userData.email!,
        email: userData.email!,
        name: userData.name!,
        role: userData.role!,
        isVerified: false,
        createdAt: new Date().toISOString(),
        companyName: userData.companyName,
        creatorProfile: userData.creatorProfile,
      };

      localStorage.setItem('collabx_user', JSON.stringify(mockUser));
      localStorage.setItem('collabx_token', 'mock-jwt-token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('collabx_user');
    localStorage.removeItem('collabx_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};