import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MessageContext } from "../contexts/MessageContext";
import Button from "../components/Button";
import { logout } from "../utils/logout";
import customFetch from "../utils/fetch";
import { API_URL } from "@env";

export default function ProfileScreen({ route }) {
  const { showMessage } = useContext(MessageContext);
  const navigation = useNavigation();
  const { user } = route.params;

  const handleLogout = () => {
    logout(navigation);
    showMessage("Logged out successfully", "success");
  };

  const handleModifyProfile = () => {
    // Navigate to modify profile screen
    navigation.navigate("ProfileUpdateScreen", { user });
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
    navigation.navigate("PasswordUpdateScreen", { user });
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await customFetch(`${API_URL}/user/${user._id}`, {
                method: "DELETE",
              }, "Account deleted successfully", showMessage, navigation);
          
              logout(navigation);
            } catch (error) {
              console.error(error);
              showMessage("Error deleting account", "error");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profile}>
          <Text style={styles.title}>{user.username}</Text>
          <Text style={styles.subtitle}>{user.bio}</Text>
        </View>
        <View style={styles.options}>
          <Button
            label="Modify Profile"
            onPress={handleModifyProfile}
            styleLabel={styles.optionText}
            styleButton={styles.option}
          />
          <Button
            label="Change Password"
            onPress={handleChangePassword}
            styleLabel={styles.optionText}
            styleButton={styles.option}
          />
          <Button
            label="Delete Account"
            onPress={handleDeleteAccount}
            styleButton={styles.redInline}
            styleLabel={styles.optionTextWhite}
          />
        </View>
        <Button 
          label="Logout" 
          onPress={handleLogout} 
          styleButton={styles.redOutilne}
          styleLabel={styles.optionTextRed}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
  options: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  redOutilne: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    alignSelf: "stretch",
  },
  redInline: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  optionTextWhite: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  optionTextRed: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
  },
});