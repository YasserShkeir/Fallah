import { Pressable } from "react-native";
import { LIGHTGREENBUTTON } from "../../styles/components";
import ButtonText from "../atoms/ButtonText";

const GreenButton = ({ title, onPress }) => {
  return (
    <Pressable style={LIGHTGREENBUTTON} onPress={onPress}>
      <ButtonText text={title} />
    </Pressable>
  );
};

export default GreenButton;
