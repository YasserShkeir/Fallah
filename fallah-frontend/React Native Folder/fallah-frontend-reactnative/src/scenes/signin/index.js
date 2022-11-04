import { React, useState } from "react";

import { View, Button, TextInput } from "react-native";

// Components
import SigninLogo from "../../components/atoms/SigninLogo";
import UnAuthBackground from "../../components/organisms/UnauthorizedBG";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";

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
      console.log(123);
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

      <Button
        title="Sign In"
        color={LIGHTGREEN}
        onPress={() => loginAPI(email, password)}
        style={{ width: "100%" }}
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
          title="Sign Up"
          color={LIGHTGREEN}
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </UnAuthBackground>
  );
};

export default SignIn;
