import { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Components
import Row from "../../components/layouts/Row";
import ImageUpdater from "../../components/sections/Farmer/Profile/ImageUpdater";

// Hooks
import { getSelf, signout } from "../../hooks/auth";

// Styles
import { CREAMWHITE, DARKGREEN } from "../../styles/colors";

const FarmerProfileRoute = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getSelf().then((user) => {
      setId(user._id);
      setImages(user.images);
    });
  }, [id]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 30,
        alignItems: "center",
      }}
    >
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

      <View style={{ height: 250, alignItems: "center" }}>
        <ImageUpdater id={id} images={images} />
      </View>
    </View>
  );
};

export default FarmerProfileRoute;
