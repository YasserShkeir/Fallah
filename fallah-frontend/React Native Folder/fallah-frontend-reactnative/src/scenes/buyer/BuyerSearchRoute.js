import { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";

// Components
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerSearchType from "../../components/sections/Buyer/Search/BuyerSearchType";
import SearchListItem from "../../components/sections/Buyer/Search/SearchListItem";

// Hooks
import { getSearchProducts } from "../../hooks/buyerCategories";
import { getFarmers } from "../../hooks/buyerFarmer";

// Styles
import { PEACHYYELLOW } from "../../styles/colors";

const BuyerSearchRoute = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("Farmers");
  const [loading, setLoading] = useState(true);

  const onChangeSearch = (query) => setSearchQuery(query);

  const getFarmersHandler = (response) => {
    setFarmers(response.data.farmers);
  };

  const getProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    setLoading(true);
    async function prepare() {
      try {
        await getFarmers(getFarmersHandler);
        await getSearchProducts(getProductsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
    setLoading(false);
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
        refreshControl={
          <RefreshControl
            colors={[PEACHYYELLOW]}
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              {
                value === "Farmers"
                  ? getFarmers(getFarmersHandler)
                  : getSearchProducts(getProductsHandler);
              }
              setLoading(false);
            }}
          />
        }
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        data={value === "Farmers" ? farmers : products}
        renderItem={({ item }) => {
          return (
            <SearchListItem
              value={value}
              searchQuery={searchQuery}
              item={item}
              navigation={navigation}
            />
          );
        }}
      />
    </BuyerMainLayout>
  );
};

export default BuyerSearchRoute;
