import React from "react";
import { StyleSheet, View } from "react-native";

const Navigation = ({
  children,
  advancedContainerStyle,
  advancedNavigationStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, advancedContainerStyle]}>
      <View style={[styles.navigation, advancedNavigationStyle]} {...props}>
        {children}
      </View>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    bottom: 0,
    paddingBottom: 34,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
    height: 120,
    borderColor: "#303030",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  navigation: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //height: 60,
  },
});
