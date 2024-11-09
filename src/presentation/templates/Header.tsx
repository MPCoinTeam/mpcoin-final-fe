import AuthenticatedHeader from '@/presentation/organisms/headers/Authenticated';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

interface AppHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
  onOpenModal: (children: JSX.Element) => void;
}

export default function AppHeader({ navigation, onOpenModal }: AppHeaderProps): JSX.Element {
  //
  //
  //
  //
  return <AuthenticatedHeader onOpenModal={onOpenModal} navigation={navigation} />;
}
