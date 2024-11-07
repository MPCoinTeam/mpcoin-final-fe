import '../../gesture-handler';
import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { Redirect, router } from 'expo-router';

export default function Index() {
  const { isAuthenticated } = useProfile();
  if (isAuthenticated) {
    return <Redirect href="/auth/login"></Redirect>;
  } else {
    return <Redirect href="/app/home"></Redirect>;
  }
}
