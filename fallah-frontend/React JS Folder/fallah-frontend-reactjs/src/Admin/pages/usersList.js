import { React, useState, useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";

import AdminLayout from "../components/bodyLayout";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-fallah-jbobq",
  getUserToken: async () => {
    const token = localStorage.getItem("jwt");
    return token;
  },
});

const AdminUsersPage = () => {
  const [farmerSearch, setFarmerSearch] = useState("");

  const farmersChart = sdk.createChart({
    chartId: "636e60b3-ef5e-47da-8e0c-bf0dc8ea2295",
    // IF farmerSearch is entered in the search bar, filter the chart by the search term
    filter: farmerSearch
      ? {
          $or: [
            { name: { $regex: farmerSearch, $options: "i" } },
            { email: { $regex: farmerSearch, $options: "i" } },
          ],
        }
      : {},
  });

  useEffect(() => {
    farmersChart.render(document.getElementById("farmers-dashboard"));
  }, [farmersChart]);

  return (
    <AdminLayout>
      <Box className="flex flex-col h-full w-auto my-8 gap-3">
        <Box id="farmers" className="h-1/2 w-auto flex gap-3">
          <Box
            className="flex flex-col h-full w-64 px-4 py-3 gap-2"
            style={{ backgroundColor: "white" }}
          >
            <Typography variant="h6" className="text-dark-green font-bold">
              Farmers Controller
            </Typography>
            <TextField
              label="Search Farmer"
              variant="outlined"
              size="small"
              className="w-full my-2"
              value={farmerSearch}
              onChange={(e) => {
                setFarmerSearch(e.target.value);
              }}
            />
          </Box>
          <Box
            id="farmers-dashboard"
            className="h-full min-w-80 flex-grow"
          ></Box>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminUsersPage;
