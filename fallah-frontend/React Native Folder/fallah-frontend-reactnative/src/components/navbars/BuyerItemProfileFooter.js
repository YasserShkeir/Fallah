import { useState } from "react";
import { View, Dimensions } from "react-native";
import { Button, Text, Appbar } from "react-native-paper";

// Hooks
import { addProductToRegularOrder } from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, LIGHTGREEN, PEACHYYELLOW } from "../../styles/colors";

const { width } = Dimensions.get("window");

const BuyerItemFooter = ({ item, setQuantity, payload }) => {
  const [count, setCount] = useState(1);

  return (
    <Appbar
      style={{
        backgroundColor: LIGHTGREEN,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 110,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Appbar.Action
          icon="minus"
          color={CREAMWHITE}
          onPress={() => {
            if (count > 1) {
              setCount(count - 1);
              setQuantity(count - 1);
            }
          }}
        />
        <Text
          style={{
            color: PEACHYYELLOW,
            fontSize: 24,
            fontFamily: "Inter-Bold",
          }}
        >
          {count} {item.measuringUnit}
        </Text>
        <Appbar.Action
          icon="plus"
          color={CREAMWHITE}
          onPress={() => {
            if (count < item.amountAvailable) {
              setCount(count + 1);
              setQuantity(count + 1);
            } else {
              alert("Not enough in stock");
            }
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: width,
          justifyContent: "space-between",
          alignItems: "center",
          borderTopColor: CREAMWHITE,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            width: "32%",
            color: CREAMWHITE,
            fontSize: 16,
            fontFamily: "Inter-Bold",
          }}
        >
          {count >= item.minBulkAmount ? "Discounted*" : null}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            addProductToRegularOrder(payload);
          }}
          style={{
            width: "36%",
            backgroundColor: CREAMWHITE,
          }}
          labelStyle={{
            color: LIGHTGREEN,
            fontFamily: "Inter-Bold",
            fontSize: 18,
          }}
        >
          Confirm
        </Button>
        <Text
          style={{
            width: "32%",
            textAlign: "center",
            color: CREAMWHITE,
            fontFamily: "Inter-Bold",
            fontSize: 14,
          }}
        >
          Total: $
          {count < item.minBulkAmount
            ? (count * item.pricePerMeasuringUnit).toFixed(2)
            : (count * item.bulkPrice).toFixed(2)}
        </Text>
      </View>
    </Appbar>
  );
};

export default BuyerItemFooter;
