import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CreatePlaceScreen from '../screens/CreatePlaceScreen';
import UserScreen from '../screens/UserScreen';
import { ModalProvider } from "../contexts/ModalContext";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <ModalProvider>
      <Tab.Navigator>
        <Tab.Screen name='HomeScreen' component={HomeScreen} />
        <Tab.Screen name='CreatePlaceScreen' component={CreatePlaceScreen} />
        <Tab.Screen name='UserScreen' component={UserScreen} />
      </Tab.Navigator>
    </ModalProvider>
  );
}

export default TabNavigator;