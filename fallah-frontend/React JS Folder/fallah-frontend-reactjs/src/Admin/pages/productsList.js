import { React, useState, useEffect } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

import { Box } from "@mui/system";
import AdminLayout from "../components/AdminBodyLayout";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-fallah-jbobq",
  getUserToken: async () => {
    const token = localStorage.getItem("jwt");
    return token;
  },
});

const AdminProductsPage = () => {
  const products = sdk.createChart({
    chartId: "6377db7f-5294-42d8-8601-4e0b551e636e",
    autoRefresh: true,
    maxDataAge: 600,
    background: "transparent",
  });

  useEffect(() => {
    products.render(document.getElementById("products-dashboard"));
  }, [products]);

  return (
    <AdminLayout>
      <p className="font-bold text-lg">Products List</p>
      <Box
        id="products-dashboard"
        className="h-full w-auto my-8 border-light-green border-2"
      >
        <p>Loading...</p>
      </Box>
    </AdminLayout>
  );
};

export default AdminProductsPage;
