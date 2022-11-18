import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

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
