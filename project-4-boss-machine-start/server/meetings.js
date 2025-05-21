const meetingRouter = require("express").Router();

module.exports = meetingRouter;

const { de } = require("faker/lib/locales.js");
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase
} = require("./db.js");

meetingRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingRouter.post("/", (req, res) => {
  const meeting = req.body;
  const newMeeting = addToDatabase("meetings", meeting);
  if (newMeeting) {
    res.status(201).send(newMeeting);
  } else {
    res.status(400).send("Invalid meeting data");
  }
});

meetingRouter.delete("/", (req, res) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
});