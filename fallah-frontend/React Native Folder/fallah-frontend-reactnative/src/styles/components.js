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

export const SignUpButtonContainer = StyleSheet.create({
  height: 60,
  borderColor: CREAMWHITE,
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 10,
  width: "80%",
  marginBottom: 15,
  marginTop: 5,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const BuyerSeasonalCardContainer = StyleSheet.create({
  width: "100%",
  backgroundColor: PEACHYYELLOW,
  borderTopColor: LIGHTGREEN,
  borderBottomColor: LIGHTGREEN,
  borderTopWidth: 3,
  borderBottomWidth: 3,
  marginVertical: 15,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 15,
});

export const UNAUTHBG = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
