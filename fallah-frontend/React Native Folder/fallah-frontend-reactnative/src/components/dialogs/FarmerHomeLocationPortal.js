import { useState } from "react";
import { Dialog, Portal, Button, TextInput } from "react-native-paper";

// Hooks
import { addLocation } from "../../hooks/locations";

// Styles
import { CREAMWHITE } from "../../styles/colors";

const FarmerHomeLocationPortal = ({ showDialog, closeDialog }) => {
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLong, setLocationLong] = useState("");

  const addLocationHandler = async (response) => {
    let location = {
      name: locationName,
      latitude: locationLat,
      longitude: locationLong,
    };
    await addLocation(location);
  };

  return (
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
  );
};

export default FarmerHomeLocationPortal;
