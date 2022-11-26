import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { LOCALIP } from "@env";

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

export const pickImage = async (setImage, id) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const photo = {
      name: new Date().getTime().toString(),
      type: "image/jpg",
      uri: result.uri,
    };

    const data = createFormData(photo, { userId: id });

    if (data) {
      try {
        const response = await axios.post(`${LOCALIP}/api/upload`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        const updatedImage = response.data.message;
        setImage(updatedImage);
        return [result.uri, updatedImage];
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const updateImage = async (response) => {
  const url = `${usersURL}/user/edit-profile-image`;
  const data = {
    imgSrc: response,
  };
  try {
    await axios.post(url, data, await configHandler());
  } catch (error) {
    console.error(error);
  }
};
