import { Button, Text } from "react-native-paper";
import BuyerMainLayout from "../../components/layouts/BuyerMainLayout";

import { deleteRegularOrder } from "../../hooks/buyerOrders";

const BuyerRegularOrderProfile = ({ route, navigation }) => {
  const order = route.params.order;

  console.log(order);
  return (
    <BuyerMainLayout>
      <Text>Regular Order Profile</Text>
      <Button
        onPress={async () => {
          await deleteRegularOrder(order._id)
            .then((response) => {
              console.log("response", response);
            })
            .catch((error) => {
              console.log("error data: ", error);
            });
        }}
      >
        Delete
      </Button>
    </BuyerMainLayout>
  );
};

export default BuyerRegularOrderProfile;
