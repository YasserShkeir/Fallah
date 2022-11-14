import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { IconButton, Text } from "react-native-paper";

// Hooks
import {
  getFollowing,
  followFarmer,
  unfollowFarmer,
} from "../../hooks/buyerFarmer";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";

const BuyerFarmerProfile = ({ route }) => {
  // Access data sent from payload
  const { farmer } = route.params;

  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            padding: 10,
            position: "absolute",
            top: 0,
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
          source={{ uri: farmer.images[0] }}
          style={{ width: "100%", height: 250 }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text
          style={{ fontFamily: "Inter-Bold", fontSize: 24, color: LIGHTGREEN }}
        >
          {farmer.name}
        </Text>
      </View>
    </View>
  );
};

export default BuyerFarmerProfile;
