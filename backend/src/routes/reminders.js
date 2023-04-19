const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { redis, getMedications } = require("../utils/redis");

const router = express.Router();

router.post("/", async (req, res) => {
  const medicationId = req.body.medicationId;
  const medications = await getMedications();
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );

  if (!medication) {
    console.error("Medication not found: ", medicationId);
    return res.status(422).send("Medication not found!");
  }

  const newReminder = {
    id: uuidv4(),
    time: req.body.time,
  };
  medication.reminders.push(newReminder);
  await redis.set("medications", JSON.stringify(medications));
  res.status(200).json({ reminder: newReminder });
});

router.put("/:reminderId", async (req, res) => {
  const medicationId = req.body.medicationId;
  const medications = await getMedications();
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );

  if (!medication) {
    console.error("Medication not found: ", medicationId);
    return res.status(422).send("Medication not found!");
  }

  const reminderId = req.params.reminderId;
  const updatedReminder = req.body.reminder;
  const oldReminder = medication.reminders.find(
    (reminder) => reminder.id === reminderId
  );
  if (!oldReminder) {
    console.error("Reminder not found: ", reminderId);
    return res.status(422).send("Reminder not found!");
  }

  medication.reminders = medication.reminders.map((reminder) => {
    if (reminder.id === reminderId) return { ...reminder, ...updatedReminder };
    return reminder;
  });

  await redis.set("medications", JSON.stringify(medications));
  res.sendStatus(200);
});

router.delete("/:reminderId", async (req, res) => {
  const medicationId = req.body.medicationId;
  const medications = await getMedications();
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );

  if (!medication) {
    console.error("Medication not found: ", medicationId);
    return res.status(422).send("Medication not found!");
  }

  const reminderId = req.params.reminderId;
  const oldReminder = medication.reminders.find(
    (reminder) => reminder.id === reminderId
  );
  if (!oldReminder) {
    console.error("Reminder not found: ", reminderId);
    return res.status(422).send("Reminder not found!");
  }

  medication.reminders = medication.reminders.filter(
    (reminder) => reminder.id !== reminderId
  );

  await redis.set("medications", JSON.stringify(medications));
  res.sendStatus(200);
});

module.exports = router;
