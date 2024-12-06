import { DetailRow } from './DetailRow';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { TransactionStatus } from '@/types/transaction';
import { ScrollView, StyleSheet } from 'react-native';

interface DetailListProps {
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
}

export function DetailList({ from, to, value, gasLimit, gasPrice, nonce, status, timestamp, network, txHash }: DetailListProps) {
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
    <ScrollView>
      {transactionDetails.map((detail, index) => (
        <ThemedView key={index} style={index % 2 === 0 ? styles.oddRow : styles.evenRow}>
          <DetailRow icon={detail.icon} label={detail.label} value={detail.value} type={detail.type as any} />
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  oddRow: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  evenRow: {
    backgroundColor: '#1A1B1E',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
});
