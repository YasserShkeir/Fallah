import { useEffect } from "react";
import jwt_decode from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import BuyerBottomNavigation from "../../components/navbars/BuyerBottomNavigation";

const BuyerLanding = ({ navigation }) => {
  useEffect(() => {
    async function prepare(navigation) {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwt_decode(token);
        // check if token is expired
        if (decoded.exp < Date.now() / 1000) {
          console.log("No token found");
          AsyncStorage.removeItem("token");
          navigation.navigate("SignIn");
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
