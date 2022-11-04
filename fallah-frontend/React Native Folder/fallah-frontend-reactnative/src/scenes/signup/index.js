import { View, ImageBackground, Button } from "react-native";

import loginBG from "../../assets/images/loginBG.jpg";

const SignUp = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "black" }}>
      <ImageBackground
        source={loginBG}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></ImageBackground>
    </View>
  );
};

export default SignUp;
