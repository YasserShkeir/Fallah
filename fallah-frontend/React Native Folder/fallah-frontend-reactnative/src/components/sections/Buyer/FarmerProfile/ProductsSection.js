import { View } from "react-native";
import { Text } from "react-native-paper";

// Components
import ItemCard from "../../../cards/ItemCard";

// Styles
import { DARKGREEN } from "../../../../styles/colors";

const ProductsSection = ({ products, navigation }) => {
  return (
    <View style={{ padding: 5 }}>
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 24,
          color: DARKGREEN,
          margin: 5,
          marginLeft: 10,
        }}
      >
        Products
      </Text>

      {products.length > 0 ? (
        products.map((product) => (
          <ItemCard
            key={product._id}
            item={product}
            location={"profile"}
            navigation={navigation}
          />
        ))
      ) : (
        <Text
          style={{
            fontFamily: "Inter-Regular",
            fontSize: 18,
            color: DARKGREEN,
            margin: 5,
            marginLeft: 10,
          }}
        >
          No products yet
        </Text>
      )}
    </View>
  );
};

export default ProductsSection;
