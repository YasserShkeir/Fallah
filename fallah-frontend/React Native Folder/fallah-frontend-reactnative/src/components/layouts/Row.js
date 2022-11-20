import { View } from "react-native";
import { flexRow } from "../../styles/components";

const Row = ({ children }) => {
  return (
    <View
      style={{
        ...flexRow,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {children}
    </View>
  );
};

export default Row;
