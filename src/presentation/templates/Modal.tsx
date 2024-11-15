import { Modal, Pressable, StyleSheet } from 'react-native';

interface AppModalProps {
  modalVisible: boolean;
  onModalVisible: (modalVisible: boolean) => void;
  children: React.JSX.Element;
}

export default function AppModal({ modalVisible, onModalVisible, children }: AppModalProps) {
  const closeModal = () => {
    onModalVisible(false);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} style={styles.container} onRequestClose={closeModal}>
      <Pressable style={styles.modalBackground} onPress={closeModal} children={children} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
});
