import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { TransactionStatus, TransactionStatusColors } from '@/types/transaction';
import { getDisplayValue } from '@/utils/formatters';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  type: string;
  amount: string;
  token: string;
  to: string;
  date: string;
  status: TransactionStatus;
  onPress: () => void;
}

export default function TransactionItem({ type, amount, token, to, date, status, onPress }: TransactionItemProps) {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <ThemedText style={styles.title}>
            {type} {getDisplayValue(amount, 'amount')} {token}
          </ThemedText>
          <View style={[styles.statusBadge, getStatusColor(status)]}>
            <ThemedText style={styles.statusText}>{status}</ThemedText>
          </View>
        </View>
        <View style={styles.row}>
          <ThemedText style={styles.address} numberOfLines={1} ellipsizeMode="middle">
            To: {getDisplayValue(to, 'address')}
          </ThemedText>
          <ThemedText style={styles.date}>{date}</ThemedText>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const getStatusColor = (status: TransactionStatus) => ({
  backgroundColor: TransactionStatusColors[status],
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    width: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#888',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginRight: 6,
  },
});
