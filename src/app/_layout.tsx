import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { useTheme } from '@/domain/usecases/hooks/themes/useTheme';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import AppHeader from '@/presentation/templates/Header';
import { JsDrawer } from '@/presentation/templates/JsDrawer';
import AppModal from '@/presentation/templates/Modal';


export default function Layout() {
  const myTheme = useTheme()
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChildren, setModalChildren] = useState(<></>);
  const handlerModalChildren = (children: JSX.Element) => {
    setModalVisible(true);
    setModalChildren(children);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={myTheme}>
      <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 2 }}>
        <JsDrawer
          screenOptions={{
            header: (props) => <AppHeader onOpenModal={handlerModalChildren} {...props} />,
            drawerPosition: 'left',
          }}
        >
          <JsDrawer.Screen
            name="index"
            options={{
              drawerLabel: () => <ThemedText>Home</ThemedText>,
            }}
          />
          <JsDrawer.Screen
            name="setting"
            options={{
              drawerLabel: () => <ThemedText>Setting</ThemedText>,
            }}
          />
        </JsDrawer>
      </GestureHandlerRootView>
      <AppModal modalVisible={modalVisible} onModalVisible={setModalVisible} children={modalChildren} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});
