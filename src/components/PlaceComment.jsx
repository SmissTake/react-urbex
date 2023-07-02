import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Comment = ({ comment }) => {
  const { user, comment: commentText, images } = comment;

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user[0]}</Text>
      <Text style={styles.commentText}>{commentText}</Text>
      {images && images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((image) => (
            <Image
              key={image._id}
              source={{ uri: image.url }}
              style={styles.image}
            />
          ))}
        </View>
      )}
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