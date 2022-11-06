import { React, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text } from "react-native-paper";

import { View, TextInput } from "react-native";

// Components
import SigninLogo from "../../components/atoms/SigninLogo";
import UnAuthBackground from "../../components/organisms/UnauthorizedBG";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { TextFieldWhite } from "../../styles/components";
import GreenButton from "../../components/molecules/GreenButton";

// Hooks
import { signin } from "../../hooks/auth";

const handleSignIn = async (email, password, navigation) => {
  const response = await signin(email, password, navigation);
  if (response) {
    navigation.navigate("BuyerLanding");
  }
};

const SignIn = ({ navigation }) => {
  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          return navigation.navigate("BuyerLanding");
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UnAuthBackground>
      <SigninLogo />

      <TextInput
        style={TextFieldWhite}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCompleteType="email"
        keyboardType="email-address"
      />

      <TextInput
        style={TextFieldWhite}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: "10%",
            color: LIGHTGREEN,
            fontWeight: "500",
            textDecorationLine: "underline",
            fontSize: 16,
          }}
        >
          Forgot Password?
        </Text>
        <GreenButton
          title={"Sign In"}
          onPress={() => handleSignIn(email, password, navigation)}
        />
      </View>

      <Text style={{ color: CREAMWHITE, fontSize: 16 }}>
        Don't have an account?{" "}
        <Text
          style={{
            color: LIGHTGREEN,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </UnAuthBackground>
  );
};

export default SignIn;
