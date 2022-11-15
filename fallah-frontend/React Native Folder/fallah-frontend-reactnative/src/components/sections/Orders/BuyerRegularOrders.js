import { View } from "react-native";
import { Text } from "react-native-paper";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import { DARKGREEN, LIGHTGREEN } from "../../../styles/colors";

const BuyerRegularOrderCard = ({ props }) => {
  return (
    <View
      style={{
        display: "flex",
        borderTopColor: LIGHTGREEN,
        borderTopWidth: 2,
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 2,
        marginTop: 5,
        width: "100%",
        padding: 5,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 14,
              color: LIGHTGREEN,
            }}
          >
            {props.deliveryStatus} on {props.updated_at.substring(0, 10)}
          </Text>
          <Text
            style={{
              fontFamily: "Inter-Bold",
              fontSize: 14,
              color: DARKGREEN,
            }}
          >
            Destination:{" "}
            {props.deliveryLocation
              ? props.deliveryLocation.name
              : "No Location"}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Inter-Medium",
              fontSize: 16,
              color: DARKGREEN,
              marginTop: 15,
            }}
          >
            Products:
          </Text>
          {props.products.length > 0 ? (
            props.products.slice(0, 2).map((product) => {
              return (
                <View
                  key={product._id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter-Bold",
                      fontSize: 14,
                      width: 30,
                      color: LIGHTGREEN,
                    }}
                  >
                    {product.amount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter-Medium",
                      fontSize: 14,
                      color: DARKGREEN,
                    }}
                  >
                    {product.productName}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 14,
                color: DARKGREEN,
              }}
            >
              Add some products!
            </Text>
          )}

          {props.products.length > 2 ? (
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 14,
                color: DARKGREEN,
              }}
            >
              {props.products.length - 2} more...
            </Text>
          ) : null}
        </View>

        <View>
          <Text
            style={{
              fontFamily: "Inter-Regular",
              fontSize: 16,
              marginTop: 10,
              color: DARKGREEN,
            }}
          >
            Total: $ {props.orderSubtotal}
          </Text>
        </View>
      </View>
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

export default BuyerRegularOrderCard;
