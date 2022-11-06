import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getUserLocations = async (navigation, func) => {
  const url = `${process.env.LOCALIP}:${process.env.PORT}/users/location`;
  const token = await AsyncStorage.getItem("token");

  try {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        func(response);
      });
  } catch (error) {
    if (error.response.status === 401) {
      alert("Session Expired. Please Login Again");
      await AsyncStorage.removeItem("token");
      navigation.navigate("SignIn");
    } else {
      console.error(error);
    }
  }
};
