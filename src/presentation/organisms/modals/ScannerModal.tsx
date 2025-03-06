import SendTokenModal from './SendTokenModal';
import ScannerOverlay from '@/presentation/molecules/Overlay';
import { Camera, CameraView } from 'expo-camera';
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { isAddress } from 'viem';

interface ScannerModalProps {
  isVisible: boolean; // Controls visibility
  onClose: (scannedData?: string) => void; // Updated to accept optional scanned data
  onOpenModal: (callback: (args: { closeModal: () => void }) => React.JSX.Element) => void;
}

export default function ScannerModal({ isVisible, onClose, onOpenModal }: ScannerModalProps) {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isVisible) return null; // Don’t render if not visible

  const handleClose = (scannedData?: string) => {
    qrLock.current = false; // Reset lock when closing
    onClose(scannedData); // Pass scanned data (if any) to parent
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              console.log(data);
              if (isAddress(data)) {
                console.log('is valid address');
                handleClose(data);
              }
            }, 500);
          }
        }}
      />
      <ScannerOverlay />
    </SafeAreaView>
  );
}
