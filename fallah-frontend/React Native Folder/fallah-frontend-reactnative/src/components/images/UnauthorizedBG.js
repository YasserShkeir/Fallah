import { ImageBackground } from "react-native";

// Assets
import loginBG from "../../assets/images/loginBG.jpg";

// Styles
import { UNAUTHBG } from "../../styles/components";

const UnAuthBackground = ({ children }) => {
  return (
    <ImageBackground source={loginBG} style={UNAUTHBG}>
      {children}
    </ImageBackground>
  );
};

export default UnAuthBackground;
