import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function PlaceCard({ title, town, image }) {
  return (
    <View style={styles.placeCard}>
      <Image source={{uri:image}} alt={title} style={styles.placeCardImage} />
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeCardImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  placeCardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
  },
  placeCardTown: {
    margin: 0,
    fontSize: 16,
    color: "#666",
  },
});
