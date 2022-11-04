import { Box, Button, Card, CardContent } from "@mui/material";

import VisitorNavigationBar from "./components/navigationBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMoneyBillTransfer,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import AllProductsImg from "./assets/images/landingBG.jpg";
import AllProductsBottom from "./assets/images/AllProductsBottom2.png";
import FooterImageTop from "./assets/images/visitorFooterTop.png";
import FooterImageBot from "./assets/images/visitorFooter.png";

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
        <img src={AllProductsImg} className="w-26 sm:w-52 md:w-96" />
      </Box>
    </Box>
  );
};

const BenefitsCard = ({ title, description, icon }) => {
  // Image on top left and text on right
  return (
    <Card className="h-56 " style={{ backgroundColor: "var(--light-green)" }}>
      <CardContent className="flex flex-col items-center gap-5 w-48 sm:w-64 ">
        <FontAwesomeIcon icon={icon} size="3x" color="var(--cream-white)" />
        <p className="font-bold text-l sm:text-2xl text-cream-white">{title}</p>
        <p className="font-normal text-sm sm:text-md text-center text-cream-white">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const Benefits = () => {
  // Display three card separated by a line
  return (
    <Box className="flex flex-col items-center gap-10 py-4 box-border mt-5">
      <p className="font-bold text-4xl md:text-6xl text-light-green">
        Benefits
      </p>
      <Box className="flex flex-col md:w-full gap-10">
        <Box className="flex flex-col items-center md:items-baseline gap-10 md:flex-row md:justify-around">
          <BenefitsCard
            title="Join for FREE"
            description="Besides being free, Fallah saves you a lot of money."
            icon={faDollarSign}
          />
          <BenefitsCard
            title="Zero MIDDLEMEN"
            description="Customize your weekly/monthly orders, directly from the Farmers."
            icon={faMoneyBillTransfer}
          />
          <BenefitsCard
            title="Solve a PROBLEM"
            description="Help solve the problem of Food Waste, in addition to helping out the Farmers."
            icon={faThumbsUp}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box className="w-full">
      <img src={FooterImageTop} className="w-full" />
      <Box className="w-full bg-light-green">
        <img src={FooterImageBot} className="w-full -mt-8" />
      </Box>
    </Box>
  );
};

const VisitorLandingPage = () => {
  return (
    <div>
      <VisitorNavigationBar />
      <Box className="mt-32 w-full">
        <img src={AllProductsBottom} className="w-full rotate-180 -mb-3 " />
        <AllProducts />
        <img src={AllProductsBottom} className="w-full" />
        <Benefits />
      </Box>
      <Footer />
    </div>
  );
};

export default VisitorLandingPage;
