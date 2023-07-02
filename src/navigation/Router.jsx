import React from "react";
import StackNavigator from "./StackNavigator";
import { MessageProvider } from "../contexts/MessageContext";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";

function Router() {
  return (
    <MessageProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </RootSiblingParent>
    </MessageProvider>
  );
}

export default Router;
