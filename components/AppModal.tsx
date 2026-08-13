// components/AppModal.tsx

import { Modal, Pressable, View, StyleSheet } from "react-native";

export function AppModal({visible, onClose, children }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalView}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "rgb(23, 21, 21)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(73, 73, 73, 0.67)",
    justifyContent: "center",
    alignItems: "center",
  },
});