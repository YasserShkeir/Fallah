import { Pressable } from "react-native";
import { AtomButtonText1, LIGHTGREENBUTTON } from "../../styles/components";
import ButtonText from "../atoms/ButtonText";

const GreenButton = ({ title, onPress }) => {
  return (
    <Pressable style={LIGHTGREENBUTTON} onPress={onPress}>
      <ButtonText text={title} style={AtomButtonText1} />
    </Pressable>
  );
};

export default GreenButton;
