import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-paper";

// Styles
import { LIGHTGREEN, CREAMWHITE } from "../../styles/colors";

const BuyerSearchCard = ({ item, navigation }) => {
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
          }}
        >
          <Text
            style={{
              width: 200,
              paddingLeft: 10,
              fontFamily: "Inter-Bold",
              fontSize: 20,
              color: CREAMWHITE,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: "Inter-Bold",
              fontSize: 14,
              color: CREAMWHITE,
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BuyerProduct", {
            product: item,
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
          }}
        >
          <Text
            style={{
              height: 50,
              width: 200,
              paddingLeft: 10,
              fontFamily: "Inter-Bold",
              fontSize: 16,
              color: CREAMWHITE,
            }}
          >
            {item.productName}
          </Text>
          <Text
            style={{
              textAlignVertical: "center",
              paddingLeft: 10,
              fontFamily: "Inter-Bold",
              fontSize: 14,
              color: CREAMWHITE,
            }}
          >
            ${item.pricePerMeasuringUnit} per {item.measuringUnit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default BuyerSearchCard;
