import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LOCALIP } from "@env";

export const getFarmers = async (func, id1) => {
  const url = `${LOCALIP}/users/farmer${id1 ? `/${id1}` : ""}`;
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

export const buyerGetFavourites = async (func) => {
  const url = `${LOCALIP}/users/farmer/following`;
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
