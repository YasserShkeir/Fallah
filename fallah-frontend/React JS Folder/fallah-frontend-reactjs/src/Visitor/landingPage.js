import { Box, Button } from "@mui/material";

import VisitorNavigationBar from "./components/navigationBar";

import AllProductsImg from "./assets/images/landingBG.jpg";

const AllProducts = () => {
  // Text on left and image on right
  return (
    <Box className="flex items-center py-4 box-border bg-peachy-yellow">
      <Box className="px-6 sm:px-20 md:px-32 box-border ">
        <p className="font-bold text-4xl md:text-6xl">
          Fresher, Cheaper Produce{" "}
        </p>
        <p className="font-light text-md md:text-xl my-20">
          Cut the Wait, Cut the Price! Buy directly from our beloved farmers to
          save a dime, and save some time!
        </p>
        <Button
          variant="contained"
          color="creamWhite"
          size="medium"
          style={{
            color: "var(--dark-green)",
            padding: "0.4rem 1.5rem",
          }}
        >
          Get Started
        </Button>
      </Box>
      <Box className=" sm:min-w-fit bg-peachy-yellow right-0 ">
        <img src={AllProductsImg} className="w-full sm:w-52 md:w-80" />
      </Box>
    </Box>
  );
};

const VisitorLandingPage = () => {
  return (
    <div>
      <VisitorNavigationBar />
      <Box className="mt-32 w-screen">
        <AllProducts />
      </Box>
    </div>
  );
};

export default VisitorLandingPage;
