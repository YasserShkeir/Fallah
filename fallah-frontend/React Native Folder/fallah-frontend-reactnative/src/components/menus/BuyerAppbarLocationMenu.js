import { useState, useEffect } from "react";
import { Menu } from "react-native-paper";

// Components
import AppBarMenuAnchor from "../buttons/AppBarMenuAnchor";

// Hooks
import { getUserLocations } from "../../hooks/locations";

const AppbarLocationMenu = ({ page, setLocationImp }) => {
  const [visible, setVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("Loading...");

  const getUserLocationsHandler = async (response) => {
    let data = [];
    response.data.locations.map((location) => {
      data.push(location);
    });
    setLocations(data);
    setLocation(data[0].name);
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
          closeMenu();
        }}
      />
    </Menu>
  );
};

export default AppbarLocationMenu;
