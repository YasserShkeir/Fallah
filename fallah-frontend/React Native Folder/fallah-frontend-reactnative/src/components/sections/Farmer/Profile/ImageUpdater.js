import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { LOCALIP } from "@env";

// Hooks
import { pickImage } from "../../../../hooks/farmerImgControl";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../../../styles/colors";

const ImageUpdater = ({ id, images }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(images[0]);
  }, [images]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        icon="camera"
        containerColor={LIGHTGREEN}
        iconColor={CREAMWHITE}
        size={30}
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
          zIndex: 1,
        }}
        onPress={() => pickImage(setImage, id)}
      />
      {image && (
        <Image
          source={{ uri: `${LOCALIP}/api/download/users/${image}` }}
          style={{ width: 335, height: 250 }}
        />
      )}
    </View>
  );
};

export default ImageUpdater;
