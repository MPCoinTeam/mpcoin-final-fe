import { useProfile } from '@/domain/usecases/hooks/users/useProfile';
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
  const handlerModalChildren = (children: JSX.Element) => {
    setModalVisible(true);
    setModalChildren(children);
  };

  return (
    <Protected>
      <GestureHandlerRootView style={styles.container}>
        <JsDrawer
          screenOptions={{
            header: (props) => <AppHeader onOpenModal={handlerModalChildren} {...props}/>,
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
        <AppModal modalVisible={modalVisible} onModalVisible={setModalVisible}>
          {modalChildren}
        </AppModal>
      </GestureHandlerRootView>
    </Protected>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#181818',
  },
});
