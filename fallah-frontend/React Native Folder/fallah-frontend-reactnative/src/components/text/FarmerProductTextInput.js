import { TextInput } from "react-native-paper";

const ProductTextInput = ({ label, value, onChangeText, style }) => {
  return (
    <TextInput
      mode="outlined"
      outlineStyle={{
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
      }}
      style={{ backgroundColor: "white", marginVertical: 5, ...style }}
      label={label}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default ProductTextInput;
