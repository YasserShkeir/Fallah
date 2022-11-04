import { View, Image } from "react-native";

import loginLogo from "../../assets/images/LightLoginLogo.png";

const Test = () => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image source={loginLogo} style={{ width: 300, height: 150 }} />
    </View>
  );
};

export default Test;
