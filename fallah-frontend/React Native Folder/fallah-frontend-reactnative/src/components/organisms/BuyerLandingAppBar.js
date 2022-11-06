import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";

// Components
import BuyerAppBar from "../molecules/BuyerAppbar";
import AppbarLocationMenu from "../molecules/AppbarLocationMenu";
import AppbarLocationModal from "../molecules/AppbarLocationModal";

// Styles
import { CREAMWHITE } from "../../styles/colors";

const BuyerLandingAppBar = () => {
  return (
    <BuyerAppBar>
      <View style={{ display: "flex" }}>
        <Text
          style={{
            marginLeft: 8,
            marginBottom: 5,
            color: CREAMWHITE,
          }}
        >
          Deliver To:
        </Text>
        <AppbarLocationMenu />
        <AppbarLocationModal />
      </View>

      <Appbar.Action color={CREAMWHITE} icon="bell" onPress={() => {}} />
    </BuyerAppBar>
  );
};

export default BuyerLandingAppBar;
