import { Label } from './Label';
import { Value } from './Value';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

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

  return (
    <ThemedView style={styles.row}>
      <Label icon={icon} label={label} />
      <Value value={value} type={type} onPress={handlePress} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
