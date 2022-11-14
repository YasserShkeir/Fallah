import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerSearchCard from "../../components/cards/BuyerSearchCard";

// Hooks
import { getSearchProducts } from "../../hooks/buyerCategories";
import { getFarmers } from "../../hooks/buyerFarmer";

// Style
import { DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerSearchRoute = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("Farmers");

  const onChangeSearch = (query) => setSearchQuery(query);

  const getFarmersHandler = (response) => {
    setFarmers(response.data.farmers);
  };

  const getProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFarmers(getFarmersHandler);
        await getSearchProducts(getProductsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="search" prop={onChangeSearch} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <View>
          <View
            style={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            <Button
              onPress={() => {
                setValue("Farmers");
              }}
              style={{
                borderRadius: 0,
                width: "50%",
                ...(value === "Farmers"
                  ? { borderBottomWidth: 2, borderBottomColor: LIGHTGREEN }
                  : {}),
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter-Bold",
                  color: value === "Farmers" ? LIGHTGREEN : DARKGREEN,
                  fontSize: 16,
                }}
              >
                Farmers
              </Text>
            </Button>
            <Button
              onPress={() => {
                setValue("Products");
              }}
              style={{
                borderRadius: 0,
                width: "50%",
                ...(value === "Products"
                  ? { borderBottomWidth: 2, borderBottomColor: LIGHTGREEN }
                  : {}),
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter-Bold",
                  color: value === "Products" ? LIGHTGREEN : DARKGREEN,
                  fontSize: 16,
                }}
              >
                Products
              </Text>
            </Button>
          </View>

          {value === "Farmers"
            ? farmers.slice(0, 5).map((farmer) => {
                if (searchQuery === "") {
                  return (
                    <BuyerSearchCard
                      key={farmer._id}
                      item={farmer}
                      navigation={navigation}
                    />
                  );
                } else if (
                  farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return (
                    <BuyerSearchCard
                      key={farmer._id}
                      item={farmer}
                      navigation={navigation}
                    />
                  );
                }
              })
            : products.map((product) => {
                if (searchQuery === "") {
                  return (
                    <BuyerSearchCard
                      key={product._id}
                      item={product}
                      navigation={navigation}
                    />
                  );
                } else if (
                  product.productName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return (
                    <BuyerSearchCard
                      key={product._id}
                      item={product}
                      navigation={navigation}
                    />
                  );
                }
              })}
        </View>
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerSearchRoute;
