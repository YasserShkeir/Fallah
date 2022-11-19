import { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text, Appbar } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import AppbarLocationMenu from "../../components/menus/BuyerAppbarLocationMenu";

// Hooks
import {
  deleteRegularOrder,
  updateRegularOrderLocation,
  removeProductFromRegularOrder,
} from "../../hooks/buyerOrders";

// Styles
import {
  CREAMWHITE,
  DARKGREEN,
  LIGHTGREEN,
  PEACHYYELLOW,
} from "../../styles/colors";

const BuyerRegularOrderProfile = ({ route, navigation }) => {
  const order = route.params.order;
  const [orderLocation, setOrderLocation] = useState(order.deliveryLocation);
  const [orderProducts, setOrderProducts] = useState(order.products);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
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
      ),
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: LIGHTGREEN,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-Bold",
                    fontSize: 16,
                    color: CREAMWHITE,
                  }}
                >
                  {product.productName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter-Medium",
                    fontSize: 14,
                    color: CREAMWHITE,
                  }}
                >
                  Subtotal: ${product.productTotal}
                </Text>
              </View>
              <Button
                mode="contained"
                icon="delete"
                contentStyle={{ backgroundColor: "red" }}
                labelStyle={{ color: "white", fontFamily: "Inter-Bold" }}
                onPress={async () => {
                  await removeProductFromRegularOrder(
                    order._id,
                    product._id
                  ).then((response) => {
                    console.log("response", response);
                  });
                }}
              >
                Remove
              </Button>
            </View>
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
    </BuyerMainLayout>
  );
};

export default BuyerRegularOrderProfile;
