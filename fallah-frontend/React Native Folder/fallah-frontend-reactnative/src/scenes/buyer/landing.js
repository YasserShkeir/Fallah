import { useState, useEffect } from "react";
import { Text, View, Dimensions, StatusBar } from "react-native";
import { BottomNavigation } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerLandingAppBar from "../../components/organisms/BuyerLandingAppBar";

// Styles

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = StatusBar.currentHeight;

const handleSeasonalItems = async (navigation) => {
  await getSeasonalItems(navigation);
};

const BuyerLanding = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      focusedIcon: (props) => (
        <Ionicons {...props} name="home" adjustsFontSizeToFit={true} />
      ),
      unfocusedIcon: (props) => (
        <Ionicons {...props} name="home-outline" adjustsFontSizeToFit={true} />
      ),
    },
    {
      key: "search",
      focusedIcon: (props) => (
        <Ionicons {...props} name="search" adjustsFontSizeToFit={true} />
      ),
      unfocusedIcon: (props) => (
        <Ionicons
          {...props}
          name="search-outline"
          adjustsFontSizeToFit={true}
        />
      ),
    },
    {
      key: "recents",
      focusedIcon: (props) => (
        <CommunityIcon {...props} name="history" adjustsFontSizeToFit={true} />
      ),
      unfocusedIcon: (props) => (
        <CommunityIcon {...props} name="history" adjustsFontSizeToFit={true} />
      ),
    },
    {
      key: "profile",
      focusedIcon: (props) => (
        <CommunityIcon
          {...props}
          name="account-circle"
          adjustsFontSizeToFit={true}
        />
      ),
      unfocusedIcon: (props) => (
        <CommunityIcon
          {...props}
          name="account-circle-outline"
          adjustsFontSizeToFit={true}
        />
      ),
    },
  ]);

  const HomeRoute = () => <Text>Home</Text>;

  const SearchRoute = () => <Text>Search</Text>;

  const RecentsRoute = () => <Text>Recents</Text>;

  const ProfileRoute = () => <Text>Edit Profile</Text>;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    recents: RecentsRoute,
    profile: ProfileRoute,
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
      <BuyerLandingAppBar />
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
