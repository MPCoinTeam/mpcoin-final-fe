import { Colors } from '@/common/constants/Colors';
import { toastConfig } from '@/common/toastConfig';
import { AssetsProvider } from '@/context/assetsContext';
import { AuthProvider } from '@/context/authContext';
import { ViemProvider } from '@/context/viemContext';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { JsStack } from '@/presentation/templates/JsStack';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const myTheme = useTheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
        gcTime: 15 * 60 * 1000, // Keep cache for 15 minutes
      },
    },
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ViemProvider>
          <AssetsProvider>
            <ThemeProvider value={myTheme}>
              <SafeAreaView style={styles.container}>
                <JsStack
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: false, // Disable swipe gesture
                  }}
                ></JsStack>
                <Toast config={toastConfig} />
              </SafeAreaView>
            </ThemeProvider>
          </AssetsProvider>
        </ViemProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE share (id TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL);
    `);
}
