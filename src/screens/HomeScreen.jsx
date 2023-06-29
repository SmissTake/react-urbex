import React, { useState } from 'react';
import { StatusBar, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import PlacesList from '../components/PlacesList';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Call your API or fetch data here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
        <PlacesList onRefresh={onRefresh} />
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