import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
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
  );
}

export default StackNavigator;