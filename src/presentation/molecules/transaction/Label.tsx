import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet } from 'react-native';

interface LabelProps {
  icon: string;
  label: string;
}

export function Label({ icon, label }: LabelProps) {
  return (
    <ThemedView style={styles.labelContainer}>
      <ThemedIcon name={icon} size={20} color="#666" type="Ionicons" />
      <ThemedText style={styles.label}>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
});
