import { useState, useEffect } from "react";
import { View } from "react-native";
import { Menu, Dialog, Portal, Button, TextInput } from "react-native-paper";

import { addLocation } from "../../hooks/locations";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";

const FarmerHomeRoute = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLong, setLocationLong] = useState("");

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

  return (
    <View>
      <Button
        mode="contained"
        icon={"pin"}
        style={{ margin: 10, backgroundColor: LIGHTGREEN }}
        onPress={openDialog}
      >
        Add Location
      </Button>
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
