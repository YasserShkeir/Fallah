import { Box, Button, Card, CardContent } from "@mui/material";

import VisitorNavigationBar from "./components/navigationBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMoneyBillTransfer,
  faThumbsUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import AllProductsImg from "./assets/images/landingBG.jpg";
import AllProductsBottom from "./assets/images/AllProductsBottom2.png";
import FooterImageTop from "./assets/images/visitorFooterTop.png";
import FooterImageBot from "./assets/images/visitorFooter.png";

import Footer2ImageRight from "./assets/footerV2images/SideImages/1.png";
import Footer2ImageLeft1 from "./assets/footerV2images/SideImages/2.png";
import Footer2ImageLeft2 from "./assets/footerV2images/SideImages/3.png";

import Fruit1 from "./assets/footerV2images/Fruits/1.png";
import Fruit2 from "./assets/footerV2images/Fruits/2.png";
import Fruit3 from "./assets/footerV2images/Fruits/3.png";
import Fruit4 from "./assets/footerV2images/Fruits/4.png";
import Fruit5 from "./assets/footerV2images/Fruits/5.png";
import Fruit6 from "./assets/footerV2images/Fruits/6.png";
import Fruit7 from "./assets/footerV2images/Fruits/7.png";
import Fruit8 from "./assets/footerV2images/Fruits/8.png";

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
    <Box className="w-full flex flex-col">
      {/* Version 1 of Footer */}
      {/* <img src={FooterImageTop} className="w-full" />
      <Box className="w-full bg-light-green">
        <img src={FooterImageBot} className="w-full -mt-8" />
      </Box> */}
      {/* Version 2 of Footer */}
      <Box className="w-full">
        <img src={FooterImageTop} className="w-full" />
        <Box className="w-full h-fit flex bg-light-green justify-between -mt-3">
          {/* Left Side */}
          <Box className="flex flex-col">
            <img src={Footer2ImageLeft1} className="w-24 sm:w-52" />
            <img
              src={Footer2ImageLeft2}
              className="w-24 sm:w-52 -mt-3 sm:-mt-10 -ml-3 sm:-ml-7"
            />
          </Box>
          {/* Middle Side */}
          <Box className="h-auto flex flex-col justify-between font-bold items-center text-sm sm:text-3xl text-cream-white pb-4 sm:pb-14 gap-5">
            <p>Fresh from the Farmer...</p>
            <Box className="flex h-fit flex-wrap gap-4 align-middle justify-center">
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit1} className="w-8 sm:w-24" />
                <img src={Fruit2} className="w-8 sm:w-24" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit3} className="w-8 sm:w-24" />
                <img src={Fruit4} className="w-8 sm:w-24" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit5} className="w-8 sm:w-24" />
                <img src={Fruit6} className="w-8 sm:w-24" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit7} className="w-8 sm:w-24" />
                <img src={Fruit8} className="w-8 sm:w-24" />
              </Box>
            </Box>

            <p>... Fresh to the Buyer</p>
          </Box>
          {/* Right Side */}
          <Box>
            <img src={Footer2ImageRight} className="w-24 sm:w-52" />
          </Box>
        </Box>
        <p className="bg-light-green -mt-1 py-2 font-normal text-sm text-center text-peachy-yellow">
          Copyright 2022 Fallah{" "}
          <FontAwesomeIcon icon={faHeart} color="var(--peachy-yellow)" />
        </p>
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
        <img src={AllProductsBottom} className="w-full -mt-1" />
        <Benefits />
      </Box>
      <Footer />
    </div>
  );
};

export default VisitorLandingPage;
