import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faList,
  faAppleAlt,
  faTree,
  faStar,
  faBarChart,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/images/navBarLogo.png";
import { Button } from "@mui/material";

// window.location.href.substring(window.location.href.lastIndexOf("/") + 1)

const theme = createTheme({
  palette: {
    lightGreen: {
      main: "#23ce6b",
    },
    creamWhite: {
      main: "#f6f8ff",
    },
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
});

const NavBarLink = ({ to, children, icon }) => {
  return (
    <Link
      to={to}
      className="flex items-center text-cream-white text-lg font-bold px-4 py-2 gap-6 bg-dark-green rounded-md w-full hover:border-4 hover:py-1 hover:border-cream-white"
      hover={{ className: "bg-light-green" }}
    >
      <FontAwesomeIcon icon={icon} className="justify-self-start" /> {children}
    </Link>
  );
};

const AdminNavigationBar = () => {
  const [url, setUrl] = useState(window.location.pathname);

  console.log(url);
  return (
    <div className="bg-light-green flex flex-col w-56 items-center px-5 h-screen justify-between pb-5">
      <div className="w-full flex flex-col gap-5">
        <img src={logo} alt="logo" />
        <NavBarLink to={"/admin/home"} children={"Home"} icon={faHome} />
        <NavBarLink to={"/admin/users"} children={"Users"} icon={faUsers} />
        <NavBarLink to={"/admin/order"} children={"Orders"} icon={faList} />
        <NavBarLink
          to={"/admin/products"}
          children={"Products"}
          icon={faAppleAlt}
        />
        <NavBarLink
          to={"/admin/categories"}
          children={"Categories"}
          icon={faTree}
        />
        <NavBarLink to={"/admin/reviews"} children={"Reviews"} icon={faStar} />
        <NavBarLink
          to={"/admin/statistics"}
          children={"Statistics"}
          icon={faBarChart}
        />
      </div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="creamWhite"
          className="w-full rounded-3xl hover:bg-dark-green my-8"
        >
          Logout
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default AdminNavigationBar;
