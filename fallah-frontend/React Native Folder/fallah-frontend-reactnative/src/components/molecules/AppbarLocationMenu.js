import { useState, useEffect } from "react";
import { Menu } from "react-native-paper";

import AppBarMenuAnchor from "../atoms/AppBarMenuAnchor";
import { getUserLocations } from "../../hooks/locations";

const AppbarLocationMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("Loading...");

  const getUserLocationsHandler = async (response) => {
    let data = [];
    response.data.locations.map((location) => {
      data.push(location.name);
    });
    setLocations(data);
    setLocation(data[0]);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getUserLocations(navigation, getUserLocationsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
            key={location}
            onPress={() => {
              setLocation(location);
              closeMenu();
            }}
            title={location}
          />
        );
      })}
      <Menu.Item
        key={"Add Location"}
        title={"Add Location"}
        trailingIcon={"plus"}
        onPress={() => {
          closeMenu();
        }}
      />
    </Menu>
  );
};

export default AppbarLocationMenu;
