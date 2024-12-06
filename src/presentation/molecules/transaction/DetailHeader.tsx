import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { TransactionStatus } from '@/types/transaction';
import { StyleSheet } from 'react-native';

export function DetailHeader({ status }: { status: TransactionStatus }) {
  return (
    <ThemedView style={styles.header}>
      <ThemedIcon name="receipt-outline" size={40} color="#4F6EF7" type="Ionicons" />
      <ThemedView>
        <ThemedText style={styles.title}>{status + ' Transaction'}</ThemedText>
        <ThemedText style={styles.subtitle}>Transaction Review</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
});
