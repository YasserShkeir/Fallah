import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LOCALIP } from "@env";

export const getUserLocations = async (func) => {
  let url = `${LOCALIP}/users/location`;
  const token = await AsyncStorage.getItem("token");
  url = url.replace(/"/g, "");
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
    console.error(error);
  }
};
