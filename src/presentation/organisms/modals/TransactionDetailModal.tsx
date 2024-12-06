import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { FooterWithButton } from '@/presentation/molecules/steps/Footer';
import { DetailHeader } from '@/presentation/molecules/transaction/DetailHeader';
import { DetailList } from '@/presentation/molecules/transaction/DetailList';
import { TransactionStatus } from '@/types/transaction';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface TransactionDetailModalProps {
  txHash: string;
  from: string;
  to: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  status: TransactionStatus;
  timestamp: string;
  network: string;
  closeModal: () => void;
}

export default function TransactionDetailModal({
  txHash,
  from,
  to,
  value,
  gasLimit,
  gasPrice,
  nonce,
  status,
  timestamp,
  network,
  closeModal,
}: TransactionDetailModalProps) {
  return (
    <Modal transparent animationType="slide" onRequestClose={closeModal}>
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <ThemedView style={styles.container}>
        <DetailHeader status={status} />

        <DetailList {...{ txHash, from, to, value, gasLimit, gasPrice, nonce, status, timestamp, network }} />

        <FooterWithButton
          title="View on Explorer"
          icon={<ThemedIcon name="compass" size={20} lightColor="#fff" darkColor="#fff" type="Ionicons" />}
          style={styles.footer}
          onPress={() => {
            console.log('View on Explorer');
          }}
        />
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: '1.5%',
    maxHeight: '80%',
  },
  footer: {
    marginTop: 10,
  },
});
