import Button from '@/presentation/atoms/Button';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { DetailRow } from '@/presentation/molecules/DetailRow';
import { Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface TransactionDetailModalProps {
  txHash: string;
  from: string;
  to: string;
  value: string;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  status: 'Confirmed' | 'Pending' | 'Failed';
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
  const transactionDetails = [
    { icon: 'globe', label: 'Network', value: network, type: 'network' },
    { icon: 'receipt-outline', label: 'Tx Hash', value: txHash, type: 'hash' },
    { icon: 'arrow-up-circle', label: 'From', value: from, type: 'address' },
    { icon: 'arrow-down-circle', label: 'To', value: to, type: 'address' },
    { icon: 'diamond', label: 'Value', value, type: 'amount' },
    { icon: 'fast-food-outline', label: 'Gas Limit', value: gasLimit, type: 'normal' },
    { icon: 'pricetag', label: 'Gas Price', value: gasPrice, type: 'normal' },
    { icon: 'calculator', label: 'Nonce', value: nonce, type: 'normal' },
    { icon: 'checkmark-circle', label: 'Status', value: status, type: 'status' },
    { icon: 'time', label: 'Timestamp', value: timestamp, type: 'normal' },
  ];

  return (
    <Modal transparent animationType="slide" onRequestClose={closeModal}>
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet Modal Content */}
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedIcon name="receipt-outline" size={40} color="#4F6EF7" type="Ionicons" />
          <ThemedView>
            <ThemedText style={styles.title}>{status === 'Confirmed' ? 'Confirmed Transaction' : 'Transaction Details'}</ThemedText>
            <ThemedText style={styles.subtitle}>Transaction Review</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Transaction Details */}
        <ScrollView>
          <ThemedView style={styles.content}>
            {transactionDetails.map((detail, index) => (
              <DetailRow key={index} icon={detail.icon} label={detail.label} value={detail.value} type={detail.type as any} />
            ))}
          </ThemedView>
        </ScrollView>

        {/* Footer Button */}
        <Button
          title="View on Explorer"
          onPress={() => {
            console.log('View on Explorer');
          }}
          style={styles.explorerButton}
        />
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginHorizontal: '1.5%',
    maxHeight: '80%', // Limit height for better usability
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F6EF7',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    gap: 8,
  },
  explorerButton: {
    backgroundColor: '#4F6EF7',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 24,
  },
});
