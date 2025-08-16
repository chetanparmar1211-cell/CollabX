import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as AppUser } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<AppUser> & { password: string }) => Promise<void>;
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

async function fetchProfileUser(): Promise<AppUser | null> {
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
  const role = (profile?.role as AppUser['role']) || 'creator';
  return {
    id: authUser.id,
    email: authUser.email || '',
    name: profile?.name || authUser.email || 'User',
    role,
    avatar: profile?.avatar || undefined,
    isVerified: true,
    createdAt: authUser.created_at || new Date().toISOString(),
    companyName: role === 'brand' ? (profile?.company_name || '') : undefined,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const current = await fetchProfileUser();
      setUser(current);
      setIsLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      const current = await fetchProfileUser();
      setUser(current);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const current = await fetchProfileUser();
      setUser(current);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Partial<AppUser> & { password: string }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email: userData.email!, password: userData.password });
      if (error || !data.user) throw error || new Error('Signup failed');
      // Create profile row
      await supabase.from('profiles').insert({
        id: data.user.id,
        name: userData.name || data.user.email,
        role: userData.role || 'creator',
        company_name: userData.companyName || null,
        avatar: null,
      });
      const current = await fetchProfileUser();
      setUser(current);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};