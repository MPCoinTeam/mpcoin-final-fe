import { AuthContext } from '@/context/authContext';
import { Redirect } from 'expo-router';
import React, { useContext } from 'react';

const Protected = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Redirect href="/auth/login" />;
};

export default Protected;