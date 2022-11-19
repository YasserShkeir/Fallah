import { useState } from "react";
import NavBarLink from "./NavBarLink";

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

  return (
    <div className="bg-light-green flex flex-col w-20 sm:w-48 md:w-56 items-center px-2 h-screen justify-between pb-5 fixed overflow-y-auto">
      <div className="w-full flex flex-col gap-2 sm:gap-3 items-center mt-10 sm:mt-0">
        <img
          src={logo}
          alt="logo"
          className="hidden sm:block sm:w-32 md:w-42"
        />
        {[
          { to: "/admin/home", icon: faHome, text: "Home" },
          { to: "/admin/users", icon: faUsers, text: "Users" },
          { to: "/admin/orders", icon: faList, text: "Orders" },
          { to: "/admin/products", icon: faAppleAlt, text: "Products" },
          // { to: "/admin/categories", icon: faTree, text: "Categories" },
          // { to: "/admin/reviews", icon: faStar, text: "Reviews" },
        ].map((item) => (
          <NavBarLink
            to={item.to}
            icon={item.icon}
            curr={url}
            key={item.to}
            setUrl={setUrl}
          >
            {item.text}
          </NavBarLink>
        ))}
      </div>
      <Button
        variant="contained"
        color="creamWhite"
        className="w-16 sm:w-full rounded-3xl hover:bg-dark-green hover:text-cream-white"
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
