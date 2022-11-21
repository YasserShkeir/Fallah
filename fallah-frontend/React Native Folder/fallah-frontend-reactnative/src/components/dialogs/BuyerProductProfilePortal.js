import { Text, Portal, Dialog, Button } from "react-native-paper";

// Styles
import { CREAMWHITE, DARKGREEN, LIGHTGREEN } from "../../styles/colors";

const BuyerProductProfilePortal = ({ visible, closeDialog, product }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeDialog}
        style={{
          backgroundColor: CREAMWHITE,
        }}
      >
        <Dialog.Title>
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: DARKGREEN,
              fontSize: 22,
              marginVertical: 10,
            }}
          >
            Discount Eligible Product!
          </Text>
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={{
              fontFamily: "Inter-Regular",
              color: DARKGREEN,
              fontSize: 18,
            }}
          >
            Buying more than {product.minBulkAmount}
            {product.measuringUnit} allows you to benefit from a discounted
            price of just ${product.bulkPrice}/{product.measuringUnit}!
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="flat"
            onPress={closeDialog}
            labelStyle={{
              fontFamily: "Inter-Medium",
              fontSize: 16,
              color: CREAMWHITE,
            }}
            contentStyle={{
              backgroundColor: LIGHTGREEN,
              paddingHorizontal: 10,
            }}
            textColor={CREAMWHITE}
          >
            Thank you!
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default BuyerProductProfilePortal;
