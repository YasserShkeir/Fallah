import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSeasonalItems = async (navigation) => {
  const url = `${process.env.LOCALIP}:${process.env.PORT}/users/seasonal`;
  const token = await AsyncStorage.getItem("token");
  try {
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
