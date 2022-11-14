import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const getSeasonalItems = async (func) => {
  const url = usersURL + `seasonal`;

  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};
