import { react, useState } from "react";

import { Text, TextInput } from "react-native";

import UnAuthBackground from "../../components/organisms/UnauthorizedBG";
import { LIGHTGREEN } from "../../styles/colors";
import { CREAMWHITETEXTFIELD } from "../../styles/components";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");

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
      />

      <TextInput
        style={CREAMWHITETEXTFIELD}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
    </UnAuthBackground>
  );
};

export default SignUp;
