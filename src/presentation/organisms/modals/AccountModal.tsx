import { useAuth } from '@/context/authContext';
import { useThemeColor } from '@/domain/usecases/hooks/themes/useThemeColor';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';

interface AccountProps {
  profile: any;
  closeModal: () => void;
}

export default function AccountModal({ profile, closeModal }: AccountProps) {
  const color = useThemeColor({}, 'icon');
  const [showFulladdress, setShowFulladdress] = useState(false);
  const { logout } = useAuth();
  const handlerLogout = async () => {
    logout && (await logout());
    await closeModal();
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(profile.address);
  };
  return (
    <Pressable style={styles.modalContainer}>
      <ThemedView style={styles.nameView}>
        <Image source={{ uri: profile.avatar }} style={styles.profileIcon} />
        <ThemedText style={{ ...styles.accountText, color }}>{profile.getFullname()}</ThemedText>
        <ThemedIcon name="logout" type="AntDesign" size={20} style={styles.accountLogoutButton} onPress={handlerLogout} />
      </ThemedView>
      <ThemedText numberOfLines={4} style={{ ...styles.addressText, color }}>
        {showFulladdress ? profile.address : profile.getUsername()}
        <ThemedIcon size={14} name="copy" type="Feather" style={{ paddingLeft: 10 }} onPress={copyToClipboard} />
      </ThemedText>
      <ThemedView style={styles.qrCodeContainer}>
        <SvgQRCode
          value={profile.address}
          size={150}
          color="#6186FE"
          backgroundColor="transparent"
          logoSize={40}
          logo={require('@assets/images/logo-coin.png')}
          logoBorderRadius={50}
        />
      </ThemedView>
      <ThemedView style={{ ...styles.networkView }}>
        <ThemedText style={{ ...styles.networkText, color }}>{profile.network}</ThemedText>
        <ThemedIcon size={20} name="external-link" type="EvilIcons" style={{ bottom: -2 }} />
        <ThemedText style={{ ...styles.networkText, color, bottom: 1 }}>|</ThemedText>
        <ThemedText style={{ ...styles.networkText, color, left: 3 }} onPress={() => setShowFulladdress(true)}>
          Show full address
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    marginRight: 10,
    borderRadius: 50,
    height: 30,
    width: 30,
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '93%',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '!importal',
    marginBottom: 10,
    paddingTop: 20,
  },
  accountText: {
    fontWeight: 'bold',
  },
  accountLogoutButton: {
    marginStart: 10,
  },
  addressText: {
    color: 'white',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1B1B1F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    maxWidth: '80%',
  },
  qrCodeContainer: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 40,
  },
  networkView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '!importal',
    marginTop: 20,
    paddingBottom: 20,
    gap: 5,
  },
  networkText: {
    fontSize: 14,
  },
});
