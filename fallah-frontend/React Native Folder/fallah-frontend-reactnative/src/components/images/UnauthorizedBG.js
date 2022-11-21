import { ImageBackground } from "react-native";

// Assets
import { miscImages } from "../../assets/images";

// Styles
import { UNAUTHBG } from "../../styles/components";

const UnAuthBackground = ({ children }) => {
  return (
    <ImageBackground source={miscImages[2].src} style={UNAUTHBG}>
      {children}
    </ImageBackground>
  );
};

export default UnAuthBackground;
