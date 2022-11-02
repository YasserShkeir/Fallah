import { React, useState, useEffect } from "react";
import axios from "axios";

import { Box } from "@mui/material";

import AdminNavigationBar from "../components/navigationBar";

const AdminLandingPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      // get all users
      url: "http://localhost:3000/admin/users",
      method: "get",
    };
    const response = axios(config).then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="flex">
      <AdminNavigationBar />
      <Box className="flex flex-col w-full h-screen bg-cream-white px-10 py-14">
        <p className="text-3xl">Welcome User</p>
        <Box className="flex flex-col gap-4 mt-10 bg-light-green border-4 border-dark-green p-4">
          <p className="text-2xl text-cream-white font-semibold">
            Quick Statistics:
          </p>
          <Box className="flex flex-col gap-4">
            <p className="text-cream-white font-semibold">
              Total Users:{" "}
              <span className="font-normal">
                {users.users ? users.users.length : "Fetching..."}
              </span>
            </p>
            <p className="text-cream-white font-semibold">
              Total Orders: <span className="font-normal">100</span>
            </p>
            <p className="text-cream-white font-semibold">
              Total Products: <span className="font-normal">100</span>
            </p>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdminLandingPage;
