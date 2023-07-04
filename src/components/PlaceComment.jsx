import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FullScreenImage from './FullScreenImage';

const Comment = ({ comment }) => {
  const { user, comment: commentText, images } = comment;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user[0].username}</Text>
      <Text style={styles.commentText}>{commentText}</Text>
      {images && images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((image) => (
            <TouchableOpacity key={image._id} onPress={() => handleImagePress(image.url)}>
              <Image
                source={{ uri: process.env.API_URL + '/' + image.url }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <FullScreenImage
        imageUrl={selectedImage}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  commentText: {
    flex: 1,
    marginRight: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 80,
    height: 80,
    margin: 4,
  },
});

export default Comment;