import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import UserScreen from "./src/screens/UserScreen";
import * as React from "react";
import { useState } from "react";
import { MessageProvider } from "./src/contexts/MessageContext";
import { RootSiblingParent } from "react-native-root-siblings";
import { ModalProvider } from "./src/contexts/ModalContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <ModalProvider>
      <Tab.Navigator>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='UserScreen' component={UserScreen} />
      </Tab.Navigator>
    </ModalProvider>
  );
}

export default function App() {
  return (
    <MessageProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen
              name='TabNavigator'
              component={TabNavigator}
              options={{
                headerShown: false,
                gestureEnabled: false,
                gestureDirection: "horizontal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </MessageProvider>
  );
}
