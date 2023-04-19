const express = require("express");
const { v4: uuidv4 } = require("uuid");

const { redis, getMedications } = require("../utils/redis");

const router = express.Router();

router.get("/", async (req, res) => {
  const medications = await getMedications();
  res.status(200).json({ medications: medications || [] });
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  if (!title.trim() || !description.trim()) {
    console.error("Validation failed, data is invalid!");
    return res.status(422).send("Validation failed, data is invalid!");
  }

  let medications = await getMedications();
  if (!medications) medications = [];

  const newMedication = {
    id: uuidv4(),
    title,
    description,
    reminders: [],
  };
  medications.push(newMedication);
  await redis.set("medications", JSON.stringify(medications));
  res.status(200).json({ medications });
});

router.put("/:medicationId", async (req, res) => {
  const medicationId = req.params.medicationId;
  const medicationTitle = req.body.title;
  const medicationDescription = req.body.description;

  let medications = await getMedications();
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );

  if (!medication) {
    console.error("Medication not found: ", medicationId);
    return res.status(422).send("Medication not found!");
  }

  medications = medications.map((medication) => {
    if (medication.id !== medicationId) return medication;

    return {
      ...medication,
      title: medicationTitle,
      description: medicationDescription,
    };
  });
  await redis.set("medications", JSON.stringify(medications));
  res.status(200).json({ medications });
});

router.delete("/:medicationId", async (req, res) => {
  const medicationId = req.params.medicationId;
  let medications = await getMedications();
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );

  if (!medication) {
    console.error("Medication not found: ", medicationId);
    return res.status(422).send("Medication not found!");
  }

  medications = medications.filter(
    (medication) => medication.id !== medicationId
  );
  await redis.set("medications", JSON.stringify(medications));
  res.status(200).json({ medications });
});

module.exports = router;
