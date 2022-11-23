import { View } from "react-native";
import { flexRow } from "../../styles/components";

const Row = ({ children, style }) => {
  return (
    <View
      style={{
        ...flexRow,
        width: "100%",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Row;
