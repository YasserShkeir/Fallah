import { Pressable } from "react-native";

// Components
import ButtonText from "../atoms/ButtonText";

// Styles
import {
  SignUpButton1,
  SignUpButton2,
  AtomButtonText1,
  AtomButtonText2,
} from "../../styles/components";

const UserTypeButton = ({ title, isSelected, onPress }) => {
  return (
    <Pressable
      style={isSelected ? SignUpButton2 : SignUpButton1}
      onPress={onPress}
    >
      <ButtonText
        text={title}
        style={isSelected ? AtomButtonText1 : AtomButtonText2}
      />
    </Pressable>
  );
};

export default UserTypeButton;
