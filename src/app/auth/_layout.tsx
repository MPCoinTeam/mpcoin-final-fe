import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { JsStack } from '@/presentation/templates/JsStack';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AuthLayout() {

  const { data } = useProfile();
  
  useEffect(()=> {
    if(data?.isAuthenticated) {
      router.navigate('/app/home')
    }
  }, [data?.isAuthenticated])

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
