import { useState } from "react";
import { View, Dimensions } from "react-native";
import { Button, Text, Appbar, TextInput } from "react-native-paper";

// Hooks
import { addProductToRegularOrder } from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, LIGHTGREEN, PEACHYYELLOW } from "../../styles/colors";
import { flexRow } from "../../styles/components";

const { width } = Dimensions.get("window");

const BuyerItemFooter = ({ item, setQuantity, payload }) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
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
          ...flexRow,
          width: "50%",
          justifyContent: "space-between",
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

        <TextInput
          mode="outlined"
          ref={(ref) =>
            ref && ref.setNativeProps({ style: { fontFamily: "Inter-Bold" } })
          }
          style={{
            backgroundColor: "transparent",
            height: 26,
            fontFamily: count ? "Inter-Bold" : "Inter-Bold",
            color: count ? CREAMWHITE : CREAMWHITE,
            fontSize: 24,
            paddingVertical: 5,
          }}
          outlineStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            fontFamily: count ? "Inter-Bold" : "Inter-Bold",
            color: count ? CREAMWHITE : CREAMWHITE,
          }}
          textColor={count < item.minBulkAmount ? CREAMWHITE : PEACHYYELLOW}
          value={count.toString()}
          onChangeText={(text) => {
            setCount(parseFloat(text));
            setQuantity(parseFloat(text));
          }}
        />
        <Text
          style={{
            fontFamily: "Inter-Medium",
            fontSize: 18,
            color: CREAMWHITE,
          }}
        >
          {item.measuringUnit}
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
          ...flexRow,
          width: width,
          justifyContent: "space-between",
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
          onPress={async () => {
            setLoading(true);
            if (!payload.regularOrderID) {
              alert("Please add an order first");
              setLoading(false);
              return;
            } else {
              await addProductToRegularOrder(payload);
            }
            const res = await addProductToRegularOrder(payload);
            alert("Order Added!");
            setLoading(false);
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
          loading={loading}
        >
          {loading ? "Loading" : "Confirm"}
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
