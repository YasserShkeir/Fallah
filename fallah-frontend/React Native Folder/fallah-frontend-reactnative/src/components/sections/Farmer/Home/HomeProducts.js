import { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";

// Components
import ItemCard from "../../../../components/cards/ItemCard";

// Hooks
import { getSelfProducts } from "../../../../hooks/farmerItem";

const HomeProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSelfProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    setLoading(true);
    async function prepare() {
      try {
        await getSelfProducts(getSelfProductsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
    setLoading(false);
  }, []);

  return (
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              await getSelfProducts(getSelfProductsHandler);
              setLoading(false);
            }}
          />
        }
      >
        {products.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Inter-Regular",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            You have no products yet.
          </Text>
        ) : null}
        {products ? (
          products.map((product) => {
            return (
              <ItemCard
                key={product._id}
                item={product}
                navigation={navigation}
              />
            );
          })
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeProducts;
