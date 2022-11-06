import { Pressable } from "react-native";

// Components
import ButtonText from "../atoms/ButtonText";

// Styles
import { AtomButtonText1, MoleculeButton1 } from "../../styles/components";

const GreenButton = ({ title, onPress }) => {
  return (
    <Pressable style={MoleculeButton1} onPress={onPress}>
      <ButtonText text={title} style={AtomButtonText1} />
    </Pressable>
  );
};

export default GreenButton;
