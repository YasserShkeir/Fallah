import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const FarmerLanding = ({ navigation }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwt_decode(token);
        // check if token is expired
        setIsExpired(!!(decoded.exp < Date.now() / 1000));
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return <Text>{isExpired ? "Expired" : "Not Expired"}</Text>;
};

export default FarmerLanding;
