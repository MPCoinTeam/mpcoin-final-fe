import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Alert } from 'react-native';

export default function LogoutScreen() {
  const { logout } = useAuth();

  const handlerLogout = async () => {
    await logout?.();
  };

  useEffect(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => router.back(),
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: handlerLogout,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => router.back(),
      },
    );
  }, [handlerLogout]);

  return <View />;
}
