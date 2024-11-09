import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Settings() {
  const router = useRouter();

  const handleDismissAll = () => {
    router.dismissAll();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to first screen" onPress={handleDismissAll} />
    </View>
  );
}
