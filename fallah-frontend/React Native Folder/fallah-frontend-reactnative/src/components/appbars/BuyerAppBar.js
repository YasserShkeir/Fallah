import { View } from "react-native";
import { Text, Appbar, Searchbar, Button } from "react-native-paper";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Components
import BuyerAppBarLayout from "../layouts/BuyerAppbarLayout";
import AppbarLocationMenu from "../menus/BuyerAppbarLocationMenu";
import AppbarLocationModal from "../modals/BuyerAppbarLocationModal";

// Styles
import { CREAMWHITE, DARKGREEN } from "../../styles/colors";

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

  // Add other pages here
  else if (page === "magnify") {
    return (
      <BuyerAppBarLayout>
        <Searchbar
          icon={() => (
            <FontAwesome5 name="search" size={20} color={DARKGREEN} />
          )}
          placeholder="Search"
          placeholderTextColor={DARKGREEN}
          inputStyle={{ fontFamily: "Inter-Bold", color: DARKGREEN }}
          style={{
            borderRadius: 10,
            width: "70%",
            height: 40,
          }}
        ></Searchbar>
        <Button
          icon={() => (
            <MaterialCommunityIcons
              name="filter-variant"
              size={26}
              color={CREAMWHITE}
            />
          )}
          mode="contained"
          buttonColor={DARKGREEN}
          onPress={() => console.log("Pressed")}
          contentStyle={{ flexDirection: "row-reverse" }}
          labelStyle={{
            fontFamily: "Inter-Bold",
            color: CREAMWHITE,
            fontSize: 16,
          }}
          style={{
            borderRadius: 10,
            width: "27%",
          }}
        >
          Filter
        </Button>
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
