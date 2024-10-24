import '../../gesture-handler';
import { ThemedView } from '@/presentation/atoms/ThemedView';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { ThemedIcon } from '@/presentation/atoms/ThemedIcon';
import TokenList from '@/presentation/templates/TokenList';
import TabView from '@/presentation/templates/TabView';

export default function Index() {
  const { isAuthenticated, profile } = useProfile();
  if (!isAuthenticated) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedIcon name="assignment" size={100} color="#4F8EF7" />
        <ThemedText>Tap to scan QRCode</ThemedText>
      </ThemedView>
    );
  }
  return (
    <TabView />
  );
}
