import { useEffect } from "react";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerBottomNavigation from "../../components/organisms/BuyerBottomNavigation";

// Styles

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";

const handleSeasonalItems = async (navigation) => {
  await getSeasonalItems(navigation);
};

const BuyerLanding = ({ navigation }) => {
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
      <BuyerBottomNavigation />
    </View>
  );
};

export default BuyerLanding;
