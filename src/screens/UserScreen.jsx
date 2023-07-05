import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Button from "../components/Button";
import { logout } from "../utils/logout";
import customFetch from "../utils/fetch";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import PlacesList from "../components/PlacesList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState([]);
  const { showMessage } = useContext(MessageContext);

  const getUser = async () => {
    return JSON.parse(await AsyncStorage.getItem("user"));
  };

  const fetchPlaces = async () => {
    const user = await getUser();
    setRefreshing(true);
    if (!user) {
      showMessage("User not found");
      setRefreshing(false);
      return;
    }
    customFetch(
      `${API_URL}/user/${user.id}`,
      {
        method: "GET",
      },
      "",
      showMessage,
      navigation
    )
      .then((json) => {
        setUser(json);
        setRefreshing(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const onRefresh = () => {
    fetchPlaces();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PlacesList title={"Favorite Places"} data={user.favoritePlaces} />
        <Button
          label='Logout'
          onPress={() => {
            logout(navigation);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
});
