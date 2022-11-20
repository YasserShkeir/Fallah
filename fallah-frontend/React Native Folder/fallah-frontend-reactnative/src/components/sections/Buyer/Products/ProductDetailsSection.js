import { View } from "react-native";
import { Text } from "react-native-paper";

// Styles
import { DARKGREEN, LIGHTGREEN } from "../../../../styles/colors";
import { flexRow } from "../../../../styles/components";

const ProductDetailsSection = ({ product, quantity }) => {
  return (
    <View
      style={{
        ...flexRow,
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 2,
        paddingVertical: 5,
        width: "100%",
        paddingHorizontal: 10,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontFamily: "Inter-Medium",
          color: DARKGREEN,
          fontSize: 16,
          marginVertical: 4,
        }}
      >
        Harvested{" "}
        {(
          (new Date() -
            new Date(
              new Date(product.harvestedOn).setFullYear(
                new Date().getFullYear()
              )
            )) /
          86400000
        ).toFixed(0)}{" "}
        days ago
      </Text>

      <Text
        style={{
          fontFamily: "Inter-Medium",
          color: DARKGREEN,
          fontSize: 16,
          marginVertical: 4,
        }}
      >
        {product.amountAvailable - quantity}
        {product.measuringUnit} available
      </Text>
    </View>
  );
};

export default ProductDetailsSection;
