import { React, useState } from "react";

import { Text, View, Button, TextInput, Pressable } from "react-native";

// Components
import SigninLogo from "../../components/atoms/SigninLogo";
import UnAuthBackground from "../../components/organisms/UnauthorizedBG";
import ButtonText from "../../components/atoms/ButtonText";
import { LIGHTGREENBUTTON } from "../../styles/components";

// Styles
import { LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";
import GreenButton from "../../components/molecules/GreenButton";

const loginAPI = async (email, password) => {
  const url = `${process.env.LOCALIP}:${process.env.PORT}/auth/login`;
  return await fetch(url, {
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

      <GreenButton
        title={"Sign In"}
        onPress={() => loginAPI(email, password)}
      />

      <Pressable
        style={LIGHTGREENBUTTON}
        onPress={() => navigation.navigate("SignUp")}
      >
        <ButtonText text={"Sign Up"} />
      </Pressable>
    </UnAuthBackground>
  );
};

export default SignIn;
