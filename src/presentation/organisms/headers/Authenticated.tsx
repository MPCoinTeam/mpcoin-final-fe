import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { ThemedLoading } from '@/presentation/atoms/Loading';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import AccountModal from '@/presentation/organisms/modals/AccountModal';
import ScannnerModal from '@/presentation/organisms/modals/ScannerModal';
import SendTokenModal from '@/presentation/organisms/modals/SendTokenModal';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AuthenticatedHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase>;
  onOpenModal: (callback: (args: { closeModal: () => void }) => React.JSX.Element) => void;
}

export default function AuthenticatedHeader({ onOpenModal, navigation }: AuthenticatedHeaderProps) {
  const { isLoading, data } = useProfile();
  if (isLoading) return <ThemedLoading />;
  if (!data) return <></>;
  return (
    <ThemedView style={styles.view}>
      <TouchableOpacity
        style={styles.profileView}
        onPress={() => onOpenModal(({ closeModal }) => <AccountModal closeModal={closeModal} profile={data} />)}
      >
        <Image source={{ uri: data.getAvatar() }} style={styles.profileIcon} />
        <ThemedText>{data.getWallet().getTruncatedAddress()}</ThemedText>
        <ThemedIcon name="qr-code" size={15} style={styles.qrProfileIcon} />
      </TouchableOpacity>
      <ThemedView style={styles.actionView}>
        <ThemedIcon
          name="send"
          size={20}
          style={styles.sendIcon}
          type="FontAwesome"
          // onPress={() => onOpenModal(({ closeModal }) => <SendTokenModal closeModal={closeModal} />)}
        />
        <ThemedIcon name="scan" size={25} style={styles.qrIcon} type="Ionicons" onPress={() => onOpenModal(() => <ScannnerModal />)} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
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
