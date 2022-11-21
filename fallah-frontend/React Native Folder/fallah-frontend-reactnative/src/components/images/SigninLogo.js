import { View, Image } from "react-native";
import { miscImages } from "../../assets/images";

const SigninLogo = () => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image source={miscImages[1].src} style={{ width: 300, height: 150 }} />
    </View>
  );
};

export default SigninLogo;
