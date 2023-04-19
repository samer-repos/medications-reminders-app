import { ActivityIndicator as RNActivityIndicator } from "react-native";
import styles from "./styles";

export default function ActivityIndicator({}) {
  return <RNActivityIndicator style={styles.loader} size="large" />;
}
