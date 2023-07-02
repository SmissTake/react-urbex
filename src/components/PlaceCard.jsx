import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function PlaceCard({ title, town, image }) {
  return (
    <View style={styles.placeCard}>
      <Image source={{uri:process.env.API_URL +'/'+ image}} alt={title} style={styles.placeCardImage} />
      <View style={styles.placeCardContent}>
        <Text style={styles.placeCardTitle}>{title}</Text>
        <Text style={styles.placeCardTown}>{town}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  placeCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    elevation: 2,
    width: 300,
    height: 400,
    marginHorizontal: 10,
  },
  placeCardContent: {
    padding: 10,
  },
  placeCardImage: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  placeCardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "PolySans",
  },
  placeCardTown: {
    margin: 0,
    fontSize: 16,
    color: "#666",
  },
});
