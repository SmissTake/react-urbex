import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PlaceCard from "./PlaceCard";
import { API_URL } from "@env";
import { ModalContext } from "../contexts/ModalContext";
import customFetch from "../utils/fetch";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ onRefresh }) {
  const [data, setData] = useState([]);
  const { openModal } = useContext(ModalContext);
  const { showMessage } = useContext(MessageContext);
  const navigation = useNavigation();
  
  useEffect(() => {
    customFetch(
        `${API_URL}`,
        {
          method: "GET",
        },
        '',
        showMessage,
        navigation
      )
      .then((json) => {
        setData(json);
        onRefresh();
      })
      .catch((error) => console.error(error));  
  }, []);

  const handlePlacePress = (place) => {
    if (place) {
      openModal(place);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlacePress(item)}>
      <PlaceCard title={item.title} town={item.town} image={item.images[0].url} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.header}>Places</Text>
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