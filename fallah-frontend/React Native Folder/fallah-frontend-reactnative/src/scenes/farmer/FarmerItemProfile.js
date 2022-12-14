import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { LOCALIP } from "@env";

// Components
import ProductTextInput from "../../components/text/FarmerProductTextInput";
import Row from "../../components/layouts/Row";
import ImageAdder from "../../components/sections/Farmer/AddItem/ImageAdder";

// Hooks
import { editFarmerItem, deleteFarmerItem } from "../../hooks/farmerItem";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";
import { flexRow } from "../../styles/components";

const FarmerItemProfile = ({ route, navigation }) => {
  const { product } = route.params;

  const [name, setName] = useState(product.productName);
  const [image, setImage] = useState(product.images[0]);
  const [startingSeason, setStartingSeason] = useState(
    product.startingSeason.substring(0, 10)
  );
  const [endingSeason, setEndingSeason] = useState(
    product.endingSeason.substring(0, 10)
  );
  const [harvestedOn, setHarvestedOn] = useState(
    product.harvestedOn.substring(0, 10)
  );
  const [measuringUnit, setMeasuringUnit] = useState(
    product.measuringUnit.toString()
  );
  const [MUPrice, setMUPrice] = useState(
    product.pricePerMeasuringUnit.toString()
  );
  const [bulkAmt, setBulkAmt] = useState(product.minBulkAmount.toString());
  const [bulkPrice, setBulkPrice] = useState(product.bulkPrice.toString());
  const [amountAvailable, setAmountAvailable] = useState(
    product.amountAvailable.toString()
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="delete"
          iconColor={CREAMWHITE}
          size={30}
          style={{ backgroundColor: "red" }}
          onPress={() => {
            let data = {
              categoryID: product.mainCategoryID,
              childCategoryID: product.childCategoryID,
              productID: product._id,
            };
            deleteFarmerItem(data);
          }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ImageAdder
        image={`${LOCALIP}/api/download/users/${product.images[0]}`}
        setImage={setImage}
        containerStyle={{
          width: "100%",
        }}
      />

      <View
        style={{
          ...flexRow,
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 2,
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
      </View>
      <ScrollView
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Inter-Bold",
            color: DARKGREEN,
          }}
        >
          Edit Item
        </Text>

        <Row>
          <ProductTextInput
            label="Product Name"
            value={name}
            onChangeText={(value) => setName(value)}
            style={{ width: "100%" }}
          />
        </Row>

        <Row>
          <ProductTextInput
            label="Starting Season"
            value={startingSeason}
            onChangeText={(value) => setStartingSeason(value)}
            style={{ width: "45%" }}
          />
          <ProductTextInput
            label="Ending Season"
            value={endingSeason}
            onChangeText={(value) => setEndingSeason(value)}
            style={{ width: "45%" }}
          />
        </Row>
        <Row>
          <ProductTextInput
            label="Harvested On"
            value={harvestedOn}
            onChangeText={(value) => setHarvestedOn(value)}
            style={{ width: "45%" }}
          />
          <ProductTextInput
            label="Amount Available"
            value={amountAvailable}
            onChangeText={(value) => setAmountAvailable(value)}
            style={{ width: "45%" }}
          />
        </Row>
        <Row>
          <ProductTextInput
            label="Measuring Unit"
            value={measuringUnit}
            onChangeText={(value) => setMeasuringUnit(value)}
            style={{ width: "45%" }}
          />
          <ProductTextInput
            label="Price Per MU"
            value={MUPrice}
            onChangeText={(value) => setMUPrice(value)}
            style={{ width: "45%" }}
          />
        </Row>
        <Row>
          <ProductTextInput
            label="Bulk Amount"
            value={bulkAmt}
            onChangeText={(value) => setBulkAmt(value)}
            style={{ width: "45%" }}
          />
          <ProductTextInput
            label="Bulk Price"
            value={bulkPrice}
            onChangeText={(value) => setBulkPrice(value)}
            style={{ width: "45%" }}
          />
        </Row>
        <Row
          style={{
            justifyContent: "center",
          }}
        >
          <Button
            style={{ width: "45%", marginTop: 10, marginBottom: 35 }}
            contentStyle={{
              backgroundColor: LIGHTGREEN,
              height: 45,
            }}
            onPress={async () => {
              const data = {
                productID: product._id,
                categoryID: product.mainCategoryID,
                childCategoryID: product.childCategoryID,
                productName: name,
                images: [image],
                startingSeason: startingSeason,
                endingSeason: endingSeason,
                harvestedOn: harvestedOn,
                pickupLocationID: product.pickupLocationID,
                measuringUnit: measuringUnit,
                pricePerMeasuringUnit: MUPrice,
                minBulkAmount: bulkAmt,
                bulkPrice: bulkPrice,
                amountAvailable: amountAvailable,
              };

              await editFarmerItem(data)
                .then((res) => {
                  alert("Item Edited Successfully");
                })
                .catch((err) => {
                  console.log("1: ", err);
                });
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Bold",
                color: CREAMWHITE,
              }}
            >
              Edit Item
            </Text>
          </Button>
        </Row>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmerItemProfile;
