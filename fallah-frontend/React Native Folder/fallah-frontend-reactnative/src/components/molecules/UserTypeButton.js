import { Pressable } from "react-native";
import {
  CREAMWHITEBUTTON,
  CREAMWHITEBUTTONSELECTED,
  CREAMWHITEBUTTONTEXT,
  USERBUTTONTEXT,
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
        style={isSelected ? CREAMWHITEBUTTONTEXT : USERBUTTONTEXT}
      />
    </Pressable>
  );
};

export default UserTypeButton;
