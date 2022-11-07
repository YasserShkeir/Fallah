import { useState, useEffect } from "react";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";
import BuyerAppBar from "../../components/appbars/BuyerAppBar";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";

// Hooks
import { getSeasonalItems } from "../../hooks/seasonal";

const BuyerHomeRoute = () => {
  const [seasonalItems, setSeasonalItems] = useState([]);

  const getSeasonalItemsHandler = (response) => {
    console.log(response.data);
    setSeasonalItems(response.data.seasonalItems);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getSeasonalItems(getSeasonalItemsHandler);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <BuyerMainLayout>
      <BuyerAppBar page="home" />
      <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Button style={{ width: "100%", backgroundColor: "black" }}>
          <Text>Test</Text>
        </Button>
      </ScrollView>
    </BuyerMainLayout>
  );
};

export default BuyerHomeRoute;
