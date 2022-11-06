import { useEffect } from "react";
import { Text, View, TextInput, Dimensions, StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHTGREEN } from "../../styles/colors";

// Components

// Styles

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = StatusBar.currentHeight;

const handleSeasonalItems = async (navigation) => {
  await getSeasonalItems(navigation);
};

const BuyerLanding = ({ navigation }) => {
  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          return navigation.navigate("SignIn");
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  handleSeasonalItems(navigation);
  return (
    <View>
      <View
        style={{
          height: statusBarHeight + 70,
          width: windowWidth,
          backgroundColor: LIGHTGREEN,
        }}
      ></View>
      <Text onPress={() => AsyncStorage.clear()}>Buyer Landing</Text>
    </View>
  );
};

export default BuyerLanding;
