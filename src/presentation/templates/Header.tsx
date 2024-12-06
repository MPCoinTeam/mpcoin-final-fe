import { ThemedIcon } from '../atoms/ThemedIcon';
import { ThemedView } from '../atoms/ThemedView';
import AuthenticatedHeader from '@/presentation/organisms/headers/Authenticated';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface AppHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
  onOpenModal: (callback: (args: { closeModal: () => void }) => React.JSX.Element) => void;
}

export default function AppHeader({ navigation, onOpenModal }: AppHeaderProps): React.JSX.Element {
  return (
    <ThemedView style={styles.view}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ThemedIcon name="menu" size={32} style={styles.menuIcon} onPress={() => navigation.openDrawer()} />
      </TouchableOpacity>
      <ThemedView style={styles.headerContainer}>
        <AuthenticatedHeader onOpenModal={onOpenModal} navigation={navigation} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headerContainer: {
    flex: 1,
  },
  menuIcon: {
    zIndex: 1,
    marginLeft: -16,
    paddingTop: 20,
  },
});
