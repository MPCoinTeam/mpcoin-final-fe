import { Colors } from '@/common/constants/Colors';
import { AuthProvider } from '@/context/authContext';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { JsStack } from '@/presentation/templates/JsStack';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function RootLayout() {
  const myTheme = useTheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const queryClient = new QueryClient();
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={myTheme}>
        <AuthProvider>
          <SafeAreaView style={styles.container}>
            <JsStack screenOptions={{ headerShown: false }}></JsStack>
          </SafeAreaView>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
