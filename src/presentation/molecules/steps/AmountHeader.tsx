import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { Pressable, StyleSheet } from 'react-native';

export function AmountHeader({ onBack, tokenSymbol }: { onBack: () => void; tokenSymbol: string }) {
  return (
    <ThemedView style={styles.header}>
      <Pressable onPress={onBack}>
        <ThemedIcon name="arrow-back-circle-outline" size={32} type="Ionicons" style={styles.color} />
      </Pressable>
      <ThemedView style={styles.tokenBadge}>
        <ThemedIcon name="ethereum" size={20} style={styles.color} type="MaterialCommunityIcons" />
        <ThemedText style={styles.tokenText}>{tokenSymbol}</ThemedText>
      </ThemedView>
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
  color: {
    color: '#6286ff',
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6286ff',
    gap: 8,
  },
  tokenText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
