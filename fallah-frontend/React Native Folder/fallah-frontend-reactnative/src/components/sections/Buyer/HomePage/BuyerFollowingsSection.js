import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";

// Components
import BuyerFollowingCard from "../../../cards/BuyerFollowingCard";

// Styles
import { DARKGREEN } from "../../../../styles/colors";

const BuyerFollowingSection = ({ followings, navigation }) => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text
        style={{
          fontFamily: "Inter-Bold",
          fontSize: 22,
          color: DARKGREEN,
          marginLeft: 10,
          marginBottom: 10,
        }}
      >
        Your Followed Farmers
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {followings.map((following) => (
          <BuyerFollowingCard
            key={following._id}
            following={following}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BuyerFollowingSection;
