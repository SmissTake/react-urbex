import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import Button from "../components/Button";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { API_URL } from "@env";
import { MessageContext } from '../contexts/MessageContext';
import customFetch from "../utils/fetch";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  
  const { showMessage } = useContext(MessageContext);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        redirectHome();
      }
    };
    checkToken();
  }, []);

  const redirectHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'TabNavigator', params: { screen: 'HomeScreen' } }],
      })
    );
  };

  const redirectRegister = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'RegisterScreen' }],
      })
    );
  };

  const SubmitLogin = async () => {
    setLoader(true);
    try {
      const data = await customFetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      }, 'Login successful', showMessage, navigation);
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", JSON.stringify(data.user));
      redirectHome();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TextInput
            placeholder='Username'
            onChangeText={(text) => setUsername(text)}
            style={styles.TextInput}
          />
          <TextInput
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            style={styles.TextInput}
            textContentType='password'
            secureTextEntry={true}
          />
          {loader ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Button
              label='Login'
              onPress={() => SubmitLogin(username, password)}
            />
          )}

          <Button
            label='Register'
            onPress={() => redirectRegister()}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 20,
  },
});
