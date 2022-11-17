import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALIP } from "@env";

export const signup = async (username, email, phone, userType, password) => {
  const data = {
    name: username,
    email: email,
    phone: phone,
    userType: userType,
    password: password,
  };

  // Check credentials
  if (username === "" || email === "" || phone === "" || password === "") {
    alert("Please fill in all the fields");
  } else {
    let url = `${LOCALIP}/auth/register`;
    url = url.replace(/"/g, "");
    try {
      await axios.post(url, data);
      alert("Sign Up Successful");
    } catch (error) {
      console.error(error);
    }
  }
};

export const signin = async (email, password, navigation) => {
  let url = `${LOCALIP}/auth/login`;
  url = url.replace(/"/g, "");
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("userType", response.data.userType);

      alert("Login Successful");
      response.data.userType === "buyer"
        ? navigation.navigate("BuyerLanding")
        : navigation.navigate("FarmerLanding");
    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
  }
};
