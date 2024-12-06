import { ThemedView } from '@/presentation/atoms/ThemedView';
import { StyleSheet } from 'react-native';

export function InfoCard({ children }: { children: React.ReactNode }) {
  return <ThemedView style={styles.infoCard}>{children}</ThemedView>;
}

const styles = StyleSheet.create({
  infoCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#939393',
    borderRadius: 12,
    paddingVertical: 12,
  },
});
