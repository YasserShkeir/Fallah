import { useState, useEffect } from "react";
import { ScrollView } from "react-native";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerSearchCard from "../../components/cards/BuyerSearchCard";
import BuyerSearchType from "../../components/sections/Search/BuyerSearchType";

// Hooks
import { getSearchProducts } from "../../hooks/buyerCategories";
import { getFarmers } from "../../hooks/buyerFarmer";

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
      <BuyerSearchType value={value} setValue={setValue} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
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
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerSearchRoute;
