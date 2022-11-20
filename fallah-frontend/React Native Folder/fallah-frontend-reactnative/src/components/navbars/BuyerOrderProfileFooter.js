import { Button, Text, Appbar } from "react-native-paper";

// Hooks
import { approveRegularOrder } from "../../hooks/buyerOrders";

// Styles
import {
  CREAMWHITE,
  DARKGREEN,
  LIGHTGREEN,
  PEACHYYELLOW,
} from "../../styles/colors";
import { flexRow } from "../../styles/components";

const BuyerOrderProfileFooter = ({ order, orderProducts }) => {
  return (
    <Appbar
      style={{
        ...flexRow,
        backgroundColor: LIGHTGREEN,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 16,
          color: CREAMWHITE,
        }}
      >
        Order Total: ${order.orderSubtotal.toFixed(2)}
      </Text>
      {order.deliveryStatus === "Pending" ? (
        <Button
          labelStyle={{
            fontFamily: "Inter-Bold",
            fontSize: 18,
            color: orderProducts.length === 0 ? "black" : DARKGREEN,
          }}
          disabled={orderProducts.length === 0}
          style={
            orderProducts.length === 0
              ? { backgroundColor: "gray" }
              : { backgroundColor: PEACHYYELLOW }
          }
          onPress={async () => {
            await approveRegularOrder(order._id);
          }}
        >
          Approve Order
        </Button>
      ) : (
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 16,
            color: CREAMWHITE,
          }}
        >
          Order Approved
        </Text>
      )}
    </Appbar>
  );
};

export default BuyerOrderProfileFooter;
