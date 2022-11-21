import { useState } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Components
import BuyerProductProfilePortal from "../../../dialogs/BuyerProductProfilePortal";

// Styles
import {
  CREAMWHITE,
  DARKGREEN,
  LIGHTGREEN,
  PEACHYYELLOW,
} from "../../../../styles/colors";

const { height, width } = Dimensions.get("window");

const ProductTopSection = ({ product }) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          style={{
            height: 250,
            backgroundColor: DARKGREEN,
          }}
        >
          {product.images.map((image) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={{
                width: width,
                height: 250,
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 2,
          paddingBottom: 10,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            color: DARKGREEN,
            fontSize: 24,
            marginVertical: 10,
          }}
        >
          {product.productName}
        </Text>
        <Text
          style={{
            backgroundColor: LIGHTGREEN,
            color: CREAMWHITE,
            paddingHorizontal: 10,
            paddingVertical: 10,
            fontFamily: "Inter-Regular",
            fontSize: 18,
            borderRadius: 10,
          }}
        >
          Prices: <FontAwesome5Icon name="box" size={18} color={PEACHYYELLOW} />{" "}
          ${product.pricePerMeasuringUnit}/{product.measuringUnit}
          {" - "}
          <FontAwesome5Icon name="boxes" size={18} color={PEACHYYELLOW} /> $
          {product.bulkPrice}/{product.measuringUnit}{" "}
          <FontAwesome5Icon
            name="question-circle"
            size={18}
            color={DARKGREEN}
            onPress={() => {
              // Add a modal here
              showDialog();
            }}
          />{" "}
        </Text>
        <BuyerProductProfilePortal
          visible={visible}
          closeDialog={closeDialog}
          product={product}
        />
      </View>
    </>
  );
};

export default ProductTopSection;
