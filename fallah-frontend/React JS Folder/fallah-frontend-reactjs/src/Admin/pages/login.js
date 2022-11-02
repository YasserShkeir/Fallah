import React, { useState } from "react";
import axios from "axios";

import LoadingButton from "@mui/lab/LoadingButton";
import Textfield from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import adminLoginBG from "../assets/images/adminLoginBG.jpg";
import loginFormLogo from "../../Assets/images/Transparent Logos/2-Crop.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${adminLoginBG})`,
      }}
      className="flex h-screen bg-cover bg-center bg-no-repeat justify-center items-center"
    >
      <Grid
        container
        className="bg-light-green rounded-3xl border-4 border-cream-white px-7 py-9 w-fit justify-center items-center gap-10"
        width={"fit-content"}
      >
        <Grid item className="h-44">
          <img src={loginFormLogo} alt="logo" className="h-full" />
        </Grid>
        <div className="flex flex-col gap-6 min-h-full">
          <p className="text-2xl font-bold text-cream-white ">
            Admin Portal Sign In
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col w-72 gap-8">
            <Textfield
              inputProps={{ style: { color: "var(--cream-white)" } }}
              color="creamWhite"
              required
              size="small"
              label="E-mail"
              variant="filled"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textfield
              inputProps={{ style: { color: "var(--cream-white)" } }}
              color="creamWhite"
              required
              size="small"
              label="Password"
              variant="filled"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              color="creamWhite"
              className="hover:text-white w-fit self-end"
              type="submit"
            >
              Sign In
            </LoadingButton>
          </form>
        </div>
      </Grid>
    </div>
  );
};

export default AdminLogin;
