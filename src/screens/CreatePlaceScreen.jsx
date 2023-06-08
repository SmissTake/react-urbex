import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePlaceScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [town, setTown] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async() => {
    const data = new FormData();
    data.append("title", title);
    data.append("town", town);
    data.append("description", description);
    data.append("history", history);
    data.append("accessibility", accessibility);
    data.append("category", category);
    data.append("images", {
      uri: image.uri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    const token = await AsyncStorage.getItem("token");
    console.log(data);

    fetch(`${process.env.API_URL}/place`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.content}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder='Enter title'
          />
          <Text style={styles.label}>Town:</Text>
          <TextInput
            style={styles.input}
            value={town}
            onChangeText={setTown}
            placeholder='Enter town'
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder='Enter description'
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.label}>History:</Text>
          <TextInput
            style={styles.input}
            value={history}
            onChangeText={setHistory}
            placeholder='Enter history'
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.label}>Accessibility:</Text>
          <TextInput
            style={styles.input}
            value={accessibility}
            onChangeText={setAccessibility}
            placeholder='Enter accessibility'
          />
          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder='Enter category'
          />
          <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image.uri }} style={styles.image} />
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Place</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    marginBottom: 10,
  },
});