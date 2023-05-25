import React from "react";
import {
  Modal,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function PlaceModalScreen({
  modalVisible,
  place,
  handleCloseModal,
}) {
  if (!place) {
    return null;
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      presentationStyle={"pageSheet"}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Image style={styles.image} source={{ uri: process.env.API_URL +'/'+ place.images[0].url }} />
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.town}>{place.town}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  town: {
    fontSize: 18,
    color: "gray",
  },
});
