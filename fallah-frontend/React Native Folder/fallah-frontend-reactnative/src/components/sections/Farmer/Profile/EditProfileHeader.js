import { Text, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Components
import Row from "../../../../components/layouts/Row";

// Hooks
import { signout } from "../../../../hooks/auth";

// Styles
import { CREAMWHITE, DARKGREEN } from "../../../../styles/colors";

const EditProfileHeader = ({ navigation }) => {
  return (
    <Row
      style={{
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 24,
          color: DARKGREEN,
        }}
      >
        Edit Profile
      </Text>
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
          await signout(navigation);
        }}
      >
        Logout
      </Button>
    </Row>
  );
};

export default EditProfileHeader;
