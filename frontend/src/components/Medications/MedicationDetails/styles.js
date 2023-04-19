import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContent: {
    marginHorizontal: 10,
    flex: 1,
  },
  medicationTitle: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 5,
  },
  medicationDescription: {
    fontSize: 16,
  },
  remindersContainer: {
    marginTop: 25,
    flex: 1,
  },
  remindersLabel: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  remindersListContainer: {
    flex: 1,
  },
  mainActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },
});
