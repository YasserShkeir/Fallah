import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerBottomNavigation from "../../components/navbars/BuyerBottomNavigation";

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
          console.log("No token found");
          return navigation.navigate("SignIn");
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare(navigation);
  }, []);

  handleSeasonalItems(navigation);
  return <BuyerBottomNavigation navigation={navigation} />;
};

export default BuyerLanding;
