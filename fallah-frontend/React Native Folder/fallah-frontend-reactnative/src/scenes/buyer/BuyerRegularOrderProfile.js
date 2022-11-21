import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import AppbarLocationMenu from "../../components/menus/BuyerAppbarLocationMenu";
import BuyerOrderProfileFooter from "../../components/navbars/BuyerOrderProfileFooter";
import BuyerRegularOrderProducts from "../../components/sections/Buyer/Orders/BuyerRegularOrderProducts";

// Hooks
import {
  deleteRegularOrder,
  updateRegularOrderLocation,
} from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, DARKGREEN } from "../../styles/colors";

const BuyerRegularOrderProfile = ({ route, navigation }) => {
  const order = route.params.order;
  const orderProducts = order.products;
  const [orderLocation, setOrderLocation] = useState(order.deliveryLocation);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        order.deliveryStatus === "Pending" ? (
          <Button
            mode="contained"
            icon="delete"
            contentStyle={{ backgroundColor: "red" }}
            labelStyle={{ color: "white", fontFamily: "Inter-Bold" }}
            onPress={async () => {
              await deleteRegularOrder(order._id)
                .then((response) => {
                  console.log("response", response);
                })
                .catch((error) => {
                  console.log("error data: ", error);
                });
            }}
          >
            Delete Order
          </Button>
        ) : null,
    });

    updateRegularOrderLocation(order._id, orderLocation._id);
  }, [orderLocation]);

  return (
    <BuyerMainLayout>
      <View
        style={{
          display: order.deliveryStatus === "Pending" ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: DARKGREEN,
        }}
      >
        <FontAwesome5Icon
          name="map-pin"
          size={18}
          color={CREAMWHITE}
          style={{
            marginRight: 10,
          }}
        />

        <AppbarLocationMenu page="orders" setLocationImp={setOrderLocation} />
      </View>
      {/* // here */}
      <BuyerRegularOrderProducts
        order={order}
        orderProducts={orderProducts}
        navigation={navigation}
      />
      <BuyerOrderProfileFooter order={order} orderProducts={orderProducts} />
    </BuyerMainLayout>
  );
};

export default BuyerRegularOrderProfile;
