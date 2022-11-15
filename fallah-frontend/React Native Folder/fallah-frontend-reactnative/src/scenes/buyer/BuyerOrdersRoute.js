import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

// Components
import BuyerRegularOrderCard from "../../components/sections/Orders/BuyerRegularOrders";
import BuyerScheduledOrderCard from "../../components/sections/Orders/BuyerScheduledOrders";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";

// Hooks
import { getRegularOrders, getScheduledOrders } from "../../hooks/buyerOrders";

const BuyerOrdersRoute = () => {
  const [orderDisplay, setOrderDisplay] = useState("Regular Orders");
  const [regularOrders, setRegularOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderDisplayHandler = (currOrder) => {
    setOrderDisplay(currOrder);
  };

  useEffect(() => {
    setLoading(true);
    const getRegularOrdersHandler = (response) => {
      setRegularOrders(response.data.regularOrders);
    };

    const getScheduledOrdersHandler = (response) => {
      setScheduledOrders(response.data.scheduledOrders);
    };
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
    setLoading(false);
  }, [regularOrders, scheduledOrders]);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" prop={orderDisplayHandler} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {loading ? (
          <ActivityIndicator />
        ) : orderDisplay === "Regular Orders" ? (
          regularOrders.map((order) => {
            return (
              <BuyerRegularOrderCard key={order._id.toString()} props={order} />
            );
          })
        ) : orderDisplay === "Scheduled Orders" ? (
          scheduledOrders.map((order) => {
            return (
              <BuyerScheduledOrderCard
                key={order._id.toString()}
                props={order}
              />
            );
          })
        ) : (
          <Text key={1}>Other Orders</Text>
        )}
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
