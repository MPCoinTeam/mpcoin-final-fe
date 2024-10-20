import { StyleSheet  } from 'react-native';
import { ThemedView } from '../atoms/ThemedView';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedIcon } from '../atoms/ThemedIcon';

interface HeaderLayoutProps {
    navigation: any
}

export default function HeaderLayout({ navigation }: HeaderLayoutProps): JSX.Element {
    return (
      <ThemedView style={styles.view}>
        <ThemedIcon
          name="menu"
          size={30}
          onPress={() => navigation.openDrawer()}
          style={styles.menuIcon}
        />
        <>
        <ThemedIcon
          name="wallet"
          size={20}
          style={styles.titleIcon}
        />
        <ThemedText> WalletConnect</ThemedText>
        </>
        <ThemedIcon
          name="qr-code-scanner"
          size={30}
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
        padding: 10
    },
    menuIcon: {
        marginRight: 10,
    },
    titleIcon: {
        marginLeft: 'auto'
    },
    qrIcon: {
        marginLeft: 'auto'
    }
});