import { Stack } from '@/presentation/templates/JsStack';
import LoginScreen from '@/presentation/organisms/auth/Login';
import SignupScreen from '@/presentation/organisms/auth/SignUp';
import OTPVerificationScreen from '@/presentation/organisms/auth/OTPVerification';

export default function AuthLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" component={LoginScreen} />
      <Stack.Screen name="sign-up" component={SignupScreen} />
      <Stack.Screen name="otp" component={OTPVerificationScreen} />
    </Stack.Navigator>
  );
}
