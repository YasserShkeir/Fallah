import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";

const BuyerOrdersRoute = () => {
  return (
    <BuyerMainLayout>
      <BuyerAppBar page="orders" />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Button style={{ width: "100%", backgroundColor: "black" }}>
          <Text>Test</Text>
        </Button>
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerOrdersRoute;
