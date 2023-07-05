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
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [mail, setMail] = useState(user.email);

  const handleSave = async () => {
    // validate the form
    if (!username || !mail) {
      showMessage("Please fill in all the fields", "error");
      return;
    }
    try {
      // Make a PUT request to the server to update the user's info
      await customFetch(
        `${API_URL}/user/${user._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            username,
            mail,
            bio,
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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              required
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={mail}
              onChangeText={setMail}
              required
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput style={styles.input} value={bio} onChangeText={setBio} />
            <Button
              label='Update'
              onPress={() => handleSave()}
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 20,
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
