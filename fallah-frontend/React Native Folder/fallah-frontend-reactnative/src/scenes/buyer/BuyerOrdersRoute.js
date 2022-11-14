import { useState, useEffect } from "react";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import BuyerRegularOrderCard from "../../components/sections/BuyerRegularOrders";
import BuyerScheduledOrderCard from "../../components/sections/BuyerScheduledOrders";

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
        await getRegularOrders(getRegularOrdersHandler);
        await getScheduledOrders(getScheduledOrdersHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" prop={orderDisplayHandler} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {orderDisplay === "Regular Orders" ? (
          regularOrders.map((order) => {
            return <BuyerRegularOrderCard props={order} />;
          })
        ) : orderDisplay === "Scheduled Orders" ? (
          scheduledOrders.map((order) => {
            return <BuyerScheduledOrderCard props={order} />;
          })
        ) : (
          <Text>Other Orders</Text>
        )}
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
