import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP } from "@env";

export const getSeasonalItems = async (navigation) => {
  const url = `${LOCALIP}/users/seasonal`;

  const token = await AsyncStorage.getItem("token");

  try {
    await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
