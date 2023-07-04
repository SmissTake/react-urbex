import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import Button from './Button';
import PlaceComment from './PlaceComment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MessageContext } from '../contexts/MessageContext';
import customFetch from '../utils/fetch';
import { useNavigation } from '@react-navigation/native';


export default function CommentInput({ placeId, onCommentCreated }) {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { showMessage } = useContext(MessageContext);
  const navigation = useNavigation();

  const handleCommentChange = (text) => {
    setComment(text);
  };

const handleSubmit = async () => {
  const token = await AsyncStorage.getItem("token");
  setIsLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('comment', comment);

    const data = await customFetch(
      `${process.env.API_URL}/comment/${placeId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
      '',
      showMessage,
      navigation
    );

    setComment('');
    onCommentCreated(data);
    showMessage('Comment posted !', 'success');
  } catch (error) {
    showMessage(error.message, 'danger');
    setError(error.message);
  }

  setIsLoading(false);
};

  const isValidForm = () => {
    return comment.length > 0;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={comment}
        onChangeText={handleCommentChange}
      />
      <Button label="Post" onPress={handleSubmit} disabled={!isValidForm()} loading={isLoading} />
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});