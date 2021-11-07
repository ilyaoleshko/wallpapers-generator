import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({ onPress, title, advancedStyle, children }) => {
  return (
    <TouchableOpacity style={[styles.button, advancedStyle]} onPress={onPress}>
      {title && <Text style={[styles.text, advancedStyle]}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3d3d4e",
  },
});
