import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import moment from 'moment';
import ImagesCarousel from "./ImageCarousel";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PlaceModalScreen({
  modalVisible,
  place,
  handleCloseModal,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place) {
      setLoading(true);
      setData([]);
      fetch(`${process.env.API_URL}/place/${place._id}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [place]);

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
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
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
                <Text style={styles.postedAt}>{moment(data.created_at).format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.column}>
                <Icon name="universal-access" size={40} color="black" />
                <Text style={styles.columnValue}>{data.accessibility}</Text>
              </View>
              <View style={styles.column}>
                <Icon name="building" size={40} color="black" />
                <Text style={styles.columnValue}>{data.category}</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text>{data.description}</Text>

            <Text style={styles.sectionTitle}>History</Text>
            <Text>{data.history}</Text>

            <Text style={styles.sectionTitle}>Category</Text>
            <Text>{data.category}</Text>

            <Text>User : {data.user.username}</Text>

            <Text style={styles.sectionTitle}>Comments</Text>
            <Text>{data.comments ? data.comments : "No comments yet"}</Text>
          </View>
        </ScrollView>
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
    fontFamily: 'PolySans',
  },
  town: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    textAlign: "justify",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: 'PolySans',
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
});
