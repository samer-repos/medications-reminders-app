import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  medicationsHeader: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  medication: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  noMedicationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  leftActionText: {
    color: "blue",
  },
  rightActionText: {
    color: "red",
  },
});
