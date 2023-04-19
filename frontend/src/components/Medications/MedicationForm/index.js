import { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import axios from "../../../utils/axios";
import ActivityIndicator from "../../ActivityIndicator";
import TextInputField from "../../TextInputField";
import styles from "./styles";

export default function MedicationForm({
  selectedMedication,
  onDismiss,
  onSuccess,
}) {
  const isNew = selectedMedication ? false : true;
  const [isActivityIndicatorVisible, setIsActivityIndicatorVisible] =
    useState(false);
  const [medicationTitle, setMedicationTitle] = useState(
    isNew ? "" : selectedMedication.title
  );
  const [medicationDescription, setMedicationDescription] = useState(
    isNew ? "" : selectedMedication.description
  );

  const handleCreation = () => {
    setIsActivityIndicatorVisible(true);
    axios
      .post("medications", {
        title: medicationTitle,
        description: medicationDescription,
      })
      .then((response) => {
        onSuccess(response.data.medications);
      })
      .catch((e) => {
        console.error("error creating medication: ", e);
      })
      .finally(() => {
        setIsActivityIndicatorVisible(false);
      });
  };

  const handleUpdate = () => {
    setIsActivityIndicatorVisible(true);
    axios
      .put(`medications/${selectedMedication.id}`, {
        title: medicationTitle,
        description: medicationDescription,
      })
      .then((response) => {
        onSuccess(response.data.medications);
      })
      .catch((e) => {
        console.error("error updating medication: ", e);
      })
      .finally(() => {
        setIsActivityIndicatorVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.contentContainer}>
        <TextInputField
          title="Title"
          value={medicationTitle}
          onChangeText={(e) => setMedicationTitle(e)}
        />
        <TextInputField
          title="Description"
          multiline
          numberOfLines={8}
          value={medicationDescription}
          onChangeText={(e) => setMedicationDescription(e)}
        />
        <View style={styles.createMedicationActionsContainer}>
          <Button color="red" title="Cancel" onPress={onDismiss}></Button>
          <Button
            title={isNew ? "Create" : "Update"}
            onPress={isNew ? handleCreation : handleUpdate}
            disabled={!medicationTitle.trim() || !medicationDescription.trim()}
          ></Button>
        </View>
      </View>
      {isActivityIndicatorVisible && <ActivityIndicator />}
    </SafeAreaView>
  );
}
