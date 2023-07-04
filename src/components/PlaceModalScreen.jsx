import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";
import ImagesCarousel from "./ImageCarousel";
import Comment from "./PlaceComment";
import Icon from "react-native-vector-icons/FontAwesome";
import CommentInput from "./CommentInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import customFetch from "../utils/fetch";
import { MessageContext } from "../contexts/MessageContext";
import { useNavigation } from "@react-navigation/native";

export default function PlaceModalScreen({
  modalVisible,
  place,
  handleCloseModal,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { showMessage } = useContext(MessageContext);

  useEffect(() => {
    if (place) {
      setLoading(true);
      setData([]);
      customFetch(
        `${process.env.API_URL}/place/${place._id}`,
        {
          method: "GET",
        },
        "",
        showMessage,
        navigation
      )
      .then((json) => {
        setData(json);
        setLoading(false);
      })
    }
  }, [place]);

  const handleCommentCreated = (updatedPlace) => {
    setData(updatedPlace);
  };

  if (loading) {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        presentationStyle={"pageSheet"}
      >
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        presentationStyle={"pageSheet"}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Icon name='close' size={20} color='black' />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.town}>{data.town}</Text>
          </View>

          <ImagesCarousel images={data.images} />

          {/* a row with the the user who posted, accessibility level and the category */}

          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.columnValue}>{data.user.username}</Text>
                <Text style={styles.postedAt}>
                  {moment(data.created_at).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={styles.column}>
                <Icon name='universal-access' size={40} color='black' />
                <Text style={styles.columnValue}>{data.accessibility}</Text>
              </View>
              <View style={styles.column}>
                <Icon name='building' size={40} color='black' />
                <Text style={styles.columnValue}>{data.category}</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text>{data.description}</Text>

            <Text style={styles.sectionTitle}>History</Text>
            <Text>{data.history}</Text>

              <View>
                <Text style={styles.sectionTitle}>Comments</Text>
                <CommentInput
                  placeId={data._id}
                  onCommentCreated={handleCommentCreated}
                />
                {data.comments.length > 0 ? (
                  data.comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))
                ) : (
                  <Text>No comments yet</Text>
                )}
              </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "PolySans",
  },
  town: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    textAlign: "justify",
    width: "100%",
    marginTop: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "PolySans",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  postedAt: {
    fontSize: 12,
    color: "grey",
  },
  columnValue: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
