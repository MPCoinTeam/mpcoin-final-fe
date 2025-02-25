import { JsStack } from '@/presentation/templates/JsStack';

export default function AuthLayout() {
  return (
    <JsStack
      screenOptions={{
        headerShown: false,
        // animation: 'slide_from_right',
      }}
    ></JsStack>
  );
}
