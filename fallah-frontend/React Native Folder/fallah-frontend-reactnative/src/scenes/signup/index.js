import { useState } from "react";
import { View, TextInput } from "react-native";

import { Text } from "react-native-paper";

// Components
import GreenButton from "../../components/buttons/GreenButton";
import UserTypeButton from "../../components/buttons/UserTypeButton";
import UnAuthBackground from "../../components/images/UnauthorizedBG";

// Styles
import { SignUpButtonContainer } from "../../styles/components";
import { LIGHTGREEN } from "../../styles/colors";
import { TextFieldWhite } from "../../styles/components";

// Hooks
import { signup } from "../../hooks/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [selected, setSelected] = useState(false);
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await signup(username, email, phone, userType, password);
  };

  return (
    <UnAuthBackground>
      <Text
        style={{
          color: LIGHTGREEN,
          fontFamily: "Inter-Bold",
          fontSize: 32,
          marginBottom: 20,
        }}
      >
        Create an Account
      </Text>

      <TextInput
        style={TextFieldWhite}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={TextFieldWhite}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        style={TextFieldWhite}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        value={phone}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        req
      />

      <TextInput
        style={TextFieldWhite}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <View style={SignUpButtonContainer}>
        <UserTypeButton
          title={"Buyer"}
          isSelected={!selected}
          onPress={async () => {
            setUserType("buyer");
            if (userType === "farmer") {
              setSelected(false);
            }
          }}
        ></UserTypeButton>
        <UserTypeButton
          title={"Farmer"}
          isSelected={selected}
          onPress={() => {
            setUserType("farmer");
            if (userType === "buyer") {
              setSelected(true);
            }
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
