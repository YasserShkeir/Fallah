import { useState } from "react";
import { BottomNavigation } from "react-native-paper";

// Components
import { NavBarRoute } from "../buttons/NavBarRoute";

// Routes
import BuyerHomeRoute from "../../scenes/buyer/BuyerHomeRoute";
import BuyerSearchRoute from "../../scenes/buyer/BuyerSearchRoute";
import BuyerOrdersRoute from "../../scenes/buyer/BuyerOrdersRoute";
import BuyerProfileRoute from "../../scenes/buyer/BuyerProfileRoute";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

// Hooks

const BuyerBottomNavigation = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    NavBarRoute({ key: "home" }),
    NavBarRoute({ key: "magnify" }),
    NavBarRoute({ key: "history" }),
    NavBarRoute({ key: "account" }),
  ]);

  // Add Components under each route here
  const HomeRoute = () => {
    return <BuyerHomeRoute />;
  };

  const SearchRoute = () => {
    return <BuyerSearchRoute />;
  };
  const RecentsRoute = () => <BuyerOrdersRoute />;

  const ProfileRoute = () => <BuyerProfileRoute navigation={navigation} />;

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
        width: "100%",
        justifyContent: "center",
      }}
      activeColor={DARKGREEN}
      inactiveColor={CREAMWHITE}
      labeled={false}
    />
  );
};

export default BuyerBottomNavigation;
