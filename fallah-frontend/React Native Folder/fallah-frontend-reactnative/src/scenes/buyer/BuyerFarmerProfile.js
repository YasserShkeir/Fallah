import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { RefreshControl } from "react-native";

// Components
import ImageSection from "../../components/sections/Buyer/FarmerProfile/ImageSection";
import ReviewsSection from "../../components/sections/Buyer/FarmerProfile/ReviewsSection";
import ProductsSection from "../../components/sections/Buyer/FarmerProfile/ProductsSection";

// Hooks
import { getFarmerReviews, getFarmerProducts } from "../../hooks/buyerFarmer";

const BuyerFarmerProfile = ({ route, navigation }) => {
  // Access data sent from payload
  const { farmer } = route.params;

  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  const getFarmerReviewsHandler = (response) => {
    setReviews(response.data.reviews);
  };

  const getFarmerProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFarmerReviews(getFarmerReviewsHandler, farmer._id);
        await getFarmerProducts(getFarmerProductsHandler, farmer._id);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getFarmerReviews(getFarmerReviewsHandler, farmer._id);
              getFarmerProducts(getFarmerProductsHandler, farmer._id);
              setLoading(false);
            }}
          />
        }
      >
        <ImageSection
          farmer={farmer}
          loading={loading}
          setLoading={setLoading}
        />
        <ReviewsSection reviews={reviews} />
        <ProductsSection products={products} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuyerFarmerProfile;
