import { useAuth } from '@/context/authContext';
import { Redirect } from 'expo-router';

const Protected = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Redirect href="/auth/policy" />;
};

export default Protected;
