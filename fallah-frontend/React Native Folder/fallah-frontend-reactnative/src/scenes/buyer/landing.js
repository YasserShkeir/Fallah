import { useState, useEffect } from "react";
import { Text, View, Dimensions, StatusBar } from "react-native";
import { BottomNavigation } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerLandingAppBar from "../../components/organisms/BuyerLandingAppBar";
import { NavBarRoute } from "../../components/atoms/NavBarRoute";

// Styles
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = StatusBar.currentHeight;

const handleSeasonalItems = async (navigation) => {
  await getSeasonalItems(navigation);
};

const BuyerLanding = ({ navigation }) => {
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

  useEffect(() => {
    async function prepare(navigation) {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          return navigation.navigate("SignIn");
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare(navigation);
  }, []);

  handleSeasonalItems(navigation);
  return (
    <View style={{ height: "100%" }}>
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
    </View>
  );
};

export default BuyerLanding;
