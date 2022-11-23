import axios from "axios";

import { configHandler, baseURLs } from "./config";

const usersURL = baseURLs.users;

export const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.name,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const updateImage = async (response) => {
  const url = `${usersURL}/user/edit-profile-image`;
  const data = {
    imgSrc: response,
  };

  const res = await axios
    .post(url, data, await configHandler())
    .catch((err) => {
      console.log("update: ", err);
    });
};
