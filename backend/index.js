const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const medicationsRoute = require("./src/routes/medications");
const remindersRoute = require("./src/routes/reminders");

const PORT = 8081;

app.use(bodyParser.json());

app.use("/api/v1/medications", medicationsRoute);
app.use("/api/v1/reminders", remindersRoute);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});

module.exports = app;
