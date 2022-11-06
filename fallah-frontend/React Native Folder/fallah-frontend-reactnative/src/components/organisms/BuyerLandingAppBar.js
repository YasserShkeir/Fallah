import { useState } from "react";
import { View } from "react-native";
import { Text, Appbar, Button, Menu } from "react-native-paper";
import { CREAMWHITE } from "../../styles/colors";

import BuyerAppBar from "../molecules/BuyerAppbar";

const BuyerLandingAppBar = () => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState("Location");

  const locationDummy = ["Location 1", "Location 2", "Location 3"];

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              textColor={CREAMWHITE}
              labelStyle={{ fontFamily: "Inter-Bold", height: "100%" }}
              style={{ height: 20 }}
              compact={true}
            >
              {location}
            </Button>
          }
        >
          {locationDummy.map((item) => (
            <Menu.Item
              key={item}
              onPress={() => {
                setLocation(item);
                closeMenu();
              }}
              title={item}
            />
          ))}
          <Menu.Item
            key={"Add Location"}
            title={"Add Location"}
            trailingIcon={"plus"}
            onPress={() => {
              closeMenu();
            }}
          />
        </Menu>
      </View>

      <Appbar.Action color={CREAMWHITE} icon="bell" onPress={() => {}} />
    </BuyerAppBar>
  );
};

export default BuyerLandingAppBar;
