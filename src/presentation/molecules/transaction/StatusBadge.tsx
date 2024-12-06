import { ThemedText } from '@/presentation/atoms/ThemedText';
import { TransactionStatus, TransactionStatusColors } from '@/types/transaction';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface StatusBadgeProps {
  status: TransactionStatus;
}

export const StatusBadge = memo(({ status }: StatusBadgeProps) => (
  <View style={[styles.badge, { backgroundColor: TransactionStatusColors[status] }]}>
    <ThemedText style={styles.text}>{status}</ThemedText>
  </View>
));

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
