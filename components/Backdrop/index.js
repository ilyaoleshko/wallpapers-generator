import React from "react";
import { StyleSheet, View } from "react-native";

const Backdrop = ({ opacity = "0.15" }) => {
  return (
    <View
      style={[
        styles.backdrop,
        { backgroundColor: `rgba(0, 0, 0, ${opacity})` },
      ]}
    />
  );
};

export default Backdrop;

const styles = StyleSheet.create({
  backdrop: {
    width: 750,
    height: 1334,
    position: "absolute",
    zIndex: 10,
  },
});
