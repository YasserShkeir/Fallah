import { useState, useEffect } from "react";
import { View } from "react-native";

// Components
import BuyerItemFooter from "../../components/navbars/BuyerItemProfileFooter";
import ProductTopSection from "../../components/sections/Buyer/Products/ProductTopSection";
import ProductDetailsSection from "../../components/sections/Buyer/Products/ProductDetailsSection";
import ProductOrderSection from "../../components/sections/Buyer/Products/ProductOrderSection";

// Hooks
import { getRegularOrders } from "../../hooks/buyerOrders";

const BuyerItemProfile = ({ route, navigation }) => {
  const { product } = route.params;

  const [regularOrders, setRegularOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(regularOrders[0]);
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
      <ProductDetailsSection product={product} quantity={quantity} />
      <ProductOrderSection
        regularOrders={regularOrders}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        setRegularOrders={setRegularOrders}
      />

      <BuyerItemFooter
        item={product}
        setQuantity={setQuantity}
        payload={payload}
      />
    </View>
  );
};

export default BuyerItemProfile;
