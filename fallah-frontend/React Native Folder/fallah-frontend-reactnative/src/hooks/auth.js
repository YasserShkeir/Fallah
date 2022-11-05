import axios from "axios";

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
