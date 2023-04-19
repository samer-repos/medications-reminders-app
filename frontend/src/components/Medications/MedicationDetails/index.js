import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "../../../utils/axios";
import Reminder from "../../Reminder";
import styles from "./styles";

export default function MedicationDetails({
  onDismiss,
  selectedMedication,
  addReminder,
  updateReminder,
  deleteReminder,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddReminder = (date) => {
    axios
      .post("reminders", {
        medicationId: selectedMedication.id,
        time: date,
      })
      .then((response) => addReminder(response.data.reminder))
      .catch((e) => console.error("error creating new reminder", e))
      .finally(() => setShowDatePicker(false));
  };

  return (
    <SafeAreaView style={styles.modalContent}>
      <View style={{ flex: 1 }}>
        <View style={styles.mainActions}>
          <View>
            <Button title="Done" onPress={() => onDismiss()} />
          </View>
        </View>
        <Text style={styles.medicationTitle}>{selectedMedication.title}</Text>
        <Text style={styles.medicationDescription}>
          {selectedMedication.description}
        </Text>

        <View style={styles.remindersContainer}>
          <Text style={styles.remindersLabel}>Reminders</Text>
          <View style={styles.remindersListContainer}>
            <ScrollView>
              {selectedMedication.reminders.map((reminder) => (
                <Reminder
                  key={reminder.id}
                  reminder={reminder}
                  updateReminder={updateReminder}
                  deleteReminder={deleteReminder}
                  medicationId={selectedMedication.id}
                />
              ))}
              <Button
                onPress={() => setShowDatePicker(true)}
                title="Add Reminder"
              ></Button>
            </ScrollView>
          </View>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="time"
        onConfirm={handleAddReminder}
        onCancel={() => setShowDatePicker(false)}
        date={new Date()}
      />
    </SafeAreaView>
  );
}
