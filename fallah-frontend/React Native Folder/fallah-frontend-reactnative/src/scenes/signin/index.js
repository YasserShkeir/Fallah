import { React, useState } from "react";
import axios from "axios";

import { Text } from "react-native-paper";

import { View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import SigninLogo from "../../components/atoms/SigninLogo";
import UnAuthBackground from "../../components/organisms/UnauthorizedBG";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";
import GreenButton from "../../components/molecules/GreenButton";

const loginAPI = async (email, password, navigation) => {
  const url = `${process.env.LOCALIP}:${process.env.PORT}/auth/login`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
      console.log(await AsyncStorage.getItem("token"));

      alert("Login Successful");
      navigation.navigate("BuyerLanding");
    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
  }
};

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UnAuthBackground>
      <SigninLogo />

      <TextInput
        style={CREAMWHITETEXTFIELD}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCompleteType="email"
        keyboardType="email-address"
      />

      <TextInput
        style={CREAMWHITETEXTFIELD}
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
          onPress={() => loginAPI(email, password, navigation)}
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
