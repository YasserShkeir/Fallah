import { SafeAreaView } from "react-native";
import { CREAMWHITE } from "../../styles/colors";

const BuyerMainLayout = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: CREAMWHITE,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default BuyerMainLayout;
