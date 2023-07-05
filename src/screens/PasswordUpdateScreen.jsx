import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MessageContext } from "../contexts/MessageContext";
import customFetch from "../utils/fetch";
import { API_URL } from "@env";
import Button from "../components/Button";

export default function ProfileUpdateScreen({ route }) {
  const { user } = route.params;
  const { showMessage } = useContext(MessageContext);
  const navigation = useNavigation();
  const [password, setPassword] = useState(user.password);
  const [passwordConfirm, setPasswordConfirm] = useState(user.password);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const handleSave = async () => {
    // validate the form
    if (!password || !passwordConfirm) {
      showMessage("Please fill in all the fields", "error");
      return;
    }
    if (password !== passwordConfirm) {
      showMessage("Passwords do not match", "error");
      return;
    }
    try {
      // Make a PUT request to the server to update the user's info
      await customFetch(
        `${API_URL}/user/${user._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            password,
          }),
        },
        "Profile updated successfully",
        showMessage,
        navigation
      );

      // Navigate back to the profile screen
      navigation.goBack();
    } catch (error) {
      showMessage("Error updating profile", "error");
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            autoCompleteType='password'
            textContentType='password'
            secureTextEntry={secureTextEntry}
          />
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            autoCompleteType='password'
            textContentType='password'
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={toggleSecureTextEntry}
          >
            <Text style={styles.passwordToggleText}>
              {secureTextEntry ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
          <Button label='Update' onPress={() => handleSave()} />
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    minWidth: 200,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 20,
  },
  passwordToggle: {
    padding: 10,
  },
  passwordToggleText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
