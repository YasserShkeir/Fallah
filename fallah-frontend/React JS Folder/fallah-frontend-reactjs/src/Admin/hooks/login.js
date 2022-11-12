import axios from "axios";

export const login = async (
  email,
  password,
  setLoading,
  setError,
  navigate
) => {
  await axios
    .post("http://localhost:3000/auth/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      // check if email ends with @fallah.com
      if (email.endsWith("@fallah.com")) {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("username", res.data.username);
        navigate("/admin/home");
      } else {
        setError(true);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err.message);
      setError(true);
    });
};
