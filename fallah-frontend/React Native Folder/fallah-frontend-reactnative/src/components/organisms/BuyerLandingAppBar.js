import { useState } from "react";
import { View } from "react-native";
import { Text, Appbar, Button, Menu } from "react-native-paper";
import { CREAMWHITE } from "../../styles/colors";

import BuyerAppBar from "../molecules/BuyerAppbar";
import AppbarLocationMenu from "../molecules/AppbarLocationMenu";
import AppbarLocationModal from "../molecules/AppbarLocationModal";

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
