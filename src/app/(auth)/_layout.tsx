import { Stack, Redirect } from "expo-router";
import { useProfile } from "@/domain/usecases/hooks/users/useProfile";

export default function AuthLayout() {
  const { isAuthenticated } = useProfile();

  // Redirect to app if already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
