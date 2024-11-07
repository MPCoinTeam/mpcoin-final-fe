import LoginScreen from '@/presentation/organisms/auth/Login';
import OTPVerificationScreen from '@/presentation/organisms/auth/OTPVerification';
import SignupScreen from '@/presentation/organisms/auth/SignUp';
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
