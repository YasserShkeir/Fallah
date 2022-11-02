import { Link } from "react-router-dom";
import { useState } from "react";

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

const AdminNavigationBar = () => {
  const [url, setUrl] = useState(window.location.pathname);

  const NavBarLink = ({ to, children, icon, curr }) => {
    return (
      <Link
        to={to}
        className={
          "flex items-center text-cream-white text-lg font-bold px-4 gap-6 bg-dark-green rounded-md w-full " +
          (curr === to ? " border-4 py-1 border-cream-white" : " py-2")
        }
        hover={{ className: "bg-light-green" }}
        onClick={() => setUrl(to)}
      >
        <FontAwesomeIcon icon={icon} className="justify-self-start" />{" "}
        {children}
      </Link>
    );
  };

  return (
    <div className="bg-light-green flex flex-col w-56 items-center px-5 min-h-fit h-screen justify-between pb-5">
      <div className="w-full flex flex-col gap-4">
        <img src={logo} alt="logo" />
        <NavBarLink
          to={"/admin/home"}
          children={"Home"}
          icon={faHome}
          curr={url}
        />
        <NavBarLink
          to={"/admin/users"}
          children={"Users"}
          icon={faUsers}
          curr={url}
        />
        <NavBarLink
          to={"/admin/orders"}
          children={"Orders"}
          icon={faList}
          curr={url}
        />
        <NavBarLink
          to={"/admin/products"}
          children={"Products"}
          icon={faAppleAlt}
          curr={url}
        />
        <NavBarLink
          to={"/admin/categories"}
          children={"Categories"}
          icon={faTree}
          curr={url}
        />
        <NavBarLink
          to={"/admin/reviews"}
          children={"Reviews"}
          icon={faStar}
          curr={url}
        />
        <NavBarLink
          to={"/admin/statistics"}
          children={"Statistics"}
          icon={faBarChart}
          curr={url}
        />
      </div>
      <Button
        variant="contained"
        color="creamWhite"
        className="w-full rounded-3xl hover:bg-dark-green hover:text-cream-white"
        style={{ marginTop: "40px" }}
        onClick={() => {
          localStorage.removeItem("jwt");
          window.location.href = "/admin";
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AdminNavigationBar;
