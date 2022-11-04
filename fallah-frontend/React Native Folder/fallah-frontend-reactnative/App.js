import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Step One</Text>
      <Text>Edit App.js to change this screen and turn it into your app.</Text>
      <Text style={styles.heading}>See Your Changes</Text>
      <Text>Press Cmd + R inside the simulator to reload your app’s code.</Text>
      <Text style={styles.heading}>Debug</Text>
      <Text>
        Press Cmd + M or Shake your device to open the React Native Debug Menu.
      </Text>
      <Text style={styles.heading}>Learn</Text>
      <Text>Read the docs to discover what to do next:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
