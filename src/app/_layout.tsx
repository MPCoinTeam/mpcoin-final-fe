import { Colors } from '@/common/constants/Colors';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { JsStack, Stack } from '@/presentation/templates/JsStack';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
interface IndexScreenProps {
  isAuthenticated?: boolean;
}

const IndexScreen = ({ isAuthenticated }: IndexScreenProps) => {
  if (!isAuthenticated) return <JsStack.Screen name="(auth)"/>;
  return <JsStack.Screen name="(app)" />;
};

export default function RootLayout() {
  const { isAuthenticated } = useProfile();
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
        <JsStack screenOptions={{ headerShown: false }}>
          {/* <IndexScreen isAuthenticated={isAuthenticated} /> */}
          <JsStack.Screen name="(auth)"/>
        </JsStack>
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
