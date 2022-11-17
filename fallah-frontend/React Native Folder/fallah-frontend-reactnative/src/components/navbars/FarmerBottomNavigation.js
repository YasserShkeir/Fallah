// Unlike Buyer Bottom Nav, Farmer Bottom Nav will be based on AppBar

import { Appbar } from "react-native-paper";
import {
  CREAMWHITE,
  DARKGREEN,
  LIGHTGREEN,
  PEACHYYELLOW,
} from "../../styles/colors";

const FarmerBottomNavigation = ({ navigation }) => {
  return (
    <Appbar
      style={{
        backgroundColor: LIGHTGREEN,
        elevation: 0,
        borderTopWidth: 2,
        borderTopColor: PEACHYYELLOW,
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 15,
        bottom: 0,
        position: "absolute",
        width: "100%",
      }}
    >
      <Appbar.Action
        icon="home"
        color={CREAMWHITE}
        size={28}
        onPress={() => navigation.navigate("FarmerLanding")}
      />
      <Appbar.Action
        icon="home"
        color={CREAMWHITE}
        size={28}
        onPress={() => navigation.navigate("FarmerLanding")}
      />
      <Appbar.Action
        icon="plus"
        color={CREAMWHITE}
        size={50}
        style={{
          marginBottom: 65,
          backgroundColor: PEACHYYELLOW,
        }}
        onPress={() => navigation.navigate("FarmerAddProduct")}
      />
      <Appbar.Action
        icon="home"
        color={CREAMWHITE}
        size={28}
        onPress={() => navigation.navigate("FarmerLanding")}
      />
      <Appbar.Action
        icon="account"
        color={CREAMWHITE}
        size={28}
        onPress={() => navigation.navigate("FarmerProfile")}
      />
    </Appbar>
  );
};

export default FarmerBottomNavigation;
