import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";

export const logout = (navigation) => {
  AsyncStorage.removeItem('token');
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  );
};