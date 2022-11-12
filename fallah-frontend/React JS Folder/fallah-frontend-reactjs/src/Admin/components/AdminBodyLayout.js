import { React } from "react";

import { Box } from "@mui/material";

import AdminNavigationBar from "./navigationBar";
const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminNavigationBar />
      <Box className="flex flex-col w-full h-screen bg-cream-white px-3 sm:px-10 py-8 sm:py-14 ml-20 sm:ml-52">
        {children}
      </Box>
    </div>
  );
};

export default AdminLayout;
