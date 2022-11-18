import { View } from "react-native";
import { Text } from "react-native-paper";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import { DARKGREEN, LIGHTGREEN, CREAMWHITE } from "../../../styles/colors";

const BuyerRegularOrderCard = ({ props }) => {
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
              color: CREAMWHITE,
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
                      color: CREAMWHITE,
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

        <Text
          style={{
            fontFamily: "Inter-Regular",
            fontSize: 16,
            marginTop: 10,
            color: CREAMWHITE,
          }}
        >
          Total: $ {props.orderSubtotal}
        </Text>
      </View>
      <FontAwesome5Icon
        name="chevron-right"
        size={18}
        color={CREAMWHITE}
        style={{
          position: "absolute",
          right: 10,
        }}
      />
    </View>
  );
};

export default BuyerRegularOrderCard;
