import React, { useState } from "react";
import { Link } from "react-router-dom";

import adminLoginBG from "../assets/images/adminLoginBG.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${adminLoginBG})`,
      }}
      className="h-screen bg-cover bg-center bg-no-repeat"
    >
      <div>
        <h1>Admin Portal Sign In</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
