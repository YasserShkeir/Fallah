import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const getRegularOrders = async (func, id) => {
  let url = usersURL + `regular-order`;
  if (id) {
    url = usersURL + `regular-order/${id}`;
    try {
      await axios.get(url, await configHandler()).then((response) => {
        func(response);
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await axios.get(url, await configHandler()).then((response) => {
        func(response);
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const getScheduledOrders = async (func, id) => {
  let url = usersURL + `scheduled-order`;
  if (id) {
    url = usersURL + `scheduled-order/${id}`;
    try {
      await axios.get(url, await configHandler()).then((response) => {
        func(response);
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await axios.get(url, await configHandler()).then((response) => {
        func(response);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
