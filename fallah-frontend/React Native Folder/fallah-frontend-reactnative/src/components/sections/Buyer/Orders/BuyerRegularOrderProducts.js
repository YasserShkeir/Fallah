import { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Text } from "react-native-paper";

// Components
import BuyerOrderProfileItemCard from "../../../cards/BuyerOrderProfileItemCard";

// Styles
import { DARKGREEN } from "../../../../styles/colors";

const BuyerRegularOrderProducts = ({ order, orderProducts, navigation }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 18,
          color: DARKGREEN,
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        Products in this order:
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);

              setLoading(false);
            }}
          />
        }
      >
        {orderProducts.length > 0 ? (
          orderProducts.map((product) => {
            return (
              <BuyerOrderProfileItemCard
                order={order}
                product={product}
                key={product._id}
                navigation={navigation}
              />
            );
          })
        ) : (
          <Text
            style={{
              fontFamily: "Inter-Medium",
              fontSize: 16,
              color: DARKGREEN,
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          >
            No products in this order
          </Text>
        )}
      </ScrollView>
    </>
  );
};

export default BuyerRegularOrderProducts;
