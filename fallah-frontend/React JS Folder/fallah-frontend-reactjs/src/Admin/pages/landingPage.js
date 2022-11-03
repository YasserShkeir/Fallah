import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import CanvasJSReact from "../../lib/canvasjs.react";

import axios from "axios";

import { Box, CircularProgress, Grid } from "@mui/material";

import AdminLayout from "../components/bodyLayout";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminLandingPage = () => {
  const [authenticated] = useState(localStorage.getItem("jwt"));
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [products, setProducts] = useState([]);

  const [chartData, setChartData] = useState([{ label: "Data", y: 0 }]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    const tokenConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:3000/admin/users", tokenConfig)
      .then((res) => {
        setUsers(res.data);

        // Prepare chart data
        let data = [];
        res.data.users.forEach((user) => {
          data.push(user.created_at.substring(0, 10));
        });

        data.sort();

        const count = {};
        for (const element of data) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }

        let usersData = [];
        for (const key in count) {
          usersData.push({ label: key, y: count[key] });
        }

        setChartData(usersData);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("username");
          window.location.reload();
        }
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

    axios
      .get("http://localhost:3000/admin/products", tokenConfig)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const StatCard = ({ title, value }) => {
    return (
      <Grid
        item
        className="bg-light-green border-4 border-dark-green p-3 sm:p-5"
        md={3.5}
      >
        <p className="text-l sm:text-xl font-bold text-cream-white">{title}</p>
        <p className="text-4xl sm:text-6xl font-bold text-cream-white">
          {value}
        </p>
      </Grid>
    );
  };

  if (authenticated === null) {
    return <Navigate replace to="/admin" />;
  } else {
    const username = localStorage.getItem("username");
    return (
      <AdminLayout>
        <p className="text-4xl font-bold text-dark-green">Welcome {username}</p>
        <Grid
          container
          rowGap={2}
          columnGap={5}
          className="mt-12 flex justify-between w-full"
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
              products.products ? (
                products.products.length
              ) : (
                <CircularProgress color="creamWhite" />
              )
            }
          />
        </Grid>
        <Box className="h-20 w-full my-8">
          <CanvasJSChart
            options={{
              animationEnabled: true,
              AnimationEffect: "ease",
              title: {
                text: "Number of Users Registered per Day",
                fontFamily: "inter",
              },
              axisX: {
                title: "Date",
                valueFormatString: "DD MMM",
                labelFontFamily: "inter",
              },
              axisY: {
                title: "Number of Users",
                interval: 1,
                labelFontFamily: "inter",
              },
              backgroundColor: "transparent",
              data: [
                {
                  type: "line",
                  dataPoints: chartData,
                },
              ],
            }}
            /* onRef = {ref => this.chart = ref} */
          />
        </Box>
      </AdminLayout>
    );
  }
};

export default AdminLandingPage;
