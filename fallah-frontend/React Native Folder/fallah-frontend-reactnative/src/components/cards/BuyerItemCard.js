import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import { LIGHTGREEN, CREAMWHITE } from "../../styles/colors";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// return month name from month number
const getMonthName = (monthNumber) => {
  return monthNames[monthNumber];
};

const availableMonths = (item) => {
  return (
    <>
      <FontAwesome5Icon name="calendar-alt" size={14} color={CREAMWHITE} />{" "}
      {getMonthName(new Date(item.startingSeason).getMonth())}{" "}
      <FontAwesome5Icon name="arrow-right" size={14} color={CREAMWHITE} />{" "}
      {getMonthName(new Date(item.endingSeason).getMonth())}
    </>
  );
};

const BuyerItemCard = ({ item, location, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BuyerItemProfile", { product: item })}
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
        source={{ uri: item.images[0] }}
        style={{
          width: "30%",
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
          width: "65%",
        }}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <Text
            style={{
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
              fontFamily: "Inter-Medium",
              fontSize: 14,
              color: CREAMWHITE,
            }}
          >
            {location === "search" ? item.farmerName : availableMonths(item)}
          </Text>
        </View>
        <Text
          style={{
            textAlignVertical: "center",
            paddingLeft: 10,
            fontFamily: "Inter-Medium",
            fontSize: 14,
            color: CREAMWHITE,
          }}
        >
          Prices: <FontAwesome5Icon name="box" size={14} color={CREAMWHITE} /> $
          {item.pricePerMeasuringUnit}/{item.measuringUnit}
          {" - "}
          <FontAwesome5Icon name="boxes" size={14} color={CREAMWHITE} /> $
          {item.bulkPrice}/{item.measuringUnit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BuyerItemCard;
