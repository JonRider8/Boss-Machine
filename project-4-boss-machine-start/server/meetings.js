const meetingRouter = require("express").Router();

module.exports = meetingRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting
} = require("./db.js");

meetingRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingRouter.post("/", (req, res) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
    res.status(201).send(newMeeting);
});

meetingRouter.delete("/", (req, res) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
});