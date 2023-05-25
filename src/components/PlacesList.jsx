import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import PlaceCard from "./PlaceCard";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import PlaceModalScreen from "./PlaceModalScreen";

export default function PlacesList() {
  const [data, setData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.header}>Places</Text>
      <ScrollView horizontal={true} stickyHeaderIndices={[0]}>
        {data.map((place) => (
          <TouchableOpacity onPress={() => handlePlacePress(place)}>
            <PlaceCard
              key={place._id}
              title={place.title}
              town={place.town}
              image={place.images[0].url}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedPlace && (
        <PlaceModalScreen
          modalVisible={modalVisible}
          place={selectedPlace}
          handleCloseModal={handleCloseModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignSelf: "stretch",
  },
});