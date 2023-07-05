import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PlaceCard from "./PlaceCard";
import { ModalContext } from "../contexts/ModalContext";

export default function PlacesList({ title, data }) {
  const { openModal } = useContext(ModalContext);

  const handlePlacePress = (place) => {
    if (place) {
      openModal(place);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlacePress(item)}>
      <PlaceCard place={item} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.header}>{title ? title : "Places"}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        horizontal={true}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "PolySans",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    alignSelf: "stretch",
  },
});