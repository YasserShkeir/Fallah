import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import SignIn from "./src/scenes/signin/index";
import SignUp from "./src/scenes/signup/index";
import BuyerLanding from "./src/scenes/buyer/landing";
import { CREAMWHITE, LIGHTGREEN } from "./src/styles/colors";
import { theme } from "./src/styles/theme";
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("./src/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./src/assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-Light": require("./src/assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setToken(token);
  };

  checkToken();

  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  );
}
