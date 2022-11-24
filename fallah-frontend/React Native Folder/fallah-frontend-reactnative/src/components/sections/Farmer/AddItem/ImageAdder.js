import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { IconButton } from "react-native-paper";

// Hooks
import { pickImage } from "../../../../hooks/farmerImgControl";
import { getSelf } from "../../../../hooks/auth";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../../../styles/colors";

const ImageAdder = ({ image, setImage, containerStyle }) => {
  const [id, setId] = useState(null);
  const [imagePlaceholder, setImagePlaceholder] = useState(null);

  useEffect(() => {
    async function fetchSelf() {
      await getSelf().then((res) => setId(res._id));
    }
    fetchSelf();
  }, []);

  return (
    <View
      style={
        containerStyle
          ? containerStyle
          : {
              width: "45%",
            }
      }
    >
      {imagePlaceholder || image ? (
        <Image
          source={{ uri: image ? image : imagePlaceholder }}
          style={{
            width: "100%",
            aspectRatio: containerStyle ? 1.5 : 1,
            borderRadius: containerStyle ? 0 : 10,
          }}
        />
      ) : (
        <View
          style={{
            width: "100%",
            aspectRatio: containerStyle ? 1.5 : 1,
            backgroundColor: "rgb(160,160,160)",
            borderRadius: containerStyle ? 0 : 10,
          }}
        />
      )}
      <IconButton
        icon={"camera"}
        iconColor={CREAMWHITE}
        containerColor={LIGHTGREEN}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        onPress={() => {
          pickImage(setImage, id).then((res) => {
            setImagePlaceholder(res[0]);
            setImage(res[1]);
          });
        }}
      />
    </View>
  );
};

export default ImageAdder;
