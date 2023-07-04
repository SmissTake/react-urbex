import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import { logout } from '../utils/logout';

export default function UserScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Button
        label="Logout"
        onPress={() => {
          logout();
        }}
      />
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
