import { useState, useEffect } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Hooks
import { getUserLocations } from "../../hooks/locations";
import { getCategories } from "../../hooks/buyerCategories";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const ProductTextInput = ({ label, value, onChangeText, style }) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
      }}
      style={{ backgroundColor: "white", marginVertical: 5, ...style }}
      label={label}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const Row = ({ children }) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

const FarmerAddItem = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [MCOpen, setMCOpen] = useState(false);
  const [MCValue, setMCValue] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [CCOpen, setCCOpen] = useState(false);
  const [CCValue, setCCValue] = useState(null);
  const [childCategories, setChildCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [startingSeason, setStartingSeason] = useState("");
  const [endingSeason, setEndingSeason] = useState("");
  const [harvestedOn, setHarvestedOn] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [locations, setLocations] = useState([]);
  const [freshStatus, setFreshStatus] = useState("");
  const [measuringUnit, setMeasuringUnit] = useState("");
  const [MUPrice, setMUPrice] = useState("");
  const [bulkAmt, setBulkAmt] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");
  const [amountAvailable, setAmountAvailable] = useState("");

  const getCategoriesHandler = (response) => {
    let mainCategories = [];

    response.data.categories.forEach((category) => {
      mainCategories.push({ label: category.name, value: category._id });
    });

    setMainCategories(mainCategories);
    setCategories(response.data.categories);
  };

  const getUserLocationsHandler = async (response) => {
    console.log(response.data.locations);
    let data = [];
    response.data.locations.map((location) => {
      data.push(location);
    });

    setLocations(data);
    setLocationValue(data[0].name);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getCategories(getCategoriesHandler);
        await getUserLocations(getUserLocationsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View
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
        Add Item
      </Text>
      <Row>
        {mainCategories.length > 0 ? (
          <DropDownPicker
            containerStyle={{
              width: "45%",
            }}
            style={{
              marginVertical: 10,
              zIndex: 1000,
            }}
            textStyle={{ fontFamily: "Inter-Regular" }}
            placeholder="Main Category"
            open={MCOpen}
            value={MCValue}
            items={mainCategories}
            setOpen={setMCOpen}
            setValue={setMCValue}
            setItems={setMainCategories}
            onChangeValue={(value) => {
              let childCategories = [];

              categories.forEach((category) => {
                if (category._id === value) {
                  category.childCategories.forEach((childCategory) => {
                    childCategories.push({
                      label: childCategory.name,
                      value: childCategory._id,
                    });
                  });
                }
              });

              setChildCategories(childCategories);
            }}
          />
        ) : null}
        {MCValue ? (
          <DropDownPicker
            containerStyle={{
              width: "45%",
            }}
            style={{
              marginVertical: 10,
              zIndex: 100,
            }}
            textStyle={{ fontFamily: "Inter-Regular" }}
            placeholder="Child Category"
            open={CCOpen}
            value={CCValue}
            items={childCategories}
            setOpen={setCCOpen}
            setValue={setCCValue}
            setItems={setChildCategories}
          />
        ) : null}
      </Row>

      <Row>
        <ProductTextInput
          label="Product Name"
          value={name}
          onChangeText={(value) => setName(value)}
          style={{ width: "45%" }}
        />
        <DropDownPicker
          containerStyle={{
            width: "45%",
            marginTop: 7,
          }}
          style={{
            zIndex: 10,
          }}
          textStyle={{ fontFamily: "Inter-Regular" }}
          placeholder="Locations"
          open={locationOpen}
          value={locationValue}
          items={locations}
          setOpen={setLocationOpen}
          setValue={setLocationValue}
          setItems={setLocations}
        />
      </Row>

      <ProductTextInput
        label="Product Image Source"
        value={image}
        onChangeText={(value) => setImage(value)}
      />
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
          label="Freshness"
          value={freshStatus}
          onChangeText={(value) => setFreshStatus(value)}
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
      <Row>
        <ProductTextInput
          label="Amount Available"
          value={amountAvailable}
          onChangeText={(value) => setAmountAvailable(value)}
          style={{ width: "45%" }}
        />
        <Button
          style={{ width: "45%", marginTop: 10 }}
          contentStyle={{
            backgroundColor: LIGHTGREEN,
            height: 45,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-Bold",
              color: CREAMWHITE,
            }}
          >
            Add Item
          </Text>
        </Button>
      </Row>
    </View>
  );
};

export default FarmerAddItem;
