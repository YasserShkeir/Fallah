import { View } from "react-native";
import { Text } from "react-native-paper";

// Components
import RatingSwitch from "./RatingSwitch";

// Styles
import { LIGHTGREEN } from "../../../../styles/colors";
import { flexRow } from "../../../../styles/components";

const ReviewsSection = ({ reviews }) => {
  let averageRating = 0;
  return (
    <View
      style={{
        ...flexRow,
        paddingHorizontal: 10,
        width: "100%",
        borderBottomColor: LIGHTGREEN,
        borderBottomWidth: 2,
        paddingBottom: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 40,
          color: LIGHTGREEN,
          display: "flex",
          marginRight: 10,
        }}
      >
        {reviews.forEach((review) => {
          averageRating += review.reviewScore;
        })}
        {reviews.length > 0
          ? averageRating / reviews.length
            ? Math.round(averageRating / reviews.length)
            : "Loading..."
          : "No reviews yet"}
      </Text>
      <View
        style={{
          ...flexRow,
          width: "100%",
        }}
      >
        {reviews.length > 0 ? (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                ...flexRow,
                marginBottom: 2,
              }}
            >
              <RatingSwitch
                param={Math.round(averageRating / reviews.length)}
              />
            </View>
            <Text
              style={{
                fontFamily: "Inter-Regular",
                fontSize: 12,
                color: LIGHTGREEN,
              }}
            >
              Based on {reviews.length} reviews
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ReviewsSection;
