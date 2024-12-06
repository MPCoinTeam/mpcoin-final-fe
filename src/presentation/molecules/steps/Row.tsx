import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet } from 'react-native';

export const Row = ({
  label,
  value,
  children,
  isLast,
  isFirst,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}) => (
  <ThemedView style={[styles.row, isFirst && styles.firstRow, isLast && styles.lastRow]}>
    <ThemedText style={styles.label}>{label}</ThemedText>
    {value ? <ThemedText style={styles.value}>{value}</ThemedText> : children}
  </ThemedView>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#939393',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  firstRow: {
    paddingTop: 0,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    color: '#939393',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});
