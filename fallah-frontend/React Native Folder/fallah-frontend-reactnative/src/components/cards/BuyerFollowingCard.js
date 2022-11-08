import { Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

// Styles
import { CREAMWHITE, LIGHTGREEN } from "../../styles/colors";

const BuyerFollowingCard = ({ following }) => {
  const image = following.images[0];
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("BuyerFollowing", {
          farmer: following,
        })
      }
      style={{
        width: 300,
        height: 260,
        marginHorizontal: 5,
        justifyContent: "space-between",
        backgroundColor: LIGHTGREEN,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 280,
          height: 200,
          borderRadius: 10,
          resizeMode: "cover",
        }}
      />
      <Text
        style={{
          width: 280,
          height: 50,
          textAlignVertical: "center",
          backgroundColor: LIGHTGREEN,
          paddingLeft: 10,
          fontFamily: "Inter-Bold",
          fontSize: 20,
          color: CREAMWHITE,
        }}
      >
        {following.name}
      </Text>
    </TouchableOpacity>
  );
};

export default BuyerFollowingCard;
