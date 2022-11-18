import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  Text,
  FAB,
  Dialog,
  Portal,
  Button,
} from "react-native-paper";

// Components
import BuyerRegularOrderCard from "../../components/sections/Orders/BuyerRegularOrders";
import BuyerScheduledOrderCard from "../../components/sections/Orders/BuyerScheduledOrders";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import AppbarLocationMenu from "../../components/menus/BuyerAppbarLocationMenu";

// Hooks
import {
  getRegularOrders,
  getScheduledOrders,
  createRegularOrder,
} from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, DARKGREEN, PEACHYYELLOW } from "../../styles/colors";

const BuyerOrdersRoute = (navigation) => {
  const [orderDisplay, setOrderDisplay] = useState("Regular Orders");
  const [regularOrders, setRegularOrders] = useState([]);
  const [scheduledOrders, setScheduledOrders] = useState([]);
  const [locationImp, setLocationImp] = useState("Location");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
  }, [orderDisplay]);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" prop={orderDisplayHandler} />

      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        {loading ? (
          <ActivityIndicator />
        ) : orderDisplay === "Regular Orders" ? (
          regularOrders.map((order) => {
            return (
              <BuyerRegularOrderCard
                key={order._id.toString()}
                order={order}
                navigation={navigation}
              />
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
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: PEACHYYELLOW,
        }}
        icon="plus"
        label={"New " + orderDisplay}
        onPress={showDialog}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor: DARKGREEN,
          }}
        >
          <Dialog.Title
            style={{
              color: CREAMWHITE,
              fontFamily: "Inter-Medium",
            }}
          >
            Add {orderDisplay}
          </Dialog.Title>
          <Dialog.Content
            style={{
              color: CREAMWHITE,
              fontFamily: "Inter-Medium",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: CREAMWHITE,
                fontFamily: "Inter-Bold",
              }}
            >
              Deliver To:{" "}
            </Text>
            <AppbarLocationMenu
              page={"orders"}
              locationImp={locationImp}
              setLocationImp={setLocationImp}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => createRegularOrderHandler(locationImp)}
              textColor={DARKGREEN}
              buttonColor={CREAMWHITE}
              contentStyle={{
                fontFamily: "Inter-Medium",
                marginHorizontal: 10,
              }}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
