import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { useTheme } from "@/domain/usecases/hooks/themes/useTheme";
import AppModal from "@/presentation/templates/Modal";
import { Colors } from "@/common/constants/Colors";
import { useProfile } from "@/domain/usecases/hooks/users/useProfile";

export default function RootLayout() {
  const { isAuthenticated } = useProfile();
  const myTheme = useTheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChildren, setModalChildren] = useState(<></>);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={myTheme}>
        <SafeAreaView style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Initial route handler */}
            <Stack.Screen
              name="index"
              options={{
                animation: "none",
              }}
            />
            {/* Unprotected routes (about, contact, etc) */}
            <Stack.Screen
              name="(public)"
              options={{
                animation: "none",
              }}
            />

            {/* Auth routes (login, signup) */}
            <Stack.Screen
              name="(auth)"
              options={{
                animation: "none",
              }}
            />

            {/* Protected app routes */}
            <Stack.Screen
              name="(app)"
              options={{
                animation: "none",
              }}
            />
          </Stack>

          {modalVisible && (
            <AppModal
              modalVisible={modalVisible}
              onModalVisible={setModalVisible}
              children={modalChildren}
            />
          )}
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
