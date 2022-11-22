import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { LOCALIP } from "@env";

// Hooks
import {
  getFollowing,
  followFarmer,
  unfollowFarmer,
} from "../../../../hooks/buyerFarmer";

// Styles
import { CREAMWHITE, LIGHTGREEN, DARKGREEN } from "../../../../styles/colors";

const ImageSection = ({ farmer, loading, setLoading }) => {
  const [followed, setFollowed] = useState(false);

  const getFollowingHandler = (response) => {
    response.data.following.forEach((follow) => {
      if (follow._id === farmer._id) {
        setFollowed(true);
      }
    });
  };

  const followFarmerButtonHandler = async (check) => {
    setLoading(true);
    if (check) {
      await unfollowFarmer(farmer._id);
      setFollowed(false);
    } else {
      await followFarmer(farmer._id);
      setFollowed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFollowing(getFollowingHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <>
      <View
        style={{
          padding: 10,
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <IconButton
          // Check if the user is already following the farmer
          icon={followed ? "heart" : "heart-outline"}
          disabled={loading}
          iconColor={LIGHTGREEN}
          size={25}
          style={{
            backgroundColor: CREAMWHITE,
            borderRadius: 10,
          }}
          onPress={() => {
            followFarmerButtonHandler(followed);
          }}
        />
      </View>
      <Image
        source={{ uri: `${LOCALIP}/api/download/users/${farmer.images[0]}` }}
        style={{ width: "100%", height: 250 }}
      />
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 32,
          color: DARKGREEN,
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        {farmer.name}
      </Text>
      <Text
        style={{
          fontFamily: "Inter-Regular",
          fontSize: 18,
          color: DARKGREEN,
          margin: 5,
          marginLeft: 10,
        }}
      >
        {farmer.description}
      </Text>
    </>
  );
};

export default ImageSection;
