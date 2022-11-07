import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export const NavBarRoute = ({ key }) => {
  return {
    key: key,
    focusedIcon: (props) => (
      <CommunityIcon {...props} name={key} adjustsFontSizeToFit={true} />
    ),
  };
};
