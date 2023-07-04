import React, { useEffect, useState, useContext } from "react";
import { KeyboardAvoidingView, Keyboard, TextInput, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { API_URL } from "@env";
import { MessageContext } from '../contexts/MessageContext';
import customFetch from "../utils/fetch";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const [loader, setLoader] = useState(false);

  const { showMessage } = useContext(MessageContext);

  const redirectLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    );
  };

  const passwordMatch = () => {
    if (password === passwordConfirmation) {
      return true;
    }
    return false;
  };

  const SubmitRegister = async () => {
    setLoader(true);
    try {
      const data = await customFetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }, 'Registration successful', showMessage, navigation);
      redirectLogin();
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
            autoCompleteType='username'
            textContentType='username'
          />
          <TextInput
            placeholder='Email'
            onChangeText={(text) => setEmail(text)}
            style={styles.TextInput}
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          <TextInput
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            style={styles.TextInput}
            autoCompleteType='password'
            textContentType='password'
            secureTextEntry={true}
          />
          <TextInput
            placeholder='Confirm Password'
            onChangeText={(text) => setPasswordConfirmation(text)}
            style={styles.TextInput}
            autoCompleteType='password'
            textContentType='password'
            secureTextEntry={true}
          />
          {loader ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Button
              disabled={!passwordMatch()}
              label='Register'
              onPress={() => SubmitRegister(username, password)}
            />
          )}
          <Button
            label='Already have an account? Login'
            onPress={() => redirectLogin()}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
