import { Redirect } from "expo-router";
import { useProfile } from "@/domain/usecases/hooks/users/useProfile";

export default function Index() {
  const { isAuthenticated } = useProfile();

  // Redirect based on auth status
  if (isAuthenticated) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
