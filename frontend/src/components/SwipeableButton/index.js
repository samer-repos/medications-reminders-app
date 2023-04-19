import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styles from "./styles";

export default function SwipeableButton({ text, onClick, overriddenStyles }) {
  return (
    <RectButton style={styles.swipeAction} onPress={onClick}>
      <Animated.Text
        onPress={onClick}
        style={[styles.actionText, overriddenStyles.actionText]}
      >
        {text}
      </Animated.Text>
    </RectButton>
  );
}
