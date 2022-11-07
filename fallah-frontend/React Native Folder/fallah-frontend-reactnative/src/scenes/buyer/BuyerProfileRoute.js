import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";

const BuyerProfileRoute = ({ navigation }) => {
  return (
    <BuyerMainLayout>
      <BuyerAppBar page="profile" navigation={navigation} />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Button style={{ width: "100%", backgroundColor: "black" }}>
          <Text>Test</Text>
        </Button>
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerProfileRoute;
