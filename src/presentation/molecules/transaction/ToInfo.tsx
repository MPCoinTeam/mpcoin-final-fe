import { ThemedText } from '@/presentation/atoms/ThemedText';
import { getDisplayValue } from '@/utils/formatters';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface ToInfoProps {
  to: string;
  date: string;
}

export const ToInfo = memo(({ to, date }: ToInfoProps) => (
  <View style={styles.row}>
    <ThemedText style={styles.address} numberOfLines={1} ellipsizeMode="middle">
      To: {getDisplayValue(to, 'address')}
    </ThemedText>
    <ThemedText style={styles.date}>{date}</ThemedText>
  </View>
));

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  address: {
    fontSize: 14,
    color: '#888',
    flex: 1,
    marginRight: 12,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginRight: 6,
  },
});
