import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  saveToken?: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({ token: null });

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = async (token: string) => {
    setToken(token);
    await AsyncStorage.setItem('access_token', token)
  };

  const loadToken = () => {
    AsyncStorage.getItem('access_token').then(setToken)
  }

  useEffect(()=>{
    loadToken()
  }, [])

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
