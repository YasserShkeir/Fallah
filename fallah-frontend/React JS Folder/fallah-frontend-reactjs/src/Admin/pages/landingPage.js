import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { Box, CircularProgress, Grid } from "@mui/material";

import AdminNavigationBar from "../components/navigationBar";

const AdminLandingPage = () => {
  const [authenticated] = useState(localStorage.getItem("jwt"));
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("http://localhost:3000/admin/users", tokenConfig).then((res) => {
      setUsers(res.data);
    });

    axios.get("http://localhost:3000/admin/orders", tokenConfig).then((res) => {
      setOrders(res.data);
      // Get the count of all types of orders in orders array
      let orderCount = 0;
      res.data.orders.forEach((order) => {
        orderCount += order.orders.regularOrders.length;
        orderCount += order.orders.scheduledOrders.length;
      });
      setOrderCount(orderCount);
    });
  }, []);

  const StatCard = ({ title, value }) => {
    return (
      <Grid
        item
        className="bg-light-green border-4 border-dark-green p-5"
        md={3.5}
      >
        <p className="text-xl font-bold text-cream-white">{title}</p>
        <p className="text-6xl font-bold text-cream-white">{value}</p>
      </Grid>
    );
  };

  if (authenticated === null) {
    return <Navigate replace to="/admin" />;
  } else {
    return (
      <div className="flex">
        <AdminNavigationBar />
        <Box className="flex flex-col w-full h-screen bg-cream-white px-10 py-14 ">
          <p className="text-4xl font-bold text-dark-green">Welcome User</p>
          <Grid
            container
            rowGap={2}
            columnGap={5}
            className="mt-12 flex justify-between"
          >
            <StatCard
              title="Total Users"
              value={
                users.users ? (
                  users.users.length
                ) : (
                  <CircularProgress color="creamWhite" />
                )
              }
            />
            <StatCard
              title="Total Orders"
              value={
                orders.orders ? (
                  orderCount
                ) : (
                  <CircularProgress color="creamWhite" />
                )
              }
            />
            <StatCard
              title="Total Products"
              value={
                users.users ? 100 : <CircularProgress color="creamWhite" />
              }
            />
          </Grid>
        </Box>
      </div>
    );
  }
};

export default AdminLandingPage;
