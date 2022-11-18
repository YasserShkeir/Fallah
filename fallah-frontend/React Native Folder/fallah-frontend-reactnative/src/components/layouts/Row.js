import { View } from "react-native";

const Row = ({ children }) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export default Row;
