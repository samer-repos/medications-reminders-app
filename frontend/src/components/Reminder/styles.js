import { StyleSheet } from "react-native";

export default StyleSheet.create({
  reminder: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    zIndex: 1,
  },
  dateTimePicker: {
    zIndex: -1,
    position: "relative",
  },
  reminderText: {
    zIndex: 1,
    position: "relative",
  },
  actionText: {
    color: "red",
  },
});
