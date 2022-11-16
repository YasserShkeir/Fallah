import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarLink = ({ to, children, icon, curr, setUrl }) => {
  return (
    <Link
      to={to}
      className={
        "flex items-center text-cream-white text-sm md:text-base font-bold px-3 sm:px-4 gap-4 sm:gap- rounded-md w-fit sm:w-full " +
        (curr === to
          ? " py-2 bg-cream-white text-dark-green"
          : "bg-dark-green py-2")
      }
      onClick={() => setUrl(to)}
    >
      <FontAwesomeIcon
        icon={icon}
        size="1x"
        className={curr === to ? "text-dark-green justify-self-start" : ""}
      />{" "}
      <p
        className={
          curr === to
            ? "text-dark-green justify-self-start hidden sm:block"
            : "hidden sm:block"
        }
      >
        {children}
      </p>
    </Link>
  );
};

export default NavBarLink;
