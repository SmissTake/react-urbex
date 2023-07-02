import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CreatePlaceScreen from "../screens/CreatePlaceScreen";
import UserScreen from "../screens/UserScreen";
import { ModalProvider } from "../contexts/ModalContext";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <ModalProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#93A75F",
          tabBarTabStyle: {
            borderRightWidth: 1,
            borderRightColor: "gray",
          },
        }}
      >
        <Tab.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='CreatePlaceScreen'
          component={CreatePlaceScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='plus' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='UserScreen'
          component={UserScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name='user' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </ModalProvider>
  );
}

export default TabNavigator;
