import ScannerModal from '../modals/ScannerModal';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import ThemedInput from '@/presentation/atoms/ThemedInput';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { FooterWithButton } from '@/presentation/molecules/steps/Footer';
import * as Clipboard from 'expo-clipboard';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { isAddress } from 'viem';

interface AddressStepProps {
  address: string;
  setAddress: (address: string) => void;
  setCurrentStep: (step: number) => void;
}

const isValidAddress = (address: string): boolean => {
  return isAddress(address);
};

export default function AddressStep({ address, setAddress, setCurrentStep }: AddressStepProps) {
  const addressRef = useRef<TextInput>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setAddress(text);
  };

  const handleOpenScanner = () => {
    setIsScannerVisible(true);
  };

  const handleCloseScanner = (scannedData?: string) => {
    setIsScannerVisible(false);
    if (scannedData && isValidAddress(scannedData)) {
      setAddress(scannedData); // Set the scanned address in the input field
    } else if (scannedData) {
      console.log('Scanned data is not a valid address:', scannedData);
      // Optionally handle invalid data (e.g., show an error message)
    }
  };

  const handleOpenModal = (callback: (args: { closeModal: () => void }) => React.JSX.Element) => {
    console.log('Opening SendTokenModal from scanner');
    // Here you could render SendTokenModal in a different way if needed
    // For now, just close the scanner (data is already passed via handleClose)
  };

  return (
    <>
      <ThemedView style={styles.viewInput}>
        <ThemedText style={styles.inputText}>To: </ThemedText>
        <ThemedInput
          ref={addressRef}
          placeholder="0x, .eth, .x, .nft, .did"
          placeholderTextColor="#4b4b4d"
          value={address}
          onChangeText={setAddress}
          returnKeyType="next"
          style={styles.input}
          numberOfLines={1}
        />
        <ThemedIcon name="scan" size={20} style={styles.qrIcon} type="Ionicons" onPress={handleOpenScanner} />
        <ThemedIcon name="content-paste" size={20} style={styles.qrIcon} type="MaterialCommunityIcons" onPress={handlePaste} />
      </ThemedView>
      <FooterWithButton title="Next" onPress={() => setCurrentStep(1)} disabled={!isValidAddress(address)} />
      <ScannerModal isVisible={isScannerVisible} onClose={handleCloseScanner} onOpenModal={handleOpenModal} />
    </>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: 'solid',
    borderColor: '#6286ff',
    borderWidth: 1,
    borderRadius: 8,
    gap: 10,
  },
  inputText: {
    color: '#939393',
    fontSize: 16,
  },
  input: {
    width: '75%',
    color: '#fff',
    fontSize: 16,
  },
  qrIcon: {
    marginLeft: 'auto',
    color: '#6286ff',
  },
});
