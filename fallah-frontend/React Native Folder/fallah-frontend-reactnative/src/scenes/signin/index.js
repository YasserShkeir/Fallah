import { React, useState } from "react";

import {
  View,
  Button,
  Image,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";

import loginBG from "../../assets/images/loginBG.jpg";
import lightLogo from "../../assets/images/LightLoginLogo.png";

import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";

const loginAPI = async (email, password) => {
  return await fetch(process.env.LOCALIP + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        alert("Login Successful");
        // navigation.navigate("Home");
      } else {
        alert("Login Failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ backgroundColor: "black" }}>
      <ImageBackground
        source={loginBG}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={lightLogo}
          style={{
            width: 300,
            height: 150,
          }}
        />

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

        <View
          style={{
            width: "80%",
            height: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            title="Sign In"
            color={LIGHTGREEN}
            onPress={() => loginAPI(email, password)}
          />
        </View>

        <View
          style={{
            width: "80%",
            height: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            title="Sign Up"
            color={LIGHTGREEN}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;
