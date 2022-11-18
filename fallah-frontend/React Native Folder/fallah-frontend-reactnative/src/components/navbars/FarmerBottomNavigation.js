// To Follow Best Practice for React Native, we should use Routing to navigate between pages
// Refer to Buyer Navigation for a similar approach

import { useState } from "react";
import { SafeAreaView, StatusBar, Dimensions } from "react-native";
import { BottomNavigation, FAB } from "react-native-paper";

// Components
import { NavBarRoute } from "../buttons/NavBarRoute";
import FarmerAppBar from "../appbars/FarmerAppBar";

// Routes
import FarmerHomeRoute from "../../scenes/farmer/FarmerHomeRoute";
import FarmerProfileRoute from "../../scenes/farmer/FarmerProfileRoute";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

const FarmerBottomNavigation = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    NavBarRoute({ key: "home" }),
    NavBarRoute({ key: "account" }),
  ]);

  // Add Components under each route here
  const HomeRoute = () => {
    return <FarmerHomeRoute navigation={navigation} />;
  };

  const ProfileRoute = () => {
    return <FarmerProfileRoute navigation={navigation} />;
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
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
        style={{
          position: "absolute",
          right: width / 2 - 35,
          bottom: 50,
          backgroundColor: DARKGREEN,
          borderRadius: 50,
        }}
        color={CREAMWHITE}
        icon="plus"
        onPress={() => navigation.navigate("FarmerAddItem")}
      />
    </SafeAreaView>
  );
};

export default FarmerBottomNavigation;
