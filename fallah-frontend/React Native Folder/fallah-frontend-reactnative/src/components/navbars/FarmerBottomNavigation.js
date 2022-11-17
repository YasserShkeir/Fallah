// To Follow Best Practice for React Native, we should use Routing to navigate between pages
// Refer to Buyer Navigation for a similar approach

import { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { BottomNavigation, FAB } from "react-native-paper";

// Components
import { NavBarRoute } from "../buttons/NavBarRoute";
import FarmerAppBar from "../appbars/FarmerAppBar";

// Routes
import FarmerHomeRoute from "../../scenes/farmer/FarmerHomeRoute";
import FarmerProductsRoute from "../../scenes/farmer/FarmerProductsRoute";
import FarmerStatRoute from "../../scenes/farmer/FarmerStatRoute";
import FarmerProfileRoute from "../../scenes/farmer/FarmerProfileRoute";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const FarmerBottomNavigation = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    NavBarRoute({ key: "home" }),
    NavBarRoute({ key: "food-apple" }),
    NavBarRoute({ key: "chart-box" }),
    NavBarRoute({ key: "account" }),
  ]);

  // Add Components under each route here
  const HomeRoute = () => {
    return <FarmerHomeRoute navigation={navigation} />;
  };

  const ProductsRoute = () => {
    return <FarmerProductsRoute navigation={navigation} />;
  };

  const StatisticsRoute = () => {
    return <FarmerStatRoute navigation={navigation} />;
  };

  const ProfileRoute = () => {
    return <FarmerProfileRoute navigation={navigation} />;
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    "food-apple": ProductsRoute,
    "chart-box": StatisticsRoute,
    account: ProfileRoute,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: CREAMWHITE,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: "100%",
      }}
    >
      <FarmerAppBar navigation={navigation} />

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
      <FAB
        style={{ position: "absolute", right: 10, bottom: 85 }}
        icon="plus"
        onPress={() => navigation.navigate("FarmerAddItem")}
      />
    </SafeAreaView>
  );
};

export default FarmerBottomNavigation;
