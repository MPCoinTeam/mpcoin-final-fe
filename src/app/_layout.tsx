import { Colors } from '@/common/constants/Colors';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { JsStack } from '@/presentation/templates/JsStack';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function RootLayout() {
  const myTheme = useTheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={myTheme}>
      <SafeAreaView style={styles.container}>
        <JsStack screenOptions={{ headerShown: false }}></JsStack>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
