import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function PlaceModalScreen({ modalVisible, place, handleCloseModal }) {
  return (
    <Modal visible={modalVisible} animationType="slide" presentationStyle={"pageSheet"}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{place.title}</Text>
        <TouchableOpacity onPress={handleCloseModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}