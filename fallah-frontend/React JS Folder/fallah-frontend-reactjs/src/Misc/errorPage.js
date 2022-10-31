import React from "react";
import { Link } from "react-router-dom";

import farmer from "./errorPageFarmer.png";

const ErrorPage = () => {
  return (
    <div className="flex items-center bg-light-green">
      <img
        src={farmer}
        alt="Farmer"
        className="border-4 border-cream-white rounded-full shadow-lg m-5 w-1/3 max-w-xs"
      />
      <div className="flex flex-col justify-evenly h-60">
        <p className="text-3xl">Page Not Found:</p>
        <p>
          Click{" "}
          <Link to="/" className="font-semibold hover:text-cream-white">
            here
          </Link>{" "}
          to return to the home page.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
