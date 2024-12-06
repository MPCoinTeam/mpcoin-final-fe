import { Profile } from '@/domain/interfaces/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: Profile | null;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: Profile | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuthenticated: false,
  profile: null,
  login: async () => {},
  logout: async () => {},
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
    profile: null as Profile | null,
  });

  const loadToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
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
    setAuthState({ isAuthenticated: false, profile: null, isLoading: false });
  };

  const setProfile = (profile: Profile | null) => {
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
        profile: authState.profile,
        login,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
