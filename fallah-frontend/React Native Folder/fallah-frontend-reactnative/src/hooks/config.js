import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP } from "@env";

export const configHandler = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const baseURLs = {
  users: `${LOCALIP}/users/`,
};
