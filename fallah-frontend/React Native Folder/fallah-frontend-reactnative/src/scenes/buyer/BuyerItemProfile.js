import { useState, useEffect } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerItemFooter from "../../components/navbars/BuyerItemProfileFooter";
import DropDownPicker from "react-native-dropdown-picker";

// Hooks
import { getRegularOrders } from "../../hooks/buyerOrders";

// Styles
import {
  CREAMWHITE,
  DARKGREEN,
  LIGHTGREEN,
  PEACHYYELLOW,
} from "../../styles/colors";

const { width, height } = Dimensions.get("window");

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
  }, [quantity]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          style={{
            height: 250,
            backgroundColor: DARKGREEN,
          }}
        >
          {product.images.map((image) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={{
                width: width,
                height: 250,
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 2,
          paddingBottom: 10,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            color: DARKGREEN,
            fontSize: 24,
            marginVertical: 10,
          }}
        >
          {product.productName}
        </Text>
        <Text
          style={{
            backgroundColor: LIGHTGREEN,
            color: CREAMWHITE,
            paddingHorizontal: 10,
            paddingVertical: 10,
            fontFamily: "Inter-Regular",
            fontSize: 18,
            borderRadius: 10,
          }}
        >
          Prices: <FontAwesome5Icon name="box" size={18} color={PEACHYYELLOW} />{" "}
          ${product.pricePerMeasuringUnit}/{product.measuringUnit}
          {" - "}
          <FontAwesome5Icon name="boxes" size={18} color={PEACHYYELLOW} /> $
          {product.bulkPrice}/{product.measuringUnit}*
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 2,
          paddingBottom: 10,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text>
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
