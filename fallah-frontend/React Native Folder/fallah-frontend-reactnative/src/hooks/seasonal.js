import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP } from "@env";

export const getSeasonalItems = async (func) => {
  let url = `${LOCALIP}/users/seasonal`;
  url = url.replace(/"/g, "");
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
    console.error(error);
  }
};
