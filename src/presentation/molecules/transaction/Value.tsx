import { ThemedText } from '@/presentation/atoms/ThemedText';
import { getDisplayValue, getValueStyle } from '@/utils/formatters';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ValueProps {
  value: string;
  type: 'hash' | 'address' | 'normal' | 'amount' | 'status' | 'network';
  onPress?: () => void;
}

export function Value({ value, type, onPress }: ValueProps) {
  const displayValue = getDisplayValue(value, type);
  const valueStyle = getValueStyle(type, styles);

  if (type === 'hash' || type === 'address') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.valueContainer}>
        <ThemedText style={styles.value} numberOfLines={1}>
          {displayValue}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <ThemedText style={valueStyle} numberOfLines={1}>
      {displayValue}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  valueContainer: {
    flex: 1,
    marginLeft: 12,
  },
  value: {
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    textAlign: 'right',
  },
  networkValue: {
    color: '#4F6EF7',
  },
  statusValue: {
    color: '#4CAF50',
  },
});
