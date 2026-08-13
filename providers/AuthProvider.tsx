import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// swap this for Firebase, Supabase, your Django JWT flow, etc.

type User = {
  id: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (token: string, userData: NonNullable<User>) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Example:
        // const token = await AsyncStorage.getItem('token');
        // const userJson = await AsyncStorage.getItem('user');
        // if (token && userJson) setUser(JSON.parse(userJson));
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const signIn = async (token: string, userData: NonNullable<User>) => {
    // await AsyncStorage.setItem('token', token);
    // await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

