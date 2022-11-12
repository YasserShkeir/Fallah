import { Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default BenefitsCard;
