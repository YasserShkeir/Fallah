import { Image } from "react-native";
import { Appbar } from "react-native-paper";

// Styles
import { LIGHTGREEN } from "../../styles/colors";

const FarmerAppBar = ({ navigation }) => {
  return (
    <Appbar
      style={{
        backgroundColor: LIGHTGREEN,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        source={require("../../assets/images/DarkLogo.png")}
        style={{
          width: 150,
          height: 50,
        }}
      />
    </Appbar>
  );
};

export default FarmerAppBar;
