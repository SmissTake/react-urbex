import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import PlacesList from '../components/PlacesList';

export default function UserScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <PlacesList/>
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
});
