import { Appbar } from "react-native-paper";

// Styles
import { LIGHTGREEN } from "../../styles/colors";

const BuyerAppBarLayout = ({ children }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: LIGHTGREEN,
        display: "flex",
        justifyContent: "space-between",
      }}
      elevated={true}
    >
      {children}
    </Appbar.Header>
  );
};

export default BuyerAppBarLayout;
