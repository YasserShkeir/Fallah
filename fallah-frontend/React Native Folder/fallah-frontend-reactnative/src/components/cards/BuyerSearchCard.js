import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-paper";

// Components
import BuyerItemCard from "./BuyerItemCard";

// Styles
import { LIGHTGREEN, DARKGREEN, CREAMWHITE } from "../../styles/colors";

const BuyerSearchCard = ({ item, location, navigation }) => {
  console.log(item);
  const image = item.images[0];
  if (item.__t === "Farmer") {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BuyerFarmerProfile", {
            farmer: item,
          })
        }
        style={{
          width: "100%",
          height: 120,
          marginHorizontal: 3,
          marginVertical: 5,
          backgroundColor: LIGHTGREEN,
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 10,
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: "40%",
            height: 100,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 100,
            width: "60%",
            paddingLeft: 10,
            fontFamily: "Inter-Bold",
            color: CREAMWHITE,
          }}
        >
          <Text
            style={{
              width: 200,
              fontFamily: "Inter-Bold",
              color: CREAMWHITE,
              fontSize: 20,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter-Medium",
              color: CREAMWHITE,
            }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter-Bold",
              color: DARKGREEN,
            }}
          >
            User Since {item.created_at.slice(0, 10)}
            {/* {((Date.now() - Date.parse(item.created_at)) / 86400000).toFixed()}{" "} */}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <BuyerItemCard
        key={item._id}
        item={item}
        location={location}
        navigation={navigation}
      />
    );
  }
};

export default BuyerSearchCard;
