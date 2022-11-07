import { React, useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import SigninLogo from "../../components/images/SigninLogo";
import UnAuthBackground from "../../components/images/UnauthorizedBG";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { TextFieldWhite } from "../../styles/components";
import GreenButton from "../../components/buttons/GreenButton";

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
            textDecorationLine: "underline",
            fontSize: 16,
            fontFamily: "Inter-Regular",
          }}
        >
          Forgot Password?
        </Text>
        <GreenButton
          title={"Sign In"}
          onPress={() => handleSignIn(email, password, navigation)}
        />
      </View>

      <Text
        style={{ color: CREAMWHITE, fontSize: 16, fontFamily: "Inter-Regular" }}
      >
        Don't have an account?{" "}
        <Text
          style={{
            color: LIGHTGREEN,
            fontFamily: "Inter-Bold",
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
