import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export default function PopMessage({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: type === 'success' ? 'green' : 'red',
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>{message}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}