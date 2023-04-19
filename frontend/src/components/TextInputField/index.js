import { Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function TextInputField({ title, ...props }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.inputField, props.multiline ? styles.textareaField : ""]}
        {...props}
      ></TextInput>
    </View>
  );
}
