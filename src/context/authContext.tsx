import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login?: (token: string) => Promise<void>;
  logout?: () => Promise<void>;
  profile?: any;
  setProfile?: (profile: any) => void;
}

export const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const loadToken = () => {
    AsyncStorage.getItem('access_token').then((token) => {
      if (token) return setIsAuthenticated(true);
      router.navigate('/auth/policy');
    });
  };

  const login = async (token: string) => {
    await AsyncStorage.setItem('access_token', token);
    setIsAuthenticated(true);
    router.navigate('/(tabs)/');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    loadToken();
  }, [router.navigate]);

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, profile, setProfile }}>{children}</AuthContext.Provider>;
};
