import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { LOCALIP } from "@env";

// Components
import Row from "../../components/layouts/Row";

// Hooks
import { getSelf } from "../../hooks/auth";

// Styles
import { CREAMWHITE, DARKGREEN } from "../../styles/colors";

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.name,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const ImagePickerExample = ({ id, images }) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setImage(images[0]);
  }, [images]);

  const updateImage = async (response) => {
    const token = await AsyncStorage.getItem("token");

    const url = `${LOCALIP}/users/user/edit-profile-image`;
    const data = {
      imgSrc: response,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios
      .post(url, data, config)
      .then(() => {
        setImageLoading(false);
      })
      .catch((err) => {
        setImageLoading(false);
        console.log("update: ", err);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageLoading(false);

    console.log("res: ", result);

    if (!result.cancelled) {
      setImageLoading(true);

      const photo = {
        name: new Date().getTime().toString(),
        type: "image/jpg",
        uri: result.uri,
      };

      const data = createFormData(photo, { userId: id });
      console.log("data: ", data);
      try {
        const response = await axios.post(`${LOCALIP}/api/upload`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        setImage(response.data.message);
        updateImage(response.data.message);
        setImageLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button contentStyle={{ backgroundColor: "red" }} onPress={pickImage}>
        Upload Image
      </Button>
      {image && (
        <Image
          source={{ uri: `${LOCALIP}/api/download/users/${image}` }}
          style={{ width: 335, height: 250 }}
        />
      )}
    </View>
  );
};

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
        paddingHorizontal: 20,
      }}
    >
      <Row>
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 18,
            color: DARKGREEN,
            marginBottom: 10,
          }}
        >
          Profile
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
            await AsyncStorage.removeItem("token");
            navigation.navigate("SignIn");
          }}
        >
          Logout
        </Button>
      </Row>

      <View style={{ height: 350, alignItems: "center" }}>
        <ImagePickerExample id={id} images={images} />
      </View>
    </View>
  );
};

export default FarmerProfileRoute;
