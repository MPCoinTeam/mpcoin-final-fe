import { apis } from '@/domain/https/apis/internal';
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
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfileState] = useState<Profile | null>(null);

  const loadToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        console.log('Authenticated');
        setIsAuthenticated(true);

        // Fetch profile from API after loading tokens
        await apis
          .getProfile()
          .then(setProfileState)
          .catch(() => {
            console.log('Profile not found');
            logout();
          });
      } else {
        console.log('Not authenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to load token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      await AsyncStorage.setItem('access_token', accessToken);
      await AsyncStorage.setItem('refresh_token', refreshToken);
      setIsAuthenticated(true);
      console.log('Login success');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      setIsAuthenticated(false);
      setProfileState(null);
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const setProfile = (profile: Profile | null) => {
    setProfileState(profile);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        profile,
        login,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
