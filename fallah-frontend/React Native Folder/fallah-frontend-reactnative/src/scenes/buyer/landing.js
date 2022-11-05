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
  const checkToken = async (navigation) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return navigation.navigate("SignIn");
    }
  };
  checkToken(navigation);
  handleSeasonalItems(navigation);
  return (
    <View>
      <View
        style={{
          marginTop: statusBarHeight,
          height: 70,
          width: windowWidth,
          backgroundColor: LIGHTGREEN,
        }}
      ></View>
      <Text onPress={() => AsyncStorage.clear()}>Buyer Landing</Text>
    </View>
  );
};

export default BuyerLanding;
