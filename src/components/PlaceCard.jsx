import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import LikeButton from "./LikeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlaceCard({ place }) {

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function checkIfLiked() {
      try {
        const user = await AsyncStorage.getItem("user");
        const favoritesArray = JSON.parse(user)?.favoritePlaces;
        if (favoritesArray && favoritesArray.includes(place._id)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkIfLiked();
  }, [place._id]);

  const handleLikeToggle = (liked) => {
    setIsLiked(liked);
  };

  return (
    <View style={styles.placeCard}>
      <Image source={{uri:process.env.API_URL +'/'+ place.images[0].url}} alt={place.title} style={styles.placeCardImage} />
      <View style={styles.placeCardBar}>
        <View style={styles.placeCardContent}>
          <Text style={styles.placeCardTitle}>{place.title}</Text>
          <Text style={styles.placeCardTown}>{place.town}</Text>
        </View>
        <LikeButton placeId={place._id} isLiked={isLiked} onToggle={handleLikeToggle}/>
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
  placeCardBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});
