import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

// Components
import images from "../../assets/images";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import BuyerSeasonalCard from "../../components/sections/BuyerSeasonalCard";
import BuyerCategoriesSection from "../../components/sections/BuyerCategoriesSection";
import BuyerFavouritesSection from "../../components/sections/BuyerFollowingsSection";

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";
import { getCategories } from "../../hooks/buyerCategories";
import { buyerGetFavourites } from "../../hooks/buyerFarmer";

// Styles
import { DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerHomeRoute = () => {
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [followings, setFollowings] = useState([]);

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

  const getFavouritesHandler = (response) => {
    setFollowings(response.data.following);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getSeasonalItems(getSeasonalItemsHandler);
        await getCategories(getCategoriesHandler);
        await buyerGetFavourites(getFavouritesHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="home" />
      <ScrollView>
        {seasonalItems.length > 0 ? (
          <>
            <BuyerSeasonalCard seasonalItems={seasonalItems[0]} />
            {categories.length > 0 && images ? (
              <>
                <BuyerCategoriesSection
                  categories={categories}
                  images={images}
                />
                {followings.length > 0 ? (
                  <BuyerFavouritesSection followings={followings} />
                ) : (
                  <ActivityIndicator
                    style={{ marginTop: 20 }}
                    size="large"
                    color={DARKGREEN}
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
