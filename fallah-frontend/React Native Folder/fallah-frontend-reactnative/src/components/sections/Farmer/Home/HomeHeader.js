import { View } from "react-native";
import { Button } from "react-native-paper";

// Styles
import {
  CREAMWHITE,
  LIGHTGREEN,
  DARKGREEN,
  PEACHYYELLOW,
} from "../../../../styles/colors";
import { flexRow } from "../../../../styles/components";

const HomeHeader = ({ navigation, openDialog }) => {
  return (
    <View
      style={{
        ...flexRow,
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        justifyContent: "space-between",
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
  );
};

export default HomeHeader;
