import { View } from "react-native";
import { Text } from "react-native-paper";
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const BuyerScheduledOrderCard = ({ props }) => {
  const dividor = props.scheduleFrequency === "Daily" ? 1 : 7;
  const numDeliveries = Math.ceil(
    (new Date(props.scheduleEndDate) - new Date(props.scheduleStartDate)) /
      (1000 * 60 * 60 * 24 * dividor)
  );
  const currentDelivery = Math.ceil(
    (new Date() - new Date(props.scheduleStartDate)) /
      (1000 * 60 * 60 * 24 * dividor)
  );
  return (
    <View
      style={{
        backgroundColor: LIGHTGREEN,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        width: "100%",
        padding: 10,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 18,
          color: CREAMWHITE,
        }}
      >
        {props.deliveryStatus}{" "}
        {props.deliveryStatus === "Approved" ? "on" : "since"}{" "}
        {props.updated_at.substring(0, 10)}
      </Text>
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 14,
          color: DARKGREEN,
          marginTop: 5,
        }}
      >
        {props.scheduleFrequency} from{" "}
        {props.scheduleStartDate.substring(0, 10)}{" "}
        <FontAwesome5Icon name="arrow-right" size={12} />{" "}
        {props.scheduleEndDate.substring(0, 10)}
      </Text>

      {props.requestedCategories.length > 0 ? (
        <View
          style={{
            color: DARKGREEN,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 16,
              color: DARKGREEN,
            }}
          >
            Requested Categories:
          </Text>
          {props.requestedCategories.map((category) => (
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 14,
                color: CREAMWHITE,
              }}
            >
              {category.amount}kg of {category.categoryName}
            </Text>
          ))}
        </View>
      ) : null}

      <Text
        style={{
          fontFamily: "Inter-Medium",
          fontSize: 16,
          color: DARKGREEN,
          marginTop: 15,
        }}
      >
        {currentDelivery}/{numDeliveries} Deliveries{" "}
        {props.deliveryLocation
          ? "to " + '"' + props.deliveryLocation.name + '"'
          : ""}
        {props.deliveryStatus === "Approved" ? " Completed" : "Will be Skipped"}
      </Text>
      <FontAwesome5Icon
        name="chevron-right"
        size={18}
        color={DARKGREEN}
        style={{
          position: "absolute",
          right: 10,
        }}
      />
    </View>
  );
};

export default BuyerScheduledOrderCard;
