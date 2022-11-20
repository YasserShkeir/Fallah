import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const RatingSwitch = (params) => {
  const rating = params.param;
  const stars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Image
          key={i}
          source={require("../../../../assets/icons/DefaultStar.png")}
          style={{ width: 22, height: 22 }}
        />
      );
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(
        <Image
          key={i + 5}
          source={require("../../../../assets/icons/EmptyStar.png")}
          style={{ width: 22, height: 22 }}
        />
      );
    }
    return stars;
  };

  switch (rating) {
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
      return <ActivityIndicator />;
  }
};

export default RatingSwitch;
