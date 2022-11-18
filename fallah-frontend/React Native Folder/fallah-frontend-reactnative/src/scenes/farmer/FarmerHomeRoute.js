import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  Text,
  ActivityIndicator,
} from "react-native-paper";

// Components
import ItemCard from "../../components/cards/ItemCard";

// Hooks
import { getSelfProducts } from "../../hooks/farmerItem";
import { addLocation } from "../../hooks/locations";

// Styles
import {
  CREAMWHITE,
  LIGHTGREEN,
  DARKGREEN,
  PEACHYYELLOW,
} from "../../styles/colors";

const FarmerHomeRoute = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLong, setLocationLong] = useState("");
  const [products, setProducts] = useState([]);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const addLocationHandler = async (response) => {
    let location = {
      name: locationName,
      latitude: locationLat,
      longitude: locationLong,
    };
    await addLocation(location);
  };

  const getSelfProductsHandler = (response) => {
    setProducts(response.data.products);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getSelfProducts(getSelfProductsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View>
      <View
        style={{
          borderBottomColor: LIGHTGREEN,
          borderBottomWidth: 1,
          padding: 10,
          paddingHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            backgroundColor: PEACHYYELLOW,
            width: "45%",
          }}
          labelStyle={{
            color: DARKGREEN,
            fontFamily: "Inter-Bold",
          }}
          onPress={() => navigation.navigate("FarmerAddItem")}
        >
          Add Product
        </Button>
        <Button
          mode="contained"
          icon={"pin"}
          style={{ backgroundColor: LIGHTGREEN, width: "45%" }}
          labelStyle={{
            color: CREAMWHITE,
            fontFamily: "Inter-Bold",
          }}
          onPress={openDialog}
        >
          Add Location
        </Button>
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Inter-Bold",
          }}
        >
          Your Products
        </Text>
        <ScrollView>
          {products ? (
            products.map((product) => {
              return (
                <ItemCard
                  key={product._id}
                  item={product}
                  navigation={navigation}
                />
              );
            })
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={closeDialog}
          style={{
            backgroundColor: CREAMWHITE,
          }}
        >
          <Dialog.Title>Add a Location</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Location Name"
              onChangeText={(text) => {
                setLocationName(text);
              }}
            />
            <TextInput
              mode="outlined"
              label="Location Longitude"
              onChangeText={(text) => {
                setLocationLong(text);
              }}
            />
            <TextInput
              mode="outlined"
              label="Location Latitude"
              onChangeText={(text) => {
                setLocationLat(text);
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                await addLocationHandler();
                closeDialog();
              }}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FarmerHomeRoute;
