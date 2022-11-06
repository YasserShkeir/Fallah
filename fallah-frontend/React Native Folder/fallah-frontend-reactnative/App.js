import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import SignIn from "./src/scenes/signin/index";
import SignUp from "./src/scenes/signup/index";
import BuyerLanding from "./src/scenes/buyer/landing";
import { CREAMWHITE, LIGHTGREEN } from "./src/styles/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Inter-ExtraBold": require("./src/assets/fonts/Inter-ExtraBold.ttf"),
          "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
          "Inter-Medium": require("./src/assets/fonts/Inter-Medium.ttf"),
          "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
          "Inter-Light": require("./src/assets/fonts/Inter-Light.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  onLayoutRootView();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
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
