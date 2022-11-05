import { Pressable } from "react-native";
import {
  CREAMWHITEBUTTON,
  CREAMWHITEBUTTONSELECTED,
  AtomButtonText1,
  AtomButtonText2,
} from "../../styles/components";
import ButtonText from "../atoms/ButtonText";

const UserTypeButton = ({ title, isSelected, onPress }) => {
  return (
    <Pressable
      style={isSelected ? CREAMWHITEBUTTONSELECTED : CREAMWHITEBUTTON}
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
