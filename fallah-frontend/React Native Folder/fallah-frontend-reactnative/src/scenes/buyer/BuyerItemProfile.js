import { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

// Components
import BuyerItemFooter from "../../components/navbars/BuyerItemProfileFooter";
import ProductTopSection from "../../components/sections/Buyer/Products/ProductTopSection";

// Hooks
import { getRegularOrders } from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";
import { flexRow } from "../../styles/components";

const BuyerItemProfile = ({ route, navigation }) => {
  const { product } = route.params;

  const [regularOrders, setRegularOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(regularOrders[0]);
  const [orderMenuVisible, setOrderMenuVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [payload, setPayload] = useState({
    regularOrderID: selectedOrder,
    mainCategoryID: product.mainCategoryID,
    childCategoryID: product.childCategoryID,
    productID: product._id,
    quantity: quantity,
  });

  useEffect(() => {
    navigation.setOptions({ title: product.productName });

    const getRegularOrdersHandler = (response) => {
      let regularOrders = [];

      response.data.regularOrders.forEach((order) => {
        if (order.deliveryStatus === "Pending") {
          regularOrders.push({
            label:
              order.deliveryLocation.name +
              " - " +
              order.created_at.substring(0, 10),
            value: order._id,
          });
        }
      });

      setRegularOrders(regularOrders);
    };

    async function prepare() {
      try {
        await getRegularOrders(getRegularOrdersHandler);
      } catch (error) {
        console.log(error);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    setPayload({
      regularOrderID: selectedOrder,
      mainCategoryID: product.mainCategoryID,
      childCategoryID: product.childCategoryID,
      productID: product._id,
      quantity: quantity,
    });
  }, [quantity, selectedOrder]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductTopSection product={product} />
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
      <BuyerItemFooter
        item={product}
        setQuantity={setQuantity}
        payload={payload}
      />
    </View>
  );
};

export default BuyerItemProfile;
