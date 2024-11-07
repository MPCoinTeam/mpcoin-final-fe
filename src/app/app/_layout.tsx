import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
import { ThemedText } from '@/presentation/atoms/ThemedText';
import AppHeader from '@/presentation/templates/Header';
import { JsDrawer } from '@/presentation/templates/JsDrawer';
import AppModal from '@/presentation/templates/Modal';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChildren, setModalChildren] = useState(<></>);
  const handlerModalChildren = (children: JSX.Element) => {
    setModalVisible(true);
    setModalChildren(children);
  };
  const { isAuthenticated, profile } = useProfile();
  if (!isAuthenticated) return <></>;
  return (
    <GestureHandlerRootView style={styles.container}>
      <JsDrawer
        screenOptions={{
          header: (props) => <AppHeader onOpenModal={handlerModalChildren} {...props} profile={profile} />,
          drawerPosition: 'left',
        }}
      >
        <JsDrawer.Screen
          name="home"
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
      <AppModal modalVisible={modalVisible} onModalVisible={setModalVisible}>
        {modalChildren}
      </AppModal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#181818',
  },
});
