import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, View } from "react-native";
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

  const goToParameters = () => {
    navigation.navigate("ParametersScreen", { user });
  };

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
        {/* parameter view link with an icon */}
        <Button
          label='Parameter'
          onPress={goToParameters}
        />
        <View style={styles.profile}>
          <Text style={styles.title}>
            {user.username}
          </Text>
          <Text style={styles.subtitle}>
            {user.bio}
          </Text>
        </View>
        <PlacesList title={"Favorite Places"} data={user.favoritePlaces} />
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
  },
  profile: {
    margin: 20,
    alignItems: "center",
  },
});
