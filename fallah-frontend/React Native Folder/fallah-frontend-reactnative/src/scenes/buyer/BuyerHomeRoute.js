import { useState, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

// Components
import images from "../../assets/images";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerSeasonalCard from "../../components/sections/Buyer/HomePage/BuyerSeasonalCard";
import BuyerCategoriesSection from "../../components/sections/Buyer/HomePage/BuyerCategoriesSection";
import BuyerFollowingSection from "../../components/sections/Buyer/HomePage/BuyerFollowingsSection";

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";
import { getCategories } from "../../hooks/buyerCategories";
import { getFollowing } from "../../hooks/buyerFarmer";

// Styles
import { DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerHomeRoute = ({ navigation }) => {
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSeasonalItemsHandler = (response) => {
    setSeasonalItems(response.data.seasonalItems);
  };

  const getCategoriesHandler = (response) => {
    let data = [];

    response.data.categories.forEach((category) => {
      category.childCategories.forEach((childCategory) => {
        if (childCategory.name.startsWith("Other")) {
          data.push({ childCategory, catName: category.name });
        }
      });
    });
    //
    setCategories(data);
  };

  const getFollowingHandler = (response) => {
    setFollowings(response.data.following);
  };

  useEffect(() => {
    setLoading(true);
    async function prepare() {
      try {
        await getSeasonalItems(getSeasonalItemsHandler);
        await getCategories(getCategoriesHandler);
        await getFollowing(getFollowingHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
    setLoading(false);
  }, []);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="home" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getFollowing(getFollowingHandler);
            }}
          />
        }
      >
        {seasonalItems.length > 0 ? (
          <>
            <BuyerSeasonalCard
              item={seasonalItems[0]}
              navigation={navigation}
            />
            {categories.length > 0 && images ? (
              <>
                <BuyerCategoriesSection
                  categories={categories}
                  images={images}
                />
                {followings.length > 0 ? (
                  <BuyerFollowingSection
                    followings={followings}
                    navigation={navigation}
                  />
                ) : followings.length === 0 ? (
                  <Text
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      fontSize: 18,
                      color: DARKGREEN,
                      fontFamily: "Inter-Bold",
                    }}
                  >
                    No Followings
                  </Text>
                ) : (
                  <ActivityIndicator
                    animating={true}
                    color={DARKGREEN}
                    size="large"
                    style={{ marginTop: 20 }}
                  />
                )}
              </>
            ) : (
              <ActivityIndicator
                style={{ marginTop: 20 }}
                animating={true}
                color={DARKGREEN}
              />
            )}
          </>
        ) : (
          <ActivityIndicator
            animating={true}
            color={LIGHTGREEN}
            size="large"
            style={{ marginTop: "50%" }}
          />
        )}
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerHomeRoute;
