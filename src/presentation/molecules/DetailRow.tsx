import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { getDisplayValue, getValueStyle } from '@/utils/formatters';
import { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
  type?: 'hash' | 'address' | 'normal' | 'amount' | 'status' | 'network';
}

export function DetailRow({ icon, label, value, type = 'normal' }: DetailRowProps) {
  const handlePress = useCallback(() => {
    if (type === 'hash') {
      console.log('Full hash:', value);
    } else if (type === 'address') {
      console.log('Address clicked:', value);
    }
  }, [type, value]);

  const displayValue = useMemo(() => getDisplayValue(value, type), [value, type]);
  const valueStyle = useMemo(() => getValueStyle(type, styles), [type]);

  return (
    <ThemedView style={styles.row}>
      <ThemedView style={styles.labelContainer}>
        <ThemedIcon name={icon} size={20} color="#666" type="Ionicons" />
        <ThemedText style={styles.label}>{label}</ThemedText>
      </ThemedView>

      {type === 'hash' || type === 'address' ? (
        <TouchableOpacity onPress={handlePress} style={styles.valueContainer}>
          <ThemedText style={styles.value} numberOfLines={1}>
            {displayValue}
          </ThemedText>
        </TouchableOpacity>
      ) : (
        <ThemedText style={valueStyle} numberOfLines={1}>
          {displayValue}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
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
