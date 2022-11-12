import { Box } from "@mui/material";
import BenefitsCard from "../components/BenefitsCard";

import {
  faDollarSign,
  faMoneyBillTransfer,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

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

export default Benefits;
