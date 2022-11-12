import { Box } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import FooterImageTop from "../assets/images/visitorFooterTop.png";
// import FooterImageBot from "../assets/images/visitorFooter.png";

import Footer2ImageRight from "../assets/footerV2images/SideImages/1.png";
import Footer2ImageLeft1 from "../assets/footerV2images/SideImages/2.png";
import Footer2ImageLeft2 from "../assets/footerV2images/SideImages/3.png";

import Fruit1 from "../assets/footerV2images/Fruits/1.png";
import Fruit2 from "../assets/footerV2images/Fruits/2.png";
import Fruit3 from "../assets/footerV2images/Fruits/3.png";
import Fruit4 from "../assets/footerV2images/Fruits/4.png";
import Fruit5 from "../assets/footerV2images/Fruits/5.png";
import Fruit6 from "../assets/footerV2images/Fruits/6.png";
import Fruit7 from "../assets/footerV2images/Fruits/7.png";
import Fruit8 from "../assets/footerV2images/Fruits/8.png";

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
        <img src={FooterImageTop} className="w-full" alt="FooterImageTop" />
        <Box className="w-full h-fit flex bg-light-green justify-between -mt-3">
          {/* Left Side */}
          <Box className="flex flex-col">
            <img
              src={Footer2ImageLeft1}
              className="w-24 sm:w-52"
              alt="Footer2ImageLeft1"
            />
            <img
              src={Footer2ImageLeft2}
              className="w-24 sm:w-52 -mt-3 sm:-mt-10 -ml-3 sm:-ml-7"
              alt="Footer2ImageLeft2"
            />
          </Box>
          {/* Middle Side */}
          <Box className="h-auto flex flex-col justify-between font-bold items-center text-sm sm:text-3xl text-cream-white pb-4 sm:pb-14 gap-5">
            <p>Fresh from the Farmer...</p>
            <Box className="flex h-fit flex-wrap gap-4 align-middle justify-center">
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit1} className="w-8 sm:w-24" alt="fruit1" />
                <img src={Fruit2} className="w-8 sm:w-24" alt="fruit2" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit3} className="w-8 sm:w-24" alt="fruit3" />
                <img src={Fruit4} className="w-8 sm:w-24" alt="fruit4" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit5} className="w-8 sm:w-24" alt="fruit5" />
                <img src={Fruit6} className="w-8 sm:w-24" alt="fruit6" />
              </Box>
              <Box className="flex h-fit gap-4 align-middle justify-center">
                <img src={Fruit7} className="w-8 sm:w-24" alt="fruit7" />
                <img src={Fruit8} className="w-8 sm:w-24" alt="fruit8" />
              </Box>
            </Box>

            <p>... Fresh to the Buyer</p>
          </Box>
          {/* Right Side */}
          <Box>
            <img
              src={Footer2ImageRight}
              className="w-24 sm:w-52"
              alt="Footer2ImageRight"
            />
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

export default Footer;
