import { useState } from "react";
import { Text, Dialog, Portal, Button, FAB } from "react-native-paper";

// Components
import AppbarLocationMenu from "../../components/menus/BuyerAppbarLocationMenu";

// Styles
import { CREAMWHITE, DARKGREEN, PEACHYYELLOW } from "../../styles/colors";
import { flexRow } from "../../styles/components";

const BuyerAddOrderFABPortal = ({
  orderDisplay,
  createRegularOrderHandler,
}) => {
  const [locationImp, setLocationImp] = useState("Location");
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: PEACHYYELLOW,
        }}
        icon="plus"
        label={"New " + orderDisplay}
        onPress={showDialog}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor: DARKGREEN,
          }}
        >
          <Dialog.Title
            style={{
              color: CREAMWHITE,
              fontFamily: "Inter-Medium",
            }}
          >
            Add {orderDisplay}
          </Dialog.Title>
          <Dialog.Content
            style={{
              ...flexRow,
              color: CREAMWHITE,
              fontFamily: "Inter-Medium",
            }}
          >
            <Text
              style={{
                color: CREAMWHITE,
                fontFamily: "Inter-Bold",
              }}
            >
              Deliver To:{" "}
            </Text>
            <AppbarLocationMenu
              page={"orders"}
              locationImp={locationImp}
              setLocationImp={setLocationImp}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => createRegularOrderHandler(locationImp)}
              textColor={DARKGREEN}
              buttonColor={CREAMWHITE}
              contentStyle={{
                fontFamily: "Inter-Medium",
                marginHorizontal: 10,
              }}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default BuyerAddOrderFABPortal;
