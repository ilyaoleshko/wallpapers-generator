import { StyleSheet } from "react-native";

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const colors = {
  actionText: "#3d3d4e",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  settingsContainer: {
    zIndex: 9,
    height: 220,
  },
  navigationContainer: {
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
    ...shadow,
  },
  calendarContainer: {
    zIndex: 11,
  },
  slider: {
    width: 200,
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    width: 750,
    height: 1334,
    position: "absolute",
    zIndex: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#fff",
    ...shadow,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3d3d4e",
  },
  navigation: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  month: {
    alignSelf: "center",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 60,
    letterSpacing: 0,
    color: "#ffffff",
    marginBottom: 18,
  },
  head: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headDay: {
    fontSize: 26,
    fontStyle: "normal",
    width: 36,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  week: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  day: {
    fontSize: 26,
    fontStyle: "normal",
    width: 36,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  dayGlass: {
    color: "rgba(255, 255, 255, 0.3)",
  },
});
