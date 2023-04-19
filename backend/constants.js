const reminder1 = () => {
  const date = new Date();
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(8);

  return date.toISOString();
};

const reminder2 = () => {
  const date = new Date();
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(16);

  return date.toISOString();
};

const reminder3 = () => {
  const date = new Date();
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(20);

  return date.toISOString();
};

const MEDICATIONS = [
  {
    id: 1,
    title: "Trufen",
    description: "This should be taken twice a day.",
    reminders: [
      {
        id: 1,
        time: reminder1(),
      },
      {
        id: 2,
        time: reminder2(),
      },
    ],
  },
  {
    id: 2,
    title: "Panadol",
    description: "This should be taken whenever needed.",
    reminders: [
      {
        id: 1,
        time: reminder3(),
      },
    ],
  },
];

exports.MEDICATIONS = MEDICATIONS;
