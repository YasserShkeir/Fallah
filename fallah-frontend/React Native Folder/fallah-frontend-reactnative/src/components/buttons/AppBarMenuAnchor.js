import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { CREAMWHITE } from "../../styles/colors";
import { flexRow } from "../../styles/components";

const AppBarMenuAnchor = ({ onPress, locations, location }) => {
  return (
    <View
      style={{
        ...flexRow,
        paddingLeft: 8,
        color: CREAMWHITE,
        height: 20,
      }}
    >
      <Text
        onPress={onPress}
        style={{
          fontFamily: "Inter-Bold",
          color: CREAMWHITE,
        }}
        compact={true}
      >
        {locations ? location : "Loading..."}
      </Text>
      <IconButton
        icon="chevron-down"
        iconColor={CREAMWHITE}
        onPress={onPress}
        size={20}
      />
    </View>
  );
};

export default AppBarMenuAnchor;
