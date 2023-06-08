import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PlaceCard from "./PlaceCard";
import { API_URL } from "@env";
import { ModalContext } from "../contexts/ModalContext";

export default function PlacesList() {
  const [data, setData] = useState([]);
  const { openModal } = useContext(ModalContext);
  
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
    if (place) {
      openModal(place);
    }
  };

  return (
    <View>
      <Text style={styles.header}>Places</Text>
      <ScrollView horizontal={true} stickyHeaderIndices={[0]}>
        {data.map((place) => (
          <TouchableOpacity key={place._id} onPress={() => handlePlacePress(place)}>
            <PlaceCard
              title={place.title}
              town={place.town}
              image={place.images[0].url}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
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