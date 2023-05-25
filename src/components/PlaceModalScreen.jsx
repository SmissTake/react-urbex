import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  ScrollView,
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      setLoading(true);
      setData([]);
      fetch(`${process.env.API_URL}/place/${place._id}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [place]);

  if (loading) {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        presentationStyle={"pageSheet"}
      >
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        presentationStyle={"pageSheet"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {data.images.map((image) => (
            <Image
              key={image._id}
              style={styles.image}
              source={{ uri: process.env.API_URL + "/" + image.url }}
            />
          ))}
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.town}>{data.town}</Text>
          <Text>{data.description}</Text>
          <Text>{data.history}</Text>
          <Text>Category : {data.category}</Text>
          <Text>Accessibility : {data.accessibility}</Text>
          <Text>User : {data.user}</Text>
          <Text>Comments : {data.comments}</Text>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
