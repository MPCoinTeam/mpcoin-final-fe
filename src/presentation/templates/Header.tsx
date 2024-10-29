import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import UnauthenticatedHeader from '@/presentation/organisms/headers/Unauthenticated';
import AuthenticatedHeader from '@/presentation/organisms/headers/Authenticated';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

interface AppHeaderProps {
    navigation: DrawerNavigationProp<ParamListBase>
    onOpenModal: (children: JSX.Element) => void
}

export default function AppHeader({ navigation, onOpenModal }: AppHeaderProps): JSX.Element {
  const { isAuthenticated, profile } = useProfile();
  if (!isAuthenticated) {
    return <></>;
  }
  return <AuthenticatedHeader onOpenModal={onOpenModal} navigation={navigation} profile={profile} />;
}
