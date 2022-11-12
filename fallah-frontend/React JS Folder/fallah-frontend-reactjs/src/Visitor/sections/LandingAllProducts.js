import { Box } from "@mui/system";
import { Button } from "@mui/material";

import AllProductsImg from "../assets/images/landingBG.jpg";

const AllProducts = () => {
  // Text on left and image on right
  return (
    <Box className="flex items-center justify-between py-4 box-border bg-peachy-yellow">
      <Box className="pl-6 sm:px-20 md:px-32 box-border text-dark-green">
        <p className="font-bold text-4xl md:text-6xl">
          Fresher, Cheaper Produce{" "}
        </p>
        <p className="font-normal text-md md:text-xl my-12 sm:my-20">
          Cut the Wait, Cut the Price! Buy directly from our beloved farmers to
          save a dime, and save some time!
        </p>
        <Button
          variant="contained"
          color="creamWhite"
          size="large"
          style={{
            color: "var(--dark-green)",
            padding: "0.4rem 1.5rem",
          }}
        >
          Get the App
        </Button>
      </Box>
      <Box className=" sm:min-w-fit right-0 ">
        <img
          src={AllProductsImg}
          className="w-26 sm:w-52 md:w-96"
          alt="AllProductsImg"
        />
      </Box>
    </Box>
  );
};

export default AllProducts;
