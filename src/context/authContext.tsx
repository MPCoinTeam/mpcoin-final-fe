import { UserProfile } from '@/domain/interfaces/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  profile: null,
  setProfile: () => {},
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    profile: null as UserProfile | null,
    wallet: null as Wallet | null,
  });

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setAuthState((prev) => ({ ...prev, isAuthenticated: true }));
      } 
    } catch (error) {
      console.error('Failed to load token:', error);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem('access_token', accessToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);
    setAuthState((prev) => ({ ...prev, isAuthenticated: true }));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    setAuthState({ isAuthenticated: false, profile: null, wallet: null, isLoading: false });
  };

  const setProfile = (profile: UserProfile | null) => {
    setAuthState((prev) => ({ ...prev, profile }));
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading: authState.isLoading,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        profile: authState.profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
