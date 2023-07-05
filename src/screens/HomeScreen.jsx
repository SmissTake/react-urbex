import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import PlacesList from '../components/PlacesList';
import { API_URL } from '@env';
import customFetch from "../utils/fetch";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState([]);
  const navigation = useNavigation();
  const { showMessage } = useContext(MessageContext);

  const fetchPlaces = () => {
    setRefreshing(true);
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
      setPlaces(json);
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
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PlacesList data={places} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});