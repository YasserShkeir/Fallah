import { useState, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

// Components
import BuyerRegularOrderCard from "../../components/sections/Buyer/Orders/BuyerRegularOrders";
import BuyerScheduledOrderCard from "../../components/sections/Buyer/Orders/BuyerScheduledOrders";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerAddOrderFABPortal from "../../components/dialogs/BuyerAddOrderFABPortal";

// Hooks
import {
  getRegularOrders,
  getScheduledOrders,
  createRegularOrder,
} from "../../hooks/buyerOrders";
import { PEACHYYELLOW } from "../../styles/colors";

const BuyerOrdersRoute = (navigation) => {
  const [orderDisplay, setOrderDisplay] = useState("Regular Orders");
  const [regularOrders, setRegularOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderDisplayHandler = (currOrder) => {
    setOrderDisplay(currOrder);
  };

  const createRegularOrderHandler = async (data) => {
    await createRegularOrder(data._id)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error data: ", error);
      });
  };

  const getRegularOrdersHandler = (response) => {
    setRegularOrders(response.data.regularOrders);
  };

  const getScheduledOrdersHandler = (response) => {
    setScheduledOrders(response.data.scheduledOrders);
  };

  useEffect(() => {
    setLoading(true);

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
  }, [orderDisplay]);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" prop={orderDisplayHandler} />

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[PEACHYYELLOW]}
            refreshing={loading}
            onRefresh={() => {
              getRegularOrders(getRegularOrdersHandler);
            }}
          />
        }
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : orderDisplay === "Regular Orders" ? (
          regularOrders.length > 0 ? (
            regularOrders.map((order) => {
              return (
                <BuyerRegularOrderCard
                  key={order._id.toString()}
                  order={order}
                  navigation={navigation}
                />
              );
            })
          ) : (
            <Text
              style={{
                height: 100,
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              No regular orders
            </Text>
          )
        ) : orderDisplay === "Scheduled Orders" ? (
          scheduledOrders.length > 0 ? (
            scheduledOrders.map((order) => {
              return (
                <BuyerScheduledOrderCard
                  key={order._id.toString()}
                  props={order}
                />
              );
            })
          ) : (
            <Text
              style={{
                height: 100,
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              No scheduled orders
            </Text>
          )
        ) : (
          <Text key={1}>Other Orders</Text>
        )}
      </ScrollView>

      <BuyerAddOrderFABPortal
        orderDisplay={orderDisplay}
        createRegularOrderHandler={createRegularOrderHandler}
      />
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
