import { View } from "react-native";
import { Text, Button } from "react-native-paper";

// Styles
import { LIGHTGREEN, DARKGREEN } from "../../../styles/colors";

const BuyerSearchType = (props) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Button
        onPress={() => {
          props.setSearchQuery("");
          props.setValue("Farmers");
        }}
        style={{
          borderRadius: 0,
          width: "50%",
          ...(props.value === "Farmers"
            ? { borderBottomWidth: 2, borderBottomColor: LIGHTGREEN }
            : {}),
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            color: props.value === "Farmers" ? LIGHTGREEN : DARKGREEN,
            fontSize: 16,
          }}
        >
          Farmers
        </Text>
      </Button>
      <Button
        onPress={() => {
          props.setSearchQuery("");
          props.setValue("Products");
        }}
        style={{
          borderRadius: 0,
          width: "50%",
          ...(props.value === "Products"
            ? { borderBottomWidth: 2, borderBottomColor: LIGHTGREEN }
            : {}),
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            color: props.value === "Products" ? LIGHTGREEN : DARKGREEN,
            fontSize: 16,
          }}
        >
          Products
        </Text>
      </Button>
    </View>
  );
};

export default BuyerSearchType;
