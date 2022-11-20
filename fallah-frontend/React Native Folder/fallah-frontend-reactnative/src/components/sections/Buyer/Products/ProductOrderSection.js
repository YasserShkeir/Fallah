import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../../../styles/colors";

const ProductOrderSection = ({
  regularOrders,
  selectedOrder,
  setSelectedOrder,
  setRegularOrders,
}) => {
  const [orderMenuVisible, setOrderMenuVisible] = useState(false);

  return (
    <View
      style={{
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 2,
        paddingVertical: 10,
        width: "100%",
        paddingHorizontal: 10,
        backgroundColor: DARKGREEN,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {regularOrders.length > 0 ? (
        <DropDownPicker
          containerStyle={{
            width: "100%",
          }}
          textStyle={{ fontFamily: "Inter-Regular" }}
          placeholder="Select Order"
          open={orderMenuVisible}
          value={selectedOrder}
          items={regularOrders}
          setOpen={setOrderMenuVisible}
          setValue={setSelectedOrder}
          setItems={setRegularOrders}
          onChangeValue={(value) => {
            setSelectedOrder(value);
          }}
        />
      ) : (
        <Text
          style={{
            fontFamily: "Inter-Regular",
            color: CREAMWHITE,
            fontSize: 18,
          }}
        >
          No Active orders yet
        </Text>
      )}
    </View>
  );
};

export default ProductOrderSection;
