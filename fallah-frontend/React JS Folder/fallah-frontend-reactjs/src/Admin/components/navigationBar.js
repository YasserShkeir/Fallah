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
          "flex items-center text-cream-white text-sm md:text-base font-bold px-4 gap-4 sm:gap-6 bg-dark-green rounded-md w-full " +
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
    <div className="bg-light-green flex flex-col sm:w-48 md:w-56 items-center px-5 h-screen justify-between pb-5 fixed overflow-y-auto">
      <div className="w-full flex flex-col gap-2 sm:gap-3 items-center">
        <img src={logo} alt="logo" className="w-20 sm:w-32 md:w-42" />
        {[
          { to: "/admin/home", icon: faHome, text: "Home" },
          { to: "/admin/users", icon: faUsers, text: "Users" },
          { to: "/admin/orders", icon: faList, text: "Orders" },
          { to: "/admin/products", icon: faAppleAlt, text: "Products" },
          { to: "/admin/categories", icon: faTree, text: "Categories" },
          { to: "/admin/reviews", icon: faStar, text: "Reviews" },
        ].map((item) => (
          <NavBarLink to={item.to} icon={item.icon} curr={url} key={item.to}>
            {item.text}
          </NavBarLink>
        ))}
      </div>
      <Button
        variant="contained"
        color="creamWhite"
        className="w-full rounded-3xl hover:bg-dark-green hover:text-cream-white"
        style={{ marginTop: "40px" }}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/admin";
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default AdminNavigationBar;
