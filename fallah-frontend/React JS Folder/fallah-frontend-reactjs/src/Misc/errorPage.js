// Create an error page component to display when a page is not found or when a user is unauthorized to access a page

import React from "react";
import { Link } from "react-router-dom";

import farmer from "./errorPageFarmer.png";

const ErrorPage = () => {
  return (
    // display flex
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#23CE6B",
      }}
    >
      <img src={farmer} alt="Farmer" style={{ height: "250px" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "200px",
        }}
      >
        <p style={{ fontSize: "30px" }}>Page Not Found:</p>
        <p>
          Click
          <Link
            to="/"
            style={{ fontWeight: "600", color: "var(--cream-white)" }}
          >
            here
          </Link>
          to return to the home page.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
