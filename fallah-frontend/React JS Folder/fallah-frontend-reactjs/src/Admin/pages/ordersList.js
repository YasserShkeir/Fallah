import { React, useEffect } from "react";
import { Box } from "@mui/material";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import AdminLayout from "../components/AdminBodyLayout";

const sdk = new ChartsEmbedSDK({
  baseUrl: "https://charts.mongodb.com/charts-fallah-jbobq",
  getUserToken: async () => {
    const token = localStorage.getItem("jwt");
    return token;
  },
});

const AdminOrdersPage = () => {
  const regularOrdersChart = sdk.createChart({
    chartId: "63703f0c-02c9-4dea-8185-f6da73666e64",
    autoRefresh: true,
    maxDataAge: 60,
    background: "transparent",
  });

  const scheduledOrdersChart = sdk.createChart({
    chartId: "6370509b-e681-4189-813e-94288a741420",
    autoRefresh: true,
    maxDataAge: 60,
    background: "transparent",
  });

  useEffect(() => {
    regularOrdersChart.render(document.getElementById("regularOrdersChart"));
    scheduledOrdersChart.render(
      document.getElementById("scheduledOrdersChart")
    );
  }, [regularOrdersChart, scheduledOrdersChart]);

  return (
    <AdminLayout>
      <p className="font-bold text-lg">Orders List</p>
      <Box id="regularOrdersChart" className="h-full min-w-80 flex-grow"></Box>
      <Box
        id="scheduledOrdersChart"
        className="h-full min-w-80 flex-grow"
      ></Box>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
