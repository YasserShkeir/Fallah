import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { IconButton, Text } from "react-native-paper";

// Hooks
import {
  getFollowing,
  followFarmer,
  unfollowFarmer,
  getFarmerReviews,
} from "../../hooks/buyerFarmer";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerFarmerProfile = ({ route }) => {
  // Access data sent from payload
  const { farmer } = route.params;

  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  let averageRating = 0;

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

  const getFarmerReviewsHandler = (response) => {
    setReviews(response.data.reviews);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getFollowing(getFollowingHandler);
        await getFarmerReviews(getFarmerReviewsHandler, farmer._id);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const ratingSwitch = (param) => {
    const stars = (param) => {
      let stars = [];
      for (let i = 0; i < param; i++) {
        stars.push(
          <Image
            key={i}
            source={require("../../assets/icons/DefaultStar.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      }
      for (let i = 0; i < 5 - param; i++) {
        stars.push(
          <Image
            key={i + 5}
            source={require("../../assets/icons/EmptyStar.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      }
      return stars;
    };

    switch (param) {
      case 1:
        return stars(1);
      case 2:
        return stars(2);
      case 3:
        return stars(3);
      case 4:
        return stars(4);
      case 5:
        return stars(5);
      default:
        return "No reviews yet";
    }
  };

  return (
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
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 32,
          color: DARKGREEN,
          margin: 10,
        }}
      >
        {farmer.name}
      </Text>
      <View
        style={{
          paddingHorizontal: 10,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter-Bold",
            fontSize: 24,
            color: LIGHTGREEN,
            display: "flex",
            marginRight: 10,
          }}
        >
          Rating:{" "}
          {reviews.forEach((review) => {
            averageRating += review.rating;
          })}
          {Math.round(averageRating / reviews.length)}/5
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {ratingSwitch(Math.round(averageRating / reviews.length))}
        </View>
      </View>
    </View>
  );
};

export default BuyerFarmerProfile;
