import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { Pressable, StyleSheet } from 'react-native';

export function ConfirmHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <ThemedView style={styles.header}>
      <Pressable onPress={onBack}>
        <ThemedIcon name="arrow-back-circle-outline" size={32} style={styles.icon} type="Ionicons" />
      </Pressable>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#939393',
  },
  icon: {
    color: '#6286ff',
  },
});
