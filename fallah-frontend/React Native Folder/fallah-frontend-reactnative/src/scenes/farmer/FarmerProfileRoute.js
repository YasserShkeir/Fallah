import { useState, useEffect } from "react";
import { View } from "react-native";

// Components
import ImageUpdater from "../../components/sections/Farmer/Profile/ImageUpdater";
import EditProfileHeader from "../../components/sections/Farmer/Profile/EditProfileHeader";

// Hooks
import { getSelf } from "../../hooks/auth";

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
      <EditProfileHeader navigation={navigation} />
      <View style={{ height: 250, alignItems: "center" }}>
        <ImageUpdater id={id} images={images} />
      </View>
    </View>
  );
};

export default FarmerProfileRoute;
