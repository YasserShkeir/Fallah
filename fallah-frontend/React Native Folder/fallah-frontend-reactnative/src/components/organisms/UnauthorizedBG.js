import { View, ImageBackground } from "react-native";

import loginBG from "../../assets/images/loginBG.jpg";

const UnAuthBackground = ({ children }) => {
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
        {children}
      </ImageBackground>
    </View>
  );
};

export default UnAuthBackground;
