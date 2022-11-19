import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const createRegularOrder = async (data) => {
  const deliveryLocationID = data;
  console.log("deliveryLocationID", deliveryLocationID);
  let url = usersURL + `regular-order`;
  try {
    await axios
      .post(
        url,

        {
          deliveryLocationID: deliveryLocationID,
        },
        await configHandler()
      )
      .then((response) => {
        console.log("Added Order");
      });
  } catch (error) {
    console.error("Error API: ", error);
  }
};

export const deleteRegularOrder = async (id) => {
  let url = usersURL + `regular-order`;
  try {
    await axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
        },
        data: {
          regularOrderID: id,
        },
      })
      .then((response) => {
        console.log("Deleted Order");
      });
  } catch (error) {
    console.error("Error API: ", error);
  }
};

export const updateRegularOrderLocation = async (orderID, locationID) => {
  let url = usersURL + `regular-order/location`;
  try {
    await axios
      .put(
        url,
        {
          regularOrderID: orderID,
          deliveryLocationID: locationID,
        },
        await configHandler()
      )
      .then((response) => {
        console.log("Updated Order Location");
      });
  } catch (error) {
    console.error("Error API: ", error);
  }
};

export const addProductToRegularOrder = async (payload) => {
  const {
    regularOrderID,
    mainCategoryID,
    childCategoryID,
    productID,
    quantity,
  } = payload;
  let url = usersURL + `regular-order/product`;
  try {
    await axios
      .post(
        url,
        {
          regularOrderID: regularOrderID,
          mainCategoryID: mainCategoryID,
          childCategoryID: childCategoryID,
          productID: productID,
          quantity: quantity,
        },
        await configHandler()
      )
      .then((response) => {
        console.log("Added Product to Order");
      });
  } catch (error) {
    console.error("Error API: ", error);
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
