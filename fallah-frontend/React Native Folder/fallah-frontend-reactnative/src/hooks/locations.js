import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const getUserLocations = async (func) => {
  const url = usersURL + `location`;
  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const addLocation = async (location) => {
  const url = usersURL + `location`;
  try {
    await axios.post(url, location, await configHandler()).then((response) => {
      console.log("Added Location");
    });
  } catch (error) {
    console.error(error);
  }
};
