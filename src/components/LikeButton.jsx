import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import customFetch from "../utils/fetch";
import { useNavigation } from "@react-navigation/native";
import { MessageContext } from "../contexts/MessageContext";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LikeButton({ placeId, onToggle }) {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();
  const { showMessage } = useContext(MessageContext);

  useEffect(() => {
    async function checkIfLiked() {
      if (placeId) {
        try {
          const user = await AsyncStorage.getItem("user");
          const favoritesArray = JSON.parse(user)?.favoritePlaces;
          console.log(user);
          if (favoritesArray && favoritesArray.includes(placeId)) {
            setLiked(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  
    checkIfLiked();
  }, [placeId]);

  const handlePress = async () => {
    try {
      const endpoint = liked ? `${API_URL}/place/${placeId}/unlike` : `${API_URL}/place/${placeId}/like`;
      await customFetch(endpoint, {
          method: "POST"
        }, "Place liked",showMessage, navigation);
      setLiked(!liked);
      onToggle(!liked);
  
      // Get the user data from AsyncStorage
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
  
      // Update the favoritePlaces array
      if (liked) {
        userData.favoritePlaces = userData.favoritePlaces.filter(id => id !== placeId);
      } else {
        userData.favoritePlaces.push(placeId);
      }
  
      // Save the updated user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
      showMessage("Error liking place", "error");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon name={liked ? "heart" : "heart-o"} size={30} color={liked ? "red" : "black"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});