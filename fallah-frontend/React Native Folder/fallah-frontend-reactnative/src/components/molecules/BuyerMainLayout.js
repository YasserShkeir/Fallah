import { View } from "react-native";

const BuyerMainLayout = ({ children }) => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      {children}
    </View>
  );
};

export default BuyerMainLayout;
