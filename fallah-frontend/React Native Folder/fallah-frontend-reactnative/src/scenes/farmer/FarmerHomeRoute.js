import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";

const FarmerHomeRouterButton = ({ icon, label, navigation, to }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: LIGHTGREEN,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.navigate(to);
      }}
    >
      <FontAwesome5Icon name={icon} size={20} color="white" />
      <Text
        style={{
          color: CREAMWHITE,
          fontFamily: "Inter-Bold",
          fontSize: 20,
          marginLeft: 10,
        }}
      >
        {label}
      </Text>
      <FontAwesome5Icon name="chevron-right" size={20} color="white" />
    </TouchableOpacity>
  );
};

const FarmerHomeRoute = ({ navigation }) => {
  return (
    <View>
      <FarmerHomeRouterButton
        icon="plus"
        label="Add Location"
        navigation={navigation}
        to="food-apple"
      />
    </View>
  );
};

export default FarmerHomeRoute;
