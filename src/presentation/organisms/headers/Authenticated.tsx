import ScannnerModal from '../modals/ScannerModal';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import AccountModal from '@/presentation/organisms/modals/AccountModal';
import SendTokenModal from '@/presentation/organisms/modals/SendTokenModal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AuthenticatedHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
  profile: any;
  onOpenModal: (children: JSX.Element) => void;
}

export default function AuthenticatedHeader({ profile, onOpenModal, navigation }: AuthenticatedHeaderProps): JSX.Element {
  return (
    <ThemedView style={styles.view}>
      <TouchableOpacity style={styles.profileView} onPress={() => onOpenModal(<AccountModal profile={profile} />)}>
        <Image source={{ uri: profile.avatar }} style={styles.profileIcon} />
        <ThemedText>{profile.getUsername()}</ThemedText>
        <ThemedIcon name="qr-code" size={15} style={styles.qrProfileIcon} />
      </TouchableOpacity>
      <ThemedView style={styles.actionView}>
        <ThemedIcon
          name="send"
          size={20}
          style={styles.sendIcon}
          type="FontAwesome"
          onPress={() => onOpenModal(<SendTokenModal profile={profile} />)}
        />
        <ThemedIcon name="scan" size={25} style={styles.qrIcon} type="Ionicons" onPress={() => onOpenModal(<ScannnerModal />)} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  profileIcon: {
    marginRight: 10,
    borderRadius: 50,
    height: 30,
    width: 30,
  },
  qrProfileIcon: {
    marginLeft: 5,
  },
  sendIcon: {
    marginRight: 17,
  },
  qrIcon: {
    marginLeft: 'auto',
  },
});
