import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LOCALIP } from "@env";

export const getFarmers = async (func, id1) => {
  let url = `${LOCALIP}/users/farmer${id1 ? `/${id1}` : ""}`;
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

export const buyerGetFavourites = async (func) => {
  let url = `${LOCALIP}/users/farmer/following`;
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

export const getFollowing = async (func) => {
  let url = `${LOCALIP}/users/farmer/following`;
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

export const followFarmer = async (id) => {
  let url = `${LOCALIP}/users/farmer/follow`;
  const token = await AsyncStorage.getItem("token");
  url = url.replace(/"/g, "");
  try {
    await axios
      .post(
        url,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unfollowFarmer = async (id) => {
  let url = `${LOCALIP}/users/farmer/unfollow`;
  const token = await AsyncStorage.getItem("token");
  url = url.replace(/"/g, "");
  console.log(id);
  try {
    await axios
      .post(
        url,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error(error);
  }
};
