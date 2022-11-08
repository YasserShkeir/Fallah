import { Card } from "react-native-paper";
import { View } from "react-native";

const BuyerCategoryCard = ({ images, category }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Card style={{ width: 100, height: 160 }} mode="elevated">
        <Card.Cover
          source={
            images[images.findIndex((image) => image.name === category.catName)]
              .src
          }
          style={{ width: 100, height: 120 }}
        />
        <Card.Title
          title={category.catName}
          titleStyle={{ fontFamily: "Inter-Regular", fontSize: 14 }}
        />
      </Card>
    </View>
  );
};

export default BuyerCategoryCard;
