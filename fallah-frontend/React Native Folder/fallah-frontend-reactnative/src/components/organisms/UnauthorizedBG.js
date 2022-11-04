import { ImageBackground } from "react-native";

import loginBG from "../../assets/images/loginBG.jpg";
import { UNAUTHBG } from "../../styles/components";

const UnAuthBackground = ({ children }) => {
  return (
    <ImageBackground source={loginBG} style={UNAUTHBG}>
      {children}
    </ImageBackground>
  );
};

export default UnAuthBackground;
