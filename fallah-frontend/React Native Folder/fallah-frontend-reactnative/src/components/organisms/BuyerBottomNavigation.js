import { useState } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { BottomNavigation, Button } from "react-native-paper";

// Components
import BuyerAppBar from "./BuyerAppBar";
import BuyerMainLayout from "../../components/molecules/BuyerMainLayout";
import { NavBarRoute } from "../../components/atoms/NavBarRoute";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

// Hooks

const windowWidth = Dimensions.get("window").width;

const BuyerBottomNavigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    NavBarRoute({ key: "home" }),
    NavBarRoute({ key: "magnify" }),
    NavBarRoute({ key: "history" }),
    NavBarRoute({ key: "account" }),
  ]);

  // Add Components under each route here
  const HomeRoute = () => {
    return (
      <BuyerMainLayout>
        <BuyerAppBar page="home" />
        <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Button style={{ width: "100%", backgroundColor: "black" }}>
            <Text>Test</Text>
          </Button>
        </ScrollView>
      </BuyerMainLayout>
    );
  };

  const SearchRoute = () => {
    return (
      <BuyerMainLayout>
        <BuyerAppBar page="magnify" />
        <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Button style={{ width: "100%", backgroundColor: "black" }}>
            <Text>Test</Text>
          </Button>
        </ScrollView>
      </BuyerMainLayout>
    );
  };
  const RecentsRoute = () => <Text>Recents</Text>;

  const ProfileRoute = () => <Text>Edit Profile</Text>;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    magnify: SearchRoute,
    history: RecentsRoute,
    account: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: LIGHTGREEN,
        height: 70,
        width: windowWidth,
        justifyContent: "center",
      }}
      activeColor={DARKGREEN}
      inactiveColor={CREAMWHITE}
      labeled={false}
    />
  );
};

export default BuyerBottomNavigation;
