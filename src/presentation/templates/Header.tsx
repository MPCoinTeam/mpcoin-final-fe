import AuthenticatedHeader from '@/presentation/organisms/headers/Authenticated';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

interface AppHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
  onOpenModal: (callback: (args: { closeModal: () => void }) => React.JSX.Element) => void;
}

export default function AppHeader({ navigation, onOpenModal }: AppHeaderProps): React.JSX.Element {
  //
  //
  //
  //
  return <AuthenticatedHeader onOpenModal={onOpenModal} navigation={navigation} />;
}
