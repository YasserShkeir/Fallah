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
      const response = await axios.post(url, data);
      console.log(response.data.message);
      alert("Sign Up Successful");
    } catch (error) {
      console.error(error);
    }
  }
};
