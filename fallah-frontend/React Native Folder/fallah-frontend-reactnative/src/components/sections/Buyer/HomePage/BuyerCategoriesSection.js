import { View } from "react-native";
import { Text } from "react-native-paper";

// Components
import BuyerCategoryCard from "../../../cards/BuyerCategoryCard";

// Styles
import { LIGHTGREEN, DARKGREEN } from "../../../../styles/colors";

const BuyerCategoriesSection = (categories) => {
  return (
    <View
      style={{
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 2,
        paddingHorizontal: 12,
      }}
    >
      <Text
        style={{
          marginBottom: 10,
          fontFamily: "Inter-Bold",
          fontSize: 22,
          color: DARKGREEN,
        }}
      >
        Top Sought Categories
      </Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {categories ? (
          categories.categories.slice(0, 5).map((category) => {
            return (
              <BuyerCategoryCard
                key={category.childCategory._id}
                images={categories.images}
                category={category}
              />
            );
          })
        ) : (
          <Text>Loading...</Text>
        )}
        {categories ? (
          <BuyerCategoryCard
            key={6}
            images={categories.images}
            category={{ catName: "View All" }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default BuyerCategoriesSection;
