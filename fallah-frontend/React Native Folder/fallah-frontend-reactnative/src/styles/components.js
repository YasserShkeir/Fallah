import { CREAMWHITE, LIGHTGREEN, DARKGREEN, PEACHYYELLOW } from "./colors";

import { StyleSheet } from "react-native";

export const AtomButtonText1 = StyleSheet.create({
  color: CREAMWHITE,
  fontSize: 22,
  fontFamily: "Inter-ExtraBold",
});

export const AtomButtonText2 = StyleSheet.create({
  color: DARKGREEN,
  fontSize: 22,
  fontFamily: "Inter-ExtraBold",
});

export const TextFieldWhite = StyleSheet.create({
  width: "80%",
  height: 40,
  backgroundColor: CREAMWHITE,
  borderRadius: 10,
  alignItems: "center",
  paddingLeft: 10,
  paddingRight: 10,
  marginBottom: 15,
  marginTop: 10,
  fontSize: 18,
  fontFamily: "Inter-Regular",
});

export const MoleculeButton1 = StyleSheet.create({
  width: "80%",
  height: 40,
  backgroundColor: LIGHTGREEN,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 30,
  marginTop: 5,
});

export const SignUpButton1 = StyleSheet.create({
  width: "45%",
  height: 40,
  backgroundColor: CREAMWHITE,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
});

export const SignUpButton2 = StyleSheet.create({
  width: "45%",
  height: 40,
  backgroundColor: LIGHTGREEN,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
});

export const UNAUTHBG = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
