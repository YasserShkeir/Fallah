import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const getFarmers = async (func, id1) => {
  const url = usersURL + `/farmer${id1 ? `/${id1}` : ""}`;
  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const buyerGetFavourites = async (func) => {
  const url = usersURL + `farmer/following`;
  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const getFollowing = async (func) => {
  const url = usersURL + `farmer/following`;
  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const followFarmer = async (id) => {
  const url = usersURL + `farmer/follow`;
  try {
    await axios
      .post(
        url,
        {
          id: id,
        },
        await configHandler()
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error(error);
  }
};

export const unfollowFarmer = async (id) => {
  const url = usersURL + `farmer/unfollow`;
  try {
    await axios
      .post(
        url,
        {
          id: id,
        },
        await configHandler()
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error(error);
  }
};
