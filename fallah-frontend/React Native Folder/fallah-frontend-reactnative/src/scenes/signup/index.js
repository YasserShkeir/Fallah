import { react, useState } from "react";
import axios from "axios";

import { View, Text, TextInput } from "react-native";
import GreenButton from "../../components/molecules/GreenButton";
import UserTypeButton from "../../components/molecules/UserTypeButton";

import UnAuthBackground from "../../components/organisms/UnauthorizedBG";
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";

// Hooks
import { signup } from "../../hooks/signUp";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [selected, setSelected] = useState(false);
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const response = await signup(username, email, phone, userType, password);
  };

  return (
    <UnAuthBackground>
      <Text style={{ color: LIGHTGREEN, fontWeight: "bold", fontSize: 32 }}>
        Create an Account
      </Text>

      <TextInput
        style={CREAMWHITETEXTFIELD}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={CREAMWHITETEXTFIELD}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        style={CREAMWHITETEXTFIELD}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        value={phone}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        req
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
          height: 60,
          borderColor: CREAMWHITE,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 10,
          width: "80%",
          marginBottom: 15,
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <UserTypeButton
          title={"Buyer"}
          isSelected={!selected}
          onPress={async () => {
            setUserType("buyer");
            if (userType === "farmer") {
              setSelected(false);
              console.log("Inside: ", userType);
            }
            console.log(userType);
          }}
        ></UserTypeButton>
        <UserTypeButton
          title={"Farmer"}
          isSelected={selected}
          onPress={() => {
            setUserType("farmer");
            if (userType === "buyer") {
              setSelected(true);
              console.log("Inside: ", userType);
            }
            console.log(userType);
          }}
        ></UserTypeButton>
      </View>

      <GreenButton
        title={"Sign Up"}
        onPress={() => handleSignUp(username, email, phone, userType, password)}
      ></GreenButton>
    </UnAuthBackground>
  );
};

export default SignUp;
