import { useState, useEffect } from "react";
import { Menu, Dialog, Portal, Button, TextInput } from "react-native-paper";

// Components
import AppBarMenuAnchor from "../buttons/AppBarMenuAnchor";

// Hooks
import { getUserLocations, addLocation } from "../../hooks/locations";

// Styles
import { CREAMWHITE } from "../../styles/colors";

const AppbarLocationMenu = ({ page, setLocationImp }) => {
  const [visible, setVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("Loading...");
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocationLat] = useState("");
  const [locationLong, setLocationLong] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const getUserLocationsHandler = async (response) => {
    let data = [];
    response.data.locations.map((location) => {
      data.push(location);
    });
    setLocations(data);
    setLocation(data[0].name);
  };

  const addLocationHandler = async (response) => {
    let location = {
      name: locationName,
      latitude: locationLat,
      longitude: locationLong,
    };
    await addLocation(location);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getUserLocations(getUserLocationsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <AppBarMenuAnchor
          onPress={openMenu}
          locations={locations}
          location={location}
        />
      }
    >
      {locations.map((location) => {
        return (
          <Menu.Item
            key={location.name}
            onPress={() => {
              setLocation(location.name);
              page === "orders" ? setLocationImp(location) : null;
              closeMenu();
            }}
            title={location.name}
          />
        );
      })}
      <Menu.Item
        key={"Add Location"}
        title={"Add Location"}
        trailingIcon={"plus"}
        onPress={() => {
          openDialog();
        }}
      />
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
    </Menu>
  );
};

export default AppbarLocationMenu;
