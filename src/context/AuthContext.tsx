
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession, User } from '@supabase/supabase-js';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'github' | 'email' | null;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Transform Supabase user to our app's user format
  const transformSupabaseUser = (supabaseUser: User): AuthUser => {
    // Determine provider from identities
    let provider: 'google' | 'facebook' | 'github' | 'email' | null = null;
    if (supabaseUser.app_metadata?.provider) {
      const authProvider = supabaseUser.app_metadata.provider;
      if (authProvider === 'google' || authProvider === 'facebook' || authProvider === 'github') {
        provider = authProvider;
      } else {
        provider = 'email';
      }
    }

    // Extract name and avatar
    const name = supabaseUser.user_metadata?.full_name || 
                supabaseUser.user_metadata?.name || 
                `User-${supabaseUser.id.substring(0, 6)}`;
    
    const avatar = supabaseUser.user_metadata?.avatar_url || undefined;
    
    return {
      id: supabaseUser.id,
      name,
      email: supabaseUser.email || '',
      avatar,
      provider,
    };
  };

  // Initialize auth state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(transformSupabaseUser(session.user));
      }
      
      setIsLoading(false);
      
      // Listen for auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session?.user) {
            setUser(transformSupabaseUser(session.user));
          } else {
            setUser(null);
          }
          setIsLoading(false);
        }
      );
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
