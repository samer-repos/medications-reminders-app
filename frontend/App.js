import { StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Medications from "./src/components/Medications";
import { isAndroid } from "./src/utils/os";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Medications />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: isAndroid() ? StatusBar.currentHeight : 0,
    position: "relative",
  },
});
