import { useEffect, useState } from "react";
import { Button, Modal, Text, View, ScrollView } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import axios from "../../utils/axios";
import MedicationDetails from "./MedicationDetails";

import MedicationForm from "./MedicationForm";
import styles from "./styles";
import SwipeableButton from "../SwipeableButton";

export default function Medications({}) {
  const [medications, setMedications] = useState([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState(null);
  const [isMedicationModalVisible, setIsMedicationModalVisible] =
    useState(false);
  const [isMedicationFormModalVisible, setIsMedicationFormModalVisible] =
    useState(false);

  const selectedMedication = medications.find(
    (medication) => medication.id === selectedMedicationId
  );

  const handleMedicationClick = (medication) => {
    setSelectedMedicationId(medication.id);
    setIsMedicationModalVisible(true);
  };

  const onMedicationDetailsDismiss = () => {
    setSelectedMedicationId(null);
    setIsMedicationModalVisible(false);
  };

  const addReminder = (newReminder) => {
    setMedications((prevState) =>
      prevState.map((medication) => {
        if (medication.id !== selectedMedicationId) return medication;

        return {
          ...medication,
          reminders: [...medication.reminders, newReminder],
        };
      })
    );
  };

  const updateReminder = (updatedReminder) => {
    setMedications((prevState) =>
      prevState.map((medication) => {
        if (medication.id !== selectedMedicationId) return medication;

        return {
          ...medication,
          reminders: medication.reminders.map((reminder) => {
            if (reminder.id !== updatedReminder.id) return reminder;

            return updatedReminder;
          }),
        };
      })
    );
  };

  const deleteReminder = (reminderId) => {
    setMedications((prevState) =>
      prevState.map((medication) => {
        if (medication.id !== selectedMedicationId) return medication;

        return {
          ...medication,
          reminders: medication.reminders.filter(
            (reminder) => reminder.id !== reminderId
          ),
        };
      })
    );
  };

  const handleCreateUpdateMedication = (medications) => {
    setMedications(medications);
    setIsMedicationFormModalVisible(false);
  };

  const removeMedication = (medicationId) => {
    axios
      .delete(`medications/${medicationId}`)
      .then((response) => setMedications(response.data.medications))
      .catch((e) => console.error("error deleting a medication"));
  };

  const editMedication = (medicationId) => {
    setSelectedMedicationId(medicationId);
    setIsMedicationFormModalVisible(true);
  };

  renderRightActions = (medicationId) => {
    const handleDeleteClick = () => removeMedication(medicationId);

    return (
      <SwipeableButton
        text="Delete"
        onClick={handleDeleteClick}
        overriddenStyles={{ actionText: styles.rightActionText }}
      />
    );
  };

  renderLeftActions = (medicationId) => {
    const handleEditClick = () => editMedication(medicationId);

    return (
      <SwipeableButton
        text="Edit"
        onClick={handleEditClick}
        overriddenStyles={{ actionText: styles.leftActionText }}
      />
    );
  };

  useEffect(() => {
    axios
      .get(`medications`)
      .then((response) => {
        const { medications } = response.data;
        setMedications(medications || []);
      })
      .catch((e) => {
        console.error("Failed to fetch data ", e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={isMedicationModalVisible}>
        {selectedMedicationId && (
          <MedicationDetails
            onDismiss={onMedicationDetailsDismiss}
            selectedMedication={medications.find(
              (medication) => medication.id === selectedMedicationId
            )}
            addReminder={addReminder}
            updateReminder={updateReminder}
            deleteReminder={deleteReminder}
          />
        )}
      </Modal>

      <Modal animationType="slide" visible={isMedicationFormModalVisible}>
        <MedicationForm
          selectedMedication={selectedMedication}
          onDismiss={() => {
            setSelectedMedicationId(null);
            setIsMedicationFormModalVisible(false);
          }}
          onSuccess={handleCreateUpdateMedication}
        />
      </Modal>

      <View style={styles.medicationsHeader}>
        <Text style={styles.medicationTitle}>Medications</Text>
        <Button
          title="Add"
          onPress={() => setIsMedicationFormModalVisible(true)}
        />
      </View>

      <ScrollView>
        {medications.length > 0 ? (
          medications.map((medication) => (
            <GestureHandlerRootView key={medication.id}>
              <Swipeable
                renderRightActions={() => renderRightActions(medication.id)}
                renderLeftActions={() => renderLeftActions(medication.id)}
              >
                <TouchableOpacity
                  onPress={() => handleMedicationClick(medication)}
                >
                  <View style={styles.medication}>
                    <Text>{medication.title}</Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            </GestureHandlerRootView>
          ))
        ) : (
          <View style={styles.noMedicationContainer}>
            <Text>No medications found!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
