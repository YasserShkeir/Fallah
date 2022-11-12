import { Box } from "@mui/material";

import VisitorNavigationBar from "../components/navigationBar";
import Footer from "../components/Footer";
import AllProducts from "../sections/LandingAllProducts";
import Benefits from "../sections/LandingBenefits";

import AllProductsBottom from "../assets/images/AllProductsBottom2.png";

const VisitorLandingPage = () => {
  return (
    <div>
      <VisitorNavigationBar />
      <Box className="mt-32 w-full">
        <img
          src={AllProductsBottom}
          className="w-full rotate-180 -mb-3 "
          alt="AllProductsBottomRotated"
        />
        <AllProducts />
        <img
          src={AllProductsBottom}
          className="w-full -mt-1"
          alt="AllProductsBottom"
        />
        <Benefits />
      </Box>
      <Footer />
    </div>
  );
};

export default VisitorLandingPage;
