
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { username?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  session: null,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set up auth state listener
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Use setTimeout to prevent potential deadlocks
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            toast.success('Welcome back!');
          }, 0);
        }
        
        if (event === 'SIGNED_OUT') {
          setTimeout(() => {
            toast.info('You have been signed out');
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Error signing in:', error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (email: string, password: string, username?: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: username,
          }
        }
      });
      
      if (error) {
        console.error('Error signing up:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  // Update user profile
  const updateProfile = async (data: { username?: string; avatar_url?: string }): Promise<void> => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error updating user profile:', error);
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    session,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
