import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import { logout } from '../utils/logout';
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Button
        label="Logout"
        onPress={() => {
          logout(navigation);
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
