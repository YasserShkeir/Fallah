import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import farmer from "./errorPageFarmer.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center bg-light-green">
      <img
        src={farmer}
        alt="Farmer"
        className="border-4 border-cream-white rounded-full shadow-lg m-5 w-1/3 max-w-xs"
      />
      <div className="flex flex-col justify-evenly h-60">
        <p className="text-3xl font-semibold">Page Not Found:</p>
        <p>
          Click{" "}
          <Link
            className="font-semibold hover:text-cream-white"
            onClick={() => navigate(-1)}
          >
            here
          </Link>{" "}
          to go back.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
