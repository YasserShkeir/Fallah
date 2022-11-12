import { React, useState, useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

import { Box } from "@mui/system";

import AdminLayout from "../components/AdminBodyLayout";
import AdminUserDataControl from "../components/AdminUserDataControl";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-fallah-jbobq",
  getUserToken: async () => {
    const token = localStorage.getItem("jwt");
    return token;
  },
});

const AdminUsersPage = () => {
  const [farmerSearch, setFarmerSearch] = useState("");
  const [buyerSearch, setBuyerSearch] = useState("");
  const [deleteFarmerID, setDeleteFarmerID] = useState("");
  const [deleteBuyerID, setDeleteBuyerID] = useState("");

  const farmersChart = sdk.createChart({
    chartId: "636e60b3-ef5e-47da-8e0c-bf0dc8ea2295",
    autoRefresh: true,
    maxDataAge: 20,
    background: "transparent",
    filter: farmerSearch
      ? {
          $or: [
            { name: { $regex: farmerSearch, $options: "i" } },
            { email: { $regex: farmerSearch, $options: "i" } },
            { phone: { $regex: farmerSearch, $options: "i" } },
          ],
        }
      : {},
  });

  const buyersChart = sdk.createChart({
    chartId: "a4b5017c-7aa9-4974-9ee7-8b81af8ccaf7",
    autoRefresh: true,
    maxDataAge: 20,
    background: "transparent",
    filter: buyerSearch
      ? {
          $or: [
            { name: { $regex: buyerSearch, $options: "i" } },
            { email: { $regex: buyerSearch, $options: "i" } },
            { phone: { $regex: buyerSearch, $options: "i" } },
          ],
        }
      : {},
  });

  useEffect(() => {
    farmersChart.render(document.getElementById("farmers-dashboard"));
    buyersChart.render(document.getElementById("buyers-dashboard"));
  }, [farmersChart, buyersChart]);

  return (
    <AdminLayout>
      <Box className="flex flex-col w-auto gap-3">
        <p className="font-bold text-lg">Users List</p>
        <AdminUserDataControl
          id="farmers"
          name="Farmers"
          searchValue={farmerSearch}
          search={setFarmerSearch}
          deleteValue={deleteFarmerID}
          delete={setDeleteFarmerID}
        />
        <AdminUserDataControl
          id="buyers"
          name="Buyers"
          searchValue={buyerSearch}
          search={setBuyerSearch}
          deleteValue={deleteBuyerID}
          delete={setDeleteBuyerID}
        />
      </Box>
    </AdminLayout>
  );
};

export default AdminUsersPage;
