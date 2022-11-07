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
        width: "100%",
        paddingHorizontal: 10,
      }}
      elevated={true}
    >
      {children}
    </Appbar.Header>
  );
};

export default BuyerAppBarLayout;
