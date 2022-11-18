import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREAMWHITE } from "../../styles/colors";

const FarmerProfileRoute = ({ navigation }) => {
  return (
    <View>
      <Button
        mode="contained"
        icon={() => (
          <FontAwesome5 name="sign-out-alt" size={18} color={CREAMWHITE} />
        )}
        buttonColor="red"
        style={{ width: 140 }}
        contentStyle={{
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "center",
        }}
        labelStyle={{
          fontFamily: "Inter-Bold",
          color: CREAMWHITE,
          fontSize: 18,
        }}
        onPress={async () => {
          // TODO: Logout
          await AsyncStorage.removeItem("token");
          navigation.navigate("SignIn");
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default FarmerProfileRoute;
