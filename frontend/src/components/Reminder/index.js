import { Fragment, useState } from "react";
import { Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import axios from "../../utils/axios";

import styles from "./styles";
import SwipeableButton from "../SwipeableButton";

export default function Reminder({
  medicationId,
  reminder,
  updateReminder,
  deleteReminder,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const date = new Date(reminder.time);

  const handleReminderClick = () => setShowDatePicker(true);
  const handleDateTimePickerChange = (date) => {
    axios
      .put(`reminders/${reminder.id}`, {
        medicationId: medicationId,
        reminder: { time: date },
      })
      .then((response) => updateReminder({ ...reminder, time: date }))
      .catch((e) => console.error("error updating reminder", e))
      .finally(() => hideDatePicker());
  };

  const hideDatePicker = () => setShowDatePicker(false);
  const removeReminder = () => {
    axios
      .delete(`reminders/${reminder.id}`, {
        data: {
          medicationId: medicationId,
        },
      })
      .then((response) => deleteReminder(reminder.id))
      .catch((e) => console.error("error deleting a reminder", e));
  };

  renderRightActions = () => {
    return (
      <SwipeableButton
        text="Delete"
        onClick={removeReminder}
        overriddenStyles={{ actionText: styles.actionText }}
      />
    );
  };

  return (
    <Fragment>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="time"
        onConfirm={handleDateTimePickerChange}
        onCancel={hideDatePicker}
        date={date}
      />
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <TouchableOpacity onPress={handleReminderClick}>
            <View style={styles.reminder}>
              <Text>{date.getHours()}:</Text>
              <Text>{String(date.getMinutes()).padStart(2, "0")}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </GestureHandlerRootView>
    </Fragment>
  );
}
