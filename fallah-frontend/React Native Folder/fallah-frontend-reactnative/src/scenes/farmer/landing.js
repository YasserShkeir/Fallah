import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import FarmerBottomNavigation from "../../components/navbars/FarmerBottomNavigation";

const FarmerLanding = ({ navigation }) => {
  let isExpired = false;
  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwt_decode(token);
        // check if token is expired
        isExpired = !!(decoded.exp < Date.now() / 1000);
        if (isExpired) {
          console.log("No token found");
          AsyncStorage.removeItem("token");
          navigation.navigate("SignIn");
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [isExpired]);

  return <FarmerBottomNavigation navigation={navigation} />;
};

export default FarmerLanding;
