import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import { navigation } from '@react-navigation/native';


export const logout = () => {
  AsyncStorage.removeItem('token');
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  );
};