import { useState, useEffect } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerItemFooter from "../../components/navbars/BuyerItemProfileFooter";

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
  console.log(product);

  const [regularOrders, setRegularOrders] = useState([]);

  const getRegularOrdersHandler = (response) => {
    console.log(response.data.regularOrders);
    setRegularOrders(response.data.regularOrders);
  };

  useEffect(() => {
    navigation.setOptions({ title: product.productName });
    async function prepare() {
      try {
        await getRegularOrders(getRegularOrdersHandler);
      } catch (error) {
        console.log(error);
      }
    }
    prepare();
  }, []);

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
      <BuyerItemFooter item={product} />
    </View>
  );
};

export default BuyerItemProfile;
