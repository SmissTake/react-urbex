import React, { useState } from "react";
import { KeyboardAvoidingView, Keyboard, TextInput, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [loader, setLoader] = useState(false);

  const SubmitLogin = async () => {
    setLoader(true);
    console.log("enter");
    try {
        const response = await fetch(
        "https://6cd5-83-118-208-130.ngrok-free.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      )
      const json = await response.json();
      console.log(json);
      if (response.status === 200) {
        AsyncStorage.setItem("token", json.token);
  
        const resetAction = CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeScreen" }],
        });
        navigation.dispatch(resetAction);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
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
