import { Image, StyleSheet  } from 'react-native';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';

interface AuthenticatedHeaderProps {
    navigation: any;
    profile: any;
}

export default function AuthenticatedHeader({ profile }: AuthenticatedHeaderProps): JSX.Element {
    return (
      <ThemedView style={styles.view}>
        <ThemedView style={styles.profileView}>
        <Image
          source={{uri: profile.avatar}}
          style={styles.profileIcon}
        />
        <ThemedText>{profile.getUsername()}</ThemedText>
        <ThemedIcon
          name="qr-code"
          size={15}
          style={styles.qrProfileIcon}
        />
        </ThemedView>
        <ThemedView style={styles.actionView}>
        <ThemedIcon
          name="send"
          size={20}
          style={styles.sendIcon}
          type='FontAwesome'
        />
        <ThemedIcon
          name="scan"
          size={25}
          style={styles.qrIcon}
          type='Ionicons'
        //   onPress={() => console.log('QR scanner pressed')}
        />
        </ThemedView>
      </ThemedView>
    );
  }

const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20
    },
    profileView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 'auto'
    },
    profileIcon: {
        marginRight: 10,
        borderRadius: 50,
        height: 30,
        width: 30
    },
    qrProfileIcon: {
      marginLeft: 5
    },
    sendIcon: {
        marginRight: 17,
    },
    qrIcon: {
        marginLeft: 'auto'
    }
});