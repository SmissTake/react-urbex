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
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const json = await response.json();
      if (response.status === 200) {
        AsyncStorage.setItem("token", json.token);
        showMessage('Login successful', 'success');
        redirectHome();
      }
      if (response.status === 401) {
        showMessage('Invalid username or password', 'error');
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      showMessage('Something went wrong', 'error');
    }
    setLoader(false);
    return;
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
