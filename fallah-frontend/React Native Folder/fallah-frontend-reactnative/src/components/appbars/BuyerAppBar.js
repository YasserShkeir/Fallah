import { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const BuyerAppBar = ({ page, navigation }) => {
  const [value, setValue] = useState("Past Orders");

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
  } else if (page === "search") {
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
  } else if (page === "orders") {
    return (
      <BuyerAppBarLayout>
        <Button
          onPress={() => {
            setValue("Past Orders");
          }}
          style={{
            borderRadius: 0,
            width: "50%",
            ...(value === "Past Orders"
              ? { borderBottomWidth: 2, borderBottomColor: CREAMWHITE }
              : {}),
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Bold",
              color: value === "Past Orders" ? CREAMWHITE : DARKGREEN,
              fontSize: 16,
            }}
          >
            Past Orders
          </Text>
        </Button>
        <Button
          onPress={() => {
            setValue("Scheduled Orders");
          }}
          style={{
            borderRadius: 0,
            width: "50%",
            ...(value === "Scheduled Orders"
              ? { borderBottomWidth: 2, borderBottomColor: CREAMWHITE }
              : {}),
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Bold",
              color: value === "Scheduled Orders" ? CREAMWHITE : DARKGREEN,
              fontSize: 16,
            }}
          >
            Scheduled Orders
          </Text>
        </Button>
      </BuyerAppBarLayout>
    );
  } else if (page === "profile") {
    return (
      <BuyerAppBarLayout>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            mode="contained"
            icon={() => (
              <FontAwesome5 name="sign-out-alt" size={18} color={CREAMWHITE} />
            )}
            buttonColor="red"
            style={{ width: 140 }}
            contentStyle={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
            }}
            labelStyle={{
              fontFamily: "Inter-Bold",
              color: CREAMWHITE,
              fontSize: 18,
            }}
            onPress={async () => {
              // TODO: Logout
              await AsyncStorage.removeItem("token");
              navigation.navigate("SignIn");
            }}
          >
            Logout
          </Button>
        </View>
      </BuyerAppBarLayout>
    );
  }

  console.log("Error: Invalid page name", page);

  return (
    <BuyerAppBarLayout>
      <Appbar.Action color={CREAMWHITE} icon="arrow-left" onPress={() => {}} />
      <Appbar.Content title="Test" color={CREAMWHITE} />
    </BuyerAppBarLayout>
  );
};

export default BuyerAppBar;
