import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { LOCALIP } from "@env";

// Styles
import { BuyerSeasonalCardContainer } from "../../../../styles/components";
import { LIGHTGREEN, DARKGREEN, CREAMWHITE } from "../../../../styles/colors";

const BuyerSeasonalCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={BuyerSeasonalCardContainer}
      onPress={() => {
        navigation.navigate("BuyerItemProfile", {
          product: item,
        });
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 100,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 18,
            color: DARKGREEN,
          }}
        >
          Upcoming Season Items
        </Text>
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 22,
            color: LIGHTGREEN,
            backgroundColor: CREAMWHITE,
            borderRadius: 10,
          }}
        >
          {" "}
          {item.productName}{" "}
        </Text>
        <Text
          style={{
            fontFamily: "Inter-Medium",
            textDecorationLine: "underline",
            color: DARKGREEN,
          }}
        >
          Pre-order Now
        </Text>
      </View>
      <Image
        source={{ uri: `${LOCALIP}/api/download/users/${item.images[0]}` }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
    </TouchableOpacity>
  );
};

export default BuyerSeasonalCard;
