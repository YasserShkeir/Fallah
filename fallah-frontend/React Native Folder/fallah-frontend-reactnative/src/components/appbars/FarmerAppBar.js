import { Image } from "react-native";
import { Appbar } from "react-native-paper";
import { miscImages } from "../../assets/images";

// Styles
import { LIGHTGREEN } from "../../styles/colors";

const FarmerAppBar = ({ navigation }) => {
  return (
    <Appbar
      style={{
        backgroundColor: LIGHTGREEN,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        source={miscImages[0].src}
        style={{
          width: 150,
          height: 50,
        }}
      />
    </Appbar>
  );
};

export default FarmerAppBar;
