import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

// Components
import BuyerRegularOrderCard from "../../components/sections/BuyerRegularOrders";
import BuyerScheduledOrderCard from "../../components/sections/BuyerScheduledOrders";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";

// Hooks
import { getRegularOrders, getScheduledOrders } from "../../hooks/buyerOrders";

const BuyerOrdersRoute = () => {
  const [orderDisplay, setOrderDisplay] = useState("Regular Orders");
  const [regularOrders, setRegularOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);

  const orderDisplayHandler = (currOrder) => {
    setOrderDisplay(currOrder);
  };

  const getRegularOrdersHandler = (response) => {
    setRegularOrders(response.data.regularOrders);
  };

  const getScheduledOrdersHandler = (response) => {
    setScheduledOrders(response.data.scheduledOrders);
  };

  useEffect(() => {
    async function prepare() {
      try {
        if (orderDisplay === "Regular Orders") {
          await getRegularOrders(getRegularOrdersHandler);
        } else {
          await getScheduledOrders(getScheduledOrdersHandler);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [orderDisplay]);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" prop={orderDisplayHandler} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {orderDisplay === "Regular Orders" ? (
          regularOrders.map((order) => {
            return <BuyerRegularOrderCard key={order._id} props={order} />;
          })
        ) : orderDisplay === "Scheduled Orders" ? (
          scheduledOrders.map((order) => {
            return <BuyerScheduledOrderCard key={order._id} props={order} />;
          })
        ) : (
          <Text>Other Orders</Text>
        )}
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
