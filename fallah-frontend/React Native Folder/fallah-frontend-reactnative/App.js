import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./src/scenes/signin/index";
import SignUp from "./src/scenes/signup/index";
import { CREAMWHITE, LIGHTGREEN } from "./src/styles/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Sign Up",
            headerStyle: {
              backgroundColor: LIGHTGREEN,
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            // change back arrow color
            headerTintColor: CREAMWHITE,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
