import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerBottomNavigation from "../../components/navbars/BuyerBottomNavigation";

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

  return <BuyerBottomNavigation navigation={navigation} />;
};

export default BuyerLanding;
