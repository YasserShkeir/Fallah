import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const getSelfProducts = async (func) => {
  const url = usersURL + `product`;
  try {
    await axios.get(url, await configHandler()).then((response) => {
      func(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export const addFarmerItem = async (data) => {
  let {
    mainCategoryID,
    childCategoryID,
    productName,
    images,
    startingSeason,
    endingSeason,
    harvestedOn,
    pickupLocationID,
    freshnessStatus,
    measuringUnit,
    pricePerMeasuringUnit,
    minBulkAmount,
    bulkPrice,
    amountAvailable,
  } = data;

  const newProduct = {
    mainCategoryID: mainCategoryID,
    childCategoryID: childCategoryID,
    productName: productName,
    images: images,
    startingSeason: startingSeason,
    endingSeason: endingSeason,
    harvestedOn: harvestedOn,
    pickupLocationID: pickupLocationID,
    freshnessStatus: freshnessStatus,
    measuringUnit: measuringUnit,
    pricePerMeasuringUnit: pricePerMeasuringUnit,
    minBulkAmount: minBulkAmount,
    bulkPrice: bulkPrice,
    amountAvailable: amountAvailable,
  };

  let url = usersURL + `product`;
  try {
    await axios
      .post(url, newProduct, await configHandler())
      .then((response) => {
        console.log("Added Item");
      });
  } catch (error) {
    console.error("2: ", error);
  }
};

export const editFarmerItem = async (data) => {
  let {
    productID,
    categoryID,
    childCategoryID,
    productName,
    images,
    startingSeason,
    endingSeason,
    harvestedOn,
    pickupLocationID,
    freshnessStatus,
    measuringUnit,
    pricePerMeasuringUnit,
    minBulkAmount,
    bulkPrice,
    amountAvailable,
  } = data;

  const newProduct = {
    productID: productID,
    categoryID: categoryID,
    childCategoryID: childCategoryID,
    productName: productName,
    images: images,
    startingSeason: startingSeason,
    endingSeason: endingSeason,
    harvestedOn: harvestedOn,
    pickupLocationID: pickupLocationID,
    freshnessStatus: parseFloat(freshnessStatus),
    measuringUnit: measuringUnit,
    pricePerMeasuringUnit: parseFloat(pricePerMeasuringUnit),
    minBulkAmount: parseFloat(minBulkAmount),
    bulkPrice: parseFloat(bulkPrice),
    amountAvailable: parseFloat(amountAvailable),
  };

  let url = usersURL + `product`;
  try {
    await axios.put(url, newProduct, await configHandler()).then((response) => {
      console.log("Edited Item");
    });
  } catch (error) {
    console.error("2: ", error);
  }
};

export const deleteFarmerItem = async (data) => {
  let { categoryID, childCategoryID, productID } = data;

  const newProduct = {
    categoryID: categoryID,
    childCategoryID: childCategoryID,
    productID: productID,
  };

  let url = usersURL + `product`;
  try {
    await axios
      .delete(url, { data: newProduct }, await configHandler())
      .then((response) => {
        console.log("Deleted Item");
      });
  } catch (error) {
    console.error("2: ", error);
  }
};
