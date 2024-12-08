import { AmountInfo } from './AmountInfo';
import { StatusBadge } from './StatusBadge';
import { ToInfo } from './ToInfo';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { TransactionStatus } from '@/types/transaction';
import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  type: string;
  amount: string;
  token: string;
  tokenIcon?: string;
  to: string;
  date: string;
  status: TransactionStatus;
  onPress: () => void;
}

const TransactionItem = memo(({ type, amount, token, tokenIcon, to, date, status, onPress }: TransactionItemProps) => {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <ThemedView style={styles.content}>
          <ThemedView>
            <View style={styles.row}>
              <AmountInfo type={type} amount={amount} token={token} tokenIcon={tokenIcon} />
              <StatusBadge status={status} />
            </View>
            <ToInfo to={to} date={date} />
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
});

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
