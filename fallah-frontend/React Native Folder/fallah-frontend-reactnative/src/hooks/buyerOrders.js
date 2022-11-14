import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LOCALIP } from "@env";

export const getRegularOrders = async (func, id) => {
  let url = `${LOCALIP}/users/regular-order`;
  const token = await AsyncStorage.getItem("token");
  url = url.replace(/"/g, "");
  if (id) {
    url = `${LOCALIP}/users/regular-order/${id}`;
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
  } else {
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
  }
};

export const getScheduledOrders = async (func, id) => {
  let url = `${LOCALIP}/users/scheduled-order`;
  const token = await AsyncStorage.getItem("token");
  url = url.replace(/"/g, "");
  if (id) {
    url = `${LOCALIP}/users/scheduled-order/${id}`;
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
  } else {
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
  }
};
