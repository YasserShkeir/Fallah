import { React } from "react";

import { Box } from "@mui/material";

import AdminNavigationBar from "../components/navigationBar";
const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminNavigationBar />
      <Box className="flex flex-col w-full h-screen bg-cream-white px-10 py-14 ml-40 sm:ml-52">
        {children}
      </Box>
    </div>
  );
};

export default AdminLayout;
