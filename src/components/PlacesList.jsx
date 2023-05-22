import React, { Fragment, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import PlaceCard from "./PlaceCard";
import { API_URL } from "@env";

export default function PlacesList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text style={styles.header}>Places</Text>
      <ScrollView
        horizontal={true}
        stickyHeaderIndices={[0]}>
        {data.map((place) => (
          <PlaceCard
            key={place._id}
            title={place.title}
            town={place.town}
            image={place.images[0].url}
          />
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