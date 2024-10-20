import '../../gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { ThemedText } from '@/presentation/atoms/ThemedText';

export default function Index() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="assignment" size={100} color="#4F8EF7" />
      <ThemedText>Tap to scan QRCode</ThemedText>
    </ThemedView>
  );
}
