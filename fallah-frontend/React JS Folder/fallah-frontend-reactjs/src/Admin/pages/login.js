import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingButton from "@mui/lab/LoadingButton";
import Textfield from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import adminLoginBG from "../assets/images/adminLoginBG.jpg";
import loginFormLogo from "../../Assets/images/Transparent Logos/2-Crop.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
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
          <form onSubmit={handleSubmit} className="flex flex-col w-72 gap-3">
            <Textfield
              error={error}
              helperText={error ? "Incorrect entry." : " "}
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
              error={error}
              helperText={error ? "Incorrect entry." : " "}
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
