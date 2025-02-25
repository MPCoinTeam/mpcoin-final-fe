import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { Pressable, StyleSheet } from 'react-native';

export function AmountHeader({ onBack, tokenSymbol }: { onBack: () => void; tokenSymbol: string }) {
  return (
    <ThemedView style={styles.header}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <ThemedIcon name="arrow-back-circle-outline" size={32} type="Ionicons" style={styles.iconColor} />
      </Pressable>
      <ThemedView style={styles.tokenBadge}>
        <ThemedIcon name="ethereum" size={20} type="MaterialCommunityIcons" style={styles.iconColor} />
        <ThemedText style={styles.tokenText} numberOfLines={1} ellipsizeMode="tail">
          {tokenSymbol}
        </ThemedText>
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
    paddingVertical: 10, // Added padding for better spacing
  },
  backButton: {
    padding: 4, // Added hit area for better tap responsiveness
  },
  iconColor: {
    color: '#6286ff',
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    paddingVertical: 6, // Slightly increased for balance
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6286ff',
    gap: 8,
    maxWidth: '60%', // Prevent badge from growing too wide
  },
  tokenText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // Explicit color for consistency
  },
});
