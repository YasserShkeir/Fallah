import { useState } from "react";
import { SafeAreaView } from "react-native";

// Components
import HomeHeader from "../../components/sections/Farmer/Home/HomeHeader";
import FarmerHomeLocationPortal from "../../components/dialogs/FarmerHomeLocationPortal";
import HomeProducts from "../../components/sections/Farmer/Home/HomeProducts";

const FarmerHomeRoute = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <SafeAreaView>
      <HomeHeader navigation={navigation} openDialog={openDialog} />
      <HomeProducts navigation={navigation} />
      <FarmerHomeLocationPortal
        showDialog={showDialog}
        closeDialog={closeDialog}
      />
    </SafeAreaView>
  );
};

export default FarmerHomeRoute;
