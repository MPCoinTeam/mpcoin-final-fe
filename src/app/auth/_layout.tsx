import { JsStack } from '@/presentation/templates/JsStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AuthLayout() {
  return (
    <GestureHandlerRootView>
      <JsStack
        screenOptions={{
          headerShown: false,
          // animation: 'slide_from_right',
        }}
      ></JsStack>
    </GestureHandlerRootView>
  );
}
