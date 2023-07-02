import React from 'react';
import { View, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FullScreenImage = ({ imageUrl, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <Image source={{ uri: process.env.API_URL + '/' + imageUrl }} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name='close' size={20} color='white' />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default FullScreenImage;