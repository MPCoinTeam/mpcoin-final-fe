import Protected from '@/presentation/atoms/Protected';
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

  const handlerModalChildren = (callback: (args: { closeModal: () => void }) => React.JSX.Element) => {
    setModalVisible(true);
    setModalChildren(callback({ closeModal: () => setModalVisible(false) }));
  };

  return (
    <Protected>
      <GestureHandlerRootView style={styles.container}>
        <JsDrawer
          screenOptions={{
            header: (props: any) => <AppHeader onOpenModal={handlerModalChildren} {...props} />,
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
          <JsDrawer.Screen
            name="logout"
            options={{
              drawerLabel: () => <ThemedText>Logout</ThemedText>,
            }}
          />
        </JsDrawer>
        <AppModal modalVisible={modalVisible} onModalVisible={setModalVisible}>
          {modalChildren}
        </AppModal>
      </GestureHandlerRootView>
    </Protected>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
});
