import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";

// Components
import BuyerAppBarLayout from "../molecules/BuyerAppbarLayout";
import AppbarLocationMenu from "../molecules/BuyerAppbarLocationMenu";
import AppbarLocationModal from "../molecules/BuyerAppbarLocationModal";

// Styles
import { CREAMWHITE } from "../../styles/colors";

const BuyerAppBar = ({ page }) => {
  if (page === "home") {
    return (
      <BuyerAppBarLayout>
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
      </BuyerAppBarLayout>
    );
  }

  return (
    <BuyerAppBarLayout>
      <Appbar.Action color={CREAMWHITE} icon="arrow-left" onPress={() => {}} />
      <Appbar.Content title="Test" color={CREAMWHITE} />
    </BuyerAppBarLayout>
  );
};

export default BuyerAppBar;
