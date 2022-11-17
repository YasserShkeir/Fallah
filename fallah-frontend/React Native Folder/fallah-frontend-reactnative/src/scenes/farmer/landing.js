import { useEffect } from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import FarmerAppBar from "../../components/appbars/FarmerAppBar";
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
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: "100%",
      }}
    >
      <FarmerAppBar navigation={navigation} />
      <FarmerBottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default FarmerLanding;
