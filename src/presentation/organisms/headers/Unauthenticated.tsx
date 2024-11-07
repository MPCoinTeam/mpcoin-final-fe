import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

interface UnauthenticatedHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
}

export default function UnauthenticatedHeader({ navigation }: UnauthenticatedHeaderProps): JSX.Element {
  return (
    <ThemedView style={styles.view}>
      <ThemedIcon name="menu" size={25} onPress={() => navigation.openDrawer()} style={styles.menuIcon} />
      <>
        <ThemedIcon name="wallet" size={20} style={styles.titleIcon} />
        <ThemedText> WalletConnect</ThemedText>
      </>
      <ThemedIcon
        name="scan"
        size={25}
        style={styles.qrIcon}
        //   onPress={() => console.log('QR scanner pressed')}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  titleIcon: {
    marginLeft: 'auto',
  },
  qrIcon: {
    marginLeft: 'auto',
  },
});
