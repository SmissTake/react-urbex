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
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";

export default function CreatePlaceScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [town, setTown] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("town", town);
    data.append("description", description);
    data.append("history", history);
    data.append("accessibility", accessibility);
    data.append("category", category);
    images.forEach((image, index) => {
      data.append(`images`, {
        uri: image.uri,
        type: "image/jpeg",
        name: `image_${index}.jpg`,
      });
    });
    const token = await AsyncStorage.getItem("token");

    fetch(`${process.env.API_URL}/place`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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
      quality: 1,
      allowsMultipleSelection: true,
      noData: true,
    });
    if (!result.canceled) {
      const selectedImages = result.assets
        .filter((asset) => !images.some((image) => image.uri === asset.uri))
        .map((asset) => ({ uri: asset.uri }));
      setImages([...images, ...selectedImages]);
      console.log(images);
    }
  };

  const removeImage = (image) => {
    const newImages = images.filter((img) => img.uri !== image.uri);
    setImages(newImages);
  };

  const renderImage = ({ item }) => (
    <View>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity onPress={() => removeImage(item)}>
        <Icon name='remove' size={20} color='black' style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.content}>
          {images && (
            <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderImage}
              horizontal={true}
              style={styles.imageList}
            />
          )}
          <Button
            label='Select Image'
            onPress={handleImagePicker}
            styleButton={styles.button}
            styleLabel={styles.buttonText}
          />
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
          <RadioButton.Group
            onValueChange={setAccessibility}
            value={accessibility}
          >
            <RadioButton.Item label='Easy' value='easy' />
            <RadioButton.Item label='Medium' value='medium' />
            <RadioButton.Item label='Hard' value='hard' />
          </RadioButton.Group>
          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder='Enter category'
          />
          <Button 
            label='Create Place' 
            onPress={handleSubmit} 
            styleButton={styles.button} 
            styleLabel={styles.buttonText} 
          />
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
    backgroundColor: "red",
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
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  imageList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  removeIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    opacity: 0.7,
    padding: 5,
  },
});
