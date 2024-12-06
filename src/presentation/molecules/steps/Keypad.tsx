import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { Pressable, StyleSheet } from 'react-native';

export function Keypad({ handleNumberPress, handleDelete }: { handleNumberPress: (num: string) => void; handleDelete: () => void }) {
  return (
    <ThemedView style={styles.keypad}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
        <Pressable key={num} style={({ pressed }) => [styles.key, pressed && styles.keyPressed]} onPress={() => handleNumberPress(num.toString())}>
          <ThemedText style={styles.keyText}>{num}</ThemedText>
        </Pressable>
      ))}

      <Pressable style={({ pressed }) => [styles.key, pressed && styles.keyPressed]} onPress={handleDelete}>
        {({ pressed }) => <ThemedIcon name="backspace-outline" size={24} color={pressed ? '#6286ff' : '#fff'} type="Ionicons" />}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  key: {
    width: '33%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPressed: {
    backgroundColor: '#2A2A2A',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
});
