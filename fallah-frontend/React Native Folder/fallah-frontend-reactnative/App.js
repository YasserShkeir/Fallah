import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignIn from "./src/scenes/signin/index";
import SignUp from "./src/scenes/signup/index";
import BuyerLanding from "./src/scenes/buyer/landing";
import { CREAMWHITE, LIGHTGREEN } from "./src/styles/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    setToken(token);
  };

  checkToken();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={token ? BuyerLanding : SignIn}
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
        <Stack.Screen
          name="BuyerLanding"
          component={BuyerLanding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
