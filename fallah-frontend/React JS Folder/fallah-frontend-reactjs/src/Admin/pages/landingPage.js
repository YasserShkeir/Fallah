import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

import { Box } from "@mui/material";

import AdminLayout from "../components/AdminBodyLayout";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-fallah-jbobq",
  maxDataAge: 300,
  background: "transparent",
  getUserToken: async () => {
    const token = localStorage.getItem("jwt");
    return token;
  },
});

const AdminLandingPage = () => {
  const [authenticated] = useState(localStorage.getItem("jwt"));

  const dashboard = sdk.createDashboard({
    dashboardId: "636bdb19-bdee-41ad-83b2-c4a037701972",
  });

  useEffect(() => {
    dashboard.render(document.getElementById("dashboard"));
  }, [dashboard]);

  if (authenticated === null) {
    return <Navigate replace to="/admin" />;
  } else {
    const username = localStorage.getItem("username");
    return (
      <AdminLayout>
        <p className="text-4xl font-bold text-dark-green">Welcome {username}</p>
        <Box
          id="dashboard"
          className="h-full w-auto my-8 border-light-green border-2"
        >
          <p>Loading...</p>
        </Box>
      </AdminLayout>
    );
  }
};

export default AdminLandingPage;
