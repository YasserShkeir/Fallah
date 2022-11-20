import { View } from "react-native";
import { Button, Text } from "react-native-paper";

// Hooks
import { removeProductFromRegularOrder } from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, LIGHTGREEN, PEACHYYELLOW } from "../../styles/colors";

const BuyerOrderProfileItemCard = ({ order, product, navigation }) => {
  console.log("product", navigation);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: LIGHTGREEN,
      }}
    >
      <View
        style={{
          width: order.deliveryStatus === "Pending" ? "30%" : "95%",
          display: "flex",
          flexDirection: order.deliveryStatus === "Pending" ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 16,
            color: CREAMWHITE,
          }}
        >
          {product.productName}
        </Text>
        <Text
          style={{
            fontFamily: "Inter-Medium",
            fontSize: 14,
            color: CREAMWHITE,
          }}
        >
          Subtotal: ${product.productTotal}
        </Text>
      </View>
      {order.deliveryStatus === "Pending" ? (
        <Button
          mode="contained"
          icon="delete"
          contentStyle={{ backgroundColor: "red" }}
          labelStyle={{ color: "white", fontFamily: "Inter-Bold" }}
          onPress={async () => {
            await removeProductFromRegularOrder(order._id, product._id).then(
              (response) => {
                console.log("response", response);
              }
            );
          }}
        >
          Remove
        </Button>
      ) : null}
    </View>
  );
};

export default BuyerOrderProfileItemCard;
