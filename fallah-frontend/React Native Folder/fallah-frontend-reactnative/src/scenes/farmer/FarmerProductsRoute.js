import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

// Components
import ItemCard from "../../components/cards/ItemCard";

// Hooks
import { getFarmerProducts } from "../../hooks/buyerFarmer";

// Styles
import { DARKGREEN, LIGHTGREEN, PEACHYYELLOW } from "../../styles/colors";

const FarmerProductsRoute = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const getFarmerProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded = await jwt_decode(token);
        await getFarmerProducts(getFarmerProductsHandler, decoded.subject);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View>
      <View
        style={{
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 1,
          padding: 10,
          paddingHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            backgroundColor: PEACHYYELLOW,
          }}
          labelStyle={{
            color: DARKGREEN,
            fontFamily: "Inter-Bold",
          }}
          onPress={() => navigation.navigate("FarmerAddItem")}
        >
          Add Product
        </Button>
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Inter-Bold",
          }}
        >
          Your Products
        </Text>
        <ScrollView>
          {products.map((product) => (
            <ItemCard
              key={product._id}
              item={product}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FarmerProductsRoute;
