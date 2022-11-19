import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import AppbarLocationMenu from "../../components/menus/BuyerAppbarLocationMenu";
import BuyerOrderProfileItemCard from "../../components/cards/BuyerOrderProfileItemCard";
import BuyerOrderProfileFooter from "../../components/navbars/BuyerOrderProfileFooter";

// Hooks
import {
  deleteRegularOrder,
  updateRegularOrderLocation,
} from "../../hooks/buyerOrders";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerRegularOrderProfile = ({ route, navigation }) => {
  const order = route.params.order;
  const [orderLocation, setOrderLocation] = useState(order.deliveryLocation);
  const [orderProducts, setOrderProducts] = useState(order.products);
  console.log("order", order.deliveryStatus);
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
          display: "flex",
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
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 18,
          color: DARKGREEN,
          marginVertical: 10,
          marginHorizontal: 20,
        }}
      >
        Products in this order:
      </Text>
      {orderProducts.length > 0 ? (
        orderProducts.map((product) => {
          return (
            <BuyerOrderProfileItemCard
              order={order}
              product={product}
              key={product._id}
              navigation={navigation}
            />
          );
        })
      ) : (
        <Text
          style={{
            fontFamily: "Inter-Medium",
            fontSize: 16,
            color: DARKGREEN,
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          No products in this order
        </Text>
      )}
      <BuyerOrderProfileFooter order={order} orderProducts={orderProducts} />
    </BuyerMainLayout>
  );
};

export default BuyerRegularOrderProfile;
