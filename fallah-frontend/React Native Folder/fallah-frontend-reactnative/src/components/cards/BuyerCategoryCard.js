import { Card } from "react-native-paper";
import { View } from "react-native";
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";

const BuyerCategoryCard = ({ images, category }) => {
  return (
    <View
      style={{
        marginBottom: 20,
        borderColor: LIGHTGREEN,
        borderWidth: 4,
        borderRadius: 8,
      }}
    >
      <Card style={{ width: 100, height: 150 }} mode="elevated" elevation={1}>
        <Card.Cover
          source={
            images[images.findIndex((image) => image.name === category.catName)]
              .src
          }
          style={{ width: 100, height: 120, backgroundColor: CREAMWHITE }}
        />
        <Card.Title
          title={category.catName}
          titleStyle={{
            fontFamily: "Inter-Medium",
            fontSize: 14,
            color: LIGHTGREEN,
            textAlignVertical: "center",
          }}
          style={{
            backgroundColor: CREAMWHITE,
            height: 30,
            minHeight: 30,
            borderRadius: 8,
          }}
        />
      </Card>
    </View>
  );
};

export default BuyerCategoryCard;
