import { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import { BottomNavigation } from "react-native-paper";

// Components
import BuyerLandingAppBar from "../../components/organisms/BuyerLandingAppBar";
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

  const HomeRoute = () => {
    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <BuyerLandingAppBar />
        <Text>Home</Text>
      </View>
    );
  };

  const SearchRoute = () => <Text>Search</Text>;

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
