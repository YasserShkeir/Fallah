import { Appbar } from "react-native-paper";
import { LIGHTGREEN } from "../../styles/colors";

const BuyerAppBar = ({ children }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: LIGHTGREEN,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Appbar.Header>
  );
};

export default BuyerAppBar;
