import { useState, useEffect } from "react";
import { FlatList } from "react-native";

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
      <BuyerSearchType
        value={value}
        setValue={setValue}
        setSearchQuery={setSearchQuery}
      />
      <FlatList
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        data={value === "Farmers" ? farmers : products}
        renderItem={({ item }) => {
          if (value === "Farmers") {
            if (searchQuery === "") {
              return (
                <BuyerSearchCard
                  key={item._id}
                  item={item}
                  navigation={navigation}
                />
              );
            } else if (
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return (
                <BuyerSearchCard
                  key={item._id}
                  item={item}
                  navigation={navigation}
                />
              );
            }
          } else {
            if (searchQuery === "") {
              return (
                <BuyerSearchCard
                  key={item._id}
                  item={item}
                  location={"search"}
                  navigation={navigation}
                />
              );
            } else if (
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return (
                <BuyerSearchCard
                  key={item._id}
                  item={item}
                  location={"search"}
                  navigation={navigation}
                />
              );
            }
          }
        }}
      />
    </BuyerMainLayout>
  );
};

export default BuyerSearchRoute;
