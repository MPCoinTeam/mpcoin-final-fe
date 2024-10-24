import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import UnauthenticatedHeader from '@/presentation/organisms/headers/Unauthenticated';
import AuthenticatedHeader from '@/presentation/organisms/headers/Authenticated';

interface HeaderLayoutProps {
    navigation: any
}

export default function HeaderTemplate({ navigation }: HeaderLayoutProps): JSX.Element {
  const { isAuthenticated, profile } = useProfile();
  if (!isAuthenticated) {
      return <UnauthenticatedHeader navigation={navigation} />
  }
  return <AuthenticatedHeader navigation={navigation} profile={profile} />;
}
