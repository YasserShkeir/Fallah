import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const url = `${process.env.LOCALIP}:${process.env.PORT}/auth/register`;

    try {
      await axios.post(url, data);
      alert("Sign Up Successful");
    } catch (error) {
      console.error(error);
    }
  }
};

export const signin = async (email, password, navigation) => {
  const url = `${process.env.LOCALIP}:${process.env.PORT}/auth/login`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
      console.log(await AsyncStorage.getItem("token"));

      alert("Login Successful");
      navigation.navigate("BuyerLanding");
    } else {
      alert("Login Failed");
    }
  } catch (error) {
    console.error(error);
  }
};
